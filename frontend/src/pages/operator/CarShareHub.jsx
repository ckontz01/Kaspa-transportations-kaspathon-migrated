import Card from '../../components/Card'
import Badge from '../../components/Badge'
import StatCard from '../../components/StatCard'
import PageHeader from '../../components/PageHeader'

const carShareVehicles = [
  { id: 'CS-001', make: 'Toyota', model: 'Yaris', year: '2022', plate: 'MNO-111', zone: 'Nicosia Center', status: 'available', condition: 'excellent' },
  { id: 'CS-002', make: 'Renault', model: 'Clio', year: '2021', plate: 'PQR-222', zone: 'Strovolos', status: 'rented', condition: 'good', renter: 'Alex M.' },
  { id: 'CS-003', make: 'Honda', model: 'Civic', year: '2023', plate: 'STU-333', zone: 'Limassol Center', status: 'available', condition: 'excellent' },
  { id: 'CS-004', make: 'Ford', model: 'Focus', year: '2020', plate: 'VWX-444', zone: 'Larnaca Center', status: 'rented', condition: 'good', renter: 'Maria K.' },
  { id: 'CS-005', make: 'Nissan', model: 'Micra', year: '2022', plate: 'YZA-555', zone: 'Nicosia North', status: 'maintenance', condition: 'needs_service' },
]

const activeRentals = [
  { id: 1, vehicle: 'Renault Clio (PQR-222)', renter: 'Alex M.', started: '09:30', zone: 'Strovolos', duration: '3h 20m', cost: '€24.50' },
  { id: 2, vehicle: 'Ford Focus (VWX-444)', renter: 'Maria K.', started: '11:00', zone: 'Larnaca', duration: '1h 45m', cost: '€12.25' },
]

export default function CarShareHub() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageHeader title="CarShare Hub 🔑" subtitle="Manage the car sharing fleet and rentals" />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🔑" label="Total Vehicles" value="5" color="#f97316" />
        <StatCard icon="✅" label="Available" value="2" color="#22c55e" />
        <StatCard icon="🚗" label="Currently Rented" value="2" color="#3b82f6" />
        <StatCard icon="🔧" label="In Maintenance" value="1" color="#f59e0b" />
      </div>

      {/* Active Rentals */}
      <Card className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Active Rentals</h3>
        {activeRentals.length === 0 ? (
          <p className="text-gray-400 text-sm">No active rentals at the moment.</p>
        ) : (
          <div className="space-y-3">
            {activeRentals.map(r => (
              <div key={r.id} className="flex items-center gap-4 p-4 rounded-xl" style={{background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)'}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{background: 'rgba(59,130,246,0.15)'}}>🔑</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{r.vehicle}</p>
                  <p className="text-xs text-gray-400">Renter: {r.renter} · Zone: {r.zone}</p>
                  <p className="text-xs text-gray-500">Started: {r.started} · Duration: {r.duration}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-bold text-green-400">{r.cost}</div>
                  <Badge variant="info">Active</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Vehicle Fleet */}
      <Card style={{padding: 0}}>
        <div className="px-6 py-4" style={{borderBottom: '1px solid #1e293b'}}>
          <h3 className="text-lg font-semibold text-white">CarShare Fleet</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{borderBottom: '1px solid #1e293b'}}>
                {['ID','Vehicle','Plate','Zone','Status','Condition'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {carShareVehicles.map(v => (
                <tr key={v.id} className="hover:bg-white/5 transition-colors" style={{borderBottom: '1px solid rgba(255,255,255,0.04)'}}>
                  <td className="px-4 py-3 text-sm text-gray-400 font-mono">{v.id}</td>
                  <td className="px-4 py-3 text-sm text-white">{v.year} {v.make} {v.model}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{v.plate}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{v.zone}</td>
                  <td className="px-4 py-3">
                    <Badge variant={v.status === 'available' ? 'success' : v.status === 'rented' ? 'info' : 'warning'}>
                      {v.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={v.condition === 'excellent' ? 'success' : v.condition === 'good' ? 'info' : 'danger'}>
                      {v.condition}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

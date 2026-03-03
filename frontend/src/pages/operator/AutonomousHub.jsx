import Card from '../../components/Card'
import Badge from '../../components/Badge'
import StatCard from '../../components/StatCard'
import PageHeader from '../../components/PageHeader'
import { useLeafletMap } from '../../hooks/useLeafletMap'

const avFleet = [
  { id: 'AV-001', model: 'Tesla Model 3 (AV)', zone: 'Nicosia Center', status: 'available', battery: 87, trips: 8, lat: 35.185, lng: 33.382 },
  { id: 'AV-002', model: 'Waymo Pod', zone: 'Strovolos', status: 'on_trip', battery: 62, trips: 12, lat: 35.155, lng: 33.462 },
  { id: 'AV-003', model: 'Tesla Model Y (AV)', zone: 'Engomi', status: 'available', battery: 95, trips: 5, lat: 35.118, lng: 33.343 },
  { id: 'AV-004', model: 'Nuro R2', zone: 'Lakatamia', status: 'charging', battery: 23, trips: 0, lat: 35.168, lng: 33.425 },
  { id: 'AV-005', model: 'Tesla Model 3 (AV)', zone: 'Nicosia North', status: 'on_trip', battery: 71, trips: 15, lat: 35.142, lng: 33.380 },
  { id: 'AV-006', model: 'Waymo Pod', zone: 'Makedonitissa', status: 'maintenance', battery: 45, trips: 0, lat: 35.175, lng: 33.355 },
]

const statusVariant = { available: 'success', on_trip: 'info', charging: 'warning', maintenance: 'danger' }
const statusColor = { available: '#22c55e', on_trip: '#3b82f6', charging: '#f59e0b', maintenance: '#ef4444' }

export default function AutonomousHub() {
  const mapRef = useLeafletMap((container) => {
    const map = window.L.map(container).setView([35.16, 33.40], 11)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)
    avFleet.forEach(av => {
      const color = statusColor[av.status] || '#8b5cf6'
      window.L.circleMarker([av.lat, av.lng], { color, fillColor: color, fillOpacity: 0.85, radius: 10 })
        .bindPopup(`<b>${av.id}</b><br>${av.model}<br>🔋 ${av.battery}%<br>Status: ${av.status}`)
        .addTo(map)
    })
    return map
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageHeader title="Autonomous Hub 🤖" subtitle="Monitor your autonomous vehicle fleet" />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard icon="🤖" label="Total AV Fleet" value="6" color="#8b5cf6" />
        <StatCard icon="✅" label="Available" value="2" color="#22c55e" />
        <StatCard icon="🚀" label="On Trip" value="2" color="#3b82f6" />
        <StatCard icon="🔋" label="Charging" value="1" color="#f59e0b" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card style={{padding: 0, overflow: 'hidden'}}>
            <div ref={mapRef} style={{width: '100%', height: '480px', borderRadius: '16px'}} />
          </Card>
        </div>

        <div className="space-y-3 overflow-y-auto" style={{maxHeight: '500px'}}>
          {avFleet.map(av => (
            <div key={av.id} className="p-4 rounded-xl" style={{background: 'rgba(11,17,32,0.7)', border: '1px solid #1e293b'}}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-sm">{av.id}</span>
                <Badge variant={statusVariant[av.status]}>{av.status}</Badge>
              </div>
              <p className="text-xs text-gray-300 mb-1">{av.model}</p>
              <p className="text-xs text-gray-400">Zone: {av.zone}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">🔋 Battery</span>
                    <span className="text-white">{av.battery}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{width: `${av.battery}%`, background: av.battery > 50 ? '#22c55e' : av.battery > 20 ? '#f59e0b' : '#ef4444'}} />
                  </div>
                </div>
                <span className="text-xs text-gray-400">🚗 {av.trips}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

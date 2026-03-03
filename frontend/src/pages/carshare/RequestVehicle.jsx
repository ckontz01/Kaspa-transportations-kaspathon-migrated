import { useState } from 'react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import PageHeader from '../../components/PageHeader'
import { useLeafletMap } from '../../hooks/useLeafletMap'

const availableVehicles = [
  { id: 'CS-001', make: 'Toyota', model: 'Yaris', year: '2022', plate: 'MNO-111', zone: 'Nicosia Center', rate: '€8/hr', lat: 35.185, lng: 33.382, seats: 5, fuel: 'Petrol' },
  { id: 'CS-003', make: 'Honda', model: 'Civic', year: '2023', plate: 'STU-333', zone: 'Limassol Center', rate: '€10/hr', lat: 35.118, lng: 33.343, seats: 5, fuel: 'Hybrid' },
  { id: 'CS-007', make: 'Kia', model: 'Picanto', year: '2022', plate: 'BCD-777', zone: 'Larnaca Center', rate: '€7/hr', lat: 34.921, lng: 33.634, seats: 5, fuel: 'Petrol' },
  { id: 'CS-009', make: 'VW', model: 'Polo', year: '2023', plate: 'EFG-999', zone: 'Paphos', rate: '€9/hr', lat: 34.776, lng: 32.423, seats: 5, fuel: 'Petrol' },
]

export default function CarShareRequestVehicle() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const [booked, setBooked] = useState(false)

  const mapRef = useLeafletMap((container) => {
    const map = window.L.map(container).setView([35.0, 33.3], 9)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)
    availableVehicles.forEach(v => {
      window.L.marker([v.lat, v.lng])
        .bindPopup(`<b>${v.year} ${v.make} ${v.model}</b><br>${v.zone}<br>${v.rate}`)
        .addTo(map)
    })
    return map
  })

  const handleBook = () => {
    if (selected) setBooked(true)
  }

  const zones = ['all', ...new Set(availableVehicles.map(v => v.zone))]
  const filtered = filter === 'all' ? availableVehicles : availableVehicles.filter(v => v.zone === filter)

  if (booked) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        <Card className="text-center py-10">
          <div className="text-6xl mb-4">🔑</div>
          <h2 className="text-2xl font-bold text-white mb-3">Vehicle Booked!</h2>
          <p className="text-gray-400 mb-2">Your booking for <strong className="text-white">{selected?.year} {selected?.make} {selected?.model}</strong> is confirmed.</p>
          <p className="text-sm text-gray-400 mb-6">Head to <span className="text-orange-400">{selected?.zone}</span> to find your vehicle using plate <span className="text-white font-mono">{selected?.plate}</span>.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setBooked(false); setSelected(null) }} className="px-5 py-2.5 rounded-xl text-sm font-medium" style={{background: 'rgba(255,255,255,0.08)', color: '#94a3b8'}}>
              Book Another
            </button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageHeader title="Book a CarShare Vehicle 🔑" subtitle="Browse and book available vehicles" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card style={{padding: 0, overflow: 'hidden'}}>
            <div ref={mapRef} style={{width: '100%', height: '480px', borderRadius: '16px'}} />
          </Card>
        </div>

        {/* Vehicle list */}
        <div className="flex flex-col gap-4">
          {/* Zone filter */}
          <div className="flex flex-wrap gap-2">
            {zones.map(z => (
              <button key={z} onClick={() => setFilter(z)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize" style={{
                background: filter === z ? '#f97316' : 'rgba(255,255,255,0.05)',
                color: filter === z ? 'white' : '#94a3b8',
              }}>
                {z === 'all' ? 'All Zones' : z}
              </button>
            ))}
          </div>

          <div className="space-y-3 overflow-y-auto" style={{maxHeight: '420px'}}>
            {filtered.map(v => (
              <div
                key={v.id}
                onClick={() => setSelected(v)}
                className="p-4 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5"
                style={{
                  background: selected?.id === v.id ? 'rgba(249,115,22,0.1)' : 'rgba(11,17,32,0.7)',
                  border: `1px solid ${selected?.id === v.id ? '#f97316' : '#1e293b'}`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-sm">{v.year} {v.make} {v.model}</span>
                  <span className="text-orange-400 font-semibold text-sm">{v.rate}</span>
                </div>
                <p className="text-xs text-gray-400">📍 {v.zone}</p>
                <p className="text-xs text-gray-500">Plate: {v.plate} · {v.seats} seats · {v.fuel}</p>
                <Badge variant="success" className="mt-2">Available</Badge>
              </div>
            ))}
          </div>

          {selected && (
            <button onClick={handleBook} className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5" style={{background: 'linear-gradient(135deg, #f97316, #ea580c)'}}>
              Book {selected.make} {selected.model} →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

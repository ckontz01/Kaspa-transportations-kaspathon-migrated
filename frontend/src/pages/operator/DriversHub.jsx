import { useState } from 'react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import PageHeader from '../../components/PageHeader'
import { useLeafletMap } from '../../hooks/useLeafletMap'

const driverList = [
  { id: 1, name: 'Michael K.', vehicle: 'Toyota Corolla', plate: 'ABC-123', status: 'online', trips: 4, rating: 4.9, lat: 35.185, lng: 33.382 },
  { id: 2, name: 'George P.', vehicle: 'Hyundai Tucson', plate: 'XYZ-456', status: 'on_trip', trips: 6, rating: 4.8, lat: 35.155, lng: 33.462 },
  { id: 3, name: 'Stavros M.', vehicle: 'VW Golf', plate: 'DEF-789', status: 'online', trips: 3, rating: 4.7, lat: 35.118, lng: 33.343 },
  { id: 4, name: 'Andreas V.', vehicle: 'BMW 3 Series', plate: 'GHI-012', status: 'offline', trips: 0, rating: 4.9, lat: 35.168, lng: 33.425 },
  { id: 5, name: 'Nikos A.', vehicle: 'Mercedes C-Class', plate: 'JKL-345', status: 'pending', trips: 0, rating: 0, lat: 35.142, lng: 33.380 },
]

const statusVariant = { online: 'success', on_trip: 'info', offline: 'default', pending: 'warning' }
const statusColor = { online: '#22c55e', on_trip: '#3b82f6', offline: '#94a3b8', pending: '#f59e0b' }

export default function DriversHub() {
  const [filter, setFilter] = useState('all')

  const mapRef = useLeafletMap((container) => {
    const map = window.L.map(container).setView([35.16, 33.40], 11)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)
    driverList.forEach(d => {
      const color = statusColor[d.status] || '#94a3b8'
      window.L.circleMarker([d.lat, d.lng], {
        color,
        fillColor: color,
        fillOpacity: 0.8,
        radius: 9,
      })
        .bindPopup(`<b>${d.name}</b><br>${d.vehicle}<br>Status: ${d.status}`)
        .addTo(map)
    })
    return map
  })

  const filtered = filter === 'all' ? driverList : driverList.filter(d => d.status === filter)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageHeader title="Drivers Hub 🚗" subtitle="Monitor and manage your driver fleet" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card style={{padding: 0, overflow: 'hidden'}}>
            <div ref={mapRef} style={{width: '100%', height: '520px', borderRadius: '16px'}} />
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            {['all','online','on_trip','offline','pending'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all" style={{
                background: filter === f ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                color: filter === f ? 'white' : '#94a3b8',
              }}>
                {f === 'on_trip' ? 'On Trip' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-2 overflow-y-auto" style={{maxHeight: '460px'}}>
            {filtered.map(d => (
              <div key={d.id} className="p-3 rounded-xl" style={{background: 'rgba(11,17,32,0.7)', border: '1px solid #1e293b'}}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white text-sm">{d.name}</span>
                  <Badge variant={statusVariant[d.status]}>{d.status === 'on_trip' ? 'On Trip' : d.status}</Badge>
                </div>
                <p className="text-xs text-gray-400">{d.vehicle} · {d.plate}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <span>🚗 {d.trips} trips</span>
                  {d.rating > 0 && <span>⭐ {d.rating}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

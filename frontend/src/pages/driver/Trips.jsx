import { useState } from 'react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import PageHeader from '../../components/PageHeader'

const tripsData = {
  assigned: [
    { id: 201, passenger: 'Elena V.', from: 'Strovolos', to: 'Nicosia Mall', fare: '€5.50', time: '15:30', status: 'assigned' },
    { id: 202, passenger: 'Costas M.', from: 'Engomi', to: 'Lakatamia', fare: '€4.20', time: '16:00', status: 'assigned' },
  ],
  inProgress: [
    { id: 203, passenger: 'Anna S.', from: 'University', to: 'City Center', fare: '€3.80', time: '14:45', status: 'in_progress' },
  ],
  completed: [
    { id: 204, passenger: 'Michael D.', from: 'Airport', to: 'Strovolos', fare: '€18.00', time: '12:00', status: 'completed', rating: 5 },
    { id: 205, passenger: 'Maria K.', from: 'Makariou', to: 'Lykavittos', fare: '€6.50', time: '10:30', status: 'completed', rating: 5 },
    { id: 206, passenger: 'Petros A.', from: 'Engomi', to: 'Mall of Cyprus', fare: '€7.20', time: '09:00', status: 'completed', rating: 4 },
  ],
}

const tabs = [['assigned','Assigned','warning'],['inProgress','In Progress','info'],['completed','Completed','success']]

export default function DriverTrips() {
  const [tab, setTab] = useState('assigned')
  const trips = tripsData[tab] || []

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <PageHeader title="My Trips" subtitle="Manage your assigned and completed trips" />

      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(([key, label, variant]) => (
          <button key={key} onClick={() => setTab(key)} className="px-4 py-2 rounded-xl text-sm font-medium transition-all" style={{
            background: tab === key ? '#3b82f6' : 'rgba(255,255,255,0.05)',
            color: tab === key ? 'white' : '#94a3b8',
            border: `1px solid ${tab === key ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`,
          }}>
            {label} ({tripsData[key]?.length || 0})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {trips.length === 0 && (
          <Card className="text-center py-10">
            <p className="text-gray-400">No trips in this category.</p>
          </Card>
        )}
        {trips.map(trip => (
          <div key={trip.id} className="flex items-center gap-4 p-5 rounded-2xl" style={{background: 'rgba(11,17,32,0.7)', border: '1px solid #1e293b'}}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{background: 'rgba(59,130,246,0.15)'}}>🚗</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-semibold">👤 {trip.passenger}</span>
                {trip.rating && <span className="text-yellow-400 text-sm">{'⭐'.repeat(trip.rating)}</span>}
              </div>
              <p className="text-sm text-gray-300">📍 {trip.from} → {trip.to}</p>
              <p className="text-xs text-gray-500 mt-1">Scheduled: {trip.time}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-lg font-bold text-green-400 mb-2">{trip.fare}</div>
              <Badge variant={tab === 'assigned' ? 'warning' : tab === 'inProgress' ? 'info' : 'success'}>
                {tab === 'assigned' ? 'Assigned' : tab === 'inProgress' ? 'In Progress' : 'Completed'}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

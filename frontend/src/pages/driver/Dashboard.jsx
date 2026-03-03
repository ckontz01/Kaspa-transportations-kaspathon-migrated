import { useState } from 'react'
import Card from '../../components/Card'
import StatCard from '../../components/StatCard'
import Badge from '../../components/Badge'
import PageHeader from '../../components/PageHeader'
import { useAuth } from '../../context/AuthContext'

const availableRequests = [
  { id: 101, passenger: 'Alex M.', from: 'Strovolos', to: 'Nicosia City Center', distance: '3.2 km', fare: '€5.50', time: '2 min ago' },
  { id: 102, passenger: 'Maria K.', from: 'Engomi', to: 'University of Cyprus', distance: '2.8 km', fare: '€4.80', time: '3 min ago' },
  { id: 103, passenger: 'Nikos P.', from: 'Makariou Ave', to: 'Lykavittos', distance: '4.5 km', fare: '€7.00', time: '5 min ago' },
]

const recentTrips = [
  { id: 1, passenger: 'John D.', from: 'Mall of Cyprus', to: 'Strovolos', date: '1 hour ago', fare: '€6.20', rating: 5 },
  { id: 2, passenger: 'Sofia A.', from: 'Nicosia Center', to: 'Lakatamia', date: 'Today 09:30', fare: '€8.00', rating: 5 },
  { id: 3, passenger: 'Petros V.', from: 'Airport Road', to: 'Larnaca Center', date: 'Yesterday', fare: '€12.00', rating: 4 },
]

export default function DriverDashboard() {
  const { user } = useAuth()
  const [online, setOnline] = useState(false)
  const [accepted, setAccepted] = useState({})

  const handleAccept = (id) => setAccepted(p => ({...p, [id]: true}))

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <PageHeader
        title={`Hello, ${user?.name?.split(' ')[0]}! 🚗`}
        subtitle="Driver Operations Center"
        actions={
          <button onClick={() => setOnline(!online)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all" style={{background: online ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)', color: online ? '#22c55e' : '#ef4444', border: `1px solid ${online ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`}}>
            <span className={`w-2 h-2 rounded-full ${online ? 'bg-green-400 pulse-dot' : 'bg-red-400'}`} />
            {online ? 'Online – Accepting Rides' : 'Offline – Go Online'}
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🚗" label="Trips Today" value="4" color="#3b82f6" />
        <StatCard icon="💰" label="Earnings Today" value="€32.70" color="#22c55e" />
        <StatCard icon="⭐" label="Rating" value="4.9" color="#f59e0b" subtitle="Last 30 trips" />
        <StatCard icon="🕐" label="Hours Online" value="5.5h" color="#8b5cf6" />
      </div>

      {/* Available Requests */}
      {online && (
        <Card className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
            <h3 className="text-lg font-semibold text-white">Available Ride Requests</h3>
          </div>
          <div className="space-y-3">
            {availableRequests.map(req => (
              <div key={req.id} className="flex items-center gap-4 p-4 rounded-xl" style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)'}}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium text-sm">👤 {req.passenger}</span>
                    <span className="text-xs text-gray-500">{req.time}</span>
                  </div>
                  <p className="text-sm text-gray-300">📍 {req.from} → {req.to}</p>
                  <p className="text-xs text-gray-400 mt-1">{req.distance}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-bold text-green-400 mb-2">{req.fare}</div>
                  {accepted[req.id] ? (
                    <Badge variant="success">Accepted ✓</Badge>
                  ) : (
                    <button onClick={() => handleAccept(req.id)} className="px-4 py-2 rounded-xl font-medium text-white text-sm transition-all hover:-translate-y-0.5" style={{background: '#22c55e'}}>
                      Accept
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {!online && (
        <Card className="mb-6 text-center py-10">
          <div className="text-5xl mb-4">😴</div>
          <h3 className="text-lg font-semibold text-white mb-2">You are Offline</h3>
          <p className="text-gray-400 mb-4">Go online to start receiving ride requests</p>
          <button onClick={() => setOnline(true)} className="px-6 py-3 rounded-xl font-semibold text-white" style={{background: '#22c55e'}}>
            Go Online
          </button>
        </Card>
      )}

      {/* Recent Trips */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Completed Trips</h3>
        <div className="space-y-3">
          {recentTrips.map(trip => (
            <div key={trip.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{background: 'rgba(255,255,255,0.07)'}}>🚗</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white">{trip.passenger}</div>
                <div className="text-xs text-gray-400 truncate">{trip.from} → {trip.to}</div>
                <div className="text-xs text-gray-500">{trip.date}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-semibold text-green-400">{trip.fare}</div>
                <div className="text-xs text-yellow-400">{'⭐'.repeat(trip.rating)}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

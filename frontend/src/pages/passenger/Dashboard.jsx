import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import StatCard from '../../components/StatCard'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import PageHeader from '../../components/PageHeader'

const recentRides = [
  { id: 1, type: 'driver', from: 'University of Cyprus', to: 'Nicosia Mall', date: '2 hours ago', status: 'completed', fare: '€4.50' },
  { id: 2, type: 'autonomous', from: 'City Center', to: 'Airport', date: '1 day ago', status: 'completed', fare: '€12.00' },
  { id: 3, type: 'carshare', from: 'Limassol Marina', to: 'Paphos Old Town', date: '3 days ago', status: 'completed', fare: '€35.00' },
]

export default function PassengerDashboard() {
  const { user } = useAuth()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0]}! 👋`}
        subtitle="Ready for your next ride?"
        actions={
          <Link to="/passenger/request-ride" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white text-sm transition-all hover:-translate-y-0.5" style={{background: '#3b82f6'}}>
            + Request Ride
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🚗" label="Driver Trips" value="12" color="#3b82f6" />
        <StatCard icon="🤖" label="AV Rides" value="3" color="#8b5cf6" />
        <StatCard icon="🔑" label="CarShare Rentals" value="5" color="#f97316" />
        <StatCard icon="⭐" label="Avg Rating" value="4.9" color="#f59e0b" />
      </div>

      {/* Quick Actions */}
      <Card className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '🚗', title: 'Request Driver Ride', desc: 'Book a ride with a verified driver', to: '/passenger/request-ride', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
            { icon: '🤖', title: 'Autonomous Ride', desc: 'Book a self-driving vehicle', to: '/passenger/request-autonomous', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
            { icon: '🔑', title: 'Book CarShare', desc: 'Rent a car for self-driving', to: '/carshare/request-vehicle', color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
          ].map(a => (
            <Link key={a.title} to={a.to} className="flex flex-col gap-3 p-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{background: a.bg, border: `1px solid ${a.color}30`}}>
              <span className="text-3xl">{a.icon}</span>
              <div>
                <div className="font-semibold text-white text-sm">{a.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{a.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Recent Rides */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Rides</h3>
          <Link to="/passenger/rides-history" className="text-sm text-blue-400 hover:text-blue-300">View all →</Link>
        </div>
        <div className="space-y-3">
          {recentRides.map(ride => (
            <div key={ride.id} className="flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-white/5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{background: 'rgba(255,255,255,0.07)'}}>
                {ride.type === 'driver' ? '🚗' : ride.type === 'autonomous' ? '🤖' : '🔑'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{ride.from} → {ride.to}</div>
                <div className="text-xs text-gray-400">{ride.date}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-semibold text-white">{ride.fare}</div>
                <Badge variant="success">{ride.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

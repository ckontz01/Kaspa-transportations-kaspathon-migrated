import { useState } from 'react'
import Card from '../../components/Card'
import StatCard from '../../components/StatCard'
import Badge from '../../components/Badge'
import PageHeader from '../../components/PageHeader'
import { useAuth } from '../../context/AuthContext'

const pendingDrivers = [
  { id: 1, name: 'Andreas K.', email: 'andreas@example.com', license: 'DL-001234', vehicle: '2022 Toyota Corolla', submitted: '2 hours ago' },
  { id: 2, name: 'Stavros M.', email: 'stavros@example.com', license: 'DL-005678', vehicle: '2021 Hyundai Tucson', submitted: '5 hours ago' },
  { id: 3, name: 'Eleni P.', email: 'eleni@example.com', license: 'DL-009012', vehicle: '2020 VW Golf', submitted: '1 day ago' },
]

const recentActivity = [
  { icon: '🚗', text: 'New ride request: Nicosia Center → Airport', time: '2 min ago', color: '#3b82f6' },
  { icon: '✅', text: 'Driver Michael K. completed trip #204', time: '8 min ago', color: '#22c55e' },
  { icon: '🤖', text: 'AV Unit #2 dispatched to Strovolos', time: '15 min ago', color: '#8b5cf6' },
  { icon: '👤', text: 'New passenger registration: Maria S.', time: '22 min ago', color: '#f59e0b' },
  { icon: '💰', text: 'Payment received: €12.00 (Kaspa)', time: '35 min ago', color: '#49EACB' },
]

export default function OperatorDashboard() {
  const { user } = useAuth()
  const [drivers, setDrivers] = useState(pendingDrivers)
  const [actions, setActions] = useState({})

  const handleAction = (id, action) => {
    setActions(p => ({...p, [id]: action}))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageHeader
        title={`Operator Center 🛡️`}
        subtitle={`Welcome, ${user?.name}. Here's your platform overview.`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="📋" label="Open Requests" value="7" color="#3b82f6" />
        <StatCard icon="🚗" label="Active Trips" value="12" color="#22c55e" subtitle="In progress now" />
        <StatCard icon="👨‍💼" label="Online Drivers" value="8" color="#f59e0b" subtitle="of 15 total" />
        <StatCard icon="🤖" label="AV Fleet Active" value="4" color="#8b5cf6" subtitle="of 6 total" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Driver Approvals */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Pending Driver Approvals</h3>
            <Badge variant="warning">{drivers.filter(d => !actions[d.id]).length} pending</Badge>
          </div>
          <div className="space-y-3">
            {drivers.map(d => (
              <div key={d.id} className="p-4 rounded-xl" style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)'}}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm">{d.name}</p>
                    <p className="text-xs text-gray-400">{d.email}</p>
                    <p className="text-xs text-gray-500 mt-1">License: {d.license} · {d.vehicle}</p>
                    <p className="text-xs text-gray-600">{d.submitted}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    {actions[d.id] ? (
                      <Badge variant={actions[d.id] === 'approved' ? 'success' : 'danger'}>
                        {actions[d.id] === 'approved' ? '✓ Approved' : '✗ Rejected'}
                      </Badge>
                    ) : (
                      <>
                        <button onClick={() => handleAction(d.id, 'approved')} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{background: '#22c55e'}}>Approve</button>
                        <button onClick={() => handleAction(d.id, 'rejected')} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{background: 'rgba(239,68,68,0.2)', color: '#f87171'}}>Reject</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Feed */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-2" style={{borderBottom: i < recentActivity.length-1 ? '1px solid rgba(255,255,255,0.05)' : 'none'}}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{background: `${a.color}20`}}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300">{a.text}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <StatCard icon="💰" label="Revenue Today" value="€284.50" color="#22c55e" />
        <StatCard icon="⭐" label="Avg Driver Rating" value="4.8" color="#f59e0b" />
        <StatCard icon="🔑" label="CarShare Active" value="3" color="#f97316" subtitle="Vehicles rented out" />
      </div>
    </div>
  )
}

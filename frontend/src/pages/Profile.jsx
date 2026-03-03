import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import Badge from '../components/Badge'

const roleColors = { passenger: 'info', driver: 'success', operator: 'purple' }

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader title="My Profile" subtitle="Manage your account information" />
      <div className="space-y-6">
        <Card>
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{background: 'rgba(59,130,246,0.2)'}}>👤</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">{user?.name}</h2>
              <p className="text-gray-400 mb-3">{user?.email}</p>
              <Badge variant={roleColors[user?.role] || 'default'}>{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}</Badge>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
          <div className="space-y-3">
            {[['Name', user?.name], ['Email', user?.email], ['Role', user?.role], ['Account ID', `#${user?.id}`]].map(([k,v]) => (
              <div key={k} className="flex items-center justify-between py-2" style={{borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
                <span className="text-gray-400 text-sm">{k}</span>
                <span className="text-white text-sm font-medium">{v}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Account Actions</h3>
          <button onClick={handleLogout} className="px-4 py-2 rounded-xl font-medium text-sm transition-all" style={{background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)'}}>
            Sign Out
          </button>
        </Card>
      </div>
    </div>
  )
}

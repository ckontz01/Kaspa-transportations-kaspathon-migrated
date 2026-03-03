import { useState } from 'react'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'

export default function PassengerSettings() {
  const [profile, setProfile] = useState({ name: 'Alex Passenger', phone: '+357 99 000001' })
  const [notifications, setNotifications] = useState({ rideUpdates: true, promotions: false, news: true })
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader title="Settings" subtitle="Manage your account preferences" />
      <div className="space-y-6">

        {/* Profile update */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
              <input value={profile.name} onChange={e => setProfile(p=>({...p,name:e.target.value}))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone Number</label>
              <input value={profile.phone} onChange={e => setProfile(p=>({...p,phone:e.target.value}))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}} />
            </div>
            <div className="flex items-center gap-3">
              <button type="submit" className="px-6 py-2.5 rounded-xl font-medium text-white text-sm" style={{background: '#3b82f6'}}>
                Save Changes
              </button>
              {saved && <span className="text-sm text-green-400">✓ Saved successfully!</span>}
            </div>
          </form>
        </Card>

        {/* Notifications */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              ['rideUpdates', 'Ride Updates', 'Get notified about your ride status'],
              ['promotions', 'Promotions', 'Receive promotional offers and discounts'],
              ['news', 'Platform News', 'Stay updated with platform announcements'],
            ].map(([key, label, desc]) => (
              <div key={key} className="flex items-center justify-between py-3" style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(p => ({...p, [key]: !p[key]}))}
                  className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
                  style={{background: notifications[key] ? '#3b82f6' : 'rgba(255,255,255,0.1)'}}
                >
                  <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all" style={{left: notifications[key] ? '24px' : '4px'}} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Security */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Current Password</label>
              <input type="password" placeholder="Enter current password" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">New Password</label>
              <input type="password" placeholder="Enter new password" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}} />
            </div>
            <button className="px-6 py-2.5 rounded-xl font-medium text-white text-sm mt-2" style={{background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)'}}>
              Update Password
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

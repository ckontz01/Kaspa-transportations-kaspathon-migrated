import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = {
  passenger: [
    { to: '/passenger/dashboard', label: 'Dashboard' },
    { to: '/passenger/request-ride', label: '🚗 Driver Ride' },
    { to: '/passenger/request-autonomous', label: '🤖 Autonomous' },
    { to: '/carshare/request-vehicle', label: '🔑 CarShare' },
    { to: '/passenger/rides-history', label: 'History' },
    { to: '/passenger/payments', label: 'Payments' },
    { to: '/passenger/messages', label: 'Messages' },
    { to: '/passenger/settings', label: 'Settings' },
    { to: '/passenger/gdpr', label: 'Privacy' },
  ],
  driver: [
    { to: '/driver/dashboard', label: 'Dashboard' },
    { to: '/driver/trips', label: 'Trips' },
    { to: '/driver/vehicles', label: 'Vehicles' },
    { to: '/driver/earnings', label: 'Earnings' },
    { to: '/driver/messages', label: 'Messages' },
    { to: '/driver/settings', label: 'Settings' },
  ],
  operator: [
    { to: '/operator/dashboard', label: 'Dashboard' },
    { to: '/operator/drivers-hub', label: 'Drivers Hub' },
    { to: '/operator/autonomous-hub', label: 'Autonomous Hub' },
    { to: '/operator/carshare-hub', label: 'CarShare Hub' },
    { to: '/operator/operations-hub', label: 'Operations Hub' },
  ],
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileOpen(false)
  }

  const links = user ? (navLinks[user.role] || []) : []

  return (
    <nav style={{background: 'rgba(11,17,32,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1e293b'}} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl no-underline">
            <span className="text-2xl">🚗</span>
            <span style={{background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Kaspa</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {!user ? (
              <>
                <NavLink to="/" className={({isActive}) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>Home</NavLink>
                <NavLink to="/login" className={({isActive}) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>Login</NavLink>
                <NavLink to="/register/passenger" className={({isActive}) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>Register Passenger</NavLink>
                <NavLink to="/register/driver" className={({isActive}) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>Register Driver</NavLink>
              </>
            ) : (
              links.map(link => (
                <NavLink key={link.to} to={link.to} className={({isActive}) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>
                  {link.label}
                </NavLink>
              ))
            )}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                  <span>👤</span>
                  <span>{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="px-3 py-1.5 text-sm border border-white/20 rounded-lg text-gray-300 hover:text-white hover:border-white/40 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-white/5">
            <div className="flex flex-col gap-1 pt-3">
              {!user ? (
                <>
                  <NavLink to="/" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5">Home</NavLink>
                  <NavLink to="/login" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5">Login</NavLink>
                  <NavLink to="/register/passenger" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5">Register Passenger</NavLink>
                  <NavLink to="/register/driver" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5">Register Driver</NavLink>
                </>
              ) : (
                links.map(link => (
                  <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5">
                    {link.label}
                  </NavLink>
                ))
              )}
              {user && (
                <>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5">👤 {user.name}</Link>
                  <button onClick={handleLogout} className="text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5">Logout</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

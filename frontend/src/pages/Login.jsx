import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    const errs = {}
    if (!email) errs.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email format.'
    if (!password) errs.password = 'Password is required.'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    const result = await login(email, password)
    setLoading(false)

    if (result.success) {
      const role = result.user.role
      if (role === 'passenger') navigate('/passenger/dashboard')
      else if (role === 'driver') navigate('/driver/dashboard')
      else if (role === 'operator') navigate('/operator/dashboard')
    } else {
      setErrors({ general: result.error })
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl" style={{background: 'rgba(11,17,32,0.6)', border: '1px solid rgba(255,255,255,0.08)'}}>
        {/* Brand side */}
        <div className="hidden md:flex flex-col justify-center p-10 relative overflow-hidden" style={{background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1), rgba(16,185,129,0.08))'}}>
          <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(circle at 30% 70%, rgba(59,130,246,0.2) 0%, transparent 50%)'}} />
          <div className="relative z-10">
            <div className="text-5xl mb-4">🚗</div>
            <h2 className="text-2xl font-bold text-white mb-3">Welcome to OSRH</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">Your smart ride-hailing platform. Connect with drivers and autonomous vehicles for seamless transportation.</p>
            <ul className="space-y-3">
              {[['🎯','Easy ride booking in seconds'],['🔒','Secure and verified platform'],['🤖','Autonomous vehicle support'],['🔑','Flexible car sharing'],['💰','Transparent pricing']].map(([icon, text]) => (
                <li key={text} className="flex items-center gap-3 text-gray-400">
                  <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 flex-shrink-0">{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form side */}
        <div className="flex flex-col justify-center p-8 md:p-10">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 mb-6 transition-colors">
            ← Back to home
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">Sign In</h1>
          <p className="text-gray-400 mb-6 text-sm">Enter your credentials to access your account</p>

          <div className="mb-4 p-3 rounded-xl text-xs" style={{background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa'}}>
            <strong>Demo:</strong> passenger@demo.com / driver@demo.com / operator@demo.com · Password: demo123
          </div>

          {errors.general && (
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl text-sm" style={{background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5'}}>
              <span>⚠️</span><span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                style={{background: 'rgba(255,255,255,0.05)', border: `1px solid ${errors.email ? '#ef4444' : 'rgba(255,255,255,0.12)'}`, color: 'white'}}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{background: 'rgba(255,255,255,0.05)', border: `1px solid ${errors.password ? '#ef4444' : 'rgba(255,255,255,0.12)'}`, color: 'white'}}
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-white text-base transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed mt-2" style={{background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 4px 15px rgba(59,130,246,0.3)'}}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500">New to OSRH?</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[{to:'/register/passenger',label:'🚕 Passenger'},{to:'/register/driver',label:'🚗 Driver'},{to:'/register/passenger',label:'🔑 Car Share'}].map(l => (
              <Link key={l.label} to={l.to} className="flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white transition-all hover:-translate-y-0.5" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

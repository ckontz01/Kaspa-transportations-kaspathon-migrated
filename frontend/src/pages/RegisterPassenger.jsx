import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPassenger() {
  const { registerPassenger } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(p => ({...p, [k]: e.target.value}))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.firstName) errs.firstName = 'First name is required.'
    if (!form.lastName) errs.lastName = 'Last name is required.'
    if (!form.email) errs.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email.'
    if (!form.password) errs.password = 'Password is required.'
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.'
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    await registerPassenger(form)
    navigate('/passenger/dashboard')
  }

  const Field = ({ label, name, type = 'text', placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <input type={type} value={form[name]} onChange={set(name)} placeholder={placeholder} className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none" style={{background: 'rgba(255,255,255,0.05)', border: `1px solid ${errors[name] ? '#ef4444' : 'rgba(255,255,255,0.12)'}`, color: 'white'}} />
      {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg rounded-3xl p-8 shadow-2xl" style={{background: 'rgba(11,17,32,0.7)', border: '1px solid rgba(255,255,255,0.08)'}}>
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 mb-6 transition-colors">← Back to home</Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{background: 'rgba(59,130,246,0.2)'}}>🚕</div>
          <div>
            <h1 className="text-2xl font-bold text-white">Register as Passenger</h1>
            <p className="text-gray-400 text-sm">Create your free account to start riding</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" name="firstName" placeholder="John" />
            <Field label="Last Name" name="lastName" placeholder="Doe" />
          </div>
          <Field label="Email Address" name="email" type="email" placeholder="john@example.com" />
          <Field label="Phone Number" name="phone" placeholder="+357 99 000000" />
          <Field label="Password" name="password" type="password" placeholder="Min. 8 characters" />
          <Field label="Confirm Password" name="confirmPassword" type="password" placeholder="Repeat your password" />
          <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-white mt-2 transition-all hover:-translate-y-0.5" style={{background: 'linear-gradient(135deg, #3b82f6, #2563eb)'}}>
            {loading ? 'Creating account...' : 'Create Passenger Account →'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300">Sign in</Link>
        </p>
        <p className="text-center text-sm text-gray-400 mt-2">
          Want to drive? <Link to="/register/driver" className="text-green-400 hover:text-green-300">Register as Driver</Link>
        </p>
      </div>
    </div>
  )
}

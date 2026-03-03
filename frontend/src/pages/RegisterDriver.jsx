import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterDriver() {
  const { registerDriver } = useAuth()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', licenseNumber: '', vehicleMake: '', vehicleModel: '', vehicleYear: '', vehiclePlate: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(p => ({...p, [k]: e.target.value}))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.firstName) errs.firstName = 'Required'
    if (!form.lastName) errs.lastName = 'Required'
    if (!form.email) errs.email = 'Required'
    if (!form.licenseNumber) errs.licenseNumber = 'Required'
    if (!form.vehicleMake) errs.vehicleMake = 'Required'
    if (!form.vehicleModel) errs.vehicleModel = 'Required'
    if (!form.vehiclePlate) errs.vehiclePlate = 'Required'
    if (!form.password || form.password.length < 8) errs.password = 'Min 8 characters'
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    await registerDriver(form)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="text-center max-w-md p-10 rounded-3xl" style={{background: 'rgba(11,17,32,0.7)', border: '1px solid rgba(255,255,255,0.08)'}}>
          <div className="text-6xl mb-4">⏳</div>
          <h1 className="text-2xl font-bold text-white mb-3">Application Submitted!</h1>
          <p className="text-gray-400 mb-6">Your driver application is under review. An operator will review your documents and approve your account. You will be notified once approved.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white" style={{background: '#3b82f6'}}>← Back to Homepage</Link>
        </div>
      </div>
    )
  }

  const Field = ({ label, name, type = 'text', placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <input type={type} value={form[name]} onChange={set(name)} placeholder={placeholder} className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none" style={{background: 'rgba(255,255,255,0.05)', border: `1px solid ${errors[name] ? '#ef4444' : 'rgba(255,255,255,0.12)'}`, color: 'white'}} />
      {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl rounded-3xl p-8 shadow-2xl" style={{background: 'rgba(11,17,32,0.7)', border: '1px solid rgba(255,255,255,0.08)'}}>
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 mb-6 transition-colors">← Back</Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{background: 'rgba(16,185,129,0.2)'}}>🚗</div>
          <div>
            <h1 className="text-2xl font-bold text-white">Register as Driver</h1>
            <p className="text-gray-400 text-sm">Join our verified driver network and start earning</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 rounded-xl mb-2" style={{background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)'}}>
            <p className="text-xs font-medium" style={{color: '#6ee7b7'}}>ℹ️ Driver accounts require operator approval. After registration, an operator will review your documents before you can log in.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" name="firstName" placeholder="John" />
            <Field label="Last Name" name="lastName" placeholder="Doe" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email" name="email" type="email" placeholder="john@example.com" />
            <Field label="Phone" name="phone" placeholder="+357 99 000000" />
          </div>
          <Field label="License Number" name="licenseNumber" placeholder="DL-123456" />
          <div className="pt-2 pb-1">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Vehicle Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Make" name="vehicleMake" placeholder="Toyota" />
              <Field label="Model" name="vehicleModel" placeholder="Corolla" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Field label="Year" name="vehicleYear" placeholder="2020" />
              <Field label="License Plate" name="vehiclePlate" placeholder="ABC-123" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Password" name="password" type="password" placeholder="Min. 8 chars" />
            <Field label="Confirm Password" name="confirmPassword" type="password" placeholder="Repeat" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-white mt-2 transition-all hover:-translate-y-0.5" style={{background: 'linear-gradient(135deg, #10b981, #059669)'}}>
            {loading ? 'Submitting...' : 'Submit Driver Application →'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import { useLeafletMap } from '../../hooks/useLeafletMap'

export default function RequestRide() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ from: '', to: '', serviceType: 'standard', paymentMethod: 'cash', accessibility: false, luggage: false })
  const [loading, setLoading] = useState(false)
  const [estimatedFare, setEstimatedFare] = useState(null)

  const mapRef = useLeafletMap((container) => {
    const map = window.L.map(container).setView([35.1264, 33.4299], 10)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)
    return map
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.from || !form.to) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    navigate('/passenger/request-status')
  }

  const handleEstimateFare = () => {
    if (form.from && form.to) setEstimatedFare('€3.50 – €7.00')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <PageHeader title="Request a Ride 🚗" subtitle="Set your pickup and dropoff to get started" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <Card style={{padding: 0, overflow: 'hidden'}}>
          <div ref={mapRef} style={{width: '100%', height: '500px', background: '#0b1929', borderRadius: '16px'}} />
        </Card>

        {/* Form */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-6">Ride Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">📍 Pickup Location</label>
              <input value={form.from} onChange={e => setForm(p=>({...p,from:e.target.value}))} placeholder="Enter pickup address..." className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">🏁 Drop-off Location</label>
              <input value={form.to} onChange={e => setForm(p=>({...p,to:e.target.value}))} placeholder="Enter destination..." className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Service Type</label>
              <select value={form.serviceType} onChange={e => setForm(p=>({...p,serviceType:e.target.value}))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{background: '#0b1120', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}}>
                <option value="standard">🚗 Standard</option>
                <option value="premium">⭐ Premium</option>
                <option value="xl">🚐 XL (Extra Space)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Payment Method</label>
              <select value={form.paymentMethod} onChange={e => setForm(p=>({...p,paymentMethod:e.target.value}))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{background: '#0b1120', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}}>
                <option value="cash">💵 Cash</option>
                <option value="kaspa">⚡ Kaspa (KAS)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Options</label>
              {[['accessibility','♿ Accessibility Requirements'],['luggage','🧳 Extra Luggage']].map(([k,l]) => (
                <label key={k} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form[k]} onChange={e => setForm(p=>({...p,[k]:e.target.checked}))} className="w-4 h-4 rounded" />
                  <span className="text-sm text-gray-300">{l}</span>
                </label>
              ))}
            </div>

            {estimatedFare && (
              <div className="p-3 rounded-xl" style={{background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)'}}>
                <p className="text-sm text-blue-300">💰 Estimated Fare: <strong className="text-white">{estimatedFare}</strong></p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={handleEstimateFare} className="flex-1 py-3 rounded-xl text-sm font-medium transition-colors" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#e5e7eb'}}>
                Estimate Fare
              </button>
              <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:-translate-y-0.5" style={{background: 'linear-gradient(135deg, #3b82f6, #2563eb)'}}>
                {loading ? 'Requesting...' : 'Request Ride 🚗'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

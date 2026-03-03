import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import { useLeafletMap } from '../../hooks/useLeafletMap'

export default function RequestAutonomousRide() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ from: '', to: '', avType: 'sedan', paymentMethod: 'kaspa' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const mapRef = useLeafletMap((container) => {
    const map = window.L.map(container).setView([35.1264, 33.4299], 10)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)
    const avPositions = [[35.185, 33.382], [35.155, 33.462], [35.118, 33.343]]
    avPositions.forEach(pos => {
      window.L.circleMarker(pos, { color: '#8b5cf6', fillColor: '#8b5cf6', fillOpacity: 0.8, radius: 8 })
        .bindPopup('🤖 Autonomous Vehicle - Available')
        .addTo(map)
    })
    return map
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.from || !form.to) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitted(true)
    setLoading(false)
    setTimeout(() => navigate('/passenger/request-status'), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <PageHeader title="Request Autonomous Ride 🤖" subtitle="Book a self-driving vehicle in your zone" />

      {submitted && (
        <div className="mb-6 p-4 rounded-xl flex items-center gap-3" style={{background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)'}}>
          <span className="text-2xl">🤖</span>
          <div>
            <p className="font-semibold text-white">AV En Route to Pickup!</p>
            <p className="text-sm text-gray-400">An autonomous vehicle has been dispatched to your location.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card style={{padding: 0, overflow: 'hidden'}}>
          <div ref={mapRef} style={{width: '100%', height: '500px', background: '#0b1929', borderRadius: '16px'}} />
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">🤖 Autonomous Ride Details</h3>
          <div className="p-3 rounded-xl mb-4 text-xs" style={{background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', color: '#c4b5fd'}}>
            Purple markers on the map show available autonomous vehicles near you.
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">📍 Pickup Location</label>
              <input value={form.from} onChange={e => setForm(p=>({...p,from:e.target.value}))} placeholder="Enter pickup address..." className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">🏁 Destination</label>
              <input value={form.to} onChange={e => setForm(p=>({...p,to:e.target.value}))} placeholder="Enter destination..." className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Vehicle Type</label>
              <select value={form.avType} onChange={e => setForm(p=>({...p,avType:e.target.value}))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{background: '#0b1120', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}}>
                <option value="sedan">🚗 AV Sedan</option>
                <option value="suv">🚙 AV SUV</option>
                <option value="minibus">🚐 AV Minibus</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Payment Method</label>
              <select value={form.paymentMethod} onChange={e => setForm(p=>({...p,paymentMethod:e.target.value}))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{background: '#0b1120', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}}>
                <option value="kaspa">⚡ Kaspa (KAS)</option>
                <option value="cash">💵 Cash</option>
              </select>
            </div>
            <button type="submit" disabled={loading || submitted} className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-70" style={{background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'}}>
              {loading ? 'Dispatching AV...' : submitted ? 'AV Dispatched! ✓' : 'Request Autonomous Ride 🤖'}
            </button>
          </form>
        </Card>
      </div>
    </div>
  )
}

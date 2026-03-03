import { useState } from 'react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import PageHeader from '../../components/PageHeader'

const initialVehicles = [
  { id: 1, make: 'Toyota', model: 'Corolla', year: '2021', plate: 'ABC-123', status: 'active', type: 'Sedan' },
  { id: 2, make: 'Hyundai', model: 'Tucson', year: '2020', plate: 'XYZ-456', status: 'inactive', type: 'SUV' },
]

export default function DriverVehicles() {
  const [vehicles, setVehicles] = useState(initialVehicles)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ make: '', model: '', year: '', plate: '', type: 'Sedan' })

  const handleAdd = (e) => {
    e.preventDefault()
    setVehicles(p => [...p, { id: Date.now(), ...form, status: 'inactive' }])
    setForm({ make: '', model: '', year: '', plate: '', type: 'Sedan' })
    setShowForm(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <PageHeader
        title="My Vehicles"
        subtitle="Manage your registered vehicles"
        actions={
          <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded-xl font-medium text-white text-sm" style={{background: '#3b82f6'}}>
            + Add Vehicle
          </button>
        }
      />

      {showForm && (
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Add New Vehicle</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[['make','Make','Toyota'],['model','Model','Corolla'],['year','Year','2021'],['plate','License Plate','ABC-123']].map(([k,l,ph]) => (
                <div key={k}>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">{l}</label>
                  <input value={form[k]} onChange={e => setForm(p=>({...p,[k]:e.target.value}))} placeholder={ph} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}} required />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Vehicle Type</label>
              <select value={form.type} onChange={e => setForm(p=>({...p,type:e.target.value}))} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{background: '#0b1120', border: '1px solid rgba(255,255,255,0.12)', color: 'white'}}>
                <option>Sedan</option><option>SUV</option><option>Hatchback</option><option>Van</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-5 py-2.5 rounded-xl font-medium text-white text-sm" style={{background: '#3b82f6'}}>Add Vehicle</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl font-medium text-sm" style={{background: 'rgba(255,255,255,0.08)', color: '#94a3b8'}}>Cancel</button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vehicles.map(v => (
          <div key={v.id} className="p-5 rounded-2xl" style={{background: 'rgba(11,17,32,0.7)', border: '1px solid #1e293b'}}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{background: 'rgba(59,130,246,0.15)'}}>🚗</div>
              <Badge variant={v.status === 'active' ? 'success' : 'default'}>{v.status}</Badge>
            </div>
            <h3 className="text-lg font-bold text-white">{v.year} {v.make} {v.model}</h3>
            <p className="text-sm text-gray-400 mt-1">Plate: <span className="text-white font-medium">{v.plate}</span></p>
            <p className="text-sm text-gray-400">Type: <span className="text-white">{v.type}</span></p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setVehicles(p => p.map(x => x.id === v.id ? {...x, status: x.status === 'active' ? 'inactive' : 'active'} : x))} className="text-xs px-3 py-1.5 rounded-lg transition-all" style={{background: v.status === 'active' ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)', color: v.status === 'active' ? '#f87171' : '#4ade80'}}>
                {v.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

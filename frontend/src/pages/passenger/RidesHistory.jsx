import { useState } from 'react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import PageHeader from '../../components/PageHeader'

const allRides = [
  { id: 1, type: 'driver', from: 'University of Cyprus', to: 'Nicosia Mall', date: '2024-01-15 14:30', status: 'completed', fare: '€4.50', driver: 'Michael K.' },
  { id: 2, type: 'autonomous', from: 'City Center', to: 'Larnaca Airport', date: '2024-01-14 09:00', status: 'completed', fare: '€12.00', driver: 'AV Unit #3' },
  { id: 3, type: 'carshare', from: 'Limassol Marina', to: 'Paphos Old Town', date: '2024-01-12 11:00', status: 'completed', fare: '€35.00', driver: 'Self-drive' },
  { id: 4, type: 'driver', from: 'Makariou Ave', to: 'Engomi', date: '2024-01-10 18:45', status: 'completed', fare: '€5.20', driver: 'George P.' },
  { id: 5, type: 'driver', from: 'Nicosia Bus Station', to: 'Home', date: '2024-01-08 20:10', status: 'completed', fare: '€6.00', driver: 'Stavros M.' },
  { id: 6, type: 'autonomous', from: 'Mall of Cyprus', to: 'Strovolos', date: '2024-01-05 16:20', status: 'completed', fare: '€8.50', driver: 'AV Unit #1' },
  { id: 7, type: 'carshare', from: 'Nicosia', to: 'Ayia Napa', date: '2023-12-28 10:00', status: 'completed', fare: '€55.00', driver: 'Self-drive' },
  { id: 8, type: 'driver', from: 'Work', to: 'Supermarket', date: '2023-12-22 17:30', status: 'cancelled', fare: '€0.00', driver: '-' },
]

const typeIcon = { driver: '🚗', autonomous: '🤖', carshare: '🔑' }
const typeLabel = { driver: 'Driver', autonomous: 'Autonomous', carshare: 'CarShare' }
const typeColor = { driver: '#3b82f6', autonomous: '#8b5cf6', carshare: '#f97316' }

export default function RidesHistory() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? allRides : allRides.filter(r => r.type === filter)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <PageHeader title="Rides History" subtitle="All your past trips in one place" />

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[['all','All Rides'],['driver','Driver'],['autonomous','Autonomous'],['carshare','CarShare']].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} className="px-4 py-2 rounded-xl text-sm font-medium transition-all" style={{
            background: filter === val ? '#3b82f6' : 'rgba(255,255,255,0.05)',
            color: filter === val ? 'white' : '#94a3b8',
            border: `1px solid ${filter === val ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`,
          }}>
            {label}
          </button>
        ))}
      </div>

      <Card style={{padding: 0}}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{borderBottom: '1px solid #1e293b'}}>
                {['Type','Date','Route','Driver','Fare','Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(ride => (
                <tr key={ride.id} className="transition-colors hover:bg-white/5" style={{borderBottom: '1px solid rgba(255,255,255,0.04)'}}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{typeIcon[ride.type]}</span>
                      <span className="text-xs font-medium" style={{color: typeColor[ride.type]}}>{typeLabel[ride.type]}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400 whitespace-nowrap">{ride.date}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-white">{ride.from}</div>
                    <div className="text-xs text-gray-400">→ {ride.to}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">{ride.driver}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-white">{ride.fare}</td>
                  <td className="px-4 py-3">
                    <Badge variant={ride.status === 'completed' ? 'success' : 'danger'}>{ride.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No rides found for this filter.</div>
          )}
        </div>
      </Card>
    </div>
  )
}

import { useState } from 'react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'

const payments = [
  { id: 1, date: '2024-01-15', desc: 'Driver Ride – Nicosia Mall', method: 'cash', amount: '€4.50', status: 'paid' },
  { id: 2, date: '2024-01-14', desc: 'Autonomous Ride – Airport', method: 'kaspa', amount: '€12.00', status: 'paid', kas: '120 KAS' },
  { id: 3, date: '2024-01-12', desc: 'CarShare – Paphos Trip', method: 'cash', amount: '€35.00', status: 'paid' },
  { id: 4, date: '2024-01-10', desc: 'Driver Ride – Engomi', method: 'kaspa', amount: '€5.20', status: 'paid', kas: '52 KAS' },
  { id: 5, date: '2024-01-05', desc: 'Autonomous Ride – Strovolos', method: 'kaspa', amount: '€8.50', status: 'paid', kas: '85 KAS' },
  { id: 6, date: '2023-12-28', desc: 'CarShare – Ayia Napa', method: 'cash', amount: '€55.00', status: 'paid' },
]

const kaspaAddress = 'kaspa:qp8re4y8yyshzrd66qr9p7jzqjr38s7nhqrj9yq8ksua7e3'

export default function PassengerPayments() {
  const [showKaspa, setShowKaspa] = useState(false)

  const total = payments.reduce((sum, p) => sum + parseFloat(p.amount.replace('€','')), 0)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <PageHeader title="Payments" subtitle="Your payment history and wallet" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon="💳" label="Total Spent" value={`€${total.toFixed(2)}`} color="#3b82f6" />
        <StatCard icon="⚡" label="Kaspa Payments" value="3" color="#49EACB" subtitle="Blockchain transactions" />
        <StatCard icon="💵" label="Cash Payments" value="3" color="#10b981" />
      </div>

      {/* Kaspa wallet */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">⚡ Kaspa Wallet</h3>
            <p className="text-sm text-gray-400">Pay with Kaspa cryptocurrency – zero middleman fees</p>
          </div>
          <button onClick={() => setShowKaspa(!showKaspa)} className="px-4 py-2 rounded-xl text-sm font-medium transition-all" style={{background: 'rgba(73,234,203,0.15)', color: '#49EACB', border: '1px solid rgba(73,234,203,0.3)'}}>
            {showKaspa ? 'Hide' : 'Show QR Code'}
          </button>
        </div>
        {showKaspa && (
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl" style={{background: 'rgba(73,234,203,0.05)', border: '1px solid rgba(73,234,203,0.15)'}}>
            {/* QR placeholder */}
            <div className="w-32 h-32 rounded-xl flex items-center justify-center flex-shrink-0" style={{background: 'white', padding: '8px'}}>
              <div className="w-full h-full rounded" style={{background: 'repeating-conic-gradient(#000 0% 25%, #fff 0% 50%) 0 0/10px 10px'}} />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Your Kaspa payment address:</p>
              <code className="text-xs break-all" style={{color: '#49EACB'}}>{kaspaAddress}</code>
              <p className="text-xs text-gray-500 mt-2">Share this address with drivers who accept Kaspa payments</p>
            </div>
          </div>
        )}
      </Card>

      {/* Payment history */}
      <Card style={{padding: 0}}>
        <div className="px-6 py-4" style={{borderBottom: '1px solid #1e293b'}}>
          <h3 className="text-lg font-semibold text-white">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{borderBottom: '1px solid #1e293b'}}>
                {['Date','Description','Method','Amount','Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors" style={{borderBottom: '1px solid rgba(255,255,255,0.04)'}}>
                  <td className="px-4 py-3 text-sm text-gray-400">{p.date}</td>
                  <td className="px-4 py-3 text-sm text-white">{p.desc}</td>
                  <td className="px-4 py-3">
                    {p.method === 'kaspa' ? (
                      <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{background: 'rgba(73,234,203,0.15)', color: '#49EACB'}}>⚡ Kaspa</span>
                    ) : (
                      <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{background: 'rgba(16,185,129,0.15)', color: '#10b981'}}>💵 Cash</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-white">{p.amount}</div>
                    {p.kas && <div className="text-xs text-gray-500">{p.kas}</div>}
                  </td>
                  <td className="px-4 py-3"><Badge variant="success">{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

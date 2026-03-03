import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'

export default function RequestStatus() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('searching') // searching | found | cancelled
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
    const timeout = setTimeout(() => {
      setStatus('found')
    }, 5000)
    return () => { clearInterval(interval); clearTimeout(timeout) }
  }, [])

  const handleCancel = () => {
    setStatus('cancelled')
    setTimeout(() => navigate('/passenger/dashboard'), 2000)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <PageHeader title="Ride Request" subtitle="Tracking your request in real time" />

      <Card className="text-center">
        {status === 'searching' && (
          <>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping" />
                <div className="absolute inset-2 rounded-full border-4 border-blue-500/40 animate-ping" style={{animationDelay: '0.3s'}} />
                <div className="absolute inset-0 flex items-center justify-center text-4xl">🚗</div>
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Searching for a Driver...</h2>
            <p className="text-gray-400 mb-2">Looking for the nearest available driver</p>
            <p className="text-sm text-gray-500 mb-6">Elapsed: {seconds}s</p>
            <div className="p-4 rounded-xl mb-6 text-left space-y-2" style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)'}}>
              <p className="text-sm text-gray-300"><span className="text-gray-500">From:</span> Pickup location</p>
              <p className="text-sm text-gray-300"><span className="text-gray-500">To:</span> Destination</p>
              <p className="text-sm text-gray-300"><span className="text-gray-500">Service:</span> Standard</p>
              <p className="text-sm text-gray-300"><span className="text-gray-500">Payment:</span> Cash</p>
            </div>
            <button onClick={handleCancel} className="px-6 py-3 rounded-xl font-medium text-sm transition-all" style={{background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)'}}>
              Cancel Request
            </button>
          </>
        )}

        {status === 'found' && (
          <>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-white mb-2">Driver Found!</h2>
            <p className="text-gray-400 mb-6">Your driver is on the way</p>
            <div className="flex items-center gap-4 p-4 rounded-xl mb-6" style={{background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)'}}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{background: 'rgba(255,255,255,0.1)'}}>👤</div>
              <div className="text-left">
                <p className="font-semibold text-white">Michael K.</p>
                <p className="text-sm text-gray-400">Toyota Corolla · ABC-123</p>
                <p className="text-sm text-green-400">⭐ 4.9 · ETA 3 min</p>
              </div>
            </div>
            <Link to="/passenger/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white" style={{background: '#3b82f6'}}>
              Back to Dashboard
            </Link>
          </>
        )}

        {status === 'cancelled' && (
          <>
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-white mb-2">Request Cancelled</h2>
            <p className="text-gray-400">Redirecting to dashboard...</p>
          </>
        )}
      </Card>
    </div>
  )
}

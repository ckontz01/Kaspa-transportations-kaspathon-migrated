import Card from '../../components/Card'
import Badge from '../../components/Badge'
import StatCard from '../../components/StatCard'
import PageHeader from '../../components/PageHeader'
import { useLeafletMap } from '../../hooks/useLeafletMap'

const activeTrips = [
  { id: 301, type: 'driver', passenger: 'Alex M.', driver: 'Michael K.', from: 'Strovolos', to: 'Nicosia Center', status: 'in_progress', lat: 35.175, lng: 33.395 },
  { id: 302, type: 'autonomous', passenger: 'Maria K.', driver: 'AV-002', from: 'Engomi', to: 'Lakatamia', status: 'in_progress', lat: 35.155, lng: 33.462 },
  { id: 303, type: 'carshare', passenger: 'John D.', driver: 'Self-drive', from: 'Larnaca', to: 'Ayia Napa', status: 'in_progress', lat: 34.92, lng: 33.63 },
]

const systemLogs = [
  { level: 'info', msg: 'Ride request #305 matched to driver Michael K.', time: '14:32:05' },
  { level: 'success', msg: 'Trip #301 payment confirmed: €5.50 (Cash)', time: '14:30:12' },
  { level: 'info', msg: 'AV Unit #2 dispatched to Engomi pickup', time: '14:28:55' },
  { level: 'warning', msg: 'Driver George P. reported delay on trip #298', time: '14:25:30' },
  { level: 'info', msg: 'New passenger registration: John D.', time: '14:20:00' },
  { level: 'success', msg: 'CarShare CS-003 returned to Limassol zone', time: '14:15:44' },
  { level: 'error', msg: 'AV Unit #6 scheduled maintenance overdue', time: '14:10:22' },
]

const logColors = { info: '#3b82f6', success: '#22c55e', warning: '#f59e0b', error: '#ef4444' }

export default function OperationsHub() {
  const mapRef = useLeafletMap((container) => {
    const map = window.L.map(container).setView([35.10, 33.40], 9)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)
    activeTrips.forEach(t => {
      const color = t.type === 'driver' ? '#3b82f6' : t.type === 'autonomous' ? '#8b5cf6' : '#f97316'
      window.L.circleMarker([t.lat, t.lng], { color, fillColor: color, fillOpacity: 0.8, radius: 10 })
        .bindPopup(`<b>Trip #${t.id}</b><br>Type: ${t.type}<br>Passenger: ${t.passenger}<br>${t.from} → ${t.to}`)
        .addTo(map)
    })
    return map
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageHeader title="Operations Hub 📊" subtitle="Real-time platform operations and monitoring" />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard icon="🚗" label="Active Trips" value="3" color="#3b82f6" />
        <StatCard icon="💰" label="Revenue Today" value="€284.50" color="#22c55e" />
        <StatCard icon="👥" label="Total Users" value="127" color="#8b5cf6" />
        <StatCard icon="⚡" label="Kaspa Txns" value="34" color="#49EACB" subtitle="Today" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Active trips map */}
        <Card style={{padding: 0, overflow: 'hidden'}}>
          <div className="px-4 py-3 text-sm font-semibold text-white" style={{borderBottom: '1px solid #1e293b'}}>
            🗺️ Active Trips Map
          </div>
          <div ref={mapRef} style={{width: '100%', height: '380px'}} />
        </Card>

        {/* System logs */}
        <Card style={{padding: 0}}>
          <div className="px-4 py-3 text-sm font-semibold text-white flex items-center gap-2" style={{borderBottom: '1px solid #1e293b'}}>
            <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
            System Logs (Live)
          </div>
          <div className="p-3 space-y-1 overflow-y-auto font-mono text-xs" style={{maxHeight: '368px'}}>
            {systemLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5 px-2 rounded" style={{background: `${logColors[log.level]}08`}}>
                <span className="flex-shrink-0" style={{color: logColors[log.level]}}>
                  {log.level === 'info' ? 'ℹ' : log.level === 'success' ? '✓' : log.level === 'warning' ? '⚠' : '✗'}
                </span>
                <span className="text-gray-400 flex-shrink-0">{log.time}</span>
                <span className="text-gray-300">{log.msg}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Active trips table */}
      <Card style={{padding: 0}}>
        <div className="px-6 py-4" style={{borderBottom: '1px solid #1e293b'}}>
          <h3 className="text-lg font-semibold text-white">Active Trips</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{borderBottom: '1px solid #1e293b'}}>
                {['ID','Type','Passenger','Driver','Route','Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeTrips.map(t => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors" style={{borderBottom: '1px solid rgba(255,255,255,0.04)'}}>
                  <td className="px-4 py-3 text-sm text-gray-400">#{t.id}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm">{t.type === 'driver' ? '🚗' : t.type === 'autonomous' ? '🤖' : '🔑'} {t.type}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-white">{t.passenger}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{t.driver}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{t.from} → {t.to}</td>
                  <td className="px-4 py-3"><Badge variant="info">In Progress</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

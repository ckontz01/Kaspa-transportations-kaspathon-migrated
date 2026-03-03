import Card from '../../components/Card'
import StatCard from '../../components/StatCard'
import PageHeader from '../../components/PageHeader'

const earningsHistory = [
  { date: '2024-01-15', trips: 4, amount: '€32.70', bonus: '€0' },
  { date: '2024-01-14', trips: 6, amount: '€48.50', bonus: '€5.00' },
  { date: '2024-01-13', trips: 3, amount: '€22.00', bonus: '€0' },
  { date: '2024-01-12', trips: 7, amount: '€58.90', bonus: '€5.00' },
  { date: '2024-01-11', trips: 5, amount: '€41.00', bonus: '€0' },
  { date: '2024-01-10', trips: 8, amount: '€67.20', bonus: '€10.00' },
  { date: '2024-01-09', trips: 2, amount: '€15.50', bonus: '€0' },
]

export default function DriverEarnings() {
  const weekTotal = earningsHistory.slice(0,7).reduce((sum, d) => sum + parseFloat(d.amount.replace('€','')), 0)
  const monthTotal = weekTotal * 4.2

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <PageHeader title="Earnings" subtitle="Track your income and performance" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon="💰" label="This Week" value={`€${weekTotal.toFixed(2)}`} color="#22c55e" subtitle="Last 7 days" />
        <StatCard icon="📅" label="This Month" value={`€${monthTotal.toFixed(0)}`} color="#3b82f6" subtitle="Estimated" />
        <StatCard icon="🏆" label="All Time" value="€2,450" color="#f59e0b" />
      </div>

      {/* Bonus card */}
      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{background: 'rgba(245,158,11,0.15)'}}>🎯</div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">Weekly Bonus Progress</h3>
            <p className="text-sm text-gray-400">Complete 40 trips this week for a €20 bonus</p>
            <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full" style={{width: '87.5%', background: 'linear-gradient(90deg, #f59e0b, #d97706)'}} />
            </div>
            <p className="text-xs text-gray-400 mt-1">35 / 40 trips completed</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold text-yellow-400">€20</div>
            <div className="text-xs text-gray-400">bonus</div>
          </div>
        </div>
      </Card>

      {/* Earnings history */}
      <Card style={{padding: 0}}>
        <div className="px-6 py-4" style={{borderBottom: '1px solid #1e293b'}}>
          <h3 className="text-lg font-semibold text-white">Daily Earnings History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{borderBottom: '1px solid #1e293b'}}>
                {['Date','Trips','Earnings','Bonus','Total'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {earningsHistory.map((row, i) => {
                const total = (parseFloat(row.amount.replace('€','')) + parseFloat(row.bonus.replace('€',''))).toFixed(2)
                return (
                  <tr key={i} className="hover:bg-white/5 transition-colors" style={{borderBottom: '1px solid rgba(255,255,255,0.04)'}}>
                    <td className="px-4 py-3 text-sm text-gray-300">{row.date}</td>
                    <td className="px-4 py-3 text-sm text-white">{row.trips}</td>
                    <td className="px-4 py-3 text-sm text-green-400 font-semibold">{row.amount}</td>
                    <td className="px-4 py-3 text-sm text-yellow-400">{row.bonus}</td>
                    <td className="px-4 py-3 text-sm font-bold text-white">€{total}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

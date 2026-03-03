export default function StatCard({ icon, label, value, color = '#3b82f6', subtitle }) {
  return (
    <div style={{background: 'rgba(11,17,32,0.7)', border: '1px solid #1e293b', borderRadius: '16px'}} className="p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div style={{background: `${color}20`, color, borderRadius: '12px'}} className="p-3 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  )
}

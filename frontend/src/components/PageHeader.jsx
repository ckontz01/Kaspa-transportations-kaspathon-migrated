export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
        {subtitle && <p className="text-gray-400">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  )
}

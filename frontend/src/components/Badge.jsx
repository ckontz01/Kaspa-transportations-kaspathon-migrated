const colors = {
  success: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
  warning: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
  danger: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
  info: { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6' },
  purple: { bg: 'rgba(139,92,246,0.15)', color: '#8b5cf6' },
  orange: { bg: 'rgba(249,115,22,0.15)', color: '#f97316' },
  default: { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8' },
}

export default function Badge({ children, variant = 'default' }) {
  const c = colors[variant] || colors.default
  return (
    <span style={{background: c.bg, color: c.color, padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600, display: 'inline-block'}}>
      {children}
    </span>
  )
}

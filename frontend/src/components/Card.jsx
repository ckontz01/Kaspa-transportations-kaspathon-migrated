export default function Card({ children, className = '', style = {} }) {
  return (
    <div
      style={{background: 'rgba(11,17,32,0.7)', border: '1px solid #1e293b', borderRadius: '16px', ...style}}
      className={`p-6 ${className}`}
    >
      {children}
    </div>
  )
}

import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{background: 'rgba(11,17,32,0.9)', borderTop: '1px solid #1e293b'}} className="py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚗</span>
            <span className="font-semibold text-white">Kaspa Transportations</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/login" className="hover:text-white transition-colors">Login</Link>
            <Link to="/register/passenger" className="hover:text-white transition-colors">Register</Link>
          </div>
          <div className="text-sm text-gray-500">
            Powered by <span style={{color: '#49EACB'}} className="font-semibold">Kaspa</span> Network
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} OSRH Kaspa Transportations. Open-source smart mobility platform.
        </div>
      </div>
    </footer>
  )
}

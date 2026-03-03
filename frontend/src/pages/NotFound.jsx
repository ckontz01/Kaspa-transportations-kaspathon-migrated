import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🚗</div>
        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8">Sorry, the page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5" style={{background: '#3b82f6'}}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

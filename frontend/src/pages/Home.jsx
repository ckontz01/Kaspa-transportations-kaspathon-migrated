import { Link } from 'react-router-dom'

const features = [
  { icon: '🎯', title: 'Easy Booking', desc: 'Request rides in seconds with our intuitive interface. Set your pickup and dropoff, choose your ride type, and you\'re on your way.', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
  { icon: '💰', title: 'Earn as a Driver', desc: 'Join our verified driver network. Set your own schedule, accept rides in your area, and earn money on your own terms.', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  { icon: '🤖', title: 'Autonomous Vehicles', desc: 'Experience the future of transportation with our autonomous vehicle fleet. Safe, efficient, and available within designated zones.', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
  { icon: '🔑', title: 'Car Sharing', desc: 'Rent vehicles by the minute, hour, or day. Pick up and drop off at convenient zones across Cyprus. Freedom to drive yourself.', color: '#f97316', bg: 'rgba(249,115,22,0.15)' },
  { icon: '🛡️', title: 'Safe & Verified', desc: 'All drivers undergo verification. Real-time tracking, secure payments, and 24/7 support ensure your peace of mind.', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
]

const steps = [
  { n: '1', title: 'Create Account', desc: 'Sign up as a passenger or driver in under a minute' },
  { n: '2', title: 'Request or Accept', desc: 'Passengers request rides, drivers accept and earn' },
  { n: '3', title: 'Track & Ride', desc: 'Real-time tracking from pickup to destination' },
  { n: '4', title: 'Rate & Pay', desc: 'Secure payment and feedback system' },
]

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-move" style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(59,130,246,0.15) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(16,185,129,0.1) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium" style={{background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa'}}>
            <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot inline-block" />
            One-Stop Ride-Hail
          </div>

          <h1 className="animate-fade-in-up animate-delay-1 text-5xl md:text-7xl font-extrabold leading-tight mb-4" style={{background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
            Your Ride,<br/>
            <span style={{background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Your Way</span>
          </h1>

          <p className="animate-fade-in-up animate-delay-2 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Experience seamless transportation with Kaspa Transportations! Connecting passengers with drivers,
            autonomous vehicles, and flexible car-sharing for safe, reliable, on-demand mobility.
          </p>

          <div className="animate-fade-in-up animate-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#register" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl text-white transition-all hover:-translate-y-0.5" style={{background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 4px 20px rgba(59,130,246,0.4)'}}>
              🚀 Get Started Free
            </a>
            <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl text-white transition-all hover:-translate-y-0.5 hover:bg-white/10" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)'}}>
              Sign In →
            </Link>
          </div>

          {/* Stats bar */}
          <div className="animate-fade-in-up animate-delay-4 flex flex-wrap justify-center gap-6 mt-12 pt-8" style={{borderTop: '1px solid rgba(255,255,255,0.08)'}}>
            <div className="text-center p-3 rounded-xl" style={{background: 'linear-gradient(135deg, #0a2e2a, #134e4a)', border: '2px solid #49EACB'}}>
              <div className="text-xl font-bold" style={{color: '#49EACB'}}>0%</div>
              <div className="text-xs font-semibold" style={{color: '#a7f3d0'}}>No Middleman Fee!</div>
            </div>
            {[{v:'24/7',l:'Availability'},{v:'🔒',l:'Secure Platform'},{v:'🚗',l:'Verified Drivers'},{v:'🤖',l:'Autonomous Ready'}].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-2xl font-bold text-white">{s.v}</div>
                <div className="text-xs text-gray-400 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Why Choose Kaspa?</h2>
          <p className="text-gray-400 text-lg">A complete ride-hailing ecosystem designed for smart mobility</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="group relative rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-2xl cursor-default" style={{background: 'rgba(11,17,32,0.6)', border: '1px solid #1e293b'}}>
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity opacity-0 group-hover:opacity-100" style={{background: `linear-gradient(90deg, ${f.color}, transparent)`}} />
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4" style={{background: f.bg}}>
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">How It Works</h2>
          <p className="text-gray-400 text-lg">Get moving in just a few simple steps</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(s => (
            <div key={s.n} className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4" style={{background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'}}>
                {s.n}
              </div>
              <h4 className="font-semibold text-white mb-2">{s.title}</h4>
              <p className="text-sm text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="register" className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Get Started?</h2>
          <p className="text-gray-400 text-lg">Join thousands of users already enjoying smart transportation</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🚕', title: 'Ride with Us', desc: 'Create your passenger account and start requesting rides today. Fast, reliable, and always available.', cta: 'Register as Passenger', to: '/register/passenger', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
            { icon: '🚗', title: 'Drive with Us', desc: 'Become a verified driver and start earning. Flexible hours, great earnings, and full support.', cta: 'Register as Driver', to: '/register/driver', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
            { icon: '🔑', title: 'Rent a Car', desc: 'Drive yourself with our car-sharing fleet. Register as a passenger and get approved for self-drive rentals.', cta: 'Get Started', to: '/register/passenger', color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
          ].map(c => (
            <div key={c.title} className="group relative rounded-2xl p-8 text-center transition-all hover:-translate-y-1" style={{background: 'linear-gradient(145deg, rgba(11,17,32,0.8), rgba(11,17,32,0.4))', border: '1px solid #1e293b'}}>
              <div className="absolute inset-0 rounded-2xl transition-opacity opacity-0 group-hover:opacity-100" style={{background: c.bg}} />
              <div className="relative z-10">
                <div className="rounded-full flex items-center justify-center text-4xl mx-auto mb-6" style={{background: c.bg, width: '72px', height: '72px'}}>
                  {c.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{c.desc}</p>
                <Link to={c.to} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105" style={{background: c.color}}>
                  {c.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Login banner */}
      <div className="py-12 px-4 text-center" style={{borderTop: '1px solid rgba(255,255,255,0.08)'}}>
        <p className="text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Sign in here</Link>
        </p>
      </div>
    </div>
  )
}

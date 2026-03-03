import { useState } from 'react'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'

const gdprOptions = [
  {
    icon: '📥',
    title: 'Download My Data',
    desc: 'Request a full export of all your personal data stored on our platform, including ride history, payments, and profile information.',
    buttonLabel: 'Request Data Export',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
  },
  {
    icon: '🗑️',
    title: 'Delete My Account',
    desc: 'Permanently delete your account and all associated data. This action cannot be undone. You will lose access to your ride history and saved preferences.',
    buttonLabel: 'Request Account Deletion',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.1)',
  },
  {
    icon: '📋',
    title: 'Request Explanation',
    desc: 'Request an explanation of how your data is processed, stored, and used. We will provide a detailed report within 30 days.',
    buttonLabel: 'Request Explanation',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
  },
]

export default function GdprRequest() {
  const [submitted, setSubmitted] = useState({})

  const handleRequest = (title) => {
    setSubmitted(p => ({...p, [title]: true}))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader title="Privacy & GDPR" subtitle="Manage your data rights under GDPR" />

      <Card className="mb-6">
        <div className="flex items-start gap-4">
          <span className="text-3xl">🔒</span>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Your Data Rights</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Under the General Data Protection Regulation (GDPR), you have the right to access, rectify, erase, and restrict the processing of your personal data.
              All requests will be processed within 30 days as required by law.
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {gdprOptions.map(opt => (
          <div key={opt.title} className="p-6 rounded-2xl" style={{background: 'rgba(11,17,32,0.7)', border: '1px solid #1e293b'}}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{background: opt.bg}}>
                {opt.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{opt.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{opt.desc}</p>
                {submitted[opt.title] ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)'}}>
                    ✓ Request submitted. You will be contacted within 30 days.
                  </div>
                ) : (
                  <button onClick={() => handleRequest(opt.title)} className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all hover:-translate-y-0.5" style={{background: opt.bg, color: opt.color, border: `1px solid ${opt.color}40`}}>
                    {opt.buttonLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'

export default function CarShareRegister() {
  const [form, setForm] = useState({ licenseFile: null, nationalIdFile: null, agreed: false })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.agreed) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="text-center max-w-md p-10 rounded-3xl" style={{background: 'rgba(11,17,32,0.7)', border: '1px solid rgba(255,255,255,0.08)'}}>
          <div className="text-6xl mb-4">⏳</div>
          <h1 className="text-2xl font-bold text-white mb-3">Application Submitted!</h1>
          <p className="text-gray-400 mb-6">Your CarShare registration is under review. An operator will verify your documents. You will receive access once approved.</p>
          <Link to="/passenger/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white" style={{background: '#f97316'}}>← Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <PageHeader title="CarShare Registration 🔑" subtitle="Apply for self-drive vehicle access" />

      <Card>
        <div className="p-4 rounded-xl mb-6" style={{background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)'}}>
          <p className="text-sm" style={{color: '#fdba74'}}>ℹ️ To access CarShare vehicles, you must submit your driving license and national ID for verification. Approval usually takes 1-2 business days.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* License upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">🪪 Driving License</label>
            <div className="border-2 border-dashed rounded-xl p-8 text-center transition-colors" style={{borderColor: form.licenseFile ? '#f97316' : 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.02)'}}>
              <div className="text-4xl mb-3">📄</div>
              {form.licenseFile ? (
                <p className="text-green-400 font-medium">✓ {form.licenseFile.name}</p>
              ) : (
                <>
                  <p className="text-gray-400 mb-2">Drag & drop or click to upload</p>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG – max 5MB</p>
                </>
              )}
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={e => setForm(p => ({...p, licenseFile: e.target.files[0] || null}))}
                className="opacity-0 cursor-pointer w-full h-8"
              />
            </div>
          </div>

          {/* National ID upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">🪪 National ID / Passport</label>
            <div className="border-2 border-dashed rounded-xl p-8 text-center transition-colors" style={{borderColor: form.nationalIdFile ? '#f97316' : 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.02)'}}>
              <div className="text-4xl mb-3">🪪</div>
              {form.nationalIdFile ? (
                <p className="text-green-400 font-medium">✓ {form.nationalIdFile.name}</p>
              ) : (
                <>
                  <p className="text-gray-400 mb-2">Drag & drop or click to upload</p>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG – max 5MB</p>
                </>
              )}
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={e => setForm(p => ({...p, nationalIdFile: e.target.files[0] || null}))}
                className="opacity-0 cursor-pointer w-full h-8"
              />
            </div>
          </div>

          {/* Agreement */}
          <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)'}}>
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={e => setForm(p => ({...p, agreed: e.target.checked}))}
              className="mt-0.5 w-4 h-4 rounded flex-shrink-0"
            />
            <span className="text-sm text-gray-300 leading-relaxed">
              I agree to the CarShare <span className="text-orange-400">Terms & Conditions</span> and confirm that all submitted documents are valid and authentic. I understand that providing false information may result in account suspension.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading || !form.agreed}
            className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{background: 'linear-gradient(135deg, #f97316, #ea580c)'}}
          >
            {loading ? 'Submitting...' : 'Submit CarShare Application →'}
          </button>
        </form>
      </Card>
    </div>
  )
}

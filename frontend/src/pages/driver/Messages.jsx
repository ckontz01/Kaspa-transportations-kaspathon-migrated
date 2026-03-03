import { useState } from 'react'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'

const conversations = [
  {
    id: 1,
    name: 'Alex M. (Passenger)',
    avatar: '🚕',
    lastMessage: 'I am at the main entrance.',
    time: '5 min ago',
    unread: 1,
    messages: [
      { from: 'them', text: 'Hello, I have requested a ride. I will be ready in 2 minutes.', time: '14:28' },
      { from: 'me', text: 'On my way! ETA 3 minutes.', time: '14:29' },
      { from: 'them', text: 'I am at the main entrance.', time: '14:31' },
    ]
  },
  {
    id: 2,
    name: 'Operator Support',
    avatar: '🛡️',
    lastMessage: 'Your account verification is complete!',
    time: '1 day ago',
    unread: 0,
    messages: [
      { from: 'them', text: 'Hello John, your documents are under review.', time: '09:00' },
      { from: 'me', text: 'Thank you! When will it be complete?', time: '09:05' },
      { from: 'them', text: 'Your account verification is complete!', time: '11:00' },
    ]
  },
]

export default function DriverMessages() {
  const [selected, setSelected] = useState(conversations[0])
  const [msgs, setMsgs] = useState(conversations[0].messages)
  const [newMsg, setNewMsg] = useState('')

  const selectConv = (conv) => {
    setSelected(conv)
    setMsgs(conv.messages)
    setNewMsg('')
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (!newMsg.trim()) return
    const msg = { from: 'me', text: newMsg, time: new Date().toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit'}) }
    setMsgs(p => [...p, msg])
    setNewMsg('')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <PageHeader title="Messages" subtitle="Chat with passengers and support" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden" style={{border: '1px solid #1e293b', height: '500px'}}>
        <div className="md:col-span-1 overflow-y-auto" style={{background: 'rgba(11,17,32,0.9)', borderRight: '1px solid #1e293b'}}>
          {conversations.map(conv => (
            <div key={conv.id} onClick={() => selectConv(conv)} className="flex items-center gap-3 p-4 cursor-pointer transition-colors" style={{background: selected.id === conv.id ? 'rgba(59,130,246,0.1)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{background: 'rgba(255,255,255,0.1)'}}>{conv.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white truncate">{conv.name}</span>
                  <span className="text-xs text-gray-500">{conv.time}</span>
                </div>
                <div className="text-xs text-gray-400 truncate">{conv.lastMessage}</div>
              </div>
              {conv.unread > 0 && <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{background: '#3b82f6'}}>{conv.unread}</span>}
            </div>
          ))}
        </div>

        <div className="md:col-span-2 flex flex-col" style={{background: 'rgba(11,17,32,0.7)'}}>
          <div className="flex items-center gap-3 px-4 py-3" style={{borderBottom: '1px solid #1e293b'}}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{background: 'rgba(255,255,255,0.1)'}}>{selected.avatar}</div>
            <span className="font-medium text-white">{selected.name}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-xs px-4 py-2 rounded-2xl text-sm" style={{
                  background: msg.from === 'me' ? '#3b82f6' : 'rgba(255,255,255,0.08)',
                  color: 'white',
                  borderRadius: msg.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                }}>
                  <p>{msg.text}</p>
                  <p className="text-xs mt-1 opacity-60">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="flex gap-3 p-4" style={{borderTop: '1px solid #1e293b'}}>
            <input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-2 rounded-xl text-sm outline-none" style={{background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white'}} />
            <button type="submit" className="px-4 py-2 rounded-xl font-medium text-white text-sm" style={{background: '#3b82f6'}}>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

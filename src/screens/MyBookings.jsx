import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronDown, MapPin, Clock, Users, MessageSquare, X, AlertTriangle, Send, Edit3 } from 'lucide-react'

const BOOKING = {
  id: 'OL-LF2603',
  ref: 'DJ5098',
  home: 'Luleå HF',
  away: 'Färjestad BK',
  league: 'SHL',
  date: 'Sat 15 Mar 2026',
  time: '15.15 – 18.00',
  guests: 4,
  location: 'O\'Learys Norrköping',
  address: 'Drottninggatan 14, Norrköping',
  phone: '011-12 34 56',
  email: 'booking@olearys.se',
  items: [
    { name: 'Table reservation', time: 'Flexible', price: 0 },
    { name: 'Go-kart', time: '16.00 (2h)', price: 70 },
  ],
  status: 'confirmed',
}

function CommentSheet({ onClose, onSend }) {
  const [msg, setMsg] = useState('')
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white w-full max-w-[393px] rounded-t-2xl p-5 pb-8 animate-[slideUp_300ms_ease-out]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-brand-black">Leave a comment</h3>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-gray-100 cursor-pointer"><X size={16} /></button>
        </div>
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Write your message to the venue..." rows={3} className="w-full rounded-xl border border-brand-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-primary resize-none" />
        <button onClick={() => { onSend(msg); onClose() }} disabled={!msg.trim()} className={`w-full mt-3 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.97] ${msg.trim() ? 'bg-green-primary text-white' : 'bg-brand-gray-100 text-brand-gray-500'}`}>
          <Send size={16} /> Send comment
        </button>
      </div>
    </div>
  )
}

function CancelSheet({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white w-full max-w-[393px] rounded-t-2xl p-5 pb-8 animate-[slideUp_300ms_ease-out]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-brand-black">Cancel booking</h3>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-gray-100 cursor-pointer"><X size={16} /></button>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 mb-4">
          <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-brand-black">Are you sure?</p>
            <p className="text-xs text-brand-gray-500 mt-0.5">This will cancel your reservation for {BOOKING.home} vs {BOOKING.away} on {BOOKING.date}. This action cannot be undone.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3.5 rounded-2xl border border-brand-gray-300 text-sm font-bold text-brand-black cursor-pointer">Keep booking</button>
          <button onClick={onConfirm} className="flex-1 py-3.5 rounded-2xl bg-red-500 text-white text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform">Cancel booking</button>
        </div>
      </div>
    </div>
  )
}

function ModifySheet({ guests, onClose, onSave }) {
  const [newGuests, setNewGuests] = useState(guests)
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white w-full max-w-[393px] rounded-t-2xl p-5 pb-8 animate-[slideUp_300ms_ease-out]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-brand-black">Modify booking</h3>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-gray-100 cursor-pointer"><X size={16} /></button>
        </div>
        <p className="text-sm text-brand-gray-500 mb-4">Request a change in the number of guests. The venue will confirm the change.</p>
        <div className="flex items-center justify-between p-4 rounded-xl border border-brand-gray-300">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-green-primary" />
            <span className="text-sm font-medium text-brand-black">Number of guests</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setNewGuests(Math.max(1, newGuests - 1))} className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer text-brand-black font-bold">−</button>
            <span className="text-lg font-bold text-brand-black w-6 text-center">{newGuests}</span>
            <button onClick={() => setNewGuests(newGuests + 1)} className="w-9 h-9 rounded-full bg-green-primary flex items-center justify-center cursor-pointer text-white font-bold">+</button>
          </div>
        </div>
        {newGuests !== guests && (
          <p className="text-xs text-green-primary mt-2">Changing from {guests} to {newGuests} guests</p>
        )}
        <button
          onClick={() => { onSave(newGuests); onClose() }}
          disabled={newGuests === guests}
          className={`w-full mt-4 py-3.5 rounded-2xl text-sm font-bold cursor-pointer transition-all active:scale-[0.97] ${newGuests !== guests ? 'bg-green-primary text-white' : 'bg-brand-gray-100 text-brand-gray-500'}`}
        >
          Request change
        </button>
      </div>
    </div>
  )
}

export default function MyBookings() {
  const navigate = useNavigate()
  const [showDetails, setShowDetails] = useState(true)
  const [showComment, setShowComment] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  const [showModify, setShowModify] = useState(false)
  const [guests, setGuests] = useState(BOOKING.guests)
  const [cancelled, setCancelled] = useState(false)
  const [commentSent, setCommentSent] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  if (cancelled) {
    return (
      <div className="flex flex-col items-center justify-center px-8 pt-20">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <X size={28} className="text-red-500" />
        </div>
        <h2 className="text-lg font-bold text-brand-black">Booking cancelled</h2>
        <p className="text-sm text-brand-gray-500 text-center mt-1">Your reservation for {BOOKING.home} vs {BOOKING.away} has been cancelled.</p>
        <button onClick={() => navigate('/book')} className="mt-6 px-8 py-3.5 rounded-2xl bg-brand-black text-white font-bold text-sm cursor-pointer active:scale-[0.97] transition-transform">Back to bookings</button>
      </div>
    )
  }

  return (
    <div className="pb-4 relative">
      {/* Toast */}
      {toast && (
        <div className="absolute top-2 left-4 right-4 z-50 bg-green-primary text-white rounded-xl px-4 py-3 text-sm font-medium shadow-lg animate-[fadeIn_200ms_ease-out]">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <button onClick={() => navigate('/book')} className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2" aria-label="Go back">
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
        <h1 className="text-sm font-bold text-brand-black uppercase tracking-wide">My Bookings</h1>
      </div>

      {/* Booking card */}
      <div className="mx-4 border border-brand-gray-300 rounded-2xl overflow-hidden">
        {/* Hero */}
        <div className="relative h-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a2a 0%, #0d1f15 100%)' }}>
          <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 30%, #2d5a3d 0%, transparent 60%)' }} />
          <div className="relative flex items-center justify-between h-full px-5">
            <div>
              <p className="text-white/50 text-[10px] tracking-wider uppercase">{BOOKING.league}</p>
              <p className="text-white font-bold text-base mt-0.5">{BOOKING.home} vs {BOOKING.away}</p>
              <p className="text-white/60 text-xs mt-0.5">{BOOKING.date}</p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-green-primary/80">
              <span className="text-white text-[10px] font-bold uppercase">Confirmed</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-green-primary" />
            <span className="text-sm text-brand-black">{BOOKING.time}</span>
          </div>
          <div className="flex items-center gap-3">
            <Users size={16} className="text-green-primary" />
            <span className="text-sm text-brand-black">{guests} guests</span>
            <button onClick={() => setShowModify(true)} className="ml-auto text-xs text-green-primary font-medium cursor-pointer flex items-center gap-1">
              <Edit3 size={12} /> Change
            </button>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-green-primary" />
            <div>
              <span className="text-sm text-brand-black">{BOOKING.location}</span>
              <p className="text-xs text-brand-gray-500">{BOOKING.address}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="border-t border-brand-gray-100">
          <button onClick={() => setShowDetails(!showDetails)} className="w-full px-4 py-3 flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium text-brand-black">Booking details</span>
            <ChevronDown size={16} className={`text-brand-gray-500 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </button>
          {showDetails && (
            <div className="px-4 pb-4 space-y-2">
              {BOOKING.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-brand-gray-100 last:border-0">
                  <div>
                    <p className="text-sm text-brand-black">{item.name}</p>
                    <p className="text-xs text-brand-gray-500">{item.time}</p>
                  </div>
                  <span className="text-sm font-semibold text-brand-black">€{item.price}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2">
                <span className="text-sm font-bold text-brand-black">Total</span>
                <span className="text-sm font-bold text-brand-black">€{BOOKING.items.reduce((s, i) => s + i.price, 0)}</span>
              </div>
              <p className="text-xs text-brand-gray-500 pt-1">Ref: {BOOKING.ref}</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 mt-4 space-y-2">
        <button onClick={() => setShowComment(true)} className="w-full py-3 rounded-xl border border-brand-gray-300 text-sm font-semibold text-brand-black cursor-pointer flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
          <MessageSquare size={16} /> Leave a comment
        </button>
        <button onClick={() => setShowModify(true)} className="w-full py-3 rounded-xl border border-brand-gray-300 text-sm font-semibold text-brand-black cursor-pointer flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
          <Edit3 size={16} /> Modify booking
        </button>
        <button onClick={() => setShowCancel(true)} className="w-full py-3 rounded-xl border border-red-200 text-sm font-semibold text-red-500 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
          <X size={16} /> Cancel booking
        </button>
      </div>

      {/* Contact */}
      <div className="px-4 mt-5">
        <p className="text-xs text-brand-gray-500">Need help? Contact the venue:</p>
        <p className="text-xs text-green-primary mt-1">{BOOKING.phone} · {BOOKING.email}</p>
      </div>

      {/* Sheets */}
      {showComment && <CommentSheet onClose={() => setShowComment(false)} onSend={(msg) => { setCommentSent(true); showToast('Comment sent to the venue!') }} />}
      {showCancel && <CancelSheet onClose={() => setShowCancel(false)} onConfirm={() => { setShowCancel(false); setCancelled(true) }} />}
      {showModify && <ModifySheet guests={guests} onClose={() => setShowModify(false)} onSave={(n) => { setGuests(n); showToast(`Guest change requested: ${n} guests`) }} />}
    </div>
  )
}

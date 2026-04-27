import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronDown, MapPin, Clock, Users, MessageSquare, X, AlertTriangle, Send, Edit3, Cake, CalendarDays } from 'lucide-react'

const BOOKINGS = [
  {
    id: 'OL-LF2603',
    ref: 'DJ5098',
    type: 'match',
    home: 'Luleå HF',
    away: 'Färjestad BK',
    league: 'SHL',
    title: 'Luleå HF vs Färjestad BK',
    date: 'Sat 15 Mar 2026',
    time: '15.15 – 18.00',
    guests: 4,
    location: "O'Learys Norrköping",
    address: 'Drottninggatan 14, Norrköping',
    phone: '011-12 34 56',
    email: 'booking@olearys.se',
    items: [
      { name: 'Table reservation', time: 'Flexible', price: 0 },
      { name: 'Go-kart', time: '16.00 (2h)', price: 70 },
    ],
    status: 'confirmed',
    tab: 'upcoming',
  },
  {
    id: 'OL-BD2803',
    ref: 'BD7712',
    type: 'party',
    title: 'Birthday Party',
    subtitle: 'Party Package',
    date: 'Sat 28 Mar 2026',
    time: '18.00 – 22.00',
    guests: 10,
    location: "O'Learys Norrköping",
    address: 'Drottninggatan 14, Norrköping',
    phone: '011-12 34 56',
    email: 'booking@olearys.se',
    items: [
      { name: 'Party Package (10 guests)', time: '18.00 – 22.00', price: 4590 },
      { name: 'Bowling (2 lanes)', time: '19.00 (100 min)', price: 898 },
    ],
    status: 'pending',
    tab: 'requests',
  },
]

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', bg: 'bg-green-primary/80', text: 'text-white' },
  pending: { label: 'Pending', bg: 'bg-amber-400/90', text: 'text-white' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-400/80', text: 'text-white' },
}

function CommentSheet({ onClose, onSend }) {
  const [msg, setMsg] = useState('')
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white w-full max-w-[430px] rounded-t-2xl p-5 pb-8 animate-[slideUp_300ms_ease-out]" onClick={(e) => e.stopPropagation()}>
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

function CancelSheet({ booking, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white w-full max-w-[430px] rounded-t-2xl p-5 pb-8 animate-[slideUp_300ms_ease-out]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-brand-black">{booking.status === 'pending' ? 'Withdraw request' : 'Cancel booking'}</h3>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-gray-100 cursor-pointer"><X size={16} /></button>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 mb-4">
          <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-brand-black">Are you sure?</p>
            <p className="text-xs text-brand-gray-500 mt-0.5">
              {booking.status === 'pending'
                ? `This will withdraw your request for ${booking.title} on ${booking.date}. This action cannot be undone.`
                : `This will cancel your reservation for ${booking.title} on ${booking.date}. This action cannot be undone.`
              }
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3.5 rounded-2xl border border-brand-gray-300 text-sm font-bold text-brand-black cursor-pointer">Keep it</button>
          <button onClick={onConfirm} className="flex-1 py-3.5 rounded-2xl bg-red-500 text-white text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform">
            {booking.status === 'pending' ? 'Withdraw' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ModifySheet({ guests, onClose, onSave }) {
  const [newGuests, setNewGuests] = useState(guests)
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white w-full max-w-[430px] rounded-t-2xl p-5 pb-8 animate-[slideUp_300ms_ease-out]" onClick={(e) => e.stopPropagation()}>
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
            <button onClick={() => setNewGuests(Math.max(1, newGuests - 1))} className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer text-brand-black font-bold">-</button>
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

function BookingCard({ booking, guestCount, onComment, onModify, onCancel }) {
  const [showDetails, setShowDetails] = useState(false)
  const statusCfg = STATUS_CONFIG[booking.status]
  const isMatch = booking.type === 'match'
  const isPending = booking.status === 'pending'

  return (
    <div className="mx-4 border border-brand-gray-300 rounded-2xl overflow-hidden">
      {/* Hero */}
      <div
        className="relative h-28 overflow-hidden"
        style={{
          background: isMatch
            ? 'linear-gradient(135deg, #1a3a2a 0%, #0d1f15 100%)'
            : 'linear-gradient(135deg, #7C5CFC 0%, #6a4ae8 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
        <div className="relative flex items-center justify-between h-full px-5">
          <div>
            {isMatch && <p className="text-white/50 text-[10px] tracking-wider uppercase">{booking.league}</p>}
            {!isMatch && (
              <div className="flex items-center gap-2 mb-1">
                <Cake size={14} className="text-white/60" />
                <p className="text-white/50 text-[10px] tracking-wider uppercase">{booking.subtitle}</p>
              </div>
            )}
            <p className="text-white font-bold text-base mt-0.5">{booking.title}</p>
            <p className="text-white/60 text-xs mt-0.5">{booking.date}</p>
          </div>
          <div className={`px-3 py-1.5 rounded-full ${statusCfg.bg}`}>
            <span className={`${statusCfg.text} text-[10px] font-bold uppercase`}>{statusCfg.label}</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-green-primary" />
          <span className="text-sm text-brand-black">{booking.time}</span>
        </div>
        <div className="flex items-center gap-3">
          <Users size={16} className="text-green-primary" />
          <span className="text-sm text-brand-black">{guestCount} guests</span>
          {!isPending && (
            <button onClick={onModify} className="ml-auto text-xs text-green-primary font-medium cursor-pointer flex items-center gap-1">
              <Edit3 size={12} /> Change
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-green-primary" />
          <div>
            <span className="text-sm text-brand-black">{booking.location}</span>
            <p className="text-xs text-brand-gray-500">{booking.address}</p>
          </div>
        </div>
      </div>

      {/* Pending info banner */}
      {isPending && (
        <div className="mx-4 mb-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
          <div className="flex items-start gap-2">
            <CalendarDays size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">This is a booking request. We'll confirm availability within 24 hours.</p>
          </div>
        </div>
      )}

      {/* Details */}
      <div className="border-t border-brand-gray-100">
        <button onClick={() => setShowDetails(!showDetails)} className="w-full px-4 py-3 flex items-center justify-between cursor-pointer">
          <span className="text-sm font-medium text-brand-black">Booking details</span>
          <ChevronDown size={16} className={`text-brand-gray-500 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
        </button>
        {showDetails && (
          <div className="px-4 pb-4 space-y-2">
            {booking.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-brand-gray-100 last:border-0">
                <div>
                  <p className="text-sm text-brand-black">{item.name}</p>
                  <p className="text-xs text-brand-gray-500">{item.time}</p>
                </div>
                <span className="text-sm font-semibold text-brand-black">{item.price} kr</span>
              </div>
            ))}
            <div className="flex justify-between pt-2">
              <span className="text-sm font-bold text-brand-black">Total</span>
              <span className="text-sm font-bold text-brand-black">{booking.items.reduce((s, i) => s + i.price, 0)} kr</span>
            </div>
            <p className="text-xs text-brand-gray-500 pt-1">Ref: {booking.ref}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 space-y-2">
        <button onClick={onComment} className="w-full py-3 rounded-xl border border-brand-gray-300 text-sm font-semibold text-brand-black cursor-pointer flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
          <MessageSquare size={16} /> Leave a comment
        </button>
        {!isPending && (
          <button onClick={onModify} className="w-full py-3 rounded-xl border border-brand-gray-300 text-sm font-semibold text-brand-black cursor-pointer flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
            <Edit3 size={16} /> Modify booking
          </button>
        )}
        <button onClick={onCancel} className="w-full py-3 rounded-xl border border-red-200 text-sm font-semibold text-red-500 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
          <X size={16} /> {isPending ? 'Withdraw request' : 'Cancel booking'}
        </button>
      </div>
    </div>
  )
}

export default function MyBookings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('upcoming')
  const [showComment, setShowComment] = useState(null)
  const [showCancel, setShowCancel] = useState(null)
  const [showModify, setShowModify] = useState(null)
  const [guestOverrides, setGuestOverrides] = useState({})
  const [cancelledIds, setCancelledIds] = useState([])
  const [toast, setToast] = useState(null)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const visibleBookings = BOOKINGS.filter(
    (b) => !cancelledIds.includes(b.id) && b.tab === activeTab
  )

  const upcomingCount = BOOKINGS.filter((b) => !cancelledIds.includes(b.id) && b.tab === 'upcoming').length
  const requestsCount = BOOKINGS.filter((b) => !cancelledIds.includes(b.id) && b.tab === 'requests').length

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

      {/* Tabs */}
      <div className="flex mx-4 mb-4 bg-brand-gray-100 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'upcoming' ? 'bg-white text-brand-black shadow-sm' : 'text-brand-gray-500'
          }`}
        >
          Upcoming {upcomingCount > 0 && <span className="ml-1 w-5 h-5 inline-flex items-center justify-center rounded-full bg-green-primary text-white text-[10px] font-bold">{upcomingCount}</span>}
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'requests' ? 'bg-white text-brand-black shadow-sm' : 'text-brand-gray-500'
          }`}
        >
          Requests {requestsCount > 0 && <span className="ml-1 w-5 h-5 inline-flex items-center justify-center rounded-full bg-amber-400 text-white text-[10px] font-bold">{requestsCount}</span>}
        </button>
      </div>

      {/* Booking cards */}
      {visibleBookings.length > 0 ? (
        <div className="space-y-4">
          {visibleBookings.map((booking) => {
            const guestCount = guestOverrides[booking.id] ?? booking.guests
            return (
              <BookingCard
                key={booking.id}
                booking={booking}
                guestCount={guestCount}
                onComment={() => setShowComment(booking)}
                onModify={() => setShowModify(booking)}
                onCancel={() => setShowCancel(booking)}
              />
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
          <CalendarDays size={32} className="text-brand-gray-300 mb-3" />
          <p className="text-sm text-brand-gray-500">
            {activeTab === 'upcoming' ? 'No upcoming bookings' : 'No pending requests'}
          </p>
          <button onClick={() => navigate('/book')} className="mt-4 text-sm text-green-primary font-semibold cursor-pointer">
            Make a booking
          </button>
        </div>
      )}

      {/* Contact */}
      {visibleBookings.length > 0 && (
        <div className="px-4 mt-5">
          <p className="text-xs text-brand-gray-500">Need help? Contact the venue:</p>
          <p className="text-xs text-green-primary mt-1">{visibleBookings[0].phone} · {visibleBookings[0].email}</p>
        </div>
      )}

      {/* Sheets */}
      {showComment && (
        <CommentSheet
          onClose={() => setShowComment(null)}
          onSend={() => showToast('Comment sent to the venue!')}
        />
      )}
      {showCancel && (
        <CancelSheet
          booking={showCancel}
          onClose={() => setShowCancel(null)}
          onConfirm={() => {
            setCancelledIds((ids) => [...ids, showCancel.id])
            setShowCancel(null)
            showToast(showCancel.status === 'pending' ? 'Request withdrawn' : 'Booking cancelled')
          }}
        />
      )}
      {showModify && (
        <ModifySheet
          guests={guestOverrides[showModify.id] ?? showModify.guests}
          onClose={() => setShowModify(null)}
          onSave={(n) => {
            setGuestOverrides((prev) => ({ ...prev, [showModify.id]: n }))
            showToast(`Guest change requested: ${n} guests`)
          }}
        />
      )}
    </div>
  )
}

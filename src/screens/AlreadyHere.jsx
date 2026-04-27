import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin, ShoppingBag, Gamepad2, Trophy, X, ChevronRight,
  QrCode, Search, Crosshair, Bell, Check, Send, Timer
} from 'lucide-react'

/* ---------- Custom SoccerBall icon (not in Lucide) ---------- */
function SoccerBall({ size = 22, className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="12,7 16,10 14.5,14.5 9.5,14.5 8,10" />
      <line x1="12" y1="7" x2="12" y2="2.5" />
      <line x1="16" y1="10" x2="20" y2="8.5" />
      <line x1="14.5" y1="14.5" x2="17" y2="18.5" />
      <line x1="9.5" y1="14.5" x2="7" y2="18.5" />
      <line x1="8" y1="10" x2="4" y2="8.5" />
    </svg>
  )
}

/* ---------- Data ---------- */
const VENUES = [
  { id: 'norrkoping', name: 'Norrköping', sub: 'Drottninggatan 38', distance: '0.2 km', open: true },
  { id: 'ostermalm', name: 'Stockholm — Östermalm', sub: 'Stureplan 4', distance: '212 km', open: true },
  { id: 'gothenburg', name: 'Göteborg', sub: 'Kungsportsavenyen 5', distance: '361 km', open: true },
  { id: 'malmo', name: 'Malmö', sub: 'Stortorget 27', distance: '518 km', open: true },
  { id: 'lulea', name: 'Luleå', sub: 'Storgatan 53', distance: '1100 km', open: false },
  { id: 'uppsala', name: 'Uppsala', sub: 'Forumtorget 2', distance: '160 km', open: true },
  { id: 'vasteras', name: 'Västerås', sub: 'Stora Gatan 16', distance: '255 km', open: true },
  { id: 'helsingborg', name: 'Helsingborg', sub: 'Kullagatan 35', distance: '470 km', open: true },
]

const FRIENDS = [
  { id: 'sofia', name: 'Sofia', initials: 'SL', color: '#ffb088', sub: 'Online · 2 min ago' },
  { id: 'erik', name: 'Erik', initials: 'EH', color: '#88c5ff', sub: 'Online now' },
  { id: 'maja', name: 'Maja', initials: 'MJ', color: '#a3e08c', sub: '3 min ago' },
  { id: 'lukas', name: 'Lukas', initials: 'LK', color: '#d6a3ff', sub: 'Online now' },
  { id: 'noah', name: 'Noah', initials: 'NO', color: '#ffd66b', sub: '12 min ago' },
  { id: 'liv', name: 'Liv', initials: 'LV', color: '#ff9aa2', sub: 'Online now' },
]

const FEATURES = [
  { id: 'order', label: 'Order', sub: 'Food & drinks straight to your table', Icon: ShoppingBag, action: 'sheet' },
  { id: 'play', label: 'Play a game', sub: '3 Kamp · 5 Kamp · Bowling Bingo', Icon: Gamepad2, path: '/play' },
  { id: 'predict', label: 'Predict the match', sub: 'Predict correctly + summon your squad to win rewards', Icon: Trophy, path: '/predict' },
  { id: 'larry', label: 'Score on Larry', sub: 'How many penalty goals can you score on Larry?', Icon: SoccerBall },
]

/* ---------- Location picker sheet ---------- */
function LocationPickerSheet({ onClose, onSelect, current }) {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return VENUES
    return VENUES.filter((v) => v.name.toLowerCase().includes(s) || v.sub.toLowerCase().includes(s))
  }, [q])

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white w-full max-w-[430px] rounded-t-[28px] animate-[slideUp_320ms_cubic-bezier(0.2,0.9,0.3,1.05)] flex flex-col"
        style={{ height: '85%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 pt-4 pb-3 flex-shrink-0">
          <div className="mx-auto w-10 h-1 rounded-full bg-brand-gray-300 mb-3" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-brand-black">Which O'Learys?</h2>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer">
              <X size={16} />
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-gray-300 focus-within:border-green-primary transition-colors">
            <Search size={16} className="text-brand-gray-500" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search city or street"
              className="w-full text-sm font-medium text-brand-black placeholder-brand-gray-500 outline-none bg-transparent"
            />
            {q && (
              <button onClick={() => setQ('')} className="text-xs text-brand-gray-500 font-semibold cursor-pointer">
                Clear
              </button>
            )}
          </div>

          <button className="mt-2 w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gray-100 text-left cursor-pointer">
            <Crosshair size={16} className="text-green-primary" />
            <span className="text-sm font-semibold text-brand-black">Use my location</span>
            <span className="ml-auto text-[11px] text-green-primary font-semibold">Nearest: Norrköping · 0.2 km</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-6">
          <p className="text-[10px] font-semibold tracking-wider text-brand-gray-500 uppercase mb-2 mt-1">Nearby</p>
          <div className="space-y-2">
            {filtered.map((v) => {
              const sel = current === v.id
              return (
                <button
                  key={v.id}
                  onClick={() => v.open && onSelect(v.id)}
                  disabled={!v.open}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all active:scale-[0.99] cursor-pointer"
                  style={{
                    border: sel ? '2px solid #2d9b87' : '1px solid #e0e0e0',
                    backgroundColor: sel ? 'rgba(45,155,135,0.06)' : '#ffffff',
                    opacity: v.open ? 1 : 0.55,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: sel ? '#2d9b87' : '#f5f5f5' }}
                  >
                    <MapPin size={16} className={sel ? 'text-white' : 'text-brand-gray-500'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-brand-black text-[14px] leading-tight truncate">{v.name}</p>
                      {!v.open && (
                        <span className="text-[9px] font-bold tracking-wider text-brand-gray-500 uppercase px-1.5 py-0.5 rounded bg-brand-gray-100">
                          Closed
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-brand-gray-500 truncate">{v.sub} · {v.distance}</p>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      border: sel ? 'none' : '1.5px solid #c4c4c4',
                      backgroundColor: sel ? '#2d9b87' : 'transparent',
                    }}
                  >
                    {sel && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                </button>
              )
            })}
            {filtered.length === 0 && (
              <div className="text-center py-8 text-sm text-brand-gray-500">No venues match "{q}"</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Order unavailable sheet ---------- */
function OrderUnavailableSheet({ onClose }) {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white w-full max-w-[430px] rounded-t-[28px] p-6 pb-8 animate-[slideUp_320ms_cubic-bezier(0.2,0.9,0.3,1.05)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto w-10 h-1 rounded-full bg-brand-gray-300 mb-4" />
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-brand-black">Order unavailable</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer">
            <X size={16} />
          </button>
        </div>
        <div className="flex flex-col items-center text-center py-3">
          <div className="w-14 h-14 rounded-full bg-green-primary/10 flex items-center justify-center mb-3">
            <ShoppingBag size={26} className="text-green-primary" />
          </div>
          <p className="text-sm text-brand-black leading-relaxed max-w-[280px]">
            Mobile ordering isn't on at this venue. Wave a waiter or pop up to the bar — they've got you.
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-4 py-3.5 rounded-2xl bg-brand-black text-white text-sm font-bold cursor-pointer active:scale-[0.98] transition-transform"
        >
          Got it
        </button>
      </div>
    </div>
  )
}

/* ---------- Member ID QR sheet ---------- */
function MemberIDSheet({ onClose }) {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white w-full max-w-[430px] rounded-t-[28px] p-6 pb-8 animate-[slideUp_320ms_cubic-bezier(0.2,0.9,0.3,1.05)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto w-10 h-1 rounded-full bg-brand-gray-300 mb-4" />
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-brand-black">Show it to the staff</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer">
            <X size={16} />
          </button>
        </div>
        <div className="rounded-2xl bg-white border border-brand-gray-300 p-5 flex flex-col items-center">
          {/* Fake QR grid */}
          <div className="w-44 h-44 grid grid-cols-12 grid-rows-12 gap-[2px] bg-white p-2 rounded-xl border border-brand-gray-300">
            {Array.from({ length: 144 }).map((_, i) => {
              const on = (i * 37 + 11) % 7 % 3 === 0 || i % 13 === 0
              return <div key={i} style={{ backgroundColor: on ? '#1a1a1a' : '#fff' }} />
            })}
          </div>
          <p className="mt-3 font-bold text-brand-black tracking-widest">DS · 58 231 PTS</p>
          <p className="text-[11px] text-brand-gray-500 mt-0.5">Daniel Svantesson · All Star</p>
        </div>
        <p className="mt-3 text-center text-[11px] text-brand-gray-500">
          Staff scans this to log your visit and apply your discount.
        </p>
      </div>
    </div>
  )
}

/* ---------- Notify guests sheet ---------- */
function NotifyGuestsSheet({ venue, onClose, onConfirm }) {
  const v = VENUES.find((x) => x.id === venue) || VENUES[0]
  const [selected, setSelected] = useState(['sofia', 'erik'])
  const [notify, setNotify] = useState(true)
  const [eta, setEta] = useState('2 h')
  const [msg, setMsg] = useState(`I'm at O'Learys ${v.name} — come join! 🍻`)

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  const toggle = (id) => {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])
  }
  const count = selected.length

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white w-full max-w-[430px] rounded-t-[28px] animate-[slideUp_320ms_cubic-bezier(0.2,0.9,0.3,1.05)] flex flex-col"
        style={{ maxHeight: '92%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 pt-4 pb-3 flex-shrink-0">
          <div className="mx-auto w-10 h-1 rounded-full bg-brand-gray-300 mb-3" />
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-brand-black leading-tight">Summon the Squad</h2>
              <p className="text-[12px] text-brand-gray-500 mt-0.5 leading-snug">
                Ping the crew to join you at {v.name}. If a friend checks in within 60 min, you both score a free arcade game. Only valid once per visit, only for friends that haven't checked in.
              </p>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center flex-shrink-0 cursor-pointer">
              <X size={16} />
            </button>
          </div>

          {/* Reward strip */}
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-brand-gray-300 bg-white px-3.5 py-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ffdc1e' }}>
              <span className="text-base">🚨</span>
            </div>
            <div className="flex-1">
              <p className="text-[12.5px] font-bold text-brand-black leading-tight">Squad challenge — free arcade game for two</p>
              <p className="text-[11px] text-brand-gray-500 leading-tight mt-0.5">Drops in your wallet the moment a friend checks in</p>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-brand-gray-100">
              <Timer size={11} className="text-green-dark" />
              <span className="text-[10px] font-bold text-green-dark">60 min</span>
            </div>
          </div>

          {/* Master toggle */}
          <div
            className="mt-4 flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
              backgroundColor: notify ? 'rgba(45,155,135,0.08)' : '#f5f5f5',
              border: notify ? '1px solid rgba(45,155,135,0.3)' : '1px solid #e0e0e0',
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: notify ? '#2d9b87' : '#e0e0e0' }}
            >
              <Bell size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-brand-black text-[14px] leading-tight">Notify my guests</p>
              <p className="text-[11px] text-brand-gray-500 leading-tight mt-0.5">
                Push · {count} {count === 1 ? 'guest' : 'guests'}
              </p>
            </div>
            <button
              onClick={() => setNotify(!notify)}
              className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0 cursor-pointer"
              style={{ backgroundColor: notify ? '#2d9b87' : '#c4c4c4' }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
                style={{ left: notify ? 22 : 2, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto no-scrollbar px-5 pb-3"
          style={{ opacity: notify ? 1 : 0.45, pointerEvents: notify ? 'auto' : 'none' }}
        >
          {/* Message preview */}
          <p className="text-[10px] font-semibold tracking-wider text-brand-gray-500 uppercase mt-2 mb-1.5">Message</p>
          <div className="rounded-2xl border border-brand-gray-300 p-3 bg-white">
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={2}
              className="w-full text-[13px] text-brand-black outline-none resize-none leading-snug bg-transparent"
            />
            <div className="mt-2 pt-2 border-t border-brand-gray-200 flex items-center gap-2">
              <span className="text-[10px] font-semibold tracking-wider text-brand-gray-500 uppercase">Staying for</span>
              <div className="flex gap-1.5 ml-auto">
                {['1 h', '2 h', '3 h+'].map((opt) => {
                  const sel = eta === opt
                  return (
                    <button
                      key={opt}
                      onClick={() => setEta(opt)}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer"
                      style={{ backgroundColor: sel ? '#2d9b87' : '#f5f5f5', color: sel ? '#fff' : '#3c3c3c' }}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Recipients */}
          <div className="mt-4 flex items-baseline justify-between">
            <p className="text-[10px] font-semibold tracking-wider text-brand-gray-500 uppercase">Send to · {count}</p>
            <button
              onClick={() => setSelected(selected.length === FRIENDS.length ? [] : FRIENDS.map((f) => f.id))}
              className="text-[11px] font-semibold text-green-primary cursor-pointer"
            >
              {selected.length === FRIENDS.length ? 'Clear' : 'Select all'}
            </button>
          </div>

          <div className="mt-2 space-y-1.5">
            {FRIENDS.map((f) => {
              const sel = selected.includes(f.id)
              return (
                <button
                  key={f.id}
                  onClick={() => toggle(f.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all cursor-pointer"
                  style={{
                    backgroundColor: sel ? 'rgba(45,155,135,0.06)' : 'transparent',
                    border: sel ? '1px solid rgba(45,155,135,0.3)' : '1px solid transparent',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[12px] text-brand-black"
                    style={{ backgroundColor: f.color }}
                  >
                    {f.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-brand-black text-[13px] leading-tight">{f.name}</p>
                    <p className="text-[11px] text-brand-gray-500 leading-tight">{f.sub}</p>
                  </div>
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{
                      border: sel ? 'none' : '1.5px solid #c4c4c4',
                      backgroundColor: sel ? '#2d9b87' : 'transparent',
                    }}
                  >
                    {sel && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0 px-5 pt-2 pb-6 border-t border-brand-gray-300 flex gap-2">
          <button
            onClick={() => onConfirm({ notify: false, count: 0 })}
            className="flex-1 py-3.5 rounded-2xl bg-brand-gray-100 text-brand-black text-sm font-bold cursor-pointer active:scale-[0.98] transition-transform"
          >
            Skip
          </button>
          <button
            onClick={() => onConfirm({ notify: notify && count > 0, count })}
            disabled={notify && count === 0}
            className="flex-[1.4] py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-all"
            style={{
              backgroundColor: !notify || count > 0 ? '#2d9b87' : '#e0e0e0',
              color: !notify || count > 0 ? '#fff' : '#9e9e9e',
            }}
          >
            {notify && count > 0 ? (
              <>
                <Send size={14} className="text-white" /> Summon {count}
              </>
            ) : (
              'Check in'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- Check-in celebration overlay ---------- */
function CheckInCelebration({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 3400)
    return () => clearTimeout(t)
  }, [onComplete])

  const confettiColors = ['#ffdc1e', '#ffffff', '#23695a', '#ffdc1e', '#ffffff', '#2d9b87']
  const confetti = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2
    const dist = 110 + (i % 3) * 18
    const dx = Math.cos(angle) * dist
    const dy = Math.sin(angle) * dist
    return { dx, dy, color: confettiColors[i % confettiColors.length], delay: 350 + (i % 4) * 40 }
  })

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden pointer-events-none checkin-celebration">
      <div className="absolute inset-0 checkin-cele-bg" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 60%, rgba(255,255,255,0.18), transparent 55%)' }} />
      {/* Expanding ring */}
      <div className="checkin-cele-ring" />
      {/* Confetti */}
      {confetti.map((c, i) => (
        <span
          key={i}
          className="checkin-cele-confetti"
          style={{
            backgroundColor: c.color,
            animationDelay: `${c.delay}ms`,
            '--cele-end': `translate(calc(-50% + ${c.dx}px), calc(-50% + ${c.dy}px))`,
          }}
        />
      ))}
      {/* Football */}
      <div className="checkin-cele-ball">
        <svg width={110} height={110} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="#fff" stroke="#3c3c3c" strokeWidth="2.5" />
          <polygon points="50,30 62,38 58,52 42,52 38,38" fill="#3c3c3c" />
          <polygon points="50,30 38,38 26,30 30,18 50,16" fill="none" stroke="#3c3c3c" strokeWidth="2" />
          <polygon points="50,30 62,38 74,30 70,18 50,16" fill="none" stroke="#3c3c3c" strokeWidth="2" />
          <polygon points="42,52 26,54 18,68 30,80 38,38" fill="none" stroke="#3c3c3c" strokeWidth="2" />
          <polygon points="58,52 74,54 82,68 70,80 62,38" fill="none" stroke="#3c3c3c" strokeWidth="2" />
          <polygon points="42,52 30,80 50,86 70,80 58,52" fill="none" stroke="#3c3c3c" strokeWidth="2" />
        </svg>
      </div>
      {/* Text */}
      <div className="checkin-cele-text">
        <p className="text-white font-bold tracking-[0.2em] text-[34px] leading-none" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>
          GOAL!
        </p>
        <p className="text-white/85 font-semibold text-[12px] tracking-[0.25em] uppercase mt-2">You're checked in</p>
      </div>
    </div>
  )
}

/* ---------- Main component ---------- */
export default function AlreadyHere() {
  const navigate = useNavigate()
  const [venue, setVenue] = useState(null)
  const [showPicker, setShowPicker] = useState(false)
  const [showOrderSheet, setShowOrderSheet] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [showNotify, setShowNotify] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [notifiedCount, setNotifiedCount] = useState(0)

  const v = VENUES.find((x) => x.id === venue)

  const handleVenueSelect = (id) => {
    setVenue(id)
    setShowPicker(false)
    setNotifiedCount(0)
    setShowCelebration(true)
  }

  const handleCelebrationComplete = () => {
    setShowCelebration(false)
    setShowNotify(true)
  }

  const handleNotifyConfirm = ({ notify, count }) => {
    setNotifiedCount(notify ? count : 0)
    setShowNotify(false)
  }

  const handleFeature = (feature) => {
    if (feature.action === 'sheet') {
      setShowOrderSheet(true)
    } else if (feature.path) {
      navigate(feature.path)
    }
  }

  /* ----- Default state: no venue picked ----- */
  if (!venue) {
    return (
      <div className="min-h-[80dvh] flex flex-col px-5 pb-24 pt-12">
        <div className="text-center mt-6">
          <h1 className="text-[26px] font-bold text-brand-black leading-tight">Check-in at O'Learys</h1>
          <p className="text-sm text-brand-gray-500 mt-1.5">
            Check in to unlock rewards,<br />games and in-house perks.
          </p>
        </div>

        {/* Location pill */}
        <button
          onClick={() => setShowPicker(true)}
          className="mt-7 w-full flex items-center gap-3 rounded-2xl border border-brand-gray-300 bg-white px-4 py-3.5 text-left cursor-pointer active:border-green-primary transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-green-primary/10 flex items-center justify-center flex-shrink-0">
            <MapPin size={18} className="text-green-primary" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold tracking-wider text-brand-gray-500 uppercase">Your location</p>
            <p className="text-sm font-semibold text-brand-black">Select your O'Learys</p>
          </div>
          <ChevronRight size={18} className="text-brand-gray-500" />
        </button>

        {/* Feature cards (greyed out) */}
        <div className="mt-5 flex flex-col gap-3">
          {FEATURES.map((f) => (
            <button
              key={f.id}
              onClick={() => setShowPicker(true)}
              className="flex items-center gap-4 rounded-2xl border border-brand-gray-300 bg-white p-4 text-left cursor-pointer active:scale-[0.98] transition-transform opacity-50"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-gray-100 flex items-center justify-center flex-shrink-0">
                <f.Icon size={22} className="text-brand-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brand-black">{f.label}</p>
                <p className="text-xs text-brand-gray-500 leading-snug truncate">{f.sub}</p>
              </div>
              <ChevronRight size={18} className="text-brand-gray-500" />
            </button>
          ))}
        </div>

        <p className="mt-auto pt-6 text-center text-[11px] text-brand-gray-500 leading-relaxed">
          Lock-in: pick your venue once and we'll geofence it for the rest of your visit.
        </p>

        {showPicker && (
          <LocationPickerSheet
            current={venue}
            onClose={() => setShowPicker(false)}
            onSelect={handleVenueSelect}
          />
        )}
      </div>
    )
  }

  /* ----- Checked-in state ----- */
  return (
    <div className="min-h-[80dvh] flex flex-col pb-24">
      <div className="overflow-y-auto no-scrollbar">
        {/* Hero — green card */}
        <div className="px-5 pt-12">
          <div
            className="relative rounded-3xl overflow-hidden p-5"
            style={{ background: 'linear-gradient(135deg, #2d9b87 0%, #23695a 100%)' }}
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 0%, rgba(255,220,30,0.4), transparent 50%), radial-gradient(circle at 90% 100%, rgba(255,255,255,0.25), transparent 45%)',
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-1.5">
                <span className="relative w-2 h-2 rounded-full bg-white checkin-pulse-dot" />
                <span className="text-[10px] font-bold tracking-[0.18em] text-white/90 uppercase">You're checked in</span>
              </div>
              <h2 className="mt-1 text-white text-[26px] font-bold leading-tight">O'Learys {v.name}</h2>
              <p className="text-[13px] text-white/80 mt-0.5">{v.sub}</p>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => setShowPicker(true)}
                  className="ml-auto text-[11px] font-semibold text-white/80 underline underline-offset-2 cursor-pointer"
                >
                  Wrong place?
                </button>
              </div>

              {notifiedCount > 0 && (
                <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/15 border border-white/20">
                  <Bell size={14} className="text-white" />
                  <p className="text-[12px] text-white font-semibold leading-tight">
                    Pinged {notifiedCount} {notifiedCount === 1 ? 'friend' : 'friends'} · they know you're here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Show member ID */}
        <div className="px-5 mt-4">
          <button
            onClick={() => setShowQR(true)}
            className="w-full flex items-center gap-3 rounded-2xl border border-brand-gray-300 bg-white px-4 py-3 cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-black flex items-center justify-center flex-shrink-0">
              <QrCode size={18} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-brand-black text-[14px] leading-tight">Show it to the staff</p>
              <p className="text-[11px] text-brand-gray-500 leading-tight mt-0.5">Tap to open your member QR</p>
            </div>
            <ChevronRight size={16} className="text-brand-gray-500" />
          </button>
        </div>

        {/* Ping friends CTA */}
        {notifiedCount === 0 && (
          <div className="px-5 mt-3">
            <button
              onClick={() => setShowNotify(true)}
              className="w-full flex items-center gap-3 rounded-2xl border border-brand-gray-300 bg-white px-4 py-3 cursor-pointer active:scale-[0.99] active:border-green-primary transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center flex-shrink-0">
                <Bell size={18} className="text-green-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-brand-black text-[14px] leading-tight">Ping your friends</p>
                <p className="text-[11px] text-brand-gray-500 leading-tight mt-0.5">Quick heads-up — no reward attached</p>
              </div>
              <ChevronRight size={16} className="text-brand-gray-500" />
            </button>
          </div>
        )}

        {/* Section heading */}
        <div className="px-5 mt-6 mb-2">
          <h3 className="text-base font-bold text-brand-black">While you're here</h3>
          <p className="text-[12px] text-brand-gray-500 leading-snug mt-0.5">
            Order food &amp; drinks, play a game, and earn rewards when you summon your squad and predict tonight's match.
          </p>
        </div>

        {/* Feature cards — active */}
        <div className="px-5 flex flex-col gap-3">
          {FEATURES.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFeature(f)}
              className="flex items-center gap-4 rounded-2xl border border-brand-gray-300 bg-white p-4 text-left cursor-pointer active:scale-[0.98] active:border-green-primary transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-green-primary/10 flex items-center justify-center flex-shrink-0">
                <f.Icon size={22} className="text-green-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brand-black">{f.label}</p>
                <p className="text-xs text-brand-gray-500 leading-snug">{f.sub}</p>
              </div>
              <ChevronRight size={18} className="text-brand-gray-500" />
            </button>
          ))}
        </div>

      </div>

      {/* Overlays */}
      {showPicker && (
        <LocationPickerSheet
          current={venue}
          onClose={() => setShowPicker(false)}
          onSelect={(id) => {
            setVenue(id)
            setShowPicker(false)
            setNotifiedCount(0)
          }}
        />
      )}
      {showOrderSheet && <OrderUnavailableSheet onClose={() => setShowOrderSheet(false)} />}
      {showQR && <MemberIDSheet onClose={() => setShowQR(false)} />}
      {showNotify && (
        <NotifyGuestsSheet
          venue={venue}
          onClose={() => setShowNotify(false)}
          onConfirm={handleNotifyConfirm}
        />
      )}
      {showCelebration && <CheckInCelebration onComplete={handleCelebrationComplete} />}
    </div>
  )
}

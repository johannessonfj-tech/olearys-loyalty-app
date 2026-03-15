import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, ChevronDown, Clock, Users, CreditCard, MapPin, Check, Minus, Plus, X, Trash2, Edit3, Calendar, CircleDot, Lock, ShieldCheck } from 'lucide-react'

const MATCHES_DB = {
  'lulea-farjestad': { home: 'Luleå HF', away: 'Färjestad BK', league: 'SHL', time: '15:15', date: 'SAT 14 MARCH', fullDate: '14 Mar 2026' },
  'linkoping-orebro': { home: 'Linköping HC', away: 'Örebro Hockey', league: 'SHL', time: '15:15', date: 'SAT 14 MARCH', fullDate: '14 Mar 2026' },
  'inter-atalanta': { home: 'Inter', away: 'Atalanta', league: 'Serie A', time: '15:00', date: 'SAT 14 MARCH', fullDate: '14 Mar 2026' },
  'burnley-bournemouth': { home: 'Burnley', away: 'AFC Bournemouth', league: 'Premier League', time: '16:00', date: 'SAT 14 MARCH', fullDate: '14 Mar 2026' },
  'arsenal-everton': { home: 'Arsenal FC', away: 'Everton', league: 'Premier League', time: '18:30', date: 'SAT 14 MARCH', fullDate: '14 Mar 2026' },
  'chelsea-newcastle': { home: 'Chelsea', away: 'Newcastle United', league: 'Premier League', time: '18:30', date: 'SAT 14 MARCH', fullDate: '14 Mar 2026' },
  'capitals-bruins': { home: 'Washington Capitals', away: 'Boston Bruins', league: 'NHL', time: '20:00', date: 'SAT 14 MARCH', fullDate: '14 Mar 2026' },
  'westham-city': { home: 'West Ham United', away: 'Manchester City', league: 'Premier League', time: '21:00', date: 'SAT 14 MARCH', fullDate: '14 Mar 2026' },
}

const ACTIVITIES = [
  { id: 'bowling', name: 'Bowling', desc: '8 lanes, max 5 guests per lane', duration: '55 min', price: 449, unit: '449 kr/lane' },
  { id: 'shuffleboard', name: 'Shuffleboard', desc: '8 boards, 2–6 persons per board', duration: '1 hour', price: 349, unit: '349 kr/board' },
  { id: 'blacklight', name: 'Blacklight Minigolf', desc: '12-hole UV-lit course with Norrköping motifs', duration: '1 hour', price: 99, unit: '99 kr/person' },
  { id: 'dart', name: 'Interaktiv Dart', desc: 'Projected games on the board, 4 persons per board', duration: '1 hour', price: 299, unit: '299 kr/board' },
  { id: 'karaoke', name: 'Karaokerum', desc: 'Private room, up to 12 people, 80 000+ songs', duration: '55 min', price: 699, unit: '699 kr/room' },
  { id: 'biljard', name: 'Biljard', desc: '2 tables in a secluded setting', duration: '1 hour', price: 299, unit: '299 kr/table' },
  { id: '3kamp', name: '3-kamp', desc: 'Bowling + minigolf + basketball, min 4 people', duration: '1.5–2.5 hours', price: 279, unit: '279 kr/person' },
  { id: 'arcade', name: 'Arkadhall', desc: '250 m² arcade — MotoGP, air hockey, basketball & more', duration: 'Drop-in', price: null, unit: 'Token-based' },
]

const TIME_SLOTS = ['11.00', '12.00', '14.00', '15.00', '16.00', '17.00', '18.00', '19.00', '20.00', '21.00', '22.00', '23.00']
const BOOKED_SLOTS = ['18.00', '19.00']

/* ── Phase 1: Match Detail (table reservation) ── */
function MatchDetail({ match, guests, onContinue }) {
  const [specialRequest, setSpecialRequest] = useState('')
  return (
    <div className="pb-2">
      <div className="rounded-b-3xl overflow-hidden relative" style={{ background: 'linear-gradient(180deg, #1a3a2a 0%, #0d1f15 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 30%, #2d5a3d 0%, transparent 60%)' }} />
        <div className="relative px-5 pt-4 pb-8 text-center">
          <p className="text-white/50 text-[10px] font-medium tracking-widest uppercase">{match.date} · {match.league}</p>
          <div className="flex items-center justify-center gap-6 my-4">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-xs">{match.home.substring(0, 3).toUpperCase()}</span>
            </div>
            <span className="text-white/40 text-sm font-bold">VS</span>
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-xs">{match.away.substring(0, 3).toUpperCase()}</span>
            </div>
          </div>
          <h2 className="text-white font-bold text-lg">{match.home} vs {match.away}</h2>
          <p className="text-white/50 text-xs mt-1">Table reservation · {match.time}</p>
        </div>
      </div>
      <div className="px-5 mt-4">
        <div className="flex items-center gap-3 text-xs text-brand-gray-500">
          <span className="flex items-center gap-1"><Clock size={12} /> Flexible time</span>
          <span className="flex items-center gap-1"><Users size={12} /> {guests} guests</span>
          <span className="flex items-center gap-1"><CreditCard size={12} /> 0 kr</span>
        </div>
        <p className="text-sm text-brand-black leading-relaxed mt-4">
          Watch {match.home} vs {match.away} live on our giant screens. Reserve a table to secure your spot for the match.
        </p>
        <div className="mt-5">
          <p className="text-sm font-semibold text-brand-black mb-2">Special requests</p>
          <textarea value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} placeholder="e.g. any allergies, specific game, team you support" rows={2} className="w-full rounded-xl border border-brand-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-primary resize-none" />
        </div>
      </div>
      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
        <button onClick={() => onContinue(specialRequest)} className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform" style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}>Continue</button>
      </div>
    </div>
  )
}

/* ── Phase 2: Select Activities ── */
function SelectActivities({ match, guests, cart, onAdd, onReview, onBack, onChangeGuests }) {
  const [editingGuests, setEditingGuests] = useState(false)
  return (
    <div className="pb-2">
      <div className="bg-green-primary px-5 pt-3 pb-5 rounded-b-2xl relative">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer mb-2">
          <ChevronLeft size={18} className="text-white" />
        </button>
        {editingGuests ? (
          <div className="flex items-center gap-2 mt-1">
            <button onClick={() => onChangeGuests(Math.max(1, guests - 1))} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"><Minus size={12} className="text-white" /></button>
            <span className="text-white text-sm font-bold w-20 text-center">{guests} guests</span>
            <button onClick={() => onChangeGuests(guests + 1)} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"><Plus size={12} className="text-white" /></button>
            <button onClick={() => setEditingGuests(false)} className="ml-1 text-xs text-white/80 font-semibold cursor-pointer">Done</button>
          </div>
        ) : (
          <button onClick={() => setEditingGuests(true)} className="text-white/70 text-xs cursor-pointer flex items-center gap-1">
            {guests} guests, {match.fullDate} <Edit3 size={10} className="text-white/50" />
          </button>
        )}
        <p className="text-white font-bold text-lg mt-0.5">Select activities</p>
      </div>
      <div className="mx-4 mt-4 p-4 rounded-xl bg-[#ffdc1e]">
        <p className="text-sm font-bold text-brand-black uppercase">Great! Would you like to book anything else?</p>
      </div>
      <div className="px-4 mt-5">
        <p className="text-xs font-bold text-brand-black uppercase tracking-wider mb-3">Activities</p>
        {ACTIVITIES.map((a) => (
          <button key={a.id} onClick={() => onAdd(a)} className="w-full flex items-center gap-3 py-4 border-b border-brand-gray-100 text-left cursor-pointer active:bg-brand-gray-100/50 transition-colors">
            <div className="flex-1">
              <p className="text-sm font-bold text-brand-black uppercase">{a.name}</p>
              <p className="text-xs text-brand-gray-500 mt-0.5">{a.desc}</p>
              <p className="text-xs text-green-primary mt-0.5">{a.duration}  {a.unit}</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-brand-gray-100 flex items-center justify-center flex-shrink-0">
              <CircleDot size={20} className="text-green-primary" />
            </div>
          </button>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
          <button onClick={onReview} className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform" style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}>Review booking request ({cart.length})</button>
        </div>
      )}
    </div>
  )
}

/* ── Phase 3: Activity Detail with time ── */
function ActivityDetail({ activity, guests, match, onAdd }) {
  const [selectedTime, setSelectedTime] = useState(null)
  const [duration, setDuration] = useState(2)
  const price = (activity.price || 0) * duration
  const timeRange = selectedTime ? `${selectedTime} – ${(parseFloat(selectedTime) + duration).toFixed(2)}` : ''

  return (
    <div className="pb-2">
      <div className="h-48 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
        <div className="absolute inset-0 flex items-center justify-center"><CircleDot size={48} className="text-white/20" /></div>
      </div>
      <div className="px-5 mt-4">
        <h2 className="text-lg font-bold text-brand-black uppercase">{activity.name}</h2>
        <div className="flex gap-2 mt-2">
          <span className="text-xs px-3 py-1 rounded-full border border-brand-gray-300 text-brand-gray-500">{activity.duration}</span>
          <span className="text-xs px-3 py-1 rounded-full border border-brand-gray-300 text-brand-gray-500">{activity.unit}</span>
        </div>
        <p className="text-sm text-green-primary mt-3">{activity.desc}</p>
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl border border-brand-gray-300">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-brand-gray-500" />
            <span className="text-sm font-medium text-brand-black">{guests} guests, {match.fullDate.substring(0, 6)}</span>
          </div>
          <span className="text-xs text-green-primary font-medium">Change</span>
        </div>

        <p className="text-xs font-bold text-brand-black uppercase tracking-wider mt-5 mb-3">Select time</p>
        <div className="grid grid-cols-4 gap-2">
          {TIME_SLOTS.map((t) => {
            const booked = BOOKED_SLOTS.includes(t)
            const isStart = selectedTime === t
            const tHour = parseFloat(t)
            const startHour = selectedTime ? parseFloat(selectedTime) : null
            const inRange = selectedTime && !isStart && tHour > startHour && tHour < startHour + duration
            return (
              <button key={t} onClick={() => !booked && setSelectedTime(t)} disabled={booked}
                className={`py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors border relative ${booked ? 'text-brand-gray-300 border-brand-gray-100 line-through cursor-not-allowed' : isStart ? 'bg-green-primary text-white border-green-primary' : inRange ? 'bg-green-primary/20 text-green-primary border-green-primary/40' : 'text-brand-black border-brand-gray-300'}`}>
                {t}
                {booked && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-400" />}
              </button>
            )
          })}
        </div>
        <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Fully booked (tap to join guest list)
        </p>

        {selectedTime && (
          <div className="mt-5 p-4 rounded-xl border border-brand-gray-300 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2"><Clock size={16} className="text-brand-gray-500" /><span className="text-sm font-semibold text-brand-black">Duration</span></div>
              <p className="text-xs text-brand-gray-500 mt-0.5">{timeRange}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setDuration(Math.max(1, duration - 1))} className="w-8 h-8 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer"><Minus size={14} /></button>
              <span className="text-sm font-bold text-brand-black">{duration}h</span>
              <button onClick={() => setDuration(Math.min(6, duration + 1))} className="w-8 h-8 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer"><Plus size={14} /></button>
              <span className="text-sm font-bold text-green-primary">{price} kr</span>
            </div>
          </div>
        )}
      </div>
      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
        <button onClick={() => selectedTime && onAdd({ ...activity, selectedTime, duration, totalPrice: price })} disabled={!selectedTime}
          className={`w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform ${selectedTime ? '' : 'opacity-50'}`}
          style={{ backgroundColor: selectedTime ? '#ffdc1e' : '#e0e0e0', color: '#3c3c3c' }}>Add to booking</button>
      </div>
    </div>
  )
}

/* ── Phase 4: Checkout ── */
function Checkout({ match, guests, cart, onConfirm, onBack, onRemove, onChangeGuests }) {
  const [insurance, setInsurance] = useState(false)
  const [prePay, setPrePay] = useState(false)
  const [editingGuests, setEditingGuests] = useState(false)
  const subtotal = cart.reduce((s, item) => s + (item.totalPrice || 0), 0)
  const discount = prePay ? Math.round(subtotal * 0.05) : 0
  const total = subtotal - discount + (insurance ? 49 : 0)

  return (
    <div className="pb-2">
      <div className="bg-green-dark px-5 pt-4 pb-4 flex items-center justify-between">
        <p className="text-white font-bold italic text-lg">O'LEARYS</p>
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"><X size={16} className="text-white" /></button>
      </div>
      <div className="px-5 mt-3 flex items-center justify-between">
        {editingGuests ? (
          <div className="flex items-center gap-2">
            <button onClick={() => onChangeGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer"><Minus size={14} /></button>
            <span className="text-sm font-bold text-brand-black w-20 text-center">{guests} guests</span>
            <button onClick={() => onChangeGuests(guests + 1)} className="w-8 h-8 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer"><Plus size={14} /></button>
            <button onClick={() => setEditingGuests(false)} className="ml-1 text-xs text-green-primary font-semibold cursor-pointer">Done</button>
          </div>
        ) : (
          <button onClick={() => setEditingGuests(true)} className="text-sm text-brand-black cursor-pointer flex items-center gap-1">
            {guests} guests, {match.fullDate} <Edit3 size={12} className="text-brand-gray-500" />
          </button>
        )}
        <button onClick={onBack} className="text-sm text-green-primary font-medium cursor-pointer">Add more</button>
      </div>
      <div className="px-5 mt-4">
        <div className="flex items-center gap-1 mb-3"><ChevronDown size={14} /><span className="text-sm font-semibold text-brand-black">My cart ({cart.length})</span></div>
        <div className="space-y-3">
          {cart.map((item, i) => (
            <div key={i} className="p-3 rounded-xl border border-brand-gray-300">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-primary/10 flex items-center justify-center"><span className="text-green-primary font-bold text-xs">{item.name[0]}</span></div>
                  <div>
                    <p className="text-sm font-semibold text-brand-black">{item.name}</p>
                    <p className="text-xs text-brand-gray-500">{item.selectedTime ? `@ ${item.selectedTime} (${item.duration}h)` : 'Flexible time'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-brand-black">{item.totalPrice || 0} kr</span>
                  <button className="cursor-pointer"><Edit3 size={14} className="text-brand-gray-500" /></button>
                  <button onClick={() => onRemove(i)} className="cursor-pointer"><Trash2 size={14} className="text-brand-gray-500" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 mt-5">
        <div className="flex justify-between py-2 border-b border-brand-gray-100"><span className="text-sm text-brand-gray-500">Subtotal</span><span className="text-sm text-brand-black">{subtotal} kr</span></div>
        {discount > 0 && <div className="flex justify-between py-2 border-b border-brand-gray-100"><span className="text-sm text-green-primary">Pre-payment discount</span><span className="text-sm text-green-primary">-{discount} kr</span></div>}
        {insurance && <div className="flex justify-between py-2 border-b border-brand-gray-100"><span className="text-sm text-brand-gray-500">Insurance</span><span className="text-sm text-brand-black">49 kr</span></div>}
        <div className="flex justify-between py-3"><span className="text-base font-bold text-brand-black">Total <span className="text-xs font-normal text-brand-gray-500">(incl. VAT)</span></span><span className="text-base font-bold text-brand-black">{total} kr</span></div>
      </div>
      <div className="px-5 mt-4 space-y-4">
        <div className="flex items-start justify-between">
          <div><p className="text-xs font-bold text-brand-black uppercase">Cancellation insurance <span className="text-green-primary">+49 kr</span></p><p className="text-xs text-brand-gray-500 mt-0.5">Full refund if cancelled 24h in advance</p></div>
          <button onClick={() => setInsurance(!insurance)} className={`w-11 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${insurance ? 'bg-green-primary' : 'bg-brand-gray-300'}`}><div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${insurance ? 'translate-x-5' : ''}`} /></button>
        </div>
        <div className="flex items-start justify-between">
          <div><p className="text-xs font-bold text-brand-black uppercase">Pre-pay now <span className="text-green-primary">save 5%</span></p><p className="text-xs text-brand-gray-500 mt-0.5">Pay now and save 5% on your booking</p></div>
          <button onClick={() => setPrePay(!prePay)} className={`w-11 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${prePay ? 'bg-green-primary' : 'bg-brand-gray-300'}`}><div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${prePay ? 'translate-x-5' : ''}`} /></button>
        </div>
        <p className="text-[10px] text-brand-gray-500">By completing this booking you accept our <span className="underline">booking terms</span> and <span className="underline">privacy policy</span>.</p>
      </div>
      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
        <button onClick={() => onConfirm({ prePay, total })} className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform" style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}>
          {guests > 8 ? 'Send booking request' : 'Confirm booking'}
        </button>
      </div>
    </div>
  )
}

/* ── Phase 5: Payment ── */
function Payment({ total, onComplete, onBack }) {
  const [method, setMethod] = useState('saved')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [name, setName] = useState('')
  const [processing, setProcessing] = useState(false)

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, '').substring(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }
  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').substring(0, 4)
    if (digits.length > 2) return digits.substring(0, 2) + '/' + digits.substring(2)
    return digits
  }

  const cardValid = cardNumber.replace(/\s/g, '').length === 16 && expiry.length === 5 && cvc.length >= 3 && name.trim().length > 0
  const canPay = method === 'saved' || method === 'klarna' || method === 'apple' || (method === 'card' && cardValid)

  const handlePay = () => {
    if (!canPay) return
    setProcessing(true)
    setTimeout(() => { setProcessing(false); onComplete() }, 1500)
  }

  const methods = [
    { id: 'saved', label: 'Visa ending 4242', sub: 'Daniel Svantesson', icon: '****' },
    { id: 'apple', label: 'Apple Pay', sub: null, icon: null },
    { id: 'klarna', label: 'Klarna', sub: 'Pay now or in 3 installments', icon: null },
    { id: 'card', label: 'New card', sub: null, icon: null },
  ]

  return (
    <div className="pb-2">
      <div className="bg-green-dark px-5 pt-4 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"><ChevronLeft size={16} className="text-white" /></button>
          <p className="text-white font-bold text-base">Payment</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock size={12} className="text-white/60" />
          <span className="text-white/60 text-[10px]">Secure</span>
        </div>
      </div>

      <div className="px-5 mt-5">
        <div className="text-center mb-6">
          <p className="text-xs text-brand-gray-500 uppercase tracking-wider">Amount to pay</p>
          <p className="text-3xl font-bold text-brand-black mt-1">{total} kr</p>
        </div>

        {/* Payment methods */}
        <p className="text-xs font-bold text-brand-black uppercase tracking-wider mb-3">Payment method</p>
        <div className="space-y-2 mb-4">
          {methods.map((m) => {
            const active = method === m.id
            return (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left cursor-pointer transition-all ${active ? 'border-green-primary bg-green-primary/5' : 'border-brand-gray-200'}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${active ? 'border-green-primary' : 'border-brand-gray-300'}`}>
                  {active && <div className="w-2.5 h-2.5 rounded-full bg-green-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {m.id === 'saved' && <CreditCard size={14} className="text-brand-gray-500" />}
                    {m.id === 'apple' && <span className="text-sm font-medium"></span>}
                    {m.id === 'klarna' && <span className="text-[10px] font-black text-[#FFB3C7] bg-[#0A0B09] px-1.5 py-0.5 rounded">K</span>}
                    {m.id === 'card' && <CreditCard size={14} className="text-brand-gray-400" />}
                    <p className="text-sm font-medium text-brand-black">{m.label}</p>
                  </div>
                  {m.sub && <p className="text-[11px] text-brand-gray-500 mt-0.5">{m.sub}</p>}
                </div>
              </button>
            )
          })}
        </div>

        {/* New card form */}
        {method === 'card' && (
          <div className="border border-brand-gray-300 rounded-2xl overflow-hidden mb-4">
            <div className="px-4 py-3.5 border-b border-brand-gray-100">
              <label className="text-[10px] text-brand-gray-500 uppercase tracking-wider font-medium">Card number</label>
              <div className="flex items-center gap-2 mt-1">
                <CreditCard size={18} className="text-brand-gray-400 flex-shrink-0" />
                <input type="text" value={cardNumber} onChange={(e) => setCardNumber(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" className="flex-1 text-sm text-brand-black outline-none bg-transparent placeholder:text-brand-gray-300" />
              </div>
            </div>
            <div className="flex border-b border-brand-gray-100">
              <div className="flex-1 px-4 py-3.5 border-r border-brand-gray-100">
                <label className="text-[10px] text-brand-gray-500 uppercase tracking-wider font-medium">Expiry</label>
                <input type="text" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" className="w-full text-sm text-brand-black outline-none bg-transparent mt-1 placeholder:text-brand-gray-300" />
              </div>
              <div className="flex-1 px-4 py-3.5">
                <label className="text-[10px] text-brand-gray-500 uppercase tracking-wider font-medium">CVC</label>
                <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))} placeholder="123" className="w-full text-sm text-brand-black outline-none bg-transparent mt-1 placeholder:text-brand-gray-300" />
              </div>
            </div>
            <div className="px-4 py-3.5">
              <label className="text-[10px] text-brand-gray-500 uppercase tracking-wider font-medium">Cardholder name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Daniel Svantesson" className="w-full text-sm text-brand-black outline-none bg-transparent mt-1 placeholder:text-brand-gray-300" />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mt-2 px-1">
          <ShieldCheck size={14} className="text-green-primary flex-shrink-0" />
          <p className="text-[10px] text-brand-gray-500">Your payment is encrypted and processed securely.</p>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10 mt-6">
        <button
          onClick={handlePay}
          disabled={!canPay || processing}
          className={`w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform flex items-center justify-center gap-2 ${!canPay || processing ? 'opacity-50' : ''}`}
          style={{ backgroundColor: canPay && !processing ? '#ffdc1e' : '#e0e0e0', color: '#3c3c3c' }}
        >
          {processing ? (
            <><div className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" /> Processing...</>
          ) : (
            <><Lock size={14} /> Pay {total} kr</>
          )}
        </button>
      </div>
    </div>
  )
}

/* ── Phase 5b: Booking Request Sent (for 8+ guests) ── */
function BookingRequestSent({ match, guests, onDone }) {
  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5 bg-green-primary/10">
          <Check size={36} className="text-green-primary" />
        </div>
        <h2 className="text-xl font-bold text-brand-black">Booking request sent!</h2>
        <p className="text-sm text-brand-gray-500 mt-2 leading-relaxed">
          Your booking request for {match.home} vs {match.away} with {guests} guests has been received. We'll get back to you within 24 hours.
        </p>
        <div className="w-full mt-6 p-4 rounded-xl bg-brand-gray-100/60">
          <div className="flex items-center gap-3 text-left">
            <Clock size={16} className="text-green-primary flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-brand-black">What happens next?</p>
              <p className="text-xs text-brand-gray-500 mt-0.5">Our team will review your request and confirm availability for your group. You'll receive a notification and email once confirmed.</p>
            </div>
          </div>
        </div>
        <button onClick={onDone} className="mt-8 w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform" style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}>
          Back to booking
        </button>
      </div>
    </div>
  )
}

/* ── Phase 6: Confirmation ── */
function Confirmation({ match, guests, cart, onDone }) {
  const firstTime = cart.find((c) => c.selectedTime)?.selectedTime || match.time.replace(':', '.')
  const lastEnd = cart.reduce((max, c) => { if (!c.selectedTime) return max; const e = parseFloat(c.selectedTime) + (c.duration || 2); return e > max ? e : max }, parseFloat(firstTime) + 2)
  const ref = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 9000)}`

  return (
    <div className="pb-8">
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
        <div className="absolute inset-0 opacity-10"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white" /></div>
        <div className="relative px-5 pt-4 pb-8">
          <div className="flex items-center justify-between mb-6"><p className="text-white font-bold italic text-lg">O'LEARYS</p><button onClick={onDone} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"><X size={16} className="text-white" /></button></div>
          <p className="text-green-primary text-sm leading-relaxed">Thanks for your booking.<br />A confirmation has been<br />sent to your email.</p>
        </div>
      </div>
      <div className="px-5 mt-6 space-y-4">
        <div><p className="text-3xl font-bold text-brand-black">{guests}</p><p className="text-sm text-brand-gray-500">guests</p></div>
        <div><p className="text-xl font-bold text-green-primary">{match.fullDate.substring(0, 6)} <span className="text-sm font-normal text-brand-gray-500">date</span></p></div>
        <div><p className="text-xl font-bold text-green-primary">{firstTime}–{lastEnd.toFixed(2)} <span className="text-sm font-normal text-brand-gray-500">time</span></p></div>
        <div><p className="text-xl font-bold text-green-primary">{ref} <span className="text-sm font-normal text-brand-gray-500">reference</span></p></div>
        <div className="border-t border-brand-gray-100 pt-4 space-y-1">
          <p className="text-sm text-brand-black flex items-center gap-1"><MapPin size={14} className="text-green-primary" /> O'Learys Östermalm</p>
          <p className="text-sm text-green-primary">046-12 11 21</p>
          <p className="text-sm text-green-primary">booking@olearys.se</p>
        </div>
        <button className="w-full p-4 rounded-xl border border-brand-gray-300 text-left cursor-pointer flex items-center gap-2"><ChevronDown size={16} className="text-brand-gray-500" /><span className="text-sm text-green-primary font-medium">My booking details</span></button>
      </div>
      <div className="px-5 mt-6">
        <button onClick={onDone} className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform" style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}>Make another booking</button>
      </div>
    </div>
  )
}

/* ── Main Controller ── */
export default function MatchBooking() {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const fromPackage = location.state?.fromPackage
  const startPhase = location.state?.startPhase
  const match = MATCHES_DB[matchId] || MATCHES_DB['arsenal-everton']

  const initialPhase = startPhase === 'activities' ? 'activities' : (fromPackage ? 'checkout' : 'activities')
  const [phase, setPhase] = useState(initialPhase)
  const [guests, setGuests] = useState(fromPackage?.guests || 4)
  const [cart, setCart] = useState(fromPackage?.cart || [{ name: 'Table reservation', selectedTime: null, duration: null, totalPrice: 0 }])
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [paymentTotal, setPaymentTotal] = useState(0)

  const handleCheckoutConfirm = ({ prePay, total }) => {
    if (guests > 8) {
      setPhase('request-sent')
    } else if (prePay && total > 0) {
      setPaymentTotal(total)
      setPhase('payment')
    } else {
      setPhase('confirmation')
    }
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {phase === 'detail' && (
        <div className="px-4 pt-12 pb-2 flex items-center gap-3">
          <button onClick={() => setPhase('activities')} className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2" aria-label="Go back"><ChevronLeft size={24} className="text-brand-black" /></button>
        </div>
      )}
      {phase === 'activities' && <SelectActivities match={match} guests={guests} cart={cart} onAdd={(a) => { setSelectedActivity(a); setPhase('detail') }} onReview={() => setPhase('checkout')} onBack={() => navigate(-1)} onChangeGuests={setGuests} />}
      {phase === 'detail' && selectedActivity && <ActivityDetail activity={selectedActivity} guests={guests} match={match} onAdd={(a) => { setCart((c) => [...c, a]); setSelectedActivity(null); setPhase('activities') }} />}
      {phase === 'checkout' && <Checkout match={match} guests={guests} cart={cart} onConfirm={handleCheckoutConfirm} onBack={() => fromPackage ? navigate(-1) : setPhase('activities')} onRemove={(i) => setCart((c) => c.filter((_, idx) => idx !== i))} onChangeGuests={setGuests} />}
      {phase === 'payment' && <Payment total={paymentTotal} onComplete={() => setPhase('confirmation')} onBack={() => setPhase('checkout')} />}
      {phase === 'request-sent' && <BookingRequestSent match={match} guests={guests} onDone={() => navigate('/book')} />}
      {phase === 'confirmation' && <Confirmation match={match} guests={guests} cart={cart} onDone={() => navigate('/book')} />}
    </div>
  )
}

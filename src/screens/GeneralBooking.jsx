import { useState, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, X, Clock, Users, CreditCard, MapPin, Edit3, ChevronDown, Minus, Plus, Info, UtensilsCrossed, Gamepad2, Sparkles, Trash2, Calendar } from 'lucide-react'

const TYPE_CONFIG = {
  eat: {
    label: 'Table Reservation',
    icon: UtensilsCrossed,
    gradient: 'linear-gradient(180deg, #1a5c38 0%, #0d2e1c 100%)',
    radial: 'radial-gradient(ellipse at 50% 30%, #2d8a5a 0%, transparent 60%)',
  },
  play: {
    label: 'Activity Booking',
    icon: Gamepad2,
    gradient: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)',
    radial: 'radial-gradient(ellipse at 50% 30%, #444 0%, transparent 60%)',
  },
  happenings: {
    label: 'Event Booking',
    icon: Sparkles,
    gradient: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)',
    radial: 'radial-gradient(ellipse at 50% 30%, #444 0%, transparent 60%)',
  },
}

const TIME_SLOTS = ['11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00', '19.00', '20.00', '21.00', '22.00']
const BOOKED_SLOTS = ['18.00', '19.00']

/* ── Phase 1: Booking Details ── */
function EatDetails({ guests, selectedDate, selectedSlot, onContinue }) {
  const [specialRequest, setSpecialRequest] = useState('')
  return (
    <div className="pb-2">
      <div className="rounded-b-3xl overflow-hidden relative" style={{ background: TYPE_CONFIG.eat.gradient }}>
        <div className="absolute inset-0 opacity-20" style={{ background: TYPE_CONFIG.eat.radial }} />
        <div className="relative px-5 pt-4 pb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3">
            <UtensilsCrossed size={28} className="text-white/80" />
          </div>
          <h2 className="text-white font-bold text-lg">Table Reservation</h2>
          <p className="text-white/50 text-xs mt-1">O'Learys Norrköping</p>
        </div>
      </div>
      <div className="px-5 mt-4">
        <div className="flex items-center gap-3 text-xs text-brand-gray-500">
          <span className="flex items-center gap-1"><Users size={12} /> {guests} guests</span>
          <span className="flex items-center gap-1"><Calendar size={12} /> {selectedDate || 'Sat 14 Mar'}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {selectedSlot || 'Flexible'}</span>
          <span className="flex items-center gap-1"><CreditCard size={12} /> €0</span>
        </div>
        <p className="text-sm text-brand-black leading-relaxed mt-4">
          Reserve a table at O'Learys. Walk-ins are welcome but reservations guarantee your spot, especially during peak hours and live matches.
        </p>
        <div className="mt-5">
          <p className="text-sm font-semibold text-brand-black mb-2">Special requests</p>
          <textarea value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} placeholder="e.g. any allergies, birthday celebration, preferred seating area" rows={3} aria-label="Special requests" className="w-full rounded-xl border border-brand-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-primary resize-none" />
        </div>
      </div>
      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
        <button onClick={() => onContinue({ specialRequest, totalPrice: 0 })} className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform" style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}>Continue</button>
      </div>
    </div>
  )
}

function PlayDetails({ guests, selectedDate, selectedSlot, activity, onContinue }) {
  const activityName = activity?.name || 'Bowling'
  const basePrice = activity?.price || 25
  const [selectedTime, setSelectedTime] = useState(selectedSlot || null)
  const [duration, setDuration] = useState(2)
  const price = basePrice * duration
  const timeRange = selectedTime ? `${selectedTime} – ${(parseFloat(selectedTime) + duration).toFixed(2)}` : ''

  return (
    <div className="pb-2">
      <div className="rounded-b-3xl overflow-hidden relative" style={{ background: TYPE_CONFIG.play.gradient }}>
        <div className="absolute inset-0 opacity-20" style={{ background: TYPE_CONFIG.play.radial }} />
        <div className="relative px-5 pt-4 pb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3">
            <Gamepad2 size={28} className="text-white/80" />
          </div>
          <h2 className="text-white font-bold text-lg">{activityName}</h2>
          <p className="text-white/50 text-xs mt-1">Activity booking</p>
        </div>
      </div>
      <div className="px-5 mt-4">
        <div className="flex items-center gap-3 text-xs text-brand-gray-500">
          <span className="flex items-center gap-1"><Users size={12} /> {guests} guests</span>
          <span className="flex items-center gap-1"><Calendar size={12} /> {selectedDate || 'Sat 14 Mar'}</span>
          <span className="flex items-center gap-1"><CreditCard size={12} /> €{basePrice}/hour</span>
        </div>

        <p className="text-xs font-bold text-brand-black uppercase tracking-wider mt-5 mb-3">Select time</p>
        <div className="grid grid-cols-4 gap-2">
          {TIME_SLOTS.map((t) => {
            const booked = BOOKED_SLOTS.includes(t)
            const active = selectedTime === t
            return (
              <button key={t} onClick={() => !booked && setSelectedTime(t)} disabled={booked}
                aria-label={booked ? `${t} fully booked` : `Select time ${t}`}
                aria-pressed={active}
                className={`min-h-[44px] py-2.5 rounded-lg text-sm font-medium transition-colors border relative active:scale-[0.97] ${booked ? 'text-brand-gray-300 border-brand-gray-100 line-through cursor-not-allowed' : active ? 'bg-green-primary text-white border-green-primary cursor-pointer' : 'text-brand-black border-brand-gray-300 cursor-pointer'}`}>
                {t}
                {booked && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-400" aria-hidden="true" />}
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
              <button onClick={() => setDuration(Math.max(1, duration - 1))} className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer" aria-label="Decrease duration"><Minus size={14} /></button>
              <span className="text-sm font-bold text-brand-black">{duration}h</span>
              <button onClick={() => setDuration(Math.min(4, duration + 1))} className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer" aria-label="Increase duration"><Plus size={14} /></button>
              <span className="text-sm font-bold text-green-primary">€{price}</span>
            </div>
          </div>
        )}
      </div>
      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
        <button onClick={() => selectedTime && onContinue({ name: activityName, selectedTime, duration, totalPrice: price })} disabled={!selectedTime}
          className={`w-full py-4 rounded-2xl text-sm font-bold transition-transform ${selectedTime ? 'cursor-pointer active:scale-[0.97]' : 'opacity-50 cursor-not-allowed'}`}
          style={{ backgroundColor: selectedTime ? '#ffdc1e' : '#e0e0e0', color: '#3c3c3c' }}>Continue</button>
      </div>
    </div>
  )
}

function HappeningsDetails({ guests, selectedDate, event, onContinue }) {
  const eventName = event?.name || 'Live Music Night'
  const eventDesc = event?.description || 'Join us for an unforgettable evening of live entertainment at O\'Learys. Food and drinks available for purchase.'
  const eventDate = event?.date || selectedDate || 'Sat 14 Mar'
  const eventTime = event?.time || '19.00'
  const eventPrice = event?.price || 15

  return (
    <div className="pb-2">
      <div className="rounded-b-3xl overflow-hidden relative" style={{ background: TYPE_CONFIG.happenings.gradient }}>
        <div className="absolute inset-0 opacity-20" style={{ background: TYPE_CONFIG.happenings.radial }} />
        <div className="relative px-5 pt-4 pb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3">
            <Sparkles size={28} className="text-white/80" />
          </div>
          <h2 className="text-white font-bold text-lg">{eventName}</h2>
          <p className="text-white/50 text-xs mt-1">Event</p>
        </div>
      </div>
      <div className="px-5 mt-4">
        <div className="flex items-center gap-3 text-xs text-brand-gray-500">
          <span className="flex items-center gap-1"><Users size={12} /> {guests} attendees</span>
          <span className="flex items-center gap-1"><Calendar size={12} /> {eventDate}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {eventTime}</span>
          <span className="flex items-center gap-1"><CreditCard size={12} /> €{eventPrice}/person</span>
        </div>
        <p className="text-sm text-brand-black leading-relaxed mt-4">{eventDesc}</p>
        <div className="mt-5 p-4 rounded-xl border border-brand-gray-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-brand-black">Attendees</p>
              <p className="text-xs text-brand-gray-500 mt-0.5">{guests} x €{eventPrice}</p>
            </div>
            <p className="text-lg font-bold text-green-primary">€{guests * eventPrice}</p>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
        <button onClick={() => onContinue({ name: eventName, selectedTime: eventTime, duration: null, totalPrice: guests * eventPrice })} className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform" style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}>Continue</button>
      </div>
    </div>
  )
}

/* ── Phase 2: Checkout ── */
function GeneralCheckout({ type, guests, selectedDate, cart, onConfirm, onBack, onRemove, isLargeBooking }) {
  const [insurance, setInsurance] = useState(false)
  const [prePay, setPrePay] = useState(false)
  const subtotal = cart.reduce((s, item) => s + (item.totalPrice || 0), 0)
  const discount = prePay ? Math.round(subtotal * 0.05) : 0
  const total = subtotal - discount + (insurance ? 4 : 0)

  return (
    <div className="pb-2">
      <div className="bg-green-dark px-5 pt-12 pb-4 flex items-center justify-between -mt-16">
        <p className="text-white font-bold italic text-lg">O'LEARYS</p>
        <button onClick={onBack} className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center cursor-pointer" aria-label="Close checkout"><X size={16} className="text-white" /></button>
      </div>
      <div className="px-5 mt-3 flex items-center justify-between">
        <p className="text-sm text-brand-black">{guests} guests, {selectedDate || 'Sat 14 Mar'} <Edit3 size={12} className="inline text-brand-gray-500" /></p>
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
                    <p className="text-xs text-brand-gray-500">{item.selectedTime ? `@ ${item.selectedTime}${item.duration ? ` (${item.duration}h)` : ''}` : 'Flexible time'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-brand-black">{item.totalPrice ? `€${item.totalPrice}` : 'Free'}</span>
                  <button onClick={() => onRemove(i)} className="w-11 h-11 flex items-center justify-center cursor-pointer" aria-label={`Remove ${item.name}`}><Trash2 size={14} className="text-brand-gray-500" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 mt-5">
        <div className="flex justify-between py-2 border-b border-brand-gray-100"><span className="text-sm text-brand-gray-500">Subtotal</span><span className="text-sm text-brand-black">€{subtotal}</span></div>
        {discount > 0 && <div className="flex justify-between py-2 border-b border-brand-gray-100"><span className="text-sm text-green-primary">Pre-payment discount</span><span className="text-sm text-green-primary">-€{discount}</span></div>}
        {insurance && <div className="flex justify-between py-2 border-b border-brand-gray-100"><span className="text-sm text-brand-gray-500">Insurance</span><span className="text-sm text-brand-black">€4</span></div>}
        <div className="flex justify-between py-3"><span className="text-base font-bold text-brand-black">Total <span className="text-xs font-normal text-brand-gray-500">(incl. VAT)</span></span><span className="text-base font-bold text-brand-black">€{total}</span></div>
      </div>
      <div className="px-5 mt-4 space-y-4">
        <div className="flex items-start justify-between">
          <div><p className="text-xs font-bold text-brand-black uppercase">Cancellation insurance <span className="text-green-primary">+€4</span></p><p className="text-xs text-brand-gray-500 mt-0.5">Full refund if cancelled 24h in advance</p></div>
          <button onClick={() => setInsurance(!insurance)} role="switch" aria-checked={insurance} aria-label="Toggle cancellation insurance" className={`w-11 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${insurance ? 'bg-green-primary' : 'bg-brand-gray-300'}`}><div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${insurance ? 'translate-x-5' : ''}`} /></button>
        </div>
        <div className="flex items-start justify-between">
          <div><p className="text-xs font-bold text-brand-black uppercase">Pre-pay now <span className="text-green-primary">save 5%</span></p><p className="text-xs text-brand-gray-500 mt-0.5">Pay now and save 5% on your booking</p></div>
          <button onClick={() => setPrePay(!prePay)} role="switch" aria-checked={prePay} aria-label="Toggle pre-payment discount" className={`w-11 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${prePay ? 'bg-green-primary' : 'bg-brand-gray-300'}`}><div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${prePay ? 'translate-x-5' : ''}`} /></button>
        </div>
        <p className="text-[10px] text-brand-gray-500">By completing this booking you accept our <span className="underline">booking terms</span> and <span className="underline">privacy policy</span>.</p>
      </div>
      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
        {isLargeBooking && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 mb-3">
            <Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">Bookings with 8 or more guests require manual confirmation. We'll get back to you within 24 hours.</p>
          </div>
        )}
        <button onClick={onConfirm} className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform" style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}>{isLargeBooking ? 'Send booking request' : 'Confirm booking'}</button>
      </div>
    </div>
  )
}

/* ── Phase 3: Confirmation ── */
function GeneralConfirmation({ type, guests, selectedDate, cart, onDone, isLargeBooking }) {
  const firstTime = cart[0]?.selectedTime || 'Flexible'
  const refCode = useRef(`${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 9000)}`)
  const ref = refCode.current

  return (
    <div className="pb-8 -mt-16">
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
        <div className="absolute inset-0 opacity-10"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white" /></div>
        <div className="relative px-5 pt-14 pb-8">
          <div className="flex items-center justify-between mb-6"><p className="text-white font-bold italic text-lg">O'LEARYS</p><button onClick={onDone} className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center cursor-pointer" aria-label="Close confirmation"><X size={16} className="text-white" /></button></div>
          <p className="text-green-primary text-sm leading-relaxed">{isLargeBooking ? <>Booking request sent!<br />We'll review your request and<br />get back to you within 24 hours.</> : <>Thanks for your booking.<br />A confirmation has been<br />sent to your email.</>}</p>
        </div>
      </div>
      <div className="px-5 mt-6 space-y-4">
        {isLargeBooking && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-semibold text-amber-800">Pending</span>
          </div>
        )}
        <div><p className="text-3xl font-bold text-brand-black">{guests}</p><p className="text-sm text-brand-gray-500">guests</p></div>
        <div><p className="text-xl font-bold text-green-primary">{selectedDate || 'Sat 14 Mar'} <span className="text-sm font-normal text-brand-gray-500">date</span></p></div>
        <div><p className="text-xl font-bold text-green-primary">{firstTime} <span className="text-sm font-normal text-brand-gray-500">time</span></p></div>
        <div><p className="text-xl font-bold text-green-primary">{ref} <span className="text-sm font-normal text-brand-gray-500">reference</span></p></div>
        <div className="border-t border-brand-gray-100 pt-4 space-y-1">
          <p className="text-sm text-brand-black flex items-center gap-1"><MapPin size={14} className="text-green-primary" /> O'Learys Norrköping</p>
          <p className="text-sm text-green-primary">011-12 11 21</p>
          <p className="text-sm text-green-primary">booking@olearys.se</p>
        </div>
        <button className="w-full p-4 min-h-[44px] rounded-xl border border-brand-gray-300 text-left cursor-pointer flex items-center gap-2 active:bg-brand-gray-100/50 transition-colors" aria-label="Expand booking details"><ChevronDown size={16} className="text-brand-gray-500" /><span className="text-sm text-green-primary font-medium">My booking details</span></button>
      </div>
      <div className="px-5 mt-6">
        <button onClick={onDone} className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform" style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}>Make another booking</button>
      </div>
    </div>
  )
}

/* ── Main Controller ── */
export default function GeneralBooking() {
  const { type } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { guests: initialGuests, selectedSlot, selectedDate, activity, event } = location.state || {}

  const [phase, setPhase] = useState('details')
  const [guests] = useState(initialGuests || 4)
  const [cart, setCart] = useState([])
  const isLargeBooking = guests >= 8
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.eat

  const handleDetailsContinue = (item) => {
    if (type === 'eat') {
      setCart([{ name: 'Table Reservation', selectedTime: selectedSlot || null, duration: null, totalPrice: 0, ...item }])
    } else {
      setCart([item])
    }
    setPhase('checkout')
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {phase === 'details' && (
        <div className="px-4 pt-12 pb-2 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2" aria-label="Go back"><ChevronLeft size={24} className="text-brand-black" /></button>
        </div>
      )}
      {phase === 'details' && type === 'eat' && <EatDetails guests={guests} selectedDate={selectedDate} selectedSlot={selectedSlot} onContinue={handleDetailsContinue} />}
      {phase === 'details' && type === 'play' && <PlayDetails guests={guests} selectedDate={selectedDate} selectedSlot={selectedSlot} activity={activity} onContinue={handleDetailsContinue} />}
      {phase === 'details' && type === 'happenings' && <HappeningsDetails guests={guests} selectedDate={selectedDate} event={event} onContinue={handleDetailsContinue} />}
      {phase === 'checkout' && <GeneralCheckout type={type} guests={guests} selectedDate={selectedDate} cart={cart} onConfirm={() => setPhase('confirmation')} onBack={() => setPhase('details')} onRemove={(i) => setCart((c) => c.filter((_, idx) => idx !== i))} isLargeBooking={isLargeBooking} />}
      {phase === 'confirmation' && <GeneralConfirmation type={type} guests={guests} selectedDate={selectedDate} cart={cart} onDone={() => navigate('/book')} isLargeBooking={isLargeBooking} />}
    </div>
  )
}

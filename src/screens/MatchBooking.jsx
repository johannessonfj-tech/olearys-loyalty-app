import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronDown, Clock, Users, CreditCard, MapPin, Check, Plus, CircleDot } from 'lucide-react'

const MATCHES = {
  '1': { home: 'Djurgårdens IF', away: 'Skellefteå AIK', league: 'SHL', date: 'SAT 15 MARCH', time: '15:15', pkg: 'Match Day Dinner Package' },
  '2': { home: 'Arsenal FC', away: 'Everton', league: 'PREMIER LEAGUE', date: 'SAT 15 MARCH', time: '18:30', pkg: 'Champions League Dinner Package' },
  '3': { home: 'Real Madrid', away: 'Barcelona', league: 'LA LIGA', date: 'SAT 15 MARCH', time: '21:00', pkg: 'El Clásico Dinner Package' },
}

const TIME_SLOTS = ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
const BOOKED_SLOTS = ['18:00', '19:00']

const ADDONS = [
  { id: 'wings', name: 'Chicken Wings', price: 10, desc: 'Get 30% on one order' },
  { id: 'nachos', name: 'Nachos Grande', price: 9, desc: 'Classic sharing nachos' },
  { id: 'fries', name: 'Loaded Fries', price: 8, desc: 'Topped with cheese & bacon' },
]

const EXTRAS = [
  { id: 'gokart', name: 'Go-kart', duration: '1 hour', price: '€35/pers', image: null },
  { id: 'bowling', name: 'Bowling', duration: '1 hour', price: '€25/lane', image: null },
  { id: 'minigolf', name: 'Mini golf & Go-kart', duration: '1 hour', price: '€25/pers', image: null },
]

export default function MatchBooking() {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const match = MATCHES[matchId] || MATCHES['2']

  const [guests, setGuests] = useState(4)
  const [date] = useState('18 Mar')
  const [selectedTime, setSelectedTime] = useState(match.time.replace(':', ':'))
  const [specialRequest, setSpecialRequest] = useState('')
  const [selectedAddons, setSelectedAddons] = useState([])
  const [selectedExtras, setSelectedExtras] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const toggleAddon = (id) => {
    setSelectedAddons((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  const toggleExtra = (id) => {
    setSelectedExtras((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  if (confirmed) {
    return (
      <div className="min-h-dvh flex flex-col bg-white">
        <div className="px-4 pt-12 pb-4 flex items-center gap-3">
          <button onClick={() => navigate('/book')} className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2" aria-label="Back to bookings">
            <ChevronLeft size={24} className="text-brand-black" />
          </button>
          <h1 className="text-sm font-bold text-brand-black uppercase tracking-wide">Booking Confirmed</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-10">
          <div className="w-20 h-20 rounded-full bg-green-primary/10 flex items-center justify-center mb-5">
            <Check size={36} className="text-green-primary" strokeWidth={3} />
          </div>
          <h2 className="text-xl font-bold text-brand-black mb-1">You're all set!</h2>
          <p className="text-sm text-brand-gray-500 text-center mb-2">{match.home} vs {match.away}</p>
          <p className="text-sm text-brand-gray-500 text-center">{date} · {selectedTime} · {guests} guests</p>
          <div className="mt-4 px-4 py-2 rounded-full bg-brand-gray-100">
            <span className="text-xs font-bold text-brand-black tracking-wider">REF: OL{Math.random().toString(36).substring(2, 6).toUpperCase()}</span>
          </div>
          <div className="mt-6 text-center text-xs text-brand-gray-500">
            <p className="flex items-center justify-center gap-1"><MapPin size={12} /> O'Learys Östermalm</p>
            <p className="mt-1">booking@olearys.se · 08-123 456</p>
          </div>
          <button
            onClick={() => navigate('/book')}
            className="mt-8 px-8 py-3.5 rounded-2xl bg-brand-black text-white font-bold text-sm cursor-pointer active:scale-[0.97] transition-transform"
          >
            Back to bookings
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2" aria-label="Go back">
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
        <h1 className="text-sm font-bold text-brand-black uppercase tracking-wide">Book a table</h1>
      </div>

      {/* Hero */}
      <div className="mx-4 rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #1a3a2a 0%, #0d1f15 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at center, #2d5a3d 0%, transparent 70%)' }} />
        <div className="relative px-5 py-6 text-center">
          <p className="text-white/60 text-[10px] font-medium tracking-wider uppercase">{match.date} · {match.league}</p>
          {/* Team badges area */}
          <div className="flex items-center justify-center gap-6 my-4">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-xs">{match.home.substring(0, 3).toUpperCase()}</span>
            </div>
            <span className="text-white/40 text-sm font-bold">VS</span>
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-xs">{match.away.substring(0, 3).toUpperCase()}</span>
            </div>
          </div>
          <h2 className="text-white font-bold text-lg">{match.home.toUpperCase()} VS {match.away.toUpperCase()}</h2>
        </div>
      </div>

      {/* Package info */}
      <div className="px-5 mt-4">
        <h3 className="font-bold text-base text-brand-black">{match.pkg}</h3>
        <div className="flex items-center gap-3 mt-2 text-xs text-brand-gray-500">
          <span className="flex items-center gap-1"><Clock size={12} /> 3 hours</span>
          <span className="flex items-center gap-1"><CreditCard size={12} /> from €45</span>
          <span className="flex items-center gap-1"><Users size={12} /> 4–12 guests</span>
        </div>
        <p className="text-sm text-brand-black leading-relaxed mt-3">
          Experience the {match.home} vs {match.away} clash like never before! Watch the match live on our giant screens while enjoying a premium dinner and drinks.
          {!showMore && <span>.. </span>}
          {showMore && (
            <span> Our match-day dinner package includes a 3-course meal, welcome drink, and reserved seating with the best view. Perfect for groups of friends or corporate outings.</span>
          )}
          <button onClick={() => setShowMore(!showMore)} className="text-green-primary font-medium ml-1 cursor-pointer">
            {showMore ? 'Less' : 'More'}
          </button>
        </p>
      </div>

      {/* Guest & date selector */}
      <div className="mx-5 mt-5 flex items-center justify-between p-3 rounded-xl border border-brand-gray-300">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-green-primary" />
          <span className="text-sm font-medium text-brand-black">{guests} guests, {date}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer text-brand-black">−</button>
          <button onClick={() => setGuests(Math.min(12, guests + 1))} className="w-8 h-8 rounded-full bg-green-primary flex items-center justify-center cursor-pointer text-white">+</button>
        </div>
      </div>

      {/* Special requests */}
      <div className="px-5 mt-5">
        <p className="text-sm font-semibold text-brand-black mb-2">Special requests</p>
        <textarea
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
          placeholder="e.g. any allergies, any specific game you want to watch and team you support"
          rows={2}
          className="w-full rounded-xl border border-brand-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-primary resize-none transition-colors"
        />
      </div>

      {/* Time selection */}
      <div className="px-5 mt-5">
        <p className="text-sm font-semibold text-brand-black mb-2">1 SITTING STARTS AT</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {TIME_SLOTS.map((t) => {
            const booked = BOOKED_SLOTS.includes(t)
            const active = selectedTime === t
            return (
              <button
                key={t}
                onClick={() => !booked && setSelectedTime(t)}
                disabled={booked}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200 border ${
                  booked
                    ? 'bg-brand-gray-100 text-brand-gray-300 border-brand-gray-100 cursor-not-allowed'
                    : active
                      ? 'bg-green-dark text-white border-green-dark'
                      : 'bg-white text-brand-black border-brand-gray-300'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  {t}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Combo offers */}
      <div className="px-5 mt-6">
        <p className="text-sm font-semibold text-brand-black mb-3">Combo offers</p>
        <div className="space-y-2">
          {ADDONS.map((a) => {
            const active = selectedAddons.includes(a.id)
            return (
              <button
                key={a.id}
                onClick={() => toggleAddon(a.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors duration-200 text-left ${
                  active ? 'border-green-primary bg-green-primary/5' : 'border-brand-gray-300'
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-brand-black">Add {a.name.toLowerCase()}</p>
                  <p className="text-xs text-brand-gray-500">{a.desc}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  active ? 'border-green-primary bg-green-primary' : 'border-brand-gray-300'
                }`}>
                  {active && <Check size={14} className="text-white" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Often combined with */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-brand-black uppercase tracking-wider">Often combined with</p>
          <span className="text-[10px] text-brand-gray-500">OPTIONAL</span>
        </div>
        <div className="space-y-2">
          {EXTRAS.map((e) => {
            const active = selectedExtras.includes(e.id)
            return (
              <div
                key={e.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                  active ? 'border-green-primary bg-green-primary/5' : 'border-brand-gray-300'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gray-100 flex items-center justify-center flex-shrink-0">
                  <CircleDot size={20} className="text-green-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-brand-black">{e.name}</p>
                  <p className="text-xs text-brand-gray-500">{e.duration}</p>
                </div>
                <span className="text-xs text-brand-gray-500 mr-2">{e.price}</span>
                <button
                  onClick={() => toggleExtra(e.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors ${
                    active ? 'border-green-primary bg-green-primary' : 'border-brand-gray-300'
                  }`}
                >
                  {active && <Check size={14} className="text-white" />}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* T&C */}
      <div className="px-5 mt-4">
        <button className="text-xs text-green-primary underline cursor-pointer">View terms & conditions</button>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white border-t border-brand-gray-100 px-5 py-4">
        <button
          onClick={() => setConfirmed(true)}
          className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform"
          style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}
        >
          Add to booking
        </button>
      </div>
    </div>
  )
}

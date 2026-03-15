import { useState, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, Clock, Users, MapPin, Minus, Plus, Sparkles, Calendar, CheckCircle2, X } from 'lucide-react'

const HAPPENINGS_DB = {
  'cl-night': {
    title: 'Champions League Night',
    date: 'WED 18 MARCH',
    fullDate: '18 Mar 2026',
    time: '18:00',
    price: 349,
    currency: 'kr',
    description: 'Watch the Champions League on our giant screens. Dinner & game package includes burger menu + reserved seating.',
    longDesc: 'Our Champions League packag...',
    includes: [
      'Reserved table with screen view',
      'Burger menu (burger, fries, drink)',
      'Pre-match snacks on the table',
      'Champions League atmosphere & sound',
    ],
  },
  'quiz-night': {
    title: 'Quiz Night',
    date: 'FRI 20 MARCH',
    fullDate: '20 Mar 2026',
    time: '19:00',
    price: 249,
    currency: 'kr',
    description: 'Join our weekly quiz night! Teams of 2-6. Dinner & quiz package includes pizza buffet + quiz entry.',
    longDesc: 'Our Quiz Night packag...',
    includes: [
      'Pizza buffet (all-you-can-eat)',
      'Quiz entry for your team',
      'Reserved table',
      'Prize for top 3 teams',
    ],
  },
  'music-quiz-1': {
    title: 'Music Quiz — Melodifestivalen/Eurovision',
    date: 'WED 19 MARCH',
    fullDate: '19 Mar 2026',
    time: '19:00',
    price: 249,
    currency: 'kr',
    description: 'Hosted by Anders. Teams of up to 6 people. Special Melodifestivalen/Eurovision theme!',
    longDesc: 'Our Music Quiz packag...',
    includes: [
      'Reserved table',
      'Quiz entry for your team',
      'Themed rounds & music',
      'Prize for top 3 teams',
    ],
  },
  'by-night-1': {
    title: "O'Learys By Night Club",
    date: 'THU 20 MARCH',
    fullDate: '20 Mar 2026',
    time: '22:00',
    price: 0,
    currency: 'kr',
    description: 'DJ, drinks & dancing until 03:00. No cover charge.',
    longDesc: 'Our By Night packag...',
    includes: [
      'Entry to the club',
      'DJ & dancing',
      'Bar service until 03:00',
    ],
  },
}

function resolveHappening(id) {
  if (HAPPENINGS_DB[id]) return HAPPENINGS_DB[id]
  if (id && id.startsWith('music-quiz')) {
    return {
      ...HAPPENINGS_DB['music-quiz-1'],
      title: 'Music Quiz',
      description: 'Hosted by Anders or Sebbe. Teams of up to 6 people. Weekly music quiz with themed rounds!',
    }
  }
  if (id && id.startsWith('by-night')) {
    return { ...HAPPENINGS_DB['by-night-1'] }
  }
  return HAPPENINGS_DB['quiz-night']
}

const ADDONS = [
  { id: 'bowling', name: 'Bowling', duration: '55 min', price: 449, unit: '449 kr/lane' },
  { id: 'shuffleboard', name: 'Shuffleboard', duration: '1 hour', price: 349, unit: '349 kr/board' },
  { id: 'karaoke', name: 'Karaokerum', duration: '55 min', price: 699, unit: '699 kr/room' },
  { id: 'dart', name: 'Interaktiv Dart', duration: '1 hour', price: 299, unit: '299 kr/board' },
  { id: 'biljard', name: 'Biljard', duration: '1 hour', price: 299, unit: '299 kr/table' },
  { id: 'blacklight', name: 'Blacklight Minigolf', duration: '1 hour', price: 99, unit: '99 kr/person' },
]

const TIME_SLOTS = ['11.00', '12.00', '14.00', '15.00', '16.00', '17.00', '18.00', '19.00', '20.00', '21.00', '22.00', '23.00']

function AddonModal({ addon, onClose, onAdd, maxGuests, blockedHours = new Set() }) {
  const [guests, setGuests] = useState(maxGuests)
  const [selectedTime, setSelectedTime] = useState(null)
  const [duration, setDuration] = useState(1)
  const price = (addon.price || 0) * duration
  const startHour = selectedTime ? parseFloat(selectedTime) : null

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[100]" onClick={onClose} />
      <div className="fixed left-4 right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl z-[101] p-5 shadow-xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-bold text-brand-black uppercase">{addon.name}</p>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer">
            <X size={16} />
          </button>
        </div>

        <div className="p-3 rounded-xl border border-brand-gray-300 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-black">Number of guests</p>
              <p className="text-[10px] text-brand-gray-500">Max {maxGuests} (total in booking)</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full bg-green-primary flex items-center justify-center cursor-pointer">
                <Minus size={14} className="text-white" />
              </button>
              <span className="text-sm font-bold text-brand-black w-6 text-center">{guests}</span>
              <button onClick={() => setGuests(Math.min(maxGuests, guests + 1))} className="w-8 h-8 rounded-full bg-green-primary flex items-center justify-center cursor-pointer">
                <Plus size={14} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <p className="text-sm font-semibold text-brand-black mb-3">Select time</p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {TIME_SLOTS.map((t) => {
            const tHour = parseFloat(t)
            const isBlocked = blockedHours.has(tHour)
            const isStart = selectedTime === t
            const inRange = startHour && !isStart && tHour > startHour && tHour < startHour + duration
            const disabled = isBlocked
            return (
              <button
                key={t}
                onClick={() => !disabled && setSelectedTime(t)}
                disabled={disabled}
                className={`py-2.5 rounded-full text-sm font-medium transition-colors border
                  ${disabled ? 'text-brand-gray-300 border-brand-gray-100 cursor-not-allowed' : 'cursor-pointer'}
                  ${isStart ? 'bg-green-primary text-white border-green-primary' : ''}
                  ${inRange ? 'bg-green-primary/20 text-green-primary border-green-primary/40' : ''}
                  ${!disabled && !isStart && !inRange ? 'text-brand-black border-brand-gray-300' : ''}
                `}
              >
                {t}
              </button>
            )
          })}
        </div>

        {selectedTime && (
          <div className="p-3 rounded-xl border border-brand-gray-300 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-green-primary" />
                <span className="text-sm font-medium text-brand-black">Duration</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setDuration(Math.max(1, duration - 1))} className="w-7 h-7 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer">
                  <Minus size={12} />
                </button>
                <span className="text-sm font-bold text-brand-black">{duration}h</span>
                <button onClick={() => setDuration(Math.min(6, duration + 1))} className="w-7 h-7 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer">
                  <Plus size={12} />
                </button>
                <span className="text-sm font-bold text-green-primary ml-2">{price} kr</span>
              </div>
            </div>
            <p className="text-xs text-brand-gray-500 mt-1">
              {selectedTime} – {(parseFloat(selectedTime) + duration).toFixed(2)}
            </p>
          </div>
        )}

        <div className="flex gap-3 mt-2">
          <button onClick={onClose} className="flex-1 py-3.5 rounded-full border border-brand-gray-300 text-sm font-semibold text-brand-black cursor-pointer">
            Cancel
          </button>
          <button
            onClick={() => selectedTime && onAdd({ ...addon, selectedTime, duration, guests, totalPrice: price })}
            disabled={!selectedTime}
            className={`flex-1 py-3.5 rounded-full text-sm font-bold cursor-pointer transition-transform active:scale-[0.97] ${selectedTime ? 'text-brand-black' : 'text-brand-gray-400 opacity-50'}`}
            style={{ backgroundColor: selectedTime ? '#ffdc1e' : '#e8e8e8' }}
          >
            Add
          </button>
        </div>
      </div>
    </>
  )
}

/* -- Confirmation screen -- */
function HappeningConfirmation({ happening, totalGuests, onDone }) {
  const refCode = useRef(
    `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 9000)}`
  )
  const ref = refCode.current

  return (
    <div className="pb-8">
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a3a2a 0%, #0d1f15 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white" />
        </div>
        <div className="relative px-5 pt-4 pb-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-white font-bold italic text-lg">O'LEARYS</p>
            <button onClick={onDone} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center cursor-pointer">
              <X size={16} className="text-white" />
            </button>
          </div>
          <p className="text-green-primary text-sm leading-relaxed">
            Thanks for your booking.<br />
            A confirmation has been<br />
            sent to your email.
          </p>
        </div>
      </div>
      <div className="px-5 mt-6 space-y-4">
        <div><p className="text-lg font-bold text-brand-black">{happening.title}</p></div>
        <div><p className="text-3xl font-bold text-brand-black">{totalGuests}</p><p className="text-sm text-brand-gray-500">guests</p></div>
        <div><p className="text-xl font-bold text-green-primary">{happening.fullDate.substring(0, 6)} <span className="text-sm font-normal text-brand-gray-500">date</span></p></div>
        <div><p className="text-xl font-bold text-green-primary">{happening.time} <span className="text-sm font-normal text-brand-gray-500">time</span></p></div>
        <div><p className="text-xl font-bold text-green-primary">{ref} <span className="text-sm font-normal text-brand-gray-500">reference</span></p></div>
        {happening.price > 0 && (
          <div><p className="text-xl font-bold text-brand-black">{happening.price * totalGuests} {happening.currency} <span className="text-sm font-normal text-brand-gray-500">total</span></p></div>
        )}
        <div className="border-t border-brand-gray-100 pt-4 space-y-1">
          <p className="text-sm text-brand-black flex items-center gap-1"><MapPin size={14} className="text-green-primary" /> O'Learys Norrköping</p>
          <p className="text-sm text-green-primary">011-44 21 410</p>
          <p className="text-sm text-green-primary">norrkoping@olearys.com</p>
        </div>
      </div>
      <div className="px-5 mt-6">
        <button onClick={onDone} className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform" style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}>
          Make another booking
        </button>
      </div>
    </div>
  )
}

/* -- Main HappeningDetail screen -- */
export default function HappeningDetail() {
  const { happeningId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const eventState = location.state || {}
  const base = resolveHappening(happeningId)
  const happening = {
    ...base,
    title: eventState.eventName || base.title,
    date: eventState.eventDay && eventState.eventDate ? `${eventState.eventDay.toUpperCase()} ${eventState.eventDate.toUpperCase()}` : base.date,
    fullDate: eventState.eventDate ? `${eventState.eventDate} 2026` : base.fullDate,
  }

  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState(0)
  const [phase, setPhase] = useState('detail')
  const [showMore, setShowMore] = useState(false)
  const [addons, setAddons] = useState([])
  const [showAllAddons, setShowAllAddons] = useState(false)
  const [activeAddon, setActiveAddon] = useState(null)
  const totalGuests = adults + kids
  const totalPrice = happening.price * totalGuests
  const visibleAddons = showAllAddons ? ADDONS : ADDONS.slice(0, 3)

  if (phase === 'confirmation') {
    return (
      <div className="min-h-dvh flex flex-col bg-white">
        <HappeningConfirmation happening={happening} totalGuests={totalGuests} onDone={() => navigate('/book')} />
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Hero — flush to top */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a3a2a 0%, #0d1f15 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 30%, #2d5a3d 0%, transparent 60%)' }} />
        <button
          onClick={() => navigate('/book', { state: { tab: 'happenings' } })}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer z-10"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="relative px-5 pt-14 pb-8 text-center">
          <p className="text-white/50 text-[10px] font-medium tracking-widest uppercase">{happening.date}</p>
          <div className="flex items-center justify-center my-4">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Sparkles size={28} className="text-green-primary" />
            </div>
          </div>
          <h2 className="text-white font-bold text-lg">{happening.title}</h2>
          <p className="text-white/50 text-xs mt-1">{happening.time} – {happening.price > 0 ? `${happening.price}${happening.currency}/person` : 'Free entry'}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-24">
        {/* Description with More */}
        <p className="text-sm text-brand-gray-500 leading-relaxed mt-4">
          {showMore ? happening.description : `${happening.description.substring(0, 80)}...`}{' '}
          <button onClick={() => setShowMore(!showMore)} className="text-green-primary font-medium cursor-pointer">
            {showMore ? 'Less' : 'More'}
          </button>
        </p>

        {/* Guest / date bar */}
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl border border-brand-gray-300">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-brand-gray-500" />
            <span className="text-sm font-medium text-brand-black">{totalGuests} guests, {happening.fullDate.substring(0, 6)}</span>
          </div>
          <span className="text-xs text-brand-gray-500 cursor-pointer">Change</span>
        </div>

        {/* Special requests */}
        <div className="mt-4">
          <p className="text-sm font-semibold text-brand-black mb-2">Special requests</p>
          <textarea
            placeholder="e.g. any allergies, any specific game you want to watch and team you support"
            rows={2}
            className="w-full rounded-xl border border-brand-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-primary resize-none"
          />
        </div>

        {/* Seating time */}
        <div className="mt-5">
          <p className="text-xs font-bold text-brand-black uppercase tracking-wider mb-3">1. Seating starts at</p>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-primary text-white text-sm font-medium">
            <Clock size={14} />
            {happening.time}
          </div>
        </div>

        {/* Often combined with */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold text-brand-black uppercase tracking-wider">Often combined with</p>
            <span className="text-[10px] font-medium text-brand-gray-500 border border-brand-gray-300 rounded-full px-2 py-0.5">Optional</span>
          </div>
          <p className="text-xs text-brand-gray-500 mb-3">Tap to add activities with time & guests</p>

          <div className="space-y-2">
            {visibleAddons.map((addon) => {
              const added = addons.find((a) => a.id === addon.id)
              return (
                <button
                  key={addon.id}
                  onClick={() => !added && setActiveAddon(addon)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left cursor-pointer transition-colors ${added ? 'border-green-primary bg-green-primary/5' : 'border-brand-gray-200'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-brand-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-brand-gray-500">{addon.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-brand-black">{addon.name}</p>
                    <p className="text-xs text-green-primary">{addon.duration}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-brand-gray-500">{addon.unit}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${added ? 'border-green-primary bg-green-primary' : 'border-brand-gray-300'}`}>
                      {added && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {ADDONS.length > 3 && (
            <button
              onClick={() => setShowAllAddons(!showAllAddons)}
              className="mt-3 text-xs text-green-primary font-medium cursor-pointer flex items-center gap-1"
            >
              {showAllAddons ? '^ Show less' : `v View ${ADDONS.length - 3} more`}
            </button>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
        <button
          onClick={() => {
            const cartItems = [
              { name: happening.title, selectedTime: happening.time.replace(':', '.'), duration: 2, totalPrice: totalPrice },
              ...addons,
            ]
            navigate('/book/package-checkout', {
              state: { fromPackage: { cart: cartItems, guests: totalGuests } },
            })
          }}
          className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform"
          style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}
        >
          Add to booking
        </button>
      </div>

      {/* Addon modal */}
      {activeAddon && (
        <AddonModal
          addon={activeAddon}
          maxGuests={totalGuests}
          blockedHours={(() => {
            const s = new Set()
            const h = parseFloat(happening.time.replace(':', '.'))
            s.add(h)
            s.add(h + 1)
            return s
          })()}
          onClose={() => setActiveAddon(null)}
          onAdd={(item) => {
            setAddons((prev) => [...prev, item])
            setActiveAddon(null)
          }}
        />
      )}
    </div>
  )
}

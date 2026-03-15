import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, Clock, Calendar, Minus, Plus, X } from 'lucide-react'

const PACKAGES_DB = {
  'dinner-bowling': {
    name: 'Dinner & Bowling',
    desc: 'Enjoy a tasty meal followed by bowling lanes reserved just for your group. A great combo for any occasion!',
    duration: '2 hours',
    priceFrom: 349,
    guests: '4–12',
    img: 'https://media.umbraco.io/olearys-group/wyoj0nkv/img_0023-1-2_updated.jpg',
    steps: [
      { label: 'Dinner time', id: 'dinner', fixedDuration: 2 },
      { label: 'Bowling time', id: 'bowling' },
    ],
  },
  'dinner-5game': {
    name: 'Dinner & 5 Game Challenge',
    desc: 'Start with dinner, then compete in bowling, minigolf, basketball, shuffleboard & darts.',
    duration: '3–4 hours',
    priceFrom: 499,
    guests: '4–20',
    img: 'https://media.umbraco.io/olearys-group/w3clym4y/shuffle.jpg',
    steps: [
      { label: 'Dinner time', id: 'dinner', fixedDuration: 2 },
      { label: 'Game start', id: 'game' },
    ],
  },
  afterwork: {
    name: 'After Work',
    desc: 'Drinks, snacks and activities — the perfect way to unwind with colleagues after a long day.',
    duration: '2–3 hours',
    priceFrom: 299,
    guests: '6–30',
    img: 'https://media.umbraco.io/olearys-group/kx0hqm0f/guests_aw_dinner.jpg',
    steps: [
      { label: 'Start time', id: 'start' },
    ],
  },
  'bowling-dinner': {
    name: 'Bowling & Dinner',
    desc: 'Hit the lanes first, then sit down for a proper meal. The classic O\'Learys combo.',
    duration: '2 hours',
    priceFrom: 449,
    guests: '2–12',
    img: 'https://media.umbraco.io/olearys-group/wyoj0nkv/img_0023-1-2_updated.jpg',
    addonType: 'dinner',
    steps: [
      { label: 'Bowling time', id: 'bowling' },
      { label: 'Dinner time', id: 'dinner', fixedDuration: 2 },
    ],
  },
  '3kamp-dinner': {
    name: '3-kamp & Dinner',
    desc: 'Compete in bowling, minigolf & basketball, then refuel with a proper dinner. Min 4 people.',
    duration: '2.5–3 hours',
    priceFrom: 499,
    guests: '4–20',
    img: 'https://media.umbraco.io/olearys-group/hqtduiln/gamezone3.jpg',
    addonType: 'dinner',
    steps: [
      { label: '3-kamp start', id: '3kamp' },
      { label: 'Dinner time', id: 'dinner', fixedDuration: 2 },
    ],
  },
}

// Generate single-activity packages dynamically
const SINGLE_ACTIVITIES = {
  'activity-bowling': { name: 'Bowling', desc: '8 lanes in a great atmosphere. Max 5 guests per lane.', duration: '55 min', priceFrom: 449, guests: '1–5', unit: '449 kr/lane', img: 'https://media.umbraco.io/olearys-group/wyoj0nkv/img_0023-1-2_updated.jpg' },
  'activity-shuffleboard': { name: 'Shuffleboard', desc: '8 boards for 2–6 persons each. Tactics, technique and excitement.', duration: '1 hour', priceFrom: 349, guests: '2–6', unit: '349 kr/board', img: 'https://media.umbraco.io/olearys-group/w3clym4y/shuffle.jpg' },
  'activity-dart': { name: 'Interaktiv Dart', desc: 'Projected games on the board — a whole new way to play darts.', duration: '1 hour', priceFrom: 299, guests: '1–4', unit: '299 kr/board', img: 'https://media.umbraco.io/olearys-group/2y2ebwgm/interaktivdart1.jpeg' },
  'activity-blacklight': { name: 'Blacklight Minigolf', desc: '12-hole UV-lit course with glowing obstacles. No booking needed.', duration: '1 hour', priceFrom: 99, guests: '1–6', unit: '99 kr/person', img: 'https://media.umbraco.io/olearys-group/s00jqj4n/golfklubbor.jpg' },
  'activity-karaoke': { name: 'Karaokerum', desc: 'Private room with 80 000+ songs. Up to 12 people.', duration: '55 min', priceFrom: 699, guests: '2–12', unit: '699 kr/room', img: 'https://media.umbraco.io/olearys-group/abyba4pn/olearys1146.jpg' },
  'activity-biljard': { name: 'Biljard', desc: '2 tables in a secluded setting. Like your living room, but better.', duration: '1 hour', priceFrom: 299, guests: '2–4', unit: '299 kr/table', img: 'https://media.umbraco.io/olearys-group/abyba4pn/olearys1146.jpg' },
}

function resolvePackage(id) {
  if (PACKAGES_DB[id]) return PACKAGES_DB[id]
  if (SINGLE_ACTIVITIES[id]) {
    const a = SINGLE_ACTIVITIES[id]
    return {
      name: a.name,
      desc: a.desc,
      duration: a.duration,
      priceFrom: a.priceFrom,
      guests: a.guests,
      img: a.img,
      addonType: 'dinner',
      steps: [{ label: `${a.name} time`, id: 'activity' }],
    }
  }
  return PACKAGES_DB['dinner-bowling']
}

const ACTIVITY_ADDONS = [
  { id: 'karaoke', name: 'Karaokerum', duration: '55 min', price: 699, unit: '699 kr/room' },
  { id: 'dart', name: 'Interaktiv Dart', duration: '1 hour', price: 299, unit: '299 kr/board' },
  { id: 'shuffleboard', name: 'Shuffleboard', duration: '1 hour', price: 349, unit: '349 kr/board' },
  { id: 'biljard', name: 'Biljard', duration: '1 hour', price: 299, unit: '299 kr/table' },
  { id: 'blacklight', name: 'Blacklight Minigolf', duration: '1 hour', price: 99, unit: '99 kr/person' },
  { id: 'arcade', name: 'Arkadhall', duration: 'Drop-in', price: null, unit: 'Token-based' },
]

const DINNER_ADDONS = [
  { id: 'dinner', name: 'Dinner', duration: '1 hour', price: 169, unit: '169 kr/person' },
  { id: 'bowling', name: 'Bowling', duration: '55 min', price: 449, unit: '449 kr/lane' },
  { id: 'shuffleboard', name: 'Shuffleboard', duration: '1 hour', price: 349, unit: '349 kr/board' },
  { id: 'dart', name: 'Interaktiv Dart', duration: '1 hour', price: 299, unit: '299 kr/board' },
  { id: 'karaoke', name: 'Karaokerum', duration: '55 min', price: 699, unit: '699 kr/room' },
  { id: 'biljard', name: 'Biljard', duration: '1 hour', price: 299, unit: '299 kr/table' },
  { id: 'blacklight', name: 'Blacklight Minigolf', duration: '1 hour', price: 99, unit: '99 kr/person' },
]

const TIME_SLOTS = ['11.00', '12.00', '14.00', '15.00', '16.00', '17.00', '18.00', '19.00', '20.00', '21.00', '22.00', '23.00']
const BOOKED_SLOTS = ['18.00', '19.00']

/* Returns set of hour values that are occupied by a step selection */
function getOccupiedHours(stepTimes, steps) {
  const occupied = new Set()
  for (const step of steps) {
    const t = stepTimes[step.id]
    if (!t) continue
    const h = parseFloat(t)
    const dur = step.fixedDuration || 1
    for (let i = 0; i < dur; i++) occupied.add(h + i)
  }
  return occupied
}

function TimeGrid({ slots, booked, selected, blockedHours, fixedDuration, onSelect }) {
  const selectedHour = selected ? parseFloat(selected) : null

  return (
    <div className="grid grid-cols-4 gap-2">
      {slots.map((t) => {
        const tHour = parseFloat(t)
        const isBooked = booked.includes(t)
        const isBlocked = blockedHours.has(tHour)
        const isSelected = selected === t
        const isRange = fixedDuration && selectedHour != null && !isSelected && tHour > selectedHour && tHour < selectedHour + fixedDuration
        const disabled = isBooked || isBlocked

        return (
          <button
            key={t}
            onClick={() => !disabled && onSelect(t)}
            disabled={disabled}
            className={`py-2.5 rounded-full text-sm font-medium transition-colors border
              ${disabled ? 'text-brand-gray-300 border-brand-gray-100 cursor-not-allowed' : 'cursor-pointer'}
              ${isSelected ? 'bg-green-primary text-white border-green-primary' : ''}
              ${isRange ? 'bg-green-primary/20 text-green-primary border-green-primary/40' : ''}
              ${!disabled && !isSelected && !isRange ? 'text-brand-black border-brand-gray-300' : ''}
            `}
          >
            {t}
          </button>
        )
      })}
    </div>
  )
}

function AddonModal({ addon, onClose, onAdd, maxGuests, blockedHours }) {
  const [guests, setGuests] = useState(maxGuests)
  const [selectedTime, setSelectedTime] = useState(null)
  const [duration, setDuration] = useState(1)
  const price = (addon.price || 0) * duration
  const startHour = selectedTime ? parseFloat(selectedTime) : null

  // Combine package blocked hours with addon's own duration range for the grid
  const allBlocked = new Set(blockedHours)

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
            const isBooked = BOOKED_SLOTS.includes(t)
            const isBlocked = allBlocked.has(tHour)
            const isStart = selectedTime === t
            const inRange = startHour && !isStart && tHour > startHour && tHour < startHour + duration
            const disabled = isBooked || isBlocked

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
                {addon.price && <span className="text-sm font-bold text-green-primary ml-2">{price} kr</span>}
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

export default function PackageDetail() {
  const { packageId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const preSelectedTime = location.state?.preSelectedTime
  const pkg = resolvePackage(packageId)

  const [guests, setGuests] = useState(6)
  const [stepTimes, setStepTimes] = useState(() => {
    if (preSelectedTime && pkg.steps.length > 0) {
      return { [pkg.steps[0].id]: preSelectedTime }
    }
    return {}
  })
  const [addons, setAddons] = useState([])
  const [showAllAddons, setShowAllAddons] = useState(false)
  const [activeAddon, setActiveAddon] = useState(null)

  const allTimesSelected = pkg.steps.every((s) => stepTimes[s.id])
  const totalItems = 1 + addons.length // package + addons
  const addonList = pkg.addonType === 'dinner' ? DINNER_ADDONS : ACTIVITY_ADDONS
  const visibleAddons = showAllAddons ? addonList : addonList.slice(0, 3)

  // All occupied hours across all steps
  const allOccupied = getOccupiedHours(stepTimes, pkg.steps)

  // For each step, compute blocked hours = occupied by OTHER steps + venue booked
  function getBlockedForStep(stepId) {
    const blocked = new Set()
    BOOKED_SLOTS.forEach((t) => blocked.add(parseFloat(t)))
    for (const step of pkg.steps) {
      if (step.id === stepId) continue
      const t = stepTimes[step.id]
      if (!t) continue
      const h = parseFloat(t)
      const dur = step.fixedDuration || 1
      for (let i = 0; i < dur; i++) blocked.add(h + i)
    }
    return blocked
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Hero */}
      <div className="h-48 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
        {pkg.img && <img src={pkg.img} alt={pkg.name} className="absolute inset-0 w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
        <button
          onClick={() => navigate('/book', { state: { tab: pkg.addonType === 'dinner' ? 'play' : 'eat' } })}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer z-10"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-24">
        <h1 className="text-lg font-bold text-brand-black uppercase mt-5">{pkg.name}</h1>
        <div className="flex gap-2 mt-2 flex-wrap">
          <span className="text-xs px-3 py-1 rounded-full border border-brand-gray-300 text-brand-gray-500">{pkg.duration}</span>
          <span className="text-xs px-3 py-1 rounded-full border border-brand-gray-300 text-brand-gray-500">from {pkg.priceFrom} kr</span>
          <span className="text-xs px-3 py-1 rounded-full border border-brand-gray-300 text-brand-gray-500">{pkg.guests} guests</span>
        </div>
        <p className="text-sm text-brand-gray-500 mt-3 leading-relaxed">{pkg.desc}</p>

        {/* Guest / date bar */}
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl border border-brand-gray-300">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-brand-gray-500" />
            <span className="text-sm font-medium text-brand-black">{guests} guests, 14 Mar</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-7 h-7 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer">
              <Minus size={12} />
            </button>
            <button onClick={() => setGuests(guests + 1)} className="w-7 h-7 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer">
              <Plus size={12} />
            </button>
          </div>
        </div>

        {/* Time step selectors */}
        {pkg.steps.map((step, stepIdx) => {
          const blocked = getBlockedForStep(step.id)
          return (
            <div key={step.id} className="mt-5">
              <p className="text-xs font-bold text-brand-black uppercase tracking-wider mb-3">
                {stepIdx + 1}. {step.label}
              </p>
              <TimeGrid
                slots={TIME_SLOTS}
                booked={BOOKED_SLOTS}
                selected={stepTimes[step.id] || null}
                blockedHours={blocked}
                fixedDuration={step.fixedDuration}
                onSelect={(t) => setStepTimes((prev) => ({ ...prev, [step.id]: t }))}
              />
              {step.fixedDuration && stepTimes[step.id] && (
                <p className="text-xs text-brand-gray-500 mt-1.5">
                  {stepTimes[step.id]} – {(parseFloat(stepTimes[step.id]) + step.fixedDuration).toFixed(2)} ({step.fixedDuration}h)
                </p>
              )}
            </div>
          )
        })}

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

          {addonList.length > 3 && (
            <button
              onClick={() => setShowAllAddons(!showAllAddons)}
              className="mt-3 text-xs text-green-primary font-medium cursor-pointer flex items-center gap-1"
            >
              {showAllAddons ? '^ Show less' : `v View ${addonList.length - 3} more`}
            </button>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
        <button
          onClick={() => {
            if (!allTimesSelected) return
            const cartItems = [
              { name: pkg.name, selectedTime: stepTimes[pkg.steps[0].id], duration: pkg.steps[0].fixedDuration || 2, totalPrice: pkg.priceFrom },
              ...addons,
            ]
            navigate('/book/package-checkout', { state: { fromPackage: { cart: cartItems, guests } } })
          }}
          disabled={!allTimesSelected}
          className={`w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform ${allTimesSelected ? '' : 'opacity-50'}`}
          style={{ backgroundColor: allTimesSelected ? '#ffdc1e' : '#e8e8e8', color: '#3c3c3c' }}
        >
          Add to booking{totalItems > 1 ? ` (${totalItems} items)` : ''}
        </button>
      </div>

      {/* Addon modal */}
      {activeAddon && (
        <AddonModal
          addon={activeAddon}
          maxGuests={guests}
          blockedHours={allOccupied}
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

import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, X, MapPin, Minus, Plus, Cake, Heart, Briefcase, Calendar, Clock, Mail, Phone, User } from 'lucide-react'

const PARTY_TYPES = {
  kidsparty: { title: 'Kids Party', subtitle: 'Fun for the little ones!', icon: Cake, minGuests: 6, price: 'From €15/child' },
  birthdays: { title: 'Birthday Party', subtitle: 'Celebrate in style!', icon: Cake, minGuests: 4, price: 'From €25/person' },
  'team-building': { title: 'Team Building', subtitle: 'Build stronger teams', icon: Briefcase, minGuests: 8, price: 'Custom quote' },
  'date-night': { title: 'Date Night', subtitle: 'A perfect evening for two', icon: Heart, minGuests: 2, price: 'From €45/person' },
}

/* ── Phase 1: Inquiry Form ── */
function InquiryForm({ config, guests, setGuests, onSubmit }) {
  const [selectedTime, setSelectedTime] = useState(null)
  const [dateLabel, setDateLabel] = useState('Pick a date')
  const [datePicked, setDatePicked] = useState(false)
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')

  const Icon = config.icon
  const timePills = [
    { id: 'lunch', label: 'Lunch (12-14)' },
    { id: 'afternoon', label: 'Afternoon (14-17)' },
    { id: 'evening', label: 'Evening (17-21)' },
  ]

  return (
    <div className="pb-2">
      {/* Hero header */}
      <div className="rounded-b-3xl overflow-hidden relative" style={{ background: 'linear-gradient(180deg, #1a3a2a 0%, #0d1f15 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 30%, #2d5a3d 0%, transparent 60%)' }} />
        <div className="relative px-5 pt-4 pb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3">
            <Icon size={28} className="text-white" />
          </div>
          <h2 className="text-white font-bold text-lg">{config.title}</h2>
          <p className="text-white/50 text-sm mt-1">{config.subtitle}</p>
          <p className="text-green-primary text-xs font-medium mt-2">{config.price}</p>
        </div>
      </div>

      {/* Form */}
      <div className="px-5 mt-5 space-y-5">
        {/* Number of guests */}
        <div>
          <p className="text-sm font-semibold text-brand-black mb-2">Number of guests</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setGuests(Math.max(config.minGuests, guests - 1))}
              className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer active:scale-[0.97] transition-transform"
              aria-label="Decrease guests"
            >
              <Minus size={14} />
            </button>
            <span className="text-lg font-bold text-brand-black w-8 text-center">{guests}</span>
            <button
              onClick={() => setGuests(guests + 1)}
              className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer active:scale-[0.97] transition-transform"
              aria-label="Increase guests"
            >
              <Plus size={14} />
            </button>
            <span className="text-xs text-brand-gray-500">min {config.minGuests}</span>
          </div>
        </div>

        {/* Preferred date */}
        <div>
          <p className="text-sm font-semibold text-brand-black mb-2">Preferred date</p>
          <button
            onClick={() => { setDateLabel('March 2026'); setDatePicked(true) }}
            className="w-full flex items-center gap-3 rounded-xl border border-brand-gray-300 px-3 py-2.5 text-left cursor-pointer active:bg-brand-gray-100/50 transition-colors"
          >
            <Calendar size={16} className="text-brand-gray-500" />
            <span className={`text-sm ${datePicked ? 'text-brand-black font-medium' : 'text-brand-gray-500'}`}>{dateLabel}</span>
          </button>
        </div>

        {/* Preferred time */}
        <div>
          <p className="text-sm font-semibold text-brand-black mb-2">Preferred time</p>
          <div className="flex gap-2">
            {timePills.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTime(t.id)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-colors border cursor-pointer active:scale-[0.97] ${
                  selectedTime === t.id
                    ? 'bg-green-primary text-white border-green-primary'
                    : 'text-brand-black border-brand-gray-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact name */}
        <div>
          <p className="text-sm font-semibold text-brand-black mb-2">Contact name</p>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-500" />
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Your full name"
              className="w-full rounded-xl border border-brand-gray-300 pl-9 pr-3 py-2.5 text-sm outline-none focus:border-green-primary"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <p className="text-sm font-semibold text-brand-black mb-2">Email</p>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-xl border border-brand-gray-300 pl-9 pr-3 py-2.5 text-sm outline-none focus:border-green-primary"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <p className="text-sm font-semibold text-brand-black mb-2">Phone</p>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-500" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+46 70 123 45 67"
              className="w-full rounded-xl border border-brand-gray-300 pl-9 pr-3 py-2.5 text-sm outline-none focus:border-green-primary"
            />
          </div>
        </div>

        {/* Special requests */}
        <div>
          <p className="text-sm font-semibold text-brand-black mb-2">Special requests</p>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="e.g. dietary needs, decorations, cake preferences..."
            rows={3}
            className="w-full rounded-xl border border-brand-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-primary resize-none"
          />
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
        <button
          onClick={() => onSubmit({ guests, date: dateLabel, time: selectedTime })}
          className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform"
          style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}
        >
          Send inquiry
        </button>
      </div>
    </div>
  )
}

/* ── Phase 2: Confirmation ── */
function InquiryConfirmation({ config, formData, onDone }) {
  const refCode = useRef(
    `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 9000)}`
  )
  const ref = refCode.current

  const timeLabels = {
    lunch: 'Lunch (12-14)',
    afternoon: 'Afternoon (14-17)',
    evening: 'Evening (17-21)',
  }

  return (
    <div className="pb-8 -mt-16">
      {/* Dark header */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white" />
        </div>
        <div className="relative px-5 pt-14 pb-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-white font-bold italic text-lg">O'LEARYS</p>
            <button
              onClick={onDone}
              className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
              aria-label="Close confirmation"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
          <p className="text-green-primary text-sm leading-relaxed">
            Inquiry sent!<br />
            We'll get back to you within 24 hours.
          </p>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-4">
        {/* Pending badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-xs font-semibold text-amber-800">Pending</span>
        </div>

        {/* Summary */}
        <div>
          <p className="text-xs text-brand-gray-500 uppercase tracking-wider mb-1">Party type</p>
          <p className="text-lg font-bold text-brand-black">{config.title}</p>
        </div>

        <div>
          <p className="text-3xl font-bold text-brand-black">{formData.guests}</p>
          <p className="text-sm text-brand-gray-500">guests</p>
        </div>

        <div>
          <p className="text-xl font-bold text-green-primary">
            {formData.date} <span className="text-sm font-normal text-brand-gray-500">preferred date</span>
          </p>
        </div>

        <div>
          <p className="text-xl font-bold text-green-primary">
            {formData.time ? timeLabels[formData.time] : 'Not selected'}{' '}
            <span className="text-sm font-normal text-brand-gray-500">preferred time</span>
          </p>
        </div>

        <div>
          <p className="text-xl font-bold text-green-primary">
            {ref} <span className="text-sm font-normal text-brand-gray-500">reference</span>
          </p>
        </div>

        {/* Venue contact */}
        <div className="border-t border-brand-gray-100 pt-4 space-y-1">
          <p className="text-sm text-brand-black flex items-center gap-1">
            <MapPin size={14} className="text-green-primary" /> O'Learys Norrköping
          </p>
          <p className="text-sm text-green-primary">046-12 11 21</p>
          <p className="text-sm text-green-primary">booking@olearys.se</p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 mt-6">
        <button
          onClick={onDone}
          className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform"
          style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}
        >
          Back to booking
        </button>
      </div>
    </div>
  )
}

/* ── Main Controller ── */
export default function PartyBooking() {
  const { type } = useParams()
  const navigate = useNavigate()
  const config = PARTY_TYPES[type] || PARTY_TYPES['kidsparty']

  const [phase, setPhase] = useState('form')
  const [guests, setGuests] = useState(config.minGuests)
  const [formData, setFormData] = useState(null)

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {phase === 'form' && (
        <>
          <div className="px-4 pt-12 pb-2 flex items-center gap-3">
            <button
              onClick={() => navigate('/book')}
              className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2"
              aria-label="Go back"
            >
              <ChevronLeft size={24} className="text-brand-black" />
            </button>
          </div>
          <InquiryForm
            config={config}
            guests={guests}
            setGuests={setGuests}
            onSubmit={(data) => {
              setFormData(data)
              setPhase('confirmation')
            }}
          />
        </>
      )}
      {phase === 'confirmation' && formData && (
        <InquiryConfirmation
          config={config}
          formData={formData}
          onDone={() => navigate('/book')}
        />
      )}
    </div>
  )
}

import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
    includes: [
      'Pizza buffet (all-you-can-eat)',
      'Quiz entry for your team',
      'Reserved table',
      'Prize for top 3 teams',
    ],
  },
}

/* -- Confirmation screen -- */
function HappeningConfirmation({ happening, totalGuests, onDone }) {
  const refCode = useRef(
    `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 9000)}`
  )
  const ref = refCode.current

  return (
    <div className="pb-8 -mt-16">
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a3a2a 0%, #0d1f15 100%)' }}>
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
            Thanks for your booking.<br />
            A confirmation has been<br />
            sent to your email.
          </p>
        </div>
      </div>
      <div className="px-5 mt-6 space-y-4">
        <div>
          <p className="text-lg font-bold text-brand-black">{happening.title}</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-brand-black">{totalGuests}</p>
          <p className="text-sm text-brand-gray-500">guests</p>
        </div>
        <div>
          <p className="text-xl font-bold text-green-primary">
            {happening.fullDate.substring(0, 6)} <span className="text-sm font-normal text-brand-gray-500">date</span>
          </p>
        </div>
        <div>
          <p className="text-xl font-bold text-green-primary">
            {happening.time} <span className="text-sm font-normal text-brand-gray-500">time</span>
          </p>
        </div>
        <div>
          <p className="text-xl font-bold text-green-primary">
            {ref} <span className="text-sm font-normal text-brand-gray-500">reference</span>
          </p>
        </div>
        <div>
          <p className="text-xl font-bold text-brand-black">
            {happening.price * totalGuests}{happening.currency}{' '}
            <span className="text-sm font-normal text-brand-gray-500">total</span>
          </p>
        </div>
        <div className="border-t border-brand-gray-100 pt-4 space-y-1">
          <p className="text-sm text-brand-black flex items-center gap-1">
            <MapPin size={14} className="text-green-primary" /> O'Learys Norrköping
          </p>
          <p className="text-sm text-green-primary">046-12 11 21</p>
          <p className="text-sm text-green-primary">booking@olearys.se</p>
        </div>
      </div>
      <div className="px-5 mt-6">
        <button
          onClick={onDone}
          className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform"
          style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}
        >
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
  const happening = HAPPENINGS_DB[happeningId] || HAPPENINGS_DB['quiz-night']

  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState(0)
  const [phase, setPhase] = useState('detail') // detail | confirmation
  const totalGuests = adults + kids
  const totalPrice = happening.price * totalGuests

  if (phase === 'confirmation') {
    return (
      <div className="min-h-dvh flex flex-col bg-white">
        <HappeningConfirmation
          happening={happening}
          totalGuests={totalGuests}
          onDone={() => navigate('/book')}
        />
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Back button */}
      <div className="px-4 pt-12 pb-2 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2"
          aria-label="Go back"
        >
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
      </div>

      {/* Hero */}
      <div className="rounded-b-3xl overflow-hidden relative" style={{ background: 'linear-gradient(180deg, #1a3a2a 0%, #0d1f15 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 30%, #2d5a3d 0%, transparent 60%)' }} />
        <div className="relative px-5 pt-4 pb-8 text-center">
          <p className="text-white/50 text-[10px] font-medium tracking-widest uppercase">{happening.date}</p>
          <div className="flex items-center justify-center my-4">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Sparkles size={28} className="text-green-primary" />
            </div>
          </div>
          <h2 className="text-white font-bold text-lg">{happening.title}</h2>
          <p className="text-white/50 text-xs mt-1">{happening.time} -- {happening.price}{happening.currency}/person</p>
        </div>
      </div>

      {/* Event info */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-3 text-xs text-brand-gray-500">
          <span className="flex items-center gap-1"><Clock size={12} /> {happening.time}</span>
          <span className="flex items-center gap-1"><Calendar size={12} /> {happening.fullDate}</span>
          <span className="flex items-center gap-1"><MapPin size={12} /> O'Learys</span>
        </div>
        <p className="text-sm text-brand-black leading-relaxed mt-4">{happening.description}</p>
      </div>

      {/* What's included */}
      <div className="px-5 mt-5">
        <p className="text-xs font-bold text-brand-black uppercase tracking-wider mb-3">What's included</p>
        <div className="space-y-2.5">
          {happening.includes.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-green-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-brand-black">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Guest selector */}
      <div className="px-5 mt-6">
        <p className="text-xs font-bold text-brand-black uppercase tracking-wider mb-3">Guests</p>
        <div className="space-y-3">
          {/* Adults */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-brand-gray-300">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-brand-gray-500" />
              <span className="text-sm font-medium text-brand-black">Adults</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer active:bg-brand-gray-300 transition-colors"
                aria-label="Decrease adults"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-bold text-brand-black w-5 text-center">{adults}</span>
              <button
                onClick={() => setAdults(Math.min(20, adults + 1))}
                className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer active:bg-brand-gray-300 transition-colors"
                aria-label="Increase adults"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
          {/* Kids */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-brand-gray-300">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-brand-gray-500" />
              <span className="text-sm font-medium text-brand-black">Kids</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setKids(Math.max(0, kids - 1))}
                className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer active:bg-brand-gray-300 transition-colors"
                aria-label="Decrease kids"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-bold text-brand-black w-5 text-center">{kids}</span>
              <button
                onClick={() => setKids(Math.min(20, kids + 1))}
                className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer active:bg-brand-gray-300 transition-colors"
                aria-label="Increase kids"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
        {/* Total */}
        <div className="flex items-center justify-between mt-3 px-1">
          <span className="text-sm text-brand-gray-500">{totalGuests} guests total</span>
          <span className="text-sm font-bold text-brand-black">{totalPrice}{happening.currency}</span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA */}
      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
        <button
          onClick={() => setPhase('confirmation')}
          className="w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform"
          style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}
        >
          Book -- {totalPrice}{happening.currency}
        </button>
      </div>
    </div>
  )
}

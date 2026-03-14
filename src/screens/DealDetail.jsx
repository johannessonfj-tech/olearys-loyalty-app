import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Clock } from 'lucide-react'
import CelebrationOverlay from '../components/CelebrationOverlay'

const DEALS_DATA = {
  'sunday': {
    title: 'HALF PRICE SUNDAY DEAL',
    subtitle: 'HALF PRICE ACTIVITIES',
    desc: 'Every Sunday, enjoy all of our activities at 50% off for a limited time! Bowling, shuffleboard, darts — you name it, it\'s half price.',
    image: '/images/deal-sunday.png',
    validFor: '30 days',
    issuedBy: "O'Learys Group AB",
    terms: 'Valid on Sundays only. Cannot be combined with other offers. One redemption per visit.',
  },
  'burger': {
    title: '2 FOR 1 BURGER',
    subtitle: 'LIMITED TIME ONLY',
    desc: 'Valid for a limited time! Try our signature burgers. Get two for the price of one. Choose any burger from our menu.',
    image: '/images/deal-burger.png',
    validFor: '14 days',
    issuedBy: "O'Learys Group AB",
    terms: 'Valid for dine-in only. Both burgers must be of equal or lesser value. One redemption per table.',
  },
  'happy-hour': {
    title: 'EXTENDED HAPPY HOUR',
    subtitle: 'FRIDAY & SATURDAY',
    desc: 'Get an extra hour of happy hour pricing on all drinks. Valid every Friday and Saturday at your local O\'Learys.',
    image: '/images/deal-3.png',
    validFor: '21 days',
    issuedBy: "O'Learys Group AB",
    terms: 'Valid Fri–Sat only. Applies to all drinks on the happy hour menu.',
  },
}

export default function DealDetail() {
  const { dealId } = useParams()
  const navigate = useNavigate()
  const [activated, setActivated] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const deal = DEALS_DATA[dealId] || DEALS_DATA['sunday']

  const handleActivate = () => {
    setShowCelebration(true)
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white relative">
      {/* Celebration overlay */}
      {showCelebration && (
        <CelebrationOverlay
          message="Deal added to your wallet!"
          onDone={() => { setShowCelebration(false); setActivated(true) }}
        />
      )}

      {/* Header */}
      <div className="px-4 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2"
          aria-label="Go back"
        >
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
        <h1 className="text-sm font-bold text-brand-black uppercase tracking-wide">Claim Deal</h1>
      </div>

      {/* Deal image */}
      <div className="px-4">
        <div className="rounded-2xl overflow-hidden bg-brand-gray-100 aspect-[16/9]">
          <img
            src={deal.image}
            alt={deal.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-green-primary/10"><span class="text-green-primary font-bold text-lg text-center px-4">${deal.title}</span></div>`
            }}
          />
        </div>
      </div>

      {/* Title */}
      <div className="px-4 mt-4">
        <h2 className="text-xl font-bold text-brand-black">{deal.title}</h2>
        <p className="text-sm text-brand-gray-500 mt-0.5">{deal.subtitle}</p>
      </div>

      {/* Description */}
      <div className="px-4 mt-4">
        <p className="text-sm text-brand-black leading-relaxed">{deal.desc}</p>
      </div>

      {/* Details */}
      <div className="px-4 mt-6 space-y-3">
        <div className="flex justify-between py-3 border-b border-brand-gray-100">
          <span className="text-sm text-brand-gray-500">Valid for:</span>
          <span className="text-sm font-medium text-brand-black flex items-center gap-1">
            <Clock size={14} className="text-brand-gray-500" />
            {deal.validFor}
          </span>
        </div>
        <div className="flex justify-between py-3 border-b border-brand-gray-100">
          <span className="text-sm text-brand-gray-500">Issued by:</span>
          <span className="text-sm font-medium text-brand-black">{deal.issuedBy}</span>
        </div>
      </div>

      {/* Terms */}
      <div className="px-4 mt-4">
        <p className="text-xs text-brand-gray-500 leading-relaxed">{deal.terms}</p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Activate button */}
      <div className="px-4 pb-8 pt-4">
        <button
          onClick={handleActivate}
          disabled={activated}
          className={`w-full py-4 rounded-2xl text-sm font-bold cursor-pointer transition-all duration-200 active:scale-[0.97] ${
            activated
              ? 'bg-brand-gray-100 text-brand-gray-500'
              : 'bg-brand-black text-white'
          }`}
        >
          {activated ? 'Deal activated ✓' : 'Activate deal'}
        </button>
      </div>
    </div>
  )
}

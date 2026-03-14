import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronDown, Clock } from 'lucide-react'
import CelebrationOverlay from '../components/CelebrationOverlay'

const REWARDS_DATA = {
  'bowling': {
    name: 'BOWLING',
    desc: 'Valid for 1 bowling round including shoe rental',
    longDesc: 'Get a free bowling round at any O\'Learys location. This reward card is valid for one standard bowling round and includes shoe rental. Present the activated card at the bowling desk to redeem.',
    image: '/images/redeem-bowling.png',
    pts: 800,
    validFor: '30 days 1 hour',
    issuedBy: "O'Learys Group AB",
    items: '1 item',
  },
  'softdrink': {
    name: 'SOFT DRINK',
    desc: 'Valid for 1 soft drink including an extra ingredi...',
    longDesc: 'Get a soft drink of your choosing including an extra ingredient. This reward card is valid for any soft drink and includes an optional, complimentary add-on. This card will be added to your O\'Learys wallet.',
    image: '/images/redeem-softdrink.png',
    pts: 400,
    validFor: '30 days 1 hour',
    issuedBy: "O'Learys Group AB",
    items: '1 item',
  },
  'shuffleboard': {
    name: 'SHUFFLEBOARD',
    desc: 'Valid for 1 shuffleboard session',
    longDesc: 'Enjoy a free shuffleboard session at any O\'Learys venue. This reward covers a full game session for up to 4 players. Present the activated card at the activity desk.',
    image: '/images/redeem-shuffleboard.png',
    pts: 800,
    validFor: '30 days 1 hour',
    issuedBy: "O'Learys Group AB",
    items: '1 item',
  },
  'wings': {
    name: 'WINGS',
    desc: 'Valid for a portion of signature wings',
    longDesc: 'Redeem for a full portion of our signature chicken wings with your choice of sauce. Valid for dine-in at any O\'Learys location. This card will be added to your O\'Learys wallet.',
    image: '/images/redeem-wings.png',
    pts: 1200,
    validFor: '30 days 1 hour',
    issuedBy: "O'Learys Group AB",
    items: '1 item',
  },
}

export default function ClaimReward() {
  const { rewardId } = useParams()
  const navigate = useNavigate()
  const [activated, setActivated] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const reward = REWARDS_DATA[rewardId] || REWARDS_DATA['bowling']

  const handleActivate = () => {
    setShowCelebration(true)
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white relative">
      {/* Celebration overlay */}
      {showCelebration && (
        <CelebrationOverlay
          message="Added to your O'Learys wallet!"
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
        <h1 className="text-sm font-bold text-brand-black uppercase tracking-wide">Claim Reward Card</h1>
      </div>

      {/* Reward image card */}
      <div className="px-4">
        <div className="rounded-2xl overflow-hidden bg-brand-gray-100 relative">
          <div className="aspect-square max-h-[220px] w-full">
            <img
              src={reward.image}
              alt={reward.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML += `<div class="absolute inset-0 flex items-center justify-center bg-green-light/20"><span class="text-green-primary font-bold text-lg">${reward.name}</span></div>`
              }}
            />
          </div>
          {/* Items badge */}
          <span className="absolute top-3 right-3 bg-green-primary/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {reward.items}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 mt-4">
        <h2 className="text-xl font-bold text-brand-black">{reward.name}</h2>
        <p className="text-sm text-brand-gray-500 mt-0.5">{reward.desc}</p>
      </div>

      {/* Long description */}
      <div className="px-4 mt-4">
        <p className="text-sm text-brand-black leading-relaxed">{reward.longDesc}</p>
      </div>

      {/* Valid in */}
      <div className="px-4 mt-5">
        <p className="text-sm text-brand-gray-500">Valid in</p>
      </div>

      {/* Details */}
      <div className="px-4 mt-3 space-y-0">
        <div className="flex justify-between py-3 border-b border-brand-gray-100">
          <span className="text-sm text-brand-gray-500">Valid for:</span>
          <span className="text-sm text-brand-black flex items-center gap-1">
            <Clock size={14} className="text-brand-gray-500" />
            {reward.validFor}
          </span>
        </div>
        <div className="flex justify-between py-3 border-b border-brand-gray-100">
          <span className="text-sm text-brand-gray-500">Issued by:</span>
          <span className="text-sm text-brand-black">{reward.issuedBy}</span>
        </div>
      </div>

      {/* Redeem options */}
      <div className="px-4 mt-3">
        <button
          onClick={() => setShowTerms(!showTerms)}
          className="flex items-center justify-between w-full py-3 cursor-pointer"
          aria-expanded={showTerms}
        >
          <span className="text-sm text-brand-black">Redeem in the app or in store</span>
          <ChevronDown
            size={16}
            className={`text-brand-gray-500 transition-transform duration-200 ${showTerms ? 'rotate-180' : ''}`}
          />
        </button>
        {showTerms && (
          <p className="text-xs text-brand-gray-500 pb-3 leading-relaxed">
            Show the activated reward card at the register or present it to your server. The card will be automatically deducted from your wallet upon use.
          </p>
        )}
      </div>

      {/* Terms link */}
      <div className="px-4 mt-1">
        <p className="text-xs text-brand-gray-500">
          See <span className="underline cursor-pointer">terms & conditions</span> for more details about the card.
        </p>
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
          {activated ? 'Reward activated ✓' : `Activate reward  |  ${reward.pts.toLocaleString()} points`}
        </button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Plus, Star, Shield, Trophy, Award, Upload, RefreshCw, Check, Settings } from 'lucide-react'

const SPORTS = [
  { id: 'hockey', label: 'Hockey' },
  { id: 'football', label: 'Football' },
  { id: 'baseball', label: 'Baseball' },
  { id: 'american-football', label: 'American Football' },
  { id: 'handball', label: 'Handball' },
  { id: 'floorball', label: 'Floorball' },
  { id: 'tennis', label: 'Tennis' },
  { id: 'bowling', label: 'Bowling' },
]

const TIERS = [
  { name: 'Regular', pct: 5, Icon: Award },
  { name: 'Starter', pct: 30, Icon: Shield },
  { name: 'All Star', pct: 62, Icon: Trophy },
  { name: 'MVP', pct: 95, Icon: Star },
]
const CURRENT_TIER = 'All Star'
const NEXT_TIER = 'MVP'
const POINTS = 58231
const PROGRESS_PCT = 72

const DEALS = [
  { id: 'sunday', image: '/images/deal-sunday.png' },
  { id: 'burger', image: '/images/deal-burger.png' },
]

const REDEEM = [
  { id: 'bowling', name: 'Bowling', pts: 800, image: '/images/redeem-bowling.png' },
  { id: 'softdrink', name: 'Soft Drink', pts: 400, image: '/images/redeem-softdrink.png' },
  { id: 'shuffleboard', name: 'Shuffleboard', pts: 800, image: '/images/redeem-shuffleboard.png' },
]

function ProgressBar() {
  // Icon centers are at these % positions; the track runs between the first and last
  const firstPct = TIERS[0].pct
  const lastPct = TIERS[TIERS.length - 1].pct
  const filledPct = Math.min(((PROGRESS_PCT - firstPct) / (lastPct - firstPct)) * 100, 100)

  return (
    <div className="mt-6 mb-2 overflow-visible">
      <div className="relative overflow-visible" style={{ height: 90 }}>
        {/* Track line — thick, runs between first and last icon centers */}
        <div
          className="absolute h-[5px] bg-brand-gray-300 rounded-full"
          style={{ left: `${firstPct - 3}%`, right: `${100 - lastPct}%`, top: 24 }}
        />
        <div
          className="absolute h-[5px] bg-green-primary rounded-full transition-all duration-300"
          style={{ left: `${firstPct - 3}%`, width: `${(filledPct * (lastPct - firstPct) / 100) + 3}%`, top: 24 }}
        />

        {/* Tier icons */}
        {TIERS.map((tier) => {
          const reached = PROGRESS_PCT >= tier.pct
          const isCurrent = tier.name === CURRENT_TIER
          return (
            <div
              key={tier.name}
              className="absolute flex flex-col items-center"
              style={{ left: `${tier.pct}%`, transform: 'translateX(-50%)', top: 0 }}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: isCurrent ? 52 : 40,
                  height: isCurrent ? 52 : 40,
                  backgroundColor: reached ? 'rgba(45,155,135,0.12)' : '#f0f0f0',
                  border: isCurrent ? '2px solid #2d9b87' : 'none',
                  marginTop: isCurrent ? -3 : 3,
                }}
              >
                <tier.Icon
                  size={isCurrent ? 26 : 20}
                  className={reached ? 'text-green-primary' : 'text-brand-gray-500'}
                  fill={reached ? '#2d9b87' : 'none'}
                  strokeWidth={1.5}
                />
              </div>
              <span
                className={`mt-1.5 whitespace-nowrap ${
                  isCurrent ? 'text-xs font-bold text-green-primary' : 'text-[10px] font-medium text-brand-gray-500'
                }`}
              >
                {tier.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DealCard({ deal, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[310px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 active:scale-[0.98]"
      aria-label="View deal"
    >
      <div className="aspect-[16/9] bg-brand-gray-100">
        <img src={deal.image} alt="Deal" className="w-full h-full object-cover rounded-2xl" />
      </div>
    </button>
  )
}

function RedeemCard({ reward, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[140px] flex flex-col cursor-pointer group"
      aria-label={`${reward.name} — ${reward.pts} points`}
    >
      <div className="aspect-square rounded-2xl overflow-hidden bg-brand-gray-100 relative">
        <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-200 group-active:scale-90">
          <ChevronRight size={14} className="text-brand-black" />
        </div>
      </div>
      <p className="font-semibold text-sm text-brand-black mt-2 text-left">{reward.name}</p>
      <div className="flex items-center gap-0.5 mt-0.5">
        <Plus size={12} className="text-brand-black" />
        <span className="text-sm text-brand-black">{reward.pts}</span>
      </div>
    </button>
  )
}

function PlayerCardModal({ onClose }) {
  const [step, setStep] = useState('view') // view | generate | preview
  const [selectedSport, setSelectedSport] = useState(null)

  // Step 3: Preview generated card — Regenerate, Cancel, Keep
  if (step === 'preview') {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={onClose}>
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <div className="w-[280px] rounded-2xl overflow-hidden shadow-2xl">
            <img src="/images/player-card-baseball.png" alt="Generated player card" className="w-full h-auto" />
          </div>
          <div className="flex gap-2 mt-4 justify-center">
            <button
              onClick={() => setStep('generate')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-sm font-semibold text-brand-black cursor-pointer transition-transform duration-200 active:scale-95"
            >
              <RefreshCw size={14} />
              Regenerate
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-full bg-white/20 border border-white/40 text-sm font-semibold text-white cursor-pointer transition-transform duration-200 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-green-primary text-sm font-semibold text-white cursor-pointer transition-transform duration-200 active:scale-95"
            >
              <Check size={14} />
              Keep
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Step 2: Choose sport + upload image option
  if (step === 'generate') {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={onClose}>
        <div className="bg-white rounded-2xl w-[340px] mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="px-5 pt-5 pb-4">
            <h3 className="text-lg font-bold text-brand-black mb-1">Generate Player Card</h3>
            <p className="text-sm text-brand-gray-500 mb-4">Choose your sport to create a custom card</p>

            {/* Upload image */}
            <button className="w-full mb-4 py-3 rounded-xl border-2 border-dashed border-brand-gray-300 flex items-center justify-center gap-2 cursor-pointer text-sm font-medium text-brand-gray-500 transition-colors duration-150 hover:border-green-primary hover:text-green-primary">
              <Upload size={16} />
              Upload your photo
            </button>

            <p className="text-xs text-brand-gray-500 mb-2 font-semibold">Select sport</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {SPORTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSport(s.id)}
                  className={`py-3 px-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-150 ${
                    selectedSport === s.id
                      ? 'bg-green-primary text-white'
                      : 'bg-brand-gray-100 text-brand-black'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <button
              disabled={!selectedSport}
              onClick={() => selectedSport && setStep('preview')}
              className={`w-full py-3 rounded-full font-semibold text-sm cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 ${
                selectedSport
                  ? 'bg-green-primary text-white active:scale-[0.97]'
                  : 'bg-brand-gray-200 text-brand-gray-400 cursor-not-allowed'
              }`}
            >
              <RefreshCw size={14} />
              Generate Card
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Step 1: View current card — Upload or Generate
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={onClose}>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <div className="w-[280px] rounded-2xl overflow-hidden shadow-2xl">
          <img src="/images/player-card-baseball.png" alt="Player card" className="w-full h-auto" />
        </div>
        <div className="flex gap-3 mt-4 justify-center">
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-sm font-semibold text-brand-black cursor-pointer transition-transform duration-200 active:scale-95">
            <Upload size={14} />
            Upload Photo
          </button>
          <button
            onClick={() => setStep('generate')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-green-primary text-sm font-semibold text-white cursor-pointer transition-transform duration-200 active:scale-95"
          >
            <RefreshCw size={14} />
            Generate
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [showCardModal, setShowCardModal] = useState(false)

  return (
    <div className="pb-4">
      {/* Top section */}
      <div className="px-5 pt-14">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-base text-brand-gray-500">Good evening,</p>
              <button
                onClick={() => navigate('/settings')}
                className="w-7 h-7 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-90"
                aria-label="Settings"
              >
                <Settings size={14} className="text-brand-gray-500" />
              </button>
            </div>
            <h1 className="text-[28px] font-bold text-brand-black leading-tight">Daniel Svantesson</h1>
            <div className="flex items-center gap-1.5 mt-2">
              <Star size={16} className="text-green-primary" fill="#2d9b87" />
              <span className="text-lg font-semibold text-brand-black">
                {POINTS.toLocaleString('sv-SE')} Bonus Points
              </span>
            </div>
          </div>

          {/* Highscore + Player card */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <button
              onClick={() => navigate('/highscore')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-gray-100 cursor-pointer transition-transform duration-200 active:scale-95"
            >
              <Trophy size={12} className="text-green-primary" />
              <span className="text-[11px] font-semibold text-brand-black">Highscore</span>
            </button>
            <button
              onClick={() => setShowCardModal(true)}
              className="w-[72px] rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform duration-200 active:scale-95"
            >
              <img src="/images/player-card-baseball.png" alt="Player card" className="w-full h-auto" />
            </button>
          </div>
        </div>

        {/* Progress bar with tier icons */}
        <ProgressBar />

        {/* Benefits — plain text with checkmarks like wireframe */}
        <div className="mt-1">
          <p className="text-sm font-semibold text-brand-black mb-1.5">Your benefits:</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9.5L7 14L15 4" stroke="#2d9b87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-sm font-bold text-brand-black">5% DISCOUNT</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9.5L7 14L15 4" stroke="#2d9b87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-sm font-bold text-brand-black">Earn 1.5x ON POINTS</span>
            </div>
          </div>
        </div>

        {/* See your benefits button */}
        <button
          onClick={() => navigate('/benefits')}
          className="w-full mt-3 py-2.5 rounded-full border-2 border-green-primary text-green-primary font-semibold text-sm cursor-pointer transition-transform duration-200 active:scale-[0.97]"
          aria-label="See your benefits"
        >
          See your benefits
        </button>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-brand-gray-300 mx-5 mt-5" />

      {/* Deals */}
      <section className="mt-5 px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-brand-black">Deal</h2>
          <button onClick={() => navigate('/deals')} className="flex items-center gap-0.5 text-sm text-green-primary cursor-pointer" aria-label="See all deals">
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="-mx-5 px-5">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {DEALS.map((d) => (
              <DealCard key={d.id} deal={d} onClick={() => navigate(`/deals/${d.id}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* Redeem with points */}
      <section className="mt-7 px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-brand-black">Redeem with points</h2>
          <button onClick={() => navigate('/rewards')} className="flex items-center gap-0.5 text-sm text-green-primary cursor-pointer" aria-label="See all rewards">
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {REDEEM.map((r) => (
            <RedeemCard key={r.id} reward={r} onClick={() => navigate(`/rewards/${r.id}`)} />
          ))}
        </div>
      </section>

      {/* Player Card Modal */}
      {showCardModal && (
        <PlayerCardModal onClose={() => setShowCardModal(false)} />
      )}
    </div>
  )
}

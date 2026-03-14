import { useNavigate } from 'react-router-dom'
import { ChevronRight, Plus, Star, Shield, Trophy, Award } from 'lucide-react'

// Tiers with their position on the bar (0-100%) and icons
const TIERS = [
  { name: 'Regular', pct: 10, Icon: Award },
  { name: 'Starter', pct: 33, Icon: Shield },
  { name: 'All Star', pct: 62, Icon: Trophy },
  { name: 'MVP', pct: 100, Icon: Star },
]
const CURRENT_TIER = 'All Star'
const NEXT_TIER = 'MVP'
const POINTS = 58231
const PROGRESS_PCT = 72

const CURRENT_BENEFITS = [
  { label: '5% DISCOUNT', check: true },
  { label: 'Earn 1.5x ON POINTS', check: true },
]

const DEALS = [
  { id: 'sunday', image: '/images/deal-sunday.png' },
  { id: 'burger', image: '/images/deal-burger.png' },
  { id: 'happy-hour', image: '/images/deal-3.png' },
]

const REDEEM = [
  { id: 'bowling', name: 'Bowling', pts: 800, image: '/images/redeem-bowling.png' },
  { id: 'softdrink', name: 'Soft Drink', pts: 400, image: '/images/redeem-softdrink.png' },
  { id: 'shuffleboard', name: 'Shuffleboard', pts: 800, image: '/images/redeem-shuffleboard.png' },
]

function ProgressBar() {
  return (
    <div className="mt-6 px-2">
      {/* Bar with icons */}
      <div className="relative">
        {/* Track */}
        <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 bg-brand-gray-300 rounded-full" />
        <div
          className="absolute top-1/2 left-0 h-[3px] -translate-y-1/2 bg-green-primary rounded-full transition-all duration-300"
          style={{ width: `${PROGRESS_PCT}%` }}
        />

        {/* Tier icons */}
        <div className="relative flex justify-between" style={{ paddingLeft: '2%', paddingRight: '0%' }}>
          {TIERS.map((tier) => {
            const reached = PROGRESS_PCT >= tier.pct
            const isCurrent = tier.name === CURRENT_TIER
            const iconSize = isCurrent ? 36 : 28
            return (
              <div
                key={tier.name}
                className="flex flex-col items-center"
                style={{ position: 'absolute', left: `${tier.pct}%`, transform: 'translateX(-50%)' }}
              >
                <div
                  className={`rounded-full flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'w-12 h-12 bg-green-primary/10 border-2 border-green-primary'
                      : reached
                        ? 'w-9 h-9 bg-green-primary/10'
                        : 'w-9 h-9 bg-brand-gray-100'
                  }`}
                >
                  <tier.Icon
                    size={isCurrent ? 22 : 16}
                    className={reached ? 'text-green-primary' : 'text-brand-gray-500'}
                    fill={isCurrent ? '#2d9b87' : 'none'}
                    strokeWidth={isCurrent ? 1.5 : 2}
                  />
                </div>
                <span
                  className={`mt-1.5 text-[10px] font-semibold whitespace-nowrap ${
                    isCurrent ? 'text-green-primary text-xs' : reached ? 'text-brand-gray-500' : 'text-brand-gray-500'
                  }`}
                >
                  {tier.name}
                </span>
              </div>
            )
          })}
        </div>
        {/* Spacer for icon height */}
        <div style={{ height: 70 }} />
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

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="pb-4">
      {/* Header card */}
      <div className="mx-4 mt-10 bg-white rounded-2xl border border-brand-gray-300 p-5 shadow-sm">
        <p className="text-base text-brand-gray-500">Good evening,</p>
        <h1 className="text-2xl font-bold mt-0.5 text-brand-black">Daniel Svantesson</h1>
        <div className="flex items-center gap-1 mt-2">
          <Star size={16} className="text-green-primary" fill="#2d9b87" />
          <span className="text-base font-semibold text-brand-black">
            {POINTS.toLocaleString('sv-SE')} Bonus Points
          </span>
        </div>

        {/* Progress bar with icons */}
        <ProgressBar />

        {/* Benefits chips */}
        <div className="mt-4">
          <p className="text-sm font-semibold text-brand-black mb-2">Your benefits:</p>
          <div className="flex gap-2">
            {CURRENT_BENEFITS.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-gray-300 bg-white"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.5 12L13 4" stroke="#2d9b87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs font-bold text-brand-black uppercase">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* See your benefits */}
        <button
          onClick={() => navigate('/benefits')}
          className="w-full mt-4 py-3 rounded-full border-2 border-green-primary text-green-primary font-semibold text-sm cursor-pointer transition-transform duration-200 active:scale-[0.97]"
          aria-label="See your benefits"
        >
          See your benefits
        </button>
      </div>

      {/* Deals — large image-only swipeable cards */}
      <section className="mt-8 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-brand-black">Deal</h2>
          <button
            onClick={() => navigate('/deals')}
            className="flex items-center gap-0.5 text-sm text-green-primary cursor-pointer"
            aria-label="See all deals"
          >
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="-mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {DEALS.map((d) => (
              <DealCard key={d.id} deal={d} onClick={() => navigate(`/deals/${d.id}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* Redeem with points */}
      <section className="mt-8 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-brand-black">Redeem with points</h2>
          <button
            onClick={() => navigate('/rewards')}
            className="flex items-center gap-0.5 text-sm text-green-primary cursor-pointer"
            aria-label="See all rewards"
          >
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {REDEEM.map((r) => (
            <RedeemCard key={r.id} reward={r} onClick={() => navigate(`/rewards/${r.id}`)} />
          ))}
        </div>
      </section>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { ChevronRight, Plus, Star, Shield, Trophy, Award } from 'lucide-react'

const TIERS = [
  { name: 'Regular', pct: 10, Icon: Award },
  { name: 'Starter', pct: 33, Icon: Shield },
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
          style={{ left: `${firstPct}%`, right: `${100 - lastPct}%`, top: 24 }}
        />
        <div
          className="absolute h-[5px] bg-green-primary rounded-full transition-all duration-300"
          style={{ left: `${firstPct}%`, width: `${filledPct * (lastPct - firstPct) / 100}%`, top: 24 }}
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

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="pb-4">
      {/* Top section — no card border, clean like wireframe */}
      <div className="px-5 pt-12">
        <p className="text-base text-brand-gray-500">Good evening,</p>
        <h1 className="text-[28px] font-bold mt-0.5 text-brand-black leading-tight">Daniel Svantesson</h1>
        <div className="flex items-center gap-1.5 mt-3">
          <Star size={16} className="text-green-primary" fill="#2d9b87" />
          <span className="text-lg font-semibold text-brand-black">
            {POINTS.toLocaleString('sv-SE')} Bonus Points
          </span>
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
    </div>
  )
}

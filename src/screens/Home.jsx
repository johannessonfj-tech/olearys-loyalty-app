import { useNavigate } from 'react-router-dom'
import { ChevronRight, Trophy, Plus } from 'lucide-react'

const TIERS = ['Regular', 'All Star', 'MVP']
const CURRENT_TIER = 'All Star'
const NEXT_TIER = 'MVP'
const POINTS = 58231
const PROGRESS_PCT = 68

const DEALS = [
  { id: 'sunday', title: 'HALF PRICE SUNDAY DEAL', subtitle: 'HALF PRICE ACTIVITIES', cta: "LET'S PLAY", image: '/images/deal-sunday.png' },
  { id: 'burger', title: '2 FOR 1 BURGER', subtitle: 'LIMITED TIME ONLY', cta: "LET'S PLAY", image: '/images/deal-burger.png' },
  { id: 'happy-hour', title: 'EXTENDED HAPPY HOUR', subtitle: 'FRIDAY & SATURDAY', cta: "LET'S PLAY", image: '/images/deal-3.png' },
]

const REDEEM = [
  { id: 'bowling', name: 'Bowling', pts: 800, image: '/images/redeem-bowling.png' },
  { id: 'softdrink', name: 'Soft Drink', pts: 400, image: '/images/redeem-softdrink.png' },
  { id: 'shuffleboard', name: 'Shuffleboard', pts: 800, image: '/images/redeem-shuffleboard.png' },
]

function ProgressBar() {
  const tierCount = TIERS.length
  return (
    <div className="mt-4">
      <p className="text-sm text-brand-gray-500 mb-2">Your progress to {NEXT_TIER}</p>
      <div className="relative h-4 rounded-full bg-brand-gray-100">
        <div
          className="absolute left-0 top-0 h-4 rounded-full bg-green-primary transition-all duration-300"
          style={{ width: `${PROGRESS_PCT}%` }}
        />
        {TIERS.map((tier, i) => {
          const pct = i === 0 ? 0 : i === tierCount - 1 ? 100 : Math.round((i / (tierCount - 1)) * 100)
          const reached = PROGRESS_PCT >= pct
          return (
            <div key={tier} className="absolute top-1/2 -translate-y-1/2" style={{ left: `calc(${pct}% - 8px)` }}>
              <div className={`w-4 h-4 rounded-full border-2 border-white ${reached ? 'bg-green-primary' : 'bg-brand-gray-300'}`} />
            </div>
          )
        })}
      </div>
      <div className="flex justify-between mt-1">
        {TIERS.map((t) => (
          <span key={t} className={`text-[10px] font-medium ${t === CURRENT_TIER ? 'text-green-primary' : 'text-brand-gray-500'}`}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function DealCard({ deal, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[310px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 active:scale-[0.98] relative"
      aria-label={deal.title}
    >
      {/* Full-bleed image */}
      <div className="aspect-[16/9] bg-green-primary relative">
        <img
          src={deal.image}
          alt={deal.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        {/* Overlay content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4">
          <p className="text-white font-bold text-lg leading-tight">{deal.title}</p>
          <p className="text-white/80 text-xs mt-0.5">{deal.subtitle}</p>
          <span className="mt-2 self-start bg-green-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {deal.cta}
          </span>
        </div>
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
        <img
          src={reward.image}
          alt={reward.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.innerHTML += `<div class="absolute inset-0 flex items-center justify-center bg-green-light/20"><span class="text-green-primary font-bold text-sm">${reward.name}</span></div>`
          }}
        />
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
    <div className="px-4 pt-10 pb-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-base text-brand-gray-500">Good evening,</p>
          <h1 className="text-2xl font-bold mt-0.5 text-brand-black">Daniel Svantesson</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-green-primary">All Star</span>
            <span className="text-sm font-medium text-brand-black">◇ {POINTS.toLocaleString('sv-SE')} Bonus Points</span>
          </div>
        </div>
        <div className="w-14 rounded-xl overflow-hidden border-2 border-green-primary flex items-center justify-center bg-brand-gray-100"
          style={{ minHeight: '72px', minWidth: '56px' }}
        >
          <div className="text-center px-1">
            <Trophy size={24} className="text-green-primary mx-auto" />
            <div className="text-[8px] font-bold mt-0.5 text-green-primary">ALL STAR</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar />

      {/* See your benefits */}
      <button
        onClick={() => navigate('/benefits')}
        className="w-full mt-4 py-2.5 rounded-full border border-green-primary text-green-primary font-medium text-sm cursor-pointer transition-transform duration-200 active:scale-[0.97]"
        aria-label="See your benefits"
      >
        See your benefits
      </button>

      {/* Deals — large swipeable cards */}
      <section className="mt-8">
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

      {/* Redeem with points — image cards like screenshots */}
      <section className="mt-8">
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

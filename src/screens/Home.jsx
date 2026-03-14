import { useNavigate } from 'react-router-dom'
import { ChevronRight, Gift, Tag, Percent, Trophy } from 'lucide-react'

const TIERS = ['Regular', 'All Star', 'MVP']
const CURRENT_TIER = 'All Star'
const NEXT_TIER = 'MVP'
const POINTS = 58231
const PROGRESS_PCT = 68

const DEALS = [
  { id: 1, label: '2-for-1 Burgers', sub: 'Valid Mon–Thu', dark: false },
  { id: 2, label: 'Happy Hour +1h', sub: 'Fri & Sat', dark: true },
  { id: 3, label: 'Match Day Platter', sub: 'All Premier League', dark: false },
]

const REDEEM = [
  { id: 1, label: 'Free Beer', pts: '500 pts', Icon: Gift },
  { id: 2, label: 'Loaded Fries', pts: '350 pts', Icon: Tag },
  { id: 3, label: '10% off bill', pts: '800 pts', Icon: Percent },
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
            <div
              key={tier}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `calc(${pct}% - 8px)` }}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 border-white ${reached ? 'bg-green-primary' : 'bg-brand-gray-300'}`}
              />
            </div>
          )
        })}
      </div>
      <div className="flex justify-between mt-1">
        {TIERS.map((t) => (
          <span
            key={t}
            className={`text-[10px] font-medium ${t === CURRENT_TIER ? 'text-green-primary' : 'text-brand-gray-500'}`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
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
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-green-primary">
              All Star
            </span>
            <span className="text-sm font-medium text-brand-black">
              ◇ {POINTS.toLocaleString('sv-SE')} Bonus Points
            </span>
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

      {/* See your benefits — navigates to /benefits */}
      <button
        onClick={() => navigate('/benefits')}
        className="w-full mt-4 py-2.5 rounded-full border border-green-primary text-green-primary font-medium text-sm cursor-pointer transition-transform duration-200 active:scale-[0.97]"
        aria-label="See your benefits"
      >
        See your benefits
      </button>

      {/* Deals */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-brand-black">Deal</h2>
          <button className="flex items-center gap-0.5 text-sm text-green-primary cursor-pointer" aria-label="See all deals">
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {DEALS.map((d) => (
            <div
              key={d.id}
              className={`flex-shrink-0 w-32 h-36 rounded-xl flex flex-col justify-between p-3 cursor-pointer transition-transform duration-200 active:scale-[0.97] ${d.dark ? 'bg-green-dark' : 'bg-green-primary'}`}
              role="button"
              tabIndex={0}
              aria-label={d.label}
            >
              <div />
              <div>
                <p className="text-white font-semibold text-sm leading-tight">{d.label}</p>
                <p className="text-white/70 text-xs mt-0.5">{d.sub}</p>
              </div>
              <div className="self-end">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <ChevronRight size={14} color="white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Redeem with points */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-brand-black">Redeem with points</h2>
          <button className="flex items-center gap-0.5 text-sm text-green-primary cursor-pointer" aria-label="See all redemption options">
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {REDEEM.map((r) => (
            <div
              key={r.id}
              className="flex-shrink-0 w-32 h-32 rounded-xl border border-brand-gray-300 bg-brand-gray-100 flex flex-col justify-between p-3 cursor-pointer transition-transform duration-200 active:scale-[0.97]"
              role="button"
              tabIndex={0}
              aria-label={`Redeem ${r.label} for ${r.pts}`}
            >
              <div className="w-8 h-8 rounded-full bg-white border border-brand-gray-300 flex items-center justify-center">
                <r.Icon size={16} className="text-green-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-brand-black">{r.label}</p>
                <p className="text-xs mt-0.5 font-medium text-green-primary">{r.pts}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

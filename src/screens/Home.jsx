import { useState } from 'react'
import { ChevronRight, X } from 'lucide-react'

const TIERS = ['Regular', 'All Star', 'MVP']
const CURRENT_TIER = 'All Star'
const NEXT_TIER = 'MVP'
const POINTS = 58231
const PROGRESS_PCT = 68 // % toward next tier

const BENEFITS = [
  { id: 1, title: 'Birthday bonus', desc: 'Double points on your birthday month.' },
  { id: 2, title: 'Priority booking', desc: 'Skip the queue — book tables up to 7 days in advance.' },
  { id: 3, title: 'Exclusive events', desc: 'Access to All Star member-only match nights.' },
  { id: 4, title: 'Free drink upgrade', desc: 'Free size upgrade on any drink, once per visit.' },
]

const DEALS = [
  { id: 1, label: '2-for-1 Burgers', sub: 'Valid Mon–Thu', color: '#2d9b87' },
  { id: 2, label: 'Happy Hour +1h', sub: 'Fri & Sat', color: '#23695a' },
  { id: 3, label: 'Match Day Platter', sub: 'All Premier League', color: '#2d9b87' },
]

const REDEEM = [
  { id: 1, label: 'Free Beer', pts: '500 pts', color: '#f5f5f5' },
  { id: 2, label: 'Loaded Fries', pts: '350 pts', color: '#f5f5f5' },
  { id: 3, label: '10% off bill', pts: '800 pts', color: '#f5f5f5' },
]

function ProgressBar() {
  const tierCount = TIERS.length
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-500 mb-2">Your progress to {NEXT_TIER}</p>
      <div className="relative h-4 rounded-full bg-gray-200">
        <div
          className="absolute left-0 top-0 h-4 rounded-full transition-all"
          style={{ width: `${PROGRESS_PCT}%`, backgroundColor: '#2d9b87' }}
        />
        {/* Milestone dots */}
        {TIERS.map((tier, i) => {
          const pct = i === 0 ? 0 : i === tierCount - 1 ? 100 : Math.round((i / (tierCount - 1)) * 100)
          const reached = PROGRESS_PCT >= pct
          return (
            <div
              key={tier}
              className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `calc(${pct}% - 8px)` }}
            >
              <div
                className="w-4 h-4 rounded-full border-2 border-white"
                style={{ backgroundColor: reached ? '#2d9b87' : '#e0e0e0' }}
              />
            </div>
          )
        })}
      </div>
      {/* Tier labels */}
      <div className="flex justify-between mt-1">
        {TIERS.map((t) => (
          <span
            key={t}
            className="text-[10px] font-medium"
            style={{ color: t === CURRENT_TIER ? '#2d9b87' : '#9e9e9e' }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function BenefitsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div className="bg-white w-full max-w-[390px] rounded-t-2xl p-6 pb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold" style={{ color: '#3c3c3c' }}>Your benefits</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
            <X size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {BENEFITS.map((b) => (
            <div key={b.id} className="p-4 rounded-xl border border-gray-200">
              <p className="font-semibold text-sm" style={{ color: '#3c3c3c' }}>{b.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <span className="text-xs text-gray-400">Benefits for All Star members</span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [showBenefits, setShowBenefits] = useState(false)

  return (
    <div className="px-4 pt-10 pb-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-base text-gray-500">Good evening,</p>
          <h1 className="text-2xl font-bold mt-0.5" style={{ color: '#3c3c3c' }}>Daniel Svantesson</h1>
          <div className="flex items-center gap-2 mt-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: '#2d9b87' }}
            >
              All Star
            </span>
            <span className="text-sm font-medium" style={{ color: '#3c3c3c' }}>
              ◇ {POINTS.toLocaleString('sv-SE')} Bonus Points
            </span>
          </div>
        </div>
        {/* Avatar / sports card */}
        <div
          className="w-14 h-18 rounded-xl overflow-hidden border-2 flex items-center justify-center"
          style={{ borderColor: '#2d9b87', minHeight: '72px', minWidth: '56px', backgroundColor: '#f5f5f5' }}
        >
          <div className="text-center px-1">
            <div className="text-2xl">⚽</div>
            <div className="text-[8px] font-bold mt-0.5" style={{ color: '#2d9b87' }}>ALL STAR</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar />

      {/* See your benefits */}
      <button
        onClick={() => setShowBenefits(true)}
        className="w-full mt-4 py-2.5 rounded-full border font-medium text-sm transition-colors active:scale-95"
        style={{ borderColor: '#2d9b87', color: '#2d9b87', backgroundColor: 'transparent' }}
      >
        See your benefits
      </button>

      {/* Deals */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold" style={{ color: '#3c3c3c' }}>Deal</h2>
          <button className="flex items-center gap-0.5 text-sm" style={{ color: '#2d9b87' }}>
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {DEALS.map((d) => (
            <div
              key={d.id}
              className="flex-shrink-0 w-32 h-36 rounded-xl flex flex-col justify-between p-3 cursor-pointer active:scale-95 transition-transform"
              style={{ backgroundColor: d.color }}
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
          <h2 className="text-base font-bold" style={{ color: '#3c3c3c' }}>Redeem with points</h2>
          <button className="flex items-center gap-0.5 text-sm" style={{ color: '#2d9b87' }}>
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {REDEEM.map((r) => (
            <div
              key={r.id}
              className="flex-shrink-0 w-32 h-32 rounded-xl border border-gray-200 flex flex-col justify-between p-3 cursor-pointer active:scale-95 transition-transform"
              style={{ backgroundColor: r.color }}
            >
              <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-lg">
                🎁
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: '#3c3c3c' }}>{r.label}</p>
                <p className="text-xs mt-0.5 font-medium" style={{ color: '#2d9b87' }}>{r.pts}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showBenefits && <BenefitsModal onClose={() => setShowBenefits(false)} />}
    </div>
  )
}

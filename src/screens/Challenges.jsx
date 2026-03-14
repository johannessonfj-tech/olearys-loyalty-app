import { useState } from 'react'
import { Trophy, Target, Pizza, Star, Clock, Coins } from 'lucide-react'

const TABS = [
  { id: 'unlocked', label: 'Unlocked', count: 3 },
  { id: 'active', label: 'Active', count: 1 },
  { id: 'finished', label: 'Finished', count: 0 },
  { id: 'fame', label: 'Hall of Fame', count: null },
]

const CHALLENGES = [
  {
    id: 1,
    type: 'sports',
    title: 'Matchday Experience Liverpool vs Manchester United',
    desc: "Play 5 rounds of bowling at O'Learys for a chance to visit Liverpool and watch the game",
    daysLeft: 21,
    points: 8736,
    sponsor: 'Carlsberg',
    tab: 'unlocked',
  },
  {
    id: 2,
    type: 'activity',
    title: 'Bowling King',
    desc: 'Play 10 bowling rounds for 3000 points and a special prize',
    points: 3000,
    Icon: Target,
    tab: 'unlocked',
  },
  {
    id: 3,
    type: 'activity',
    title: 'Pizza Party',
    desc: 'Order 3 pizzas in a single visit and earn bonus points',
    points: 1500,
    Icon: Pizza,
    tab: 'unlocked',
  },
  {
    id: 4,
    type: 'sports',
    title: 'Champions League Night',
    desc: "Watch 2 Champions League matches at O'Learys to unlock exclusive rewards",
    daysLeft: 14,
    points: 2000,
    sponsor: 'Heineken',
    tab: 'active',
  },
]

function SportsChallengeCard({ c }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-brand-gray-300">
      {/* Hero image area */}
      <div className="relative h-32 flex items-center justify-center bg-[#1a2637]">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse at center, #2d5a3d 0%, #1a2637 70%)' }}
        />
        <div className="relative flex items-center gap-6 px-4">
          <div className="text-center">
            <Trophy size={28} className="text-white/80 mx-auto" />
            <div className="text-white text-xs font-medium mt-1 opacity-80">Stadium</div>
          </div>
          {c.sponsor && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
              <p className="text-white font-bold text-sm">{c.sponsor}</p>
            </div>
          )}
        </div>
        <div className="absolute top-3 left-3 bg-black/50 rounded-full px-2.5 py-1 flex items-center gap-1">
          <Clock size={10} className="text-white" />
          <span className="text-white text-[10px] font-medium">{c.daysLeft} days left</span>
        </div>
        <div className="absolute top-3 right-3 bg-black/50 rounded-full px-2.5 py-1 flex items-center gap-1">
          <Coins size={10} className="text-white" />
          <span className="text-white text-[10px] font-medium">{c.points.toLocaleString()}</span>
        </div>
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-bold text-sm leading-snug text-brand-black">{c.title}</h3>
        <p className="text-xs text-brand-gray-500 mt-1.5 leading-relaxed">{c.desc}</p>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white bg-green-primary cursor-pointer transition-transform duration-200 active:scale-[0.97]">
            Join
          </button>
          <button className="flex-1 py-2.5 rounded-lg text-sm font-semibold border border-brand-gray-300 text-brand-black cursor-pointer transition-transform duration-200 active:scale-[0.97]">
            Details
          </button>
        </div>
      </div>
    </div>
  )
}

function ActivityChallengeCard({ c }) {
  const Icon = c.Icon || Star
  return (
    <div className="rounded-2xl p-5 relative overflow-hidden bg-green-primary">
      <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10" />
      <div className="absolute -right-2 -bottom-10 w-20 h-20 rounded-full bg-white/10" />
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <h3 className="font-bold text-lg text-white leading-tight">{c.title}</h3>
          <p className="text-white/80 text-xs mt-2 leading-relaxed">{c.desc}</p>
          <div className="mt-4">
            <button className="py-2 px-5 rounded-lg text-sm font-semibold text-white border border-white/40 cursor-pointer transition-transform duration-200 active:scale-[0.97]">
              Join
            </button>
          </div>
        </div>
        <Icon size={40} className="text-white/40" />
      </div>
      <div className="mt-3 flex items-center gap-1">
        <Coins size={12} className="text-white/70" />
        <span className="text-white text-xs font-semibold">{c.points.toLocaleString()} pts</span>
      </div>
    </div>
  )
}

export default function Challenges() {
  const [activeTab, setActiveTab] = useState('unlocked')
  const filtered = CHALLENGES.filter((c) => c.tab === activeTab)

  return (
    <div className="pb-4">
      {/* Tabs */}
      <div className="flex border-b border-brand-gray-300 px-4 pt-10 gap-1 overflow-x-auto no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 pb-3 px-1 text-sm font-medium border-b-2 cursor-pointer transition-colors duration-200 ${
              activeTab === t.id
                ? 'border-green-primary text-green-primary'
                : 'border-transparent text-brand-gray-500'
            }`}
            aria-pressed={activeTab === t.id}
          >
            {t.label}
            {t.count !== null && (
              <span
                className={`text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${
                  activeTab === t.id
                    ? 'bg-green-primary text-white'
                    : 'bg-brand-gray-300 text-brand-gray-500'
                }`}
              >
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="px-4 mt-5 space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-brand-gray-500">
            <Trophy size={32} className="mx-auto mb-2 text-brand-gray-300" />
            <p className="text-sm">No challenges here yet</p>
          </div>
        ) : (
          filtered.map((c) =>
            c.type === 'sports' ? (
              <SportsChallengeCard key={c.id} c={c} />
            ) : (
              <ActivityChallengeCard key={c.id} c={c} />
            )
          )
        )}
      </div>
    </div>
  )
}

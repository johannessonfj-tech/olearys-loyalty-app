import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Target, Star, Clock, Coins, Award } from 'lucide-react'

const TABS = [
  { id: 'unlocked', label: 'Unlocked', count: 2 },
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
    id: 5,
    type: 'progress',
    title: 'Burger Ronaldo',
    desc: 'Buy 15 burgers for the achievement and 2000 points',
    current: 7,
    target: 15,
    points: 2000,
    tab: 'active',
  },
]

const HALL_OF_FAME = {
  bonus: [
    { name: 'Daniel Andersson', tier: 'MVP', score: '52 325', color: '#ffdc1e' },
    { name: 'Yousef Ali', tier: 'MVP', score: '48 362', color: '#e0e0e0' },
    { name: 'Bengt Jönsson', tier: 'MVP', score: '47 301', color: '#f4c28c' },
    { name: 'Klara Andersson', tier: 'All-Star', score: '32 552', color: null },
    { name: 'Erik Lindström', tier: 'All-Star', score: '28 440', color: null },
    { name: 'Sara Pettersson', tier: 'Starter', score: '21 103', color: null },
    { name: 'Mohammed Hassan', tier: 'All-Star', score: '19 875', color: null },
    { name: 'Lisa Bergman', tier: 'Starter', score: '15 220', color: null },
    { name: 'Oscar Nilsson', tier: 'Regular', score: '12 640', color: null },
    { name: 'Fatima Al-Rashid', tier: 'Starter', score: '9 310', color: null },
  ],
  bowling: [
    { name: 'Andrea Andersson', tier: 'Starter', rounds: 21, score: '300', color: '#ffdc1e' },
    { name: 'Kabas Ali', tier: 'MVP', rounds: 19, score: '300', color: '#e0e0e0' },
    { name: 'Klara Jönsson', tier: 'All-Star', rounds: 20, score: '275', color: '#f4c28c' },
    { name: 'Klara Andersson', tier: 'Starter', rounds: 20, score: '270', color: null },
    { name: 'Jonas Ekström', tier: 'All-Star', rounds: 18, score: '265', color: null },
    { name: 'Amina Yusuf', tier: 'MVP', rounds: 17, score: '258', color: null },
    { name: 'Henrik Larsson', tier: 'Starter', rounds: 16, score: '245', color: null },
    { name: 'Sofia Magnusson', tier: 'Regular', rounds: 15, score: '230', color: null },
    { name: 'David Okafor', tier: 'All-Star', rounds: 14, score: '220', color: null },
    { name: 'Emma Johansson', tier: 'Starter', rounds: 12, score: '210', color: null },
  ],
}

function SportsChallengeCard({ c, onClick }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-brand-gray-300">
      {/* Stadium hero image placeholder */}
      <div className="relative h-40 overflow-hidden">
        {/* Layered stadium background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #2d5a3d 0%, #1a3a2a 40%, #0d1f15 100%)' }} />
        {/* Field lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[60%] left-0 right-0 h-[1px] bg-white" />
          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-20 h-10 border border-white rounded-t-full" style={{ borderBottom: 'none' }} />
        </div>
        {/* Crowd dots */}
        <div className="absolute top-0 left-0 right-0 h-12 flex flex-wrap gap-[2px] px-2 pt-2 opacity-20">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 bg-black/50 rounded-full px-2.5 py-1 flex items-center gap-1">
          <Clock size={10} className="text-white" />
          <span className="text-white text-[10px] font-medium">{c.daysLeft} days left</span>
        </div>
        <div className="absolute top-3 right-3 bg-black/50 rounded-full px-2.5 py-1 flex items-center gap-1">
          <Coins size={10} className="text-white" />
          <span className="text-white text-[10px] font-medium">{c.points.toLocaleString()}</span>
        </div>

        {/* Sponsor circle badge */}
        {c.sponsor && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
            <div className="w-16 h-16 rounded-full bg-white shadow-lg flex flex-col items-center justify-center border-2 border-brand-gray-100">
              <p className="text-green-dark font-bold text-[10px] leading-tight">{c.sponsor}</p>
              <p className="text-brand-gray-500 text-[7px]">0.0% Alc.</p>
            </div>
          </div>
        )}
      </div>

      <div className={`p-4 bg-white ${c.sponsor ? 'pt-10' : 'pt-4'}`}>
        <h3 className="font-bold text-sm leading-snug text-brand-black">{c.title}</h3>
        <p className="text-xs text-brand-gray-500 mt-1.5 leading-relaxed">{c.desc}</p>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white bg-green-primary cursor-pointer transition-transform duration-200 active:scale-[0.97]">Join</button>
          <button onClick={onClick} className="flex-1 py-2.5 rounded-lg text-sm font-semibold border border-brand-gray-300 text-brand-black cursor-pointer transition-transform duration-200 active:scale-[0.97]">Details</button>
        </div>
      </div>
    </div>
  )
}

function ActivityChallengeCard({ c, onClick }) {
  return (
    <div className="rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform" onClick={onClick}>
      {/* Bowling illustration placeholder */}
      <div className="relative h-48 overflow-hidden" style={{ background: 'linear-gradient(135deg, #2d9b87 0%, #1a6b5a 100%)' }}>
        {/* Bowling lane lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-[20%] w-[1px] h-full bg-white" />
          <div className="absolute bottom-0 left-[40%] w-[1px] h-full bg-white" />
          <div className="absolute bottom-0 left-[60%] w-[1px] h-full bg-white" />
          <div className="absolute bottom-0 left-[80%] w-[1px] h-full bg-white" />
        </div>
        {/* Bowling pins */}
        <div className="absolute right-6 bottom-4 flex flex-col items-center gap-1 opacity-30">
          <div className="flex gap-1">
            <div className="w-3 h-6 bg-white rounded-full" />
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-6 bg-white rounded-full" />
            <div className="w-3 h-6 bg-white rounded-full" />
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-6 bg-white rounded-full" />
            <div className="w-3 h-6 bg-white rounded-full" />
            <div className="w-3 h-6 bg-white rounded-full" />
          </div>
        </div>
        {/* Ball */}
        <div className="absolute right-24 bottom-6 w-10 h-10 rounded-full bg-white/20 border-2 border-white/30" />

        {/* Text content */}
        <div className="relative p-5 flex flex-col justify-end h-full">
          <h3 className="font-bold text-2xl text-white leading-tight">{c.title}</h3>
          <p className="text-white/80 text-sm mt-2 leading-relaxed max-w-[200px]">{c.desc}</p>
        </div>
      </div>
    </div>
  )
}

function ProgressChallengeCard({ c, onClick }) {
  const pct = Math.round((c.current / c.target) * 100)
  return (
    <div className="rounded-2xl overflow-hidden border border-brand-gray-300 cursor-pointer active:scale-[0.98] transition-transform" onClick={onClick}>
      {/* Burger hero placeholder with goal net */}
      <div className="relative h-44 overflow-hidden" style={{ background: 'linear-gradient(180deg, #23695a 0%, #1a4d3f 100%)' }}>
        {/* Goal net lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`v${i}`} className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: `${12 + i * 11}%` }} />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`h${i}`} className="absolute left-0 right-0 h-[1px] bg-white" style={{ top: `${20 + i * 18}%` }} />
          ))}
        </div>
        {/* Burger icon placeholder */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-10 h-6 rounded-lg bg-amber-600/60 border-t-4 border-amber-400/60" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-2xl font-bold text-white uppercase">{c.title}</h3>
          <p className="text-white/70 text-xs mt-1">{c.desc}</p>
        </div>
      </div>
      <div className="p-4 bg-white">
        {/* Progress bar */}
        <div className="relative">
          <div className="h-3 rounded-full bg-brand-gray-100">
            <div className="h-3 rounded-full bg-green-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] font-bold text-green-primary bg-green-primary/10 px-1.5 py-0.5 rounded-full">{c.current}</span>
            <span className="text-[10px] font-bold text-brand-gray-500 bg-brand-gray-100 px-1.5 py-0.5 rounded-full">{c.target}</span>
          </div>
          <p className="text-center text-xs text-brand-gray-500 mt-1">{c.current} / {c.target} burgers</p>
        </div>
        <div className="mt-3 flex items-center justify-center gap-6">
          <div className="flex items-center gap-1">
            <Award size={14} className="text-brand-gray-500" />
            <span className="text-[10px] font-bold text-brand-black">ACHIEVEMENT</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy size={14} className="text-green-primary" />
            <span className="text-[10px] font-bold text-brand-black">{c.points.toLocaleString()} POINTS</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function HallOfFame() {
  const [sub, setSub] = useState('bonus')
  const data = HALL_OF_FAME[sub]
  const showRounds = sub === 'bowling'

  return (
    <div className="px-4 mt-5">
      {/* Crest */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gray-100 mb-2">
          <Trophy size={28} className="text-brand-yellow" fill="#ffdc1e" />
        </div>
        <p className="text-xs font-bold uppercase tracking-wider text-brand-black">Hall of Fame</p>
      </div>

      {/* Sub tabs */}
      <div className="flex justify-center gap-8 mb-4">
        {['bonus', 'bowling'].map((t) => (
          <button
            key={t}
            onClick={() => setSub(t)}
            className={`text-sm font-medium capitalize cursor-pointer pb-1 border-b-2 transition-colors ${
              sub === t ? 'border-green-primary text-green-primary' : 'border-transparent text-brand-gray-500'
            }`}
          >
            {t === 'bonus' ? 'Bonus' : 'Bowling'}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="text-[10px] uppercase text-brand-gray-500 tracking-wider">
            <th className="text-left py-2">Name</th>
            {showRounds && <th className="text-right py-2">Rounds</th>}
            <th className="text-right py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p, i) => (
            <tr key={i}>
              <td className="py-3" style={p.color ? { backgroundColor: p.color + '40' } : undefined}>
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-lg bg-brand-gray-300 flex items-center justify-center flex-shrink-0">
                    <Star size={16} className="text-brand-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-black">{p.name}</p>
                    {p.tier && <p className="text-[10px] text-brand-gray-500">Level {p.tier}</p>}
                  </div>
                </div>
              </td>
              {showRounds && (
                <td className="py-3 text-right px-2" style={p.color ? { backgroundColor: p.color + '40' } : undefined}>
                  <span className="text-sm font-semibold text-brand-black">{p.rounds}</span>
                </td>
              )}
              <td className="py-3 text-right px-2" style={p.color ? { backgroundColor: p.color + '40' } : undefined}>
                <span className="text-sm font-bold text-brand-black">{p.score}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Challenges() {
  const navigate = useNavigate()
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
              activeTab === t.id ? 'border-green-primary text-green-primary' : 'border-transparent text-brand-gray-500'
            }`}
          >
            {t.label}
            {t.count !== null && (
              <span className={`text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${
                activeTab === t.id ? 'bg-green-primary text-white' : 'bg-brand-gray-300 text-brand-gray-500'
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'fame' ? (
        <HallOfFame />
      ) : (
        <div className="px-4 mt-5 space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-brand-gray-500">
              <Trophy size={32} className="mx-auto mb-2 text-brand-gray-300" />
              <p className="text-sm">No challenges here yet</p>
            </div>
          ) : (
            filtered.map((c) => {
              if (c.type === 'sports') return <SportsChallengeCard key={c.id} c={c} onClick={() => navigate(`/challenges/${c.id}`)} />
              if (c.type === 'progress') return <ProgressChallengeCard key={c.id} c={c} onClick={() => navigate(`/challenges/${c.id}`)} />
              return <ActivityChallengeCard key={c.id} c={c} onClick={() => navigate(`/challenges/${c.id}`)} />
            })
          )}
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Coins, MapPin, Check, Award } from 'lucide-react'

const TABS = [
  { id: 'unlocked', label: 'Unlocked', count: 3 },
  { id: 'active', label: 'Active', count: 3 },
  { id: 'finished', label: 'Finished', count: 0 },
  { id: 'fame', label: 'Hall of Fame', count: null },
]

const MiniPin = ({ size = 11 }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 14 20" fill="none" aria-hidden>
    <path
      d="M7 1.2 C 9.6 1.2 10.6 4 10.2 6.6 C 9.8 8.6 9.4 9.6 9.4 11 C 9.4 13.5 11 15 11 17 C 11 18.6 9.4 19 7 19 C 4.6 19 3 18.6 3 17 C 3 15 4.6 13.5 4.6 11 C 4.6 9.6 4.2 8.6 3.8 6.6 C 3.4 4 4.4 1.2 7 1.2 Z"
      fill="#ffffff"
      stroke="#1f5c50"
      strokeWidth="0.7"
    />
    <rect x="4.4" y="4.6" width="5.2" height="1.2" fill="#c8102e" />
    <rect x="4.4" y="6.6" width="5.2" height="1.2" fill="#c8102e" />
  </svg>
)

const TrophyOutline = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2d9b87"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
)

const AwardOutline = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3c3c3c"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="9" r="6" />
    <path d="M9 14.5L7.5 22l4.5-3 4.5 3-1.5-7.5" />
  </svg>
)

function StepTracker({ done, total }) {
  return (
    <div className="px-1">
      <div className="flex items-center">
        {Array.from({ length: total }).map((_, i) => {
          const filled = i < done
          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-shrink-0 ${
                  filled
                    ? 'bg-green-primary'
                    : 'bg-brand-gray-100 text-brand-gray-400 border border-brand-gray-200'
                }`}
              >
                {filled ? <MiniPin size={11} /> : i + 1}
              </div>
              {i < total - 1 && (
                <div className="flex-1 h-[3px] mx-1 bg-brand-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${i < done - 1 ? 'bg-green-primary' : ''}`}
                    style={{ width: i < done - 1 ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MatchdayCard({ onJoin }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-brand-gray-200">
      <div className="relative">
        <img src="/images/matchday-card.png" alt="" className="w-full block" />
        <div className="absolute top-3 right-3 bg-brand-yellow text-brand-black rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md">
          <Check size={12} strokeWidth={3} />
          <span className="text-[11px] font-extrabold tracking-wide">FREE TO JOIN</span>
        </div>
      </div>
      <div className="px-4 py-3">
        <button
          onClick={onJoin}
          className="w-full py-3 rounded-xl bg-green-primary text-white font-bold text-[14px] cursor-pointer transition-transform active:scale-[0.98]"
        >
          Join
        </button>
      </div>
    </div>
  )
}

function BowlingKingCard({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl bg-white border border-brand-gray-200 overflow-hidden cursor-pointer transition-transform active:scale-[0.99]"
    >
      <div className="relative h-[180px] overflow-hidden">
        <img src="/images/challenge-bowling-king.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 55%)' }}
        />
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <p className="text-[19px] font-extrabold leading-tight">Bowling King</p>
          <p className="text-[12px] text-white/90 mt-0.5">Play 10 rounds. 3 000 pts + a special prize.</p>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center gap-2 whitespace-nowrap">
        <Coins size={14} className="text-brand-black" />
        <span className="text-[13px] font-extrabold text-brand-black">3 000 pts</span>
        <span className="ml-auto text-[11px] text-brand-gray-500 font-medium">+ limited edition bottle</span>
      </div>
    </div>
  )
}

function GlobetrotterCard({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl bg-white border border-brand-gray-200 overflow-hidden cursor-pointer transition-transform active:scale-[0.99]"
    >
      <div className="relative h-[180px] overflow-hidden" style={{ backgroundColor: '#1f5c50' }}>
        <img
          src="/images/challenge-globetrotter.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '50% 50%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0) 100%)' }}
        />
        <div className="absolute top-3 left-3 bg-white/95 text-brand-black rounded-full px-3 py-1 flex items-center gap-1.5">
          <MapPin size={12} className="text-brand-black" />
          <span className="text-[11px] font-bold">10 cities</span>
        </div>
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <p className="text-[19px] font-extrabold leading-tight">Globetrotter</p>
          <p className="text-[12px] text-white/90 mt-0.5">Visit 10 O'Learys across the world.</p>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center gap-2 whitespace-nowrap">
        <Coins size={14} className="text-brand-black" />
        <span className="text-[13px] font-extrabold text-brand-black">2 000 pts</span>
        <span className="ml-auto text-[11px] text-brand-gray-500 font-medium">3 of 10 visited</span>
      </div>
    </div>
  )
}

function ActiveCard({ title, body, done, total, unit, prize, headerColor = '#23695a', onClick }) {
  const isStrike = done >= total
  return (
    <div
      onClick={onClick}
      className="rounded-2xl bg-white border border-brand-gray-200 overflow-hidden cursor-pointer transition-transform active:scale-[0.99]"
    >
      <div className="px-5 pt-4 pb-4 text-white text-center" style={{ backgroundColor: headerColor }}>
        <p className="text-[18px] font-extrabold tracking-wide">{title}</p>
        <p className="text-[12px] text-white/85 mt-1 leading-snug whitespace-pre-line">{body}</p>
      </div>

      <div className="px-5 pt-5 pb-3">
        <StepTracker done={done} total={total} />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-[11px] text-brand-gray-500 font-medium uppercase tracking-[0.14em]">Progress</p>
          <p className="text-[13px] font-extrabold text-brand-black tabular-nums">
            {done}
            <span className="text-brand-gray-400 font-semibold">/{total}</span> {unit}
          </p>
        </div>
      </div>

      <div className="border-t border-brand-gray-100 px-5 py-3 flex items-center justify-center gap-8">
        <div className="flex items-center gap-1.5">
          <AwardOutline size={20} />
          <span className="text-[12px] font-bold text-brand-black tracking-wider">ACHIEVEMENT</span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrophyOutline size={20} />
          <span className="text-[12px] font-bold text-green-primary tracking-wider whitespace-nowrap">{prize}</span>
        </div>
      </div>

      {isStrike && (
        <div className="border-t border-brand-gray-100 px-5 py-2.5 bg-brand-yellow/30 text-center">
          <span className="text-[11px] font-extrabold text-brand-black tracking-wider">YOU'RE IN THE DRAW</span>
        </div>
      )}
    </div>
  )
}

function UnlockedTab({ navigate }) {
  return (
    <div className="px-5 pt-5 pb-6 space-y-4">
      <MatchdayCard onJoin={() => navigate('/challenges/1?joined=true')} />
      <BowlingKingCard onClick={() => navigate('/challenges/2')} />
      <GlobetrotterCard onClick={() => navigate('/challenges/6')} />
    </div>
  )
}

function ActiveTab({ navigate }) {
  return (
    <div className="px-5 pt-5 pb-6 space-y-4">
      <ActiveCard
        title="MATCHDAY EXPERIENCE LIVERPOOL & ARSENAL"
        body={'Check in 4 times in 60 days for a chance to win\n2x match tickets'}
        done={2}
        total={4}
        unit="check-ins"
        prize="MATCH TICKETS"
        onClick={() => navigate('/challenges/1')}
      />
      <ActiveCard
        title="BURGER RONALDO"
        body="Buy 15 burgers for the achievement and 2000 points"
        done={7}
        total={15}
        unit="burgers"
        prize="2 000 POINTS"
        onClick={() => navigate('/challenges/5')}
      />
      <ActiveCard
        title="PROFESSIONAL QUIZZER"
        body="Participate in 10 quizzes and win 4000 points"
        done={4}
        total={10}
        unit="quizzes"
        prize="4 000 POINTS"
        headerColor="rgb(28, 106, 92)"
        onClick={() => navigate('/challenges/7')}
      />
    </div>
  )
}

function FinishedTab() {
  return (
    <div className="flex flex-col items-center justify-start pt-24">
      <Trophy size={42} className="text-brand-gray-400" strokeWidth={1.4} />
      <p className="mt-2 text-[13px] text-brand-gray-500">No challenges here yet</p>
    </div>
  )
}

const HALL_DATA = {
  Bonus: {
    podium: [
      { rank: 2, name: 'Yousef', score: '48 362', emoji: '🥈', height: 'h-[80px]', accent: '#cfd4d8' },
      { rank: 1, name: 'Daniel', score: '52 325', emoji: '🥇', height: 'h-[110px]', accent: '#ffdc1e' },
      { rank: 3, name: 'Bengt', score: '47 301', emoji: '🥉', height: 'h-[60px]', accent: '#cd7f32' },
    ],
    rest: [
      { rank: 4, name: 'Klara Andersson', level: 'All-Star', score: '32 552' },
      { rank: 5, name: 'Erik Svensson', level: 'All-Star', score: '29 840' },
      { rank: 6, name: 'Maria Lindqvist', level: 'Starter', score: '27 115' },
      { rank: 7, name: 'Johan Berg', level: 'All-Star', score: '24 990', me: true },
      { rank: 8, name: 'Sara Nilsson', level: 'Starter', score: '22 610' },
    ],
  },
  Bowling: {
    podium: [
      { rank: 2, name: 'Erik', score: '298', emoji: '🥈', height: 'h-[80px]', accent: '#cfd4d8' },
      { rank: 1, name: 'Klara', score: '300', emoji: '🥇', height: 'h-[110px]', accent: '#ffdc1e' },
      { rank: 3, name: 'Maria', score: '289', emoji: '🥉', height: 'h-[60px]', accent: '#cd7f32' },
    ],
    rest: [
      { rank: 4, name: 'Daniel Berg', level: 'All-Star', score: '276' },
      { rank: 5, name: 'Sara Nilsson', level: 'All-Star', score: '268' },
      { rank: 6, name: 'Yousef Ali', level: 'Starter', score: '255' },
      { rank: 7, name: 'Johan Berg', level: 'All-Star', score: '241', me: true },
      { rank: 8, name: 'Bengt Lund', level: 'Starter', score: '232' },
    ],
  },
  'Bowling arcade': {
    podium: [
      { rank: 2, name: 'Yousef', score: '14 820', emoji: '🥈', height: 'h-[80px]', accent: '#cfd4d8' },
      { rank: 1, name: 'Daniel', score: '16 405', emoji: '🥇', height: 'h-[110px]', accent: '#ffdc1e' },
      { rank: 3, name: 'Bengt', score: '13 970', emoji: '🥉', height: 'h-[60px]', accent: '#cd7f32' },
    ],
    rest: [
      { rank: 4, name: 'Klara Andersson', level: 'All-Star', score: '11 220' },
      { rank: 5, name: 'Erik Svensson', level: 'All-Star', score: '10 480' },
      { rank: 6, name: 'Maria Lindqvist', level: 'Starter', score: '9 615' },
      { rank: 7, name: 'Johan Berg', level: 'All-Star', score: '8 940', me: true },
      { rank: 8, name: 'Sara Nilsson', level: 'Starter', score: '8 105' },
    ],
  },
  'Boxing arcade': {
    podium: [
      { rank: 2, name: 'Mikael', score: '892', emoji: '🥈', height: 'h-[80px]', accent: '#cfd4d8' },
      { rank: 1, name: 'Ines', score: '946', emoji: '🥇', height: 'h-[110px]', accent: '#ffdc1e' },
      { rank: 3, name: 'Tobias', score: '871', emoji: '🥉', height: 'h-[60px]', accent: '#cd7f32' },
    ],
    rest: [
      { rank: 4, name: 'Anna Holm', level: 'All-Star', score: '802' },
      { rank: 5, name: 'Lukas Persson', level: 'All-Star', score: '768' },
      { rank: 6, name: 'Hanna Ek', level: 'Starter', score: '724' },
      { rank: 7, name: 'Johan Berg', level: 'All-Star', score: '688', me: true },
      { rank: 8, name: 'Olle Sjögren', level: 'Starter', score: '641' },
    ],
  },
}

function HallOfFame() {
  const [sub, setSub] = useState('Bonus')
  const subs = ['Bonus', 'Bowling', 'Bowling arcade', 'Boxing arcade']
  const { podium, rest } = HALL_DATA[sub]

  return (
    <div className="pb-4">
      {/* Hero gradient header */}
      <div
        className="mx-5 mt-5 rounded-3xl px-5 pt-5 pb-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #23695a 0%, #2d9b87 60%, #5fb3a1 100%)' }}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-white/10" />
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-brand-yellow flex items-center justify-center shadow-lg">
            <Trophy size={28} className="text-brand-black" strokeWidth={2} />
          </div>
          <p className="mt-2 text-[11px] font-extrabold tracking-[0.22em] text-white/90">HALL OF FAME</p>
          <p className="mt-0.5 text-[20px] font-extrabold text-white">Meet the legends</p>
        </div>

        {/* Sub-tabs */}
        <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2">
          {subs.map((s) => {
            const isActive = s === sub
            return (
              <button
                key={s}
                onClick={() => setSub(s)}
                className={`px-4 py-1.5 rounded-full text-[12px] font-bold cursor-pointer ${
                  isActive ? 'bg-white text-green-dark' : 'bg-white/15 text-white'
                }`}
              >
                {s}
              </button>
            )
          })}
        </div>

        {/* Podium */}
        <div className="relative mt-6 flex items-end justify-center gap-2">
          {podium.map((p) => (
            <div key={p.rank} className="flex flex-col items-center w-[88px]">
              <div className="text-[26px] leading-none">{p.emoji}</div>
              <p className="text-[12px] font-extrabold text-white mt-1 truncate w-full text-center">{p.name}</p>
              <p className="text-[10px] text-white/80 tabular-nums">{p.score}</p>
              <div
                className={`w-full ${p.height} mt-1.5 rounded-t-xl flex items-start justify-center pt-1.5`}
                style={{ backgroundColor: p.accent, opacity: 0.9 }}
              >
                <span className="text-[16px] font-extrabold text-brand-black">#{p.rank}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of leaderboard */}
      <div className="px-5 mt-4 space-y-2">
        {rest.map((p, i) => (
          <div
            key={i}
            className={`px-3.5 py-3 rounded-2xl flex items-center gap-3 ${
              p.me ? 'bg-brand-yellow/40 border border-brand-yellow' : 'bg-white border border-brand-gray-100'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-extrabold tabular-nums ${
                p.me ? 'bg-brand-yellow text-brand-black' : 'bg-brand-gray-100 text-brand-gray-600'
              }`}
            >
              {p.rank}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-bold text-brand-black truncate">
                {p.name}
                {p.me && (
                  <span className="ml-1.5 text-[10px] font-bold text-brand-gray-600 uppercase tracking-wider">
                    · you
                  </span>
                )}
              </p>
              <p className="text-[11px] text-green-primary font-medium">Level {p.level}</p>
            </div>
            <p className="text-[14px] font-extrabold text-brand-black tabular-nums whitespace-nowrap">{p.score}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Challenges() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('unlocked')

  return (
    <div className="pb-4 pt-12">
      {/* Top tabs */}
      <div className="px-5 pt-3">
        <div className="flex items-center gap-4 border-b border-brand-gray-200">
          {TABS.map((t) => {
            const isActive = t.id === activeTab
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="relative pb-3 flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer"
              >
                <span
                  className={`text-[13px] font-semibold whitespace-nowrap ${
                    isActive ? 'text-green-primary' : 'text-brand-gray-500'
                  }`}
                >
                  {t.label}
                </span>
                {t.count != null && (
                  <span
                    className={`text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center ${
                      isActive ? 'bg-green-primary text-white' : 'bg-brand-gray-200 text-brand-gray-600'
                    }`}
                  >
                    {t.count}
                  </span>
                )}
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-px h-[2.5px] rounded-full bg-green-primary" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {activeTab === 'unlocked' && <UnlockedTab navigate={navigate} />}
      {activeTab === 'active' && <ActiveTab navigate={navigate} />}
      {activeTab === 'finished' && <FinishedTab />}
      {activeTab === 'fame' && <HallOfFame />}
    </div>
  )
}

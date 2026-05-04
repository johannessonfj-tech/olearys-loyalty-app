import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronLeft, Share2, Award, MapPin, Clock, Users, Ticket } from 'lucide-react'

const CHALLENGES = {
  '1': {
    type: 'matchday',
    title: 'Matchday Experience Liverpool & Arsenal',
  },
  '2': {
    type: 'bowling-king',
    title: 'Bowling King',
    steps: [
      { label: 'PLAY 10\nROUNDS', done: true },
      { label: 'EARN 3000\nPOINTS', done: true },
      { label: 'CLAIM SPECIAL\nPRIZE', done: false },
    ],
    prize: "LIMITED EDITION O'LEARYS\nPINS WATER BOTTLE",
  },
  '5': {
    type: 'progress',
    title: 'Burger Ronaldo',
    desc: 'Buy 15 burgers for the achievement and 2000 points',
    current: 7,
    target: 15,
    points: 2000,
    unit: 'burgers',
    headerColor: '#23695a',
  },
  '6': {
    type: 'globetrotter',
    title: 'Globetrotter',
    steps: [
      { label: 'VISIT 10\nCITIES', done: false },
      { label: 'EARN 2000\nPOINTS', done: false },
      { label: 'UNLOCK\nACHIEVEMENT', done: false },
    ],
    prize: "EXCLUSIVE GLOBETROTTER\nBADGE + 2 000 POINTS",
  },
  '7': {
    type: 'progress',
    title: 'Professional Quizzer',
    desc: 'Participate in 10 quizzes and win 4000 points',
    current: 4,
    target: 10,
    points: 4000,
    unit: 'quizzes',
    headerColor: 'rgb(28, 106, 92)',
  },
}

function AppHeader({ title, onBack }) {
  return (
    <div className="px-5 pt-3 pb-3 flex items-center justify-between">
      <button
        onClick={onBack}
        aria-label="Back"
        className="w-9 h-9 -ml-1 flex items-center justify-center text-brand-black cursor-pointer"
      >
        <ChevronLeft size={22} />
      </button>
      <p className="text-[12px] uppercase tracking-[0.22em] font-bold text-brand-gray-500">{title}</p>
      <button aria-label="Share" className="w-9 h-9 flex items-center justify-center text-brand-black cursor-pointer">
        <Share2 size={18} />
      </button>
    </div>
  )
}

function MatchdayDetail({ autoJoin, onBack }) {
  const [joined, setJoined] = useState(autoJoin)
  useEffect(() => {
    if (autoJoin) setJoined(true)
  }, [autoJoin])

  const steps = [
    { t: 'Join the challenge', s: 'Tap join — no points, no fee' },
    { t: 'Check in 4 times', s: "Check in via the O'Learys app at any venue over the next 60 days" },
    { t: 'We pick a winner', s: 'Random draw across all completers when the timer ends' },
    { t: 'Prize lands in Wallet as a digital ticket', s: 'Winners are notified within 24h' },
  ]

  return (
    <div className="bg-white">
      <AppHeader title="Challenge" onBack={onBack} />

      {/* Red hero card — built in React (no baked image) */}
      <div className="px-4">
        <div
          className="rounded-2xl overflow-hidden relative text-white"
          style={{
            background:
              'linear-gradient(135deg, #8b1a1a 0%, #6b1414 50%, #4a0d0d 100%)',
          }}
        >
          {/* "YOU'LL NEVER WALK ALONE" banner */}
          <div className="absolute top-3 right-3 bg-white text-[#8b1a1a] text-[8px] font-extrabold tracking-wider px-2 py-0.5 rotate-[-2deg]">
            YOU'LL NEVER WALK ALONE
          </div>

          <div className="px-5 pt-4 pb-5">
            {/* Premier League pill */}
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
              <span className="w-3.5 h-3.5 rounded-full bg-white/90 flex items-center justify-center">
                <span className="text-[8px]">⚽</span>
              </span>
              <span className="text-[11px] font-bold">Premier League</span>
            </div>

            <p className="mt-3 text-[24px] font-extrabold leading-[1.1]">
              Win tickets to<br />Liverpool &amp; Arsenal
            </p>
            <p className="mt-2 text-[13px] text-white/85">Check in 4 times in 60 days</p>

            <div className="mt-3 flex items-center gap-4 text-[11px] text-white/85">
              <span className="inline-flex items-center gap-1">
                <Clock size={12} /> Ends Wed - 26 Aug
              </span>
              <span className="inline-flex items-center gap-1">
                <Users size={12} /> 3 512 joined
              </span>
            </div>
          </div>
        </div>

        {/* Prize tile */}
        <div className="mt-3 rounded-2xl bg-white border border-brand-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-yellow flex items-center justify-center flex-shrink-0">
            <Ticket size={20} className="text-brand-black" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-brand-gray-500 font-bold">Prize</p>
            <p className="text-[14px] font-extrabold text-brand-black leading-tight">2x match tickets</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-6">
        <p className="text-[11px] uppercase tracking-[0.22em] font-bold text-brand-gray-500">How it works</p>
        <div className="mt-3 divide-y divide-brand-gray-100">
          {steps.map((s, i) => (
            <div key={i} className="py-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-brand-gray-100 text-brand-gray-700 flex items-center justify-center text-[12px] font-bold flex-shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-[13.5px] font-bold text-brand-black leading-tight">{s.t}</p>
                <p className="text-[12px] text-brand-gray-600 mt-0.5 leading-snug">{s.s}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-brand-gray-500 leading-snug">
          No purchase necessary. 18+. One winner per location. Season ticket transferable to a friend; not redeemable
          for cash. Full T&Cs in Settings.
        </p>
        <button
          onClick={() => setJoined((j) => !j)}
          className={`mt-5 mb-6 w-full py-4 rounded-2xl font-bold text-[15px] transition active:scale-[0.99] cursor-pointer ${
            joined ? 'bg-green-primary text-white' : 'bg-brand-black text-white'
          }`}
        >
          {joined ? '✓ Joined — good luck!' : 'Join challenge'}
        </button>
      </div>
    </div>
  )
}

function StepRow({ steps }) {
  return (
    <div className="mt-5 flex items-center justify-between">
      {steps.map((s, i, arr) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center text-center w-[80px] mx-auto">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                s.done ? 'bg-green-primary/15' : 'bg-brand-gray-100'
              }`}
            >
              <Award size={22} className={s.done ? 'text-green-primary' : 'text-brand-gray-400'} />
            </div>
            <p className="text-[10px] font-extrabold text-brand-black mt-2 leading-tight whitespace-pre-line">{s.label}</p>
          </div>
          {i < arr.length - 1 && (
            <div className="flex-1 border-t-2 border-dashed border-brand-gray-300 mt-[-20px]" />
          )}
        </div>
      ))}
    </div>
  )
}

function BowlingKingDetail({ challenge }) {
  return (
    <div className="px-5 pb-6">
      <div className="rounded-3xl overflow-hidden relative h-[210px]">
        <img src="/images/challenge-bowling-king.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      <p className="text-[18px] font-extrabold text-brand-black tracking-wide mt-5">HOW TO BE THE {challenge.title.toUpperCase()}</p>

      <StepRow steps={challenge.steps} />

      <div className="mt-6 rounded-2xl bg-white border border-brand-gray-200 overflow-hidden">
        <div className="px-4 pt-4">
          <p className="text-[10px] font-bold tracking-[0.2em] text-brand-gray-500">SPECIAL PRIZE UNLOCKED</p>
          <p className="mt-1 text-[14px] font-extrabold text-brand-black leading-tight tracking-wide whitespace-pre-line">
            {challenge.prize}
          </p>
        </div>
        <div
          className="mt-3 h-[220px] relative overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #f5f5f5 0%, #e6e6e6 100%)' }}
        >
          <img src="/images/challenge-water-bottle.png" alt="" className="absolute inset-0 w-full h-full object-contain" />
        </div>
      </div>
    </div>
  )
}

function GlobetrotterDetail({ challenge }) {
  return (
    <div className="px-5 pb-6">
      <div className="rounded-3xl overflow-hidden relative h-[210px]" style={{ backgroundColor: '#1f5c50' }}>
        <img src="/images/challenge-globetrotter.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute top-3 left-3 bg-white/95 text-brand-black rounded-full px-3 py-1 flex items-center gap-1.5">
          <MapPin size={12} className="text-brand-black" />
          <span className="text-[11px] font-bold">10 cities</span>
        </div>
      </div>

      <p className="text-[18px] font-extrabold text-brand-black tracking-wide mt-5">HOW TO BE THE {challenge.title.toUpperCase()}</p>

      <StepRow steps={challenge.steps} />

      <div className="mt-6 rounded-2xl bg-white border border-brand-gray-200 overflow-hidden">
        <div className="px-4 py-4">
          <p className="text-[10px] font-bold tracking-[0.2em] text-brand-gray-500">SPECIAL PRIZE UNLOCKED</p>
          <p className="mt-1 text-[14px] font-extrabold text-brand-black leading-tight tracking-wide whitespace-pre-line">
            {challenge.prize}
          </p>
        </div>
      </div>
    </div>
  )
}

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

function ProgressDetail({ challenge }) {
  return (
    <div className="px-5 pb-6">
      <div
        className="rounded-2xl overflow-hidden text-white text-center px-5 pt-5 pb-5"
        style={{ backgroundColor: challenge.headerColor }}
      >
        <p className="text-[18px] font-extrabold tracking-wide uppercase">{challenge.title}</p>
        <p className="text-[12px] text-white/85 mt-1 leading-snug">{challenge.desc}</p>
      </div>

      <div className="mt-5">
        <StepTracker done={challenge.current} total={challenge.target} />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-[11px] text-brand-gray-500 font-medium uppercase tracking-[0.14em]">Progress</p>
          <p className="text-[13px] font-extrabold text-brand-black tabular-nums">
            {challenge.current}
            <span className="text-brand-gray-400 font-semibold">/{challenge.target}</span> {challenge.unit}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-brand-gray-100 pt-5 flex items-center justify-center gap-8">
        <div className="flex items-center gap-1.5">
          <AwardOutline size={20} />
          <span className="text-[12px] font-bold text-brand-black tracking-wider">ACHIEVEMENT</span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrophyOutline size={20} />
          <span className="text-[12px] font-bold text-green-primary tracking-wider whitespace-nowrap">
            {challenge.points.toLocaleString()} POINTS
          </span>
        </div>
      </div>
    </div>
  )
}

export default function ChallengeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const autoJoin = searchParams.get('joined') === 'true'
  const challenge = CHALLENGES[id]

  if (!challenge) {
    return (
      <div className="min-h-dvh flex flex-col bg-white items-center justify-center pt-12">
        <p className="text-brand-gray-500">Challenge not found</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-green-primary font-medium cursor-pointer">
          Go back
        </button>
      </div>
    )
  }

  if (challenge.type === 'matchday') {
    return (
      <div className="min-h-dvh flex flex-col bg-white pb-8 pt-10">
        <MatchdayDetail autoJoin={autoJoin} onBack={() => navigate(-1)} />
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white pb-8 pt-10">
      <AppHeader title="Challenge" onBack={() => navigate(-1)} />
      {challenge.type === 'bowling-king' && <BowlingKingDetail challenge={challenge} />}
      {challenge.type === 'globetrotter' && <GlobetrotterDetail challenge={challenge} />}
      {challenge.type === 'progress' && <ProgressDetail challenge={challenge} />}
    </div>
  )
}

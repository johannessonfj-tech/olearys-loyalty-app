import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronLeft, Trophy, Clock, Award, Target, MapPin, HelpCircle } from 'lucide-react'

const CHALLENGES = {
  '1': {
    type: 'sports',
    title: 'Matchday Experience Liverpool vs Manchester United',
    desc: "Play 5 rounds of bowling at O'Learys for a chance to visit Liverpool and watch the game",
    longDesc: "Iconic bowling at O'Learys + Ultimate Matchday Experience = The dream combo! And you could be part of it. Play 5 rounds of bowling at O'Learys during this challenge and you'll be entered into a draw for the chance to visit Anfield for the epic Liverpool vs. Manchester United clash on May 16, (includes flight and hotel for two). What are you waiting for?",
    sponsor: 'Carlsberg',
    daysLeft: 21,
    points: 8736,
    prize: 'Your chance to win tickets to the Liverpool vs Manchester United match',
    leaderboard: [
      { name: "Dato' Nafidz Razak", tier: 'GOLD', rounds: 5 },
      { name: 'Petri Kuivamaki', tier: 'GOLD', rounds: 5 },
      { name: 'Antonio Pimentel', tier: 'GOLD', rounds: 4 },
      { name: 'Jani Laitinen', tier: 'GOLD', rounds: 4 },
      { name: 'Godwin Okoko', tier: null, rounds: 4 },
      { name: 'Iheanyi Mgobeahurike', tier: 'GOLD', rounds: 3 },
      { name: 'Marcus Svensson', tier: 'GOLD', rounds: 3 },
      { name: 'Chen Wei Lin', tier: null, rounds: 3 },
      { name: 'Ahmed Al-Farsi', tier: 'GOLD', rounds: 2 },
      { name: 'Julia Nordström', tier: null, rounds: 2 },
      { name: 'Patrick O\'Brien', tier: 'GOLD', rounds: 2 },
      { name: 'Leila Hamidi', tier: null, rounds: 1 },
    ],
  },
  '2': {
    type: 'activity',
    title: 'Bowling King',
    desc: 'Play 10 bowling rounds for 3000 points and a special prize',
    steps: ['PLAY 10 ROUNDS', 'EARN 3000 POINTS', 'CLAIM SPECIAL PRIZE'],
    prize: "LIMITED EDITION O'LEARYS PINS WATER BOTTLE",
    points: 3000,
  },
  '5': {
    type: 'progress',
    title: 'Burger Ronaldo',
    desc: 'Buy 15 burgers for the achievement and 2000 points',
    current: 7,
    target: 15,
    points: 2000,
    unit: 'burgers',
  },
  '6': {
    type: 'activity',
    title: 'Globetrotter',
    desc: "Visit 10 O'Learys locations and win 2000 points",
    steps: ['VISIT 10 LOCATIONS', 'EARN 2000 POINTS', 'UNLOCK ACHIEVEMENT'],
    prize: "EXCLUSIVE GLOBETROTTER BADGE + 2000 BONUS POINTS",
    points: 2000,
    Icon: MapPin,
  },
  '7': {
    type: 'progress',
    title: 'Professional Quizzer',
    desc: 'Participate in 10 quizzes and win 4000 points',
    current: 4,
    target: 10,
    points: 4000,
    unit: 'quizzes',
    Icon: HelpCircle,
  },
}

function SportsDetail({ challenge, autoJoin }) {
  const [showMore, setShowMore] = useState(false)
  const [tab, setTab] = useState('everyone')
  const [joined, setJoined] = useState(autoJoin)

  useEffect(() => {
    if (autoJoin) setJoined(true)
  }, [autoJoin])

  return (
    <>
      {/* Hero */}
      <div className="mx-4 rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #1a3a2a 0%, #0d1f15 100%)' }}>
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 50% 30%, #2d7a3d 0%, transparent 60%)' }} />
        <div className="relative px-5 py-8 text-center">
          {challenge.sponsor && (
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5 mb-3">
              <p className="text-white font-bold text-sm">{challenge.sponsor}</p>
              <p className="text-white/50 text-[8px]">0.0% Alc.</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 mt-4">
        <h2 className="text-xl font-bold text-brand-black leading-tight">{challenge.title}</h2>
        <p className="text-sm text-brand-gray-500 mt-1">{challenge.desc}</p>

        <button
          onClick={() => setJoined(true)}
          className={`w-full mt-4 py-3.5 rounded-2xl text-sm font-bold cursor-pointer transition-all duration-200 active:scale-[0.97] ${
            joined ? 'bg-brand-gray-100 text-brand-gray-500' : 'bg-green-primary text-white'
          }`}
        >
          {joined ? 'Joined' : 'Join'}
        </button>

        {/* Info rows */}
        <div className="mt-5 space-y-3">
          <div className="flex items-start gap-3">
            <Trophy size={18} className="text-green-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-brand-black">{challenge.prize}</p>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-brand-gray-500 flex-shrink-0" />
            <p className="text-sm text-brand-black">{challenge.daysLeft} days remaining</p>
          </div>
        </div>

        {/* Long description */}
        {challenge.longDesc && (
          <div className="mt-4 p-4 rounded-xl bg-brand-gray-100">
            <p className="text-sm text-brand-black leading-relaxed">
              {showMore ? challenge.longDesc : challenge.longDesc.substring(0, 120) + '...'}
            </p>
            <button onClick={() => setShowMore(!showMore)} className="text-green-primary text-sm font-medium mt-1 cursor-pointer">
              {showMore ? 'Show less' : 'Read More'}
            </button>
          </div>
        )}

        {/* Leaderboard */}
        {challenge.leaderboard && (
          <div className="mt-6">
            <div className="flex gap-4 border-b border-brand-gray-300 mb-3">
              {['friends', 'everyone'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-2 text-sm font-medium capitalize cursor-pointer border-b-2 transition-colors ${
                    tab === t ? 'border-green-primary text-green-primary' : 'border-transparent text-brand-gray-500'
                  }`}
                >
                  {t === 'friends' ? 'Friends' : 'Everyone'}
                </button>
              ))}
            </div>

            <table className="w-full">
              <thead>
                <tr className="text-[10px] uppercase text-brand-gray-500 tracking-wider">
                  <th className="text-left py-1.5 w-8">#</th>
                  <th className="text-left py-1.5">Name</th>
                  <th className="text-right py-1.5">Rounds</th>
                </tr>
              </thead>
              <tbody>
                {(tab === 'everyone' ? challenge.leaderboard : challenge.leaderboard.slice(0, 2)).map((p, i) => (
                  <tr key={i} className="border-b border-brand-gray-100">
                    <td className="py-2.5 text-sm text-brand-black">{i + 1}.</td>
                    <td className="py-2.5">
                      <span className="text-sm text-brand-black">{p.name}</span>
                      {p.tier && (
                        <span className="ml-1.5 text-[9px] font-bold text-brand-yellow bg-brand-yellow/20 px-1.5 py-0.5 rounded">
                          {p.tier}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 text-right">
                      <span className="text-sm font-semibold text-brand-black">{p.rounds}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

function ActivityDetail({ challenge }) {
  const Icon = challenge.Icon || Target
  return (
    <>
      <div className="mx-4 rounded-2xl overflow-hidden relative h-32" style={{ background: 'linear-gradient(135deg, #2d9b87 0%, #23695a 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 100%, white 0%, transparent 60%)' }} />
        <div className="relative flex items-center justify-center h-full">
          <Icon size={48} className="text-white/40" />
        </div>
      </div>

      <div className="px-5 mt-6 text-center">
        <h2 className="text-xl font-bold text-brand-black uppercase tracking-wide">How to be the {challenge.title}</h2>

        {/* 3-step progress */}
        <div className="flex items-center justify-between mt-6 px-2">
          {challenge.steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-primary/10 flex items-center justify-center mb-2">
                  <Award size={18} className="text-green-primary" />
                </div>
                <p className="text-[10px] font-bold text-brand-black text-center leading-tight max-w-[80px]">{step}</p>
              </div>
              {i < challenge.steps.length - 1 && (
                <div className="w-8 border-t-2 border-dashed border-brand-gray-300 mx-1 mt-[-20px]" />
              )}
            </div>
          ))}
        </div>

        {/* Prize */}
        <div className="mt-8 p-5 rounded-2xl bg-brand-gray-100">
          <p className="text-[10px] uppercase tracking-wider text-brand-gray-500 font-bold mb-2">Special Prize Unlocked</p>
          <div className="flex items-center justify-center gap-3">
            <Icon size={28} className="text-green-primary" />
            <p className="text-sm font-bold text-brand-black text-left">{challenge.prize}</p>
          </div>
        </div>
      </div>
    </>
  )
}

function ProgressDetail({ challenge }) {
  const pct = Math.round((challenge.current / challenge.target) * 100)
  const Icon = challenge.Icon || Trophy
  return (
    <>
      <div className="mx-4 rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #2d9b87 0%, #23695a 100%)' }}>
        <div className="relative px-5 py-8 text-center">
          <h2 className="text-2xl font-bold text-white uppercase">{challenge.title}</h2>
          <p className="text-white/70 text-sm mt-1">{challenge.desc}</p>
        </div>
      </div>

      <div className="px-5 mt-5">
        {/* Progress bar */}
        <div className="relative">
          <div className="h-3 rounded-full bg-brand-gray-100">
            <div className="h-3 rounded-full bg-green-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs font-bold text-green-primary bg-green-primary/10 px-2 py-0.5 rounded-full">{challenge.current}</span>
            <span className="text-xs font-bold text-brand-gray-500 bg-brand-gray-100 px-2 py-0.5 rounded-full">{challenge.target}</span>
          </div>
          <p className="text-center text-sm text-brand-gray-500 mt-2">{challenge.current} / {challenge.target} {challenge.unit || 'items'}</p>
        </div>

        {/* Bottom info */}
        <div className="mt-6 flex items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <Award size={24} className="text-brand-gray-500 mb-1" />
            <p className="text-xs font-bold text-brand-black">ACHIEVEMENT</p>
          </div>
          <div className="flex flex-col items-center">
            <Icon size={24} className="text-green-primary mb-1" />
            <p className="text-xs font-bold text-brand-black">{challenge.points.toLocaleString()} POINTS</p>
          </div>
        </div>
      </div>
    </>
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
      <div className="min-h-dvh flex flex-col bg-white items-center justify-center">
        <p className="text-brand-gray-500">Challenge not found</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-green-primary font-medium cursor-pointer">Go back</button>
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white pb-8">
      <div className="px-4 pt-4 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2" aria-label="Go back">
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
        <h1 className="text-sm font-bold text-brand-black uppercase tracking-wide">Challenge Detail</h1>
      </div>

      {challenge.type === 'sports' && <SportsDetail challenge={challenge} autoJoin={autoJoin} />}
      {challenge.type === 'activity' && <ActivityDetail challenge={challenge} />}
      {challenge.type === 'progress' && <ProgressDetail challenge={challenge} />}
    </div>
  )
}

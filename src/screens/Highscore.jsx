import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Check, Camera, MapPin, Calendar, Plus, Search, Trophy, Crown, Users, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const ME = { id: 'me', name: null } // name filled from profile
const FRIENDS = ['erik-l', 'sara-k', 'johan-b']

const LEADERBOARD_BOWLING_LOCAL = [
  { id: 'marcus-h', name: 'Marcus Holm', score: 267, venue: 'Norrköping' },
  { id: 'me', name: 'You', score: 245, venue: 'Norrköping' },
  { id: 'erik-l', name: 'Erik Lindqvist', score: 232, venue: 'Norrköping' },
  { id: 'anna-s', name: 'Anna Ström', score: 218, venue: 'Norrköping' },
  { id: 'sara-k', name: 'Sara Karlsson', score: 210, venue: 'Norrköping' },
  { id: 'oskar-n', name: 'Oskar Nordin', score: 205, venue: 'Norrköping' },
  { id: 'johan-b', name: 'Johan Berg', score: 198, venue: 'Norrköping' },
  { id: 'lisa-f', name: 'Lisa Fransson', score: 189, venue: 'Norrköping' },
  { id: 'karl-a', name: 'Karl Axelsson', score: 182, venue: 'Norrköping' },
  { id: 'emma-d', name: 'Emma Dahl', score: 176, venue: 'Norrköping' },
]

const LEADERBOARD_BOWLING_GLOBAL = [
  { id: 'jan-p', name: 'Jan Persson', score: 299, venue: 'Göteborg' },
  { id: 'mikael-j', name: 'Mikael Johansson', score: 295, venue: 'Malmö' },
  { id: 'anders-l', name: 'Anders Lund', score: 289, venue: 'Uppsala' },
  { id: 'marcus-h', name: 'Marcus Holm', score: 267, venue: 'Norrköping' },
  { id: 'sofia-w', name: 'Sofia Wiberg', score: 258, venue: 'Östermalm' },
  { id: 'peter-o', name: 'Peter Olsson', score: 252, venue: 'Göteborg' },
  { id: 'me', name: 'You', score: 245, venue: 'Norrköping' },
  { id: 'erik-l', name: 'Erik Lindqvist', score: 248, venue: 'Norrköping' },
  { id: 'karin-b', name: 'Karin Berg', score: 228, venue: 'Luleå' },
  { id: 'sara-k', name: 'Sara Karlsson', score: 210, venue: 'Norrköping' },
]

const LEADERBOARD_BASKETBALL_LOCAL = [
  { id: 'me', name: 'You', score: 84, venue: 'Norrköping' },
  { id: 'erik-l', name: 'Erik Lindqvist', score: 78, venue: 'Norrköping' },
  { id: 'sara-k', name: 'Sara Karlsson', score: 72, venue: 'Norrköping' },
  { id: 'oskar-n', name: 'Oskar Nordin', score: 68, venue: 'Norrköping' },
  { id: 'anna-s', name: 'Anna Ström', score: 65, venue: 'Norrköping' },
  { id: 'johan-b', name: 'Johan Berg', score: 61, venue: 'Norrköping' },
  { id: 'karl-a', name: 'Karl Axelsson', score: 55, venue: 'Norrköping' },
  { id: 'lisa-f', name: 'Lisa Fransson', score: 48, venue: 'Norrköping' },
]

const LEADERBOARD_BASKETBALL_GLOBAL = [
  { id: 'david-m', name: 'David Magnusson', score: 97, venue: 'Malmö' },
  { id: 'niklas-s', name: 'Niklas Ström', score: 93, venue: 'Göteborg' },
  { id: 'me', name: 'You', score: 84, venue: 'Norrköping' },
  { id: 'anders-l', name: 'Anders Lund', score: 82, venue: 'Uppsala' },
  { id: 'erik-l', name: 'Erik Lindqvist', score: 78, venue: 'Norrköping' },
  { id: 'sofia-w', name: 'Sofia Wiberg', score: 76, venue: 'Östermalm' },
  { id: 'sara-k', name: 'Sara Karlsson', score: 72, venue: 'Norrköping' },
  { id: 'peter-o', name: 'Peter Olsson', score: 69, venue: 'Göteborg' },
]

const LEADERBOARD_BOXING_LOCAL = [
  { id: 'oskar-n', name: 'Oskar Nordin', score: 945, venue: 'Norrköping' },
  { id: 'marcus-h', name: 'Marcus Holm', score: 912, venue: 'Norrköping' },
  { id: 'me', name: 'You', score: 891, venue: 'Norrköping' },
  { id: 'erik-l', name: 'Erik Lindqvist', score: 856, venue: 'Norrköping' },
  { id: 'anna-s', name: 'Anna Ström', score: 823, venue: 'Norrköping' },
  { id: 'johan-b', name: 'Johan Berg', score: 798, venue: 'Norrköping' },
  { id: 'karl-a', name: 'Karl Axelsson', score: 765, venue: 'Norrköping' },
  { id: 'sara-k', name: 'Sara Karlsson', score: 741, venue: 'Norrköping' },
]

const LEADERBOARD_BOXING_GLOBAL = [
  { id: 'jan-p', name: 'Jan Persson', score: 978, venue: 'Göteborg' },
  { id: 'mikael-j', name: 'Mikael Johansson', score: 962, venue: 'Malmö' },
  { id: 'oskar-n', name: 'Oskar Nordin', score: 945, venue: 'Norrköping' },
  { id: 'anders-l', name: 'Anders Lund', score: 934, venue: 'Uppsala' },
  { id: 'marcus-h', name: 'Marcus Holm', score: 912, venue: 'Norrköping' },
  { id: 'erik-l', name: 'Erik Lindqvist', score: 903, venue: 'Norrköping' },
  { id: 'me', name: 'You', score: 891, venue: 'Norrköping' },
  { id: 'karin-b', name: 'Karin Berg', score: 842, venue: 'Luleå' },
  { id: 'sara-k', name: 'Sara Karlsson', score: 741, venue: 'Norrköping' },
  { id: 'sofia-w', name: 'Sofia Wiberg', score: 718, venue: 'Östermalm' },
]

const HIGHSCORE_GAMES = [
  {
    id: 'bowling',
    label: 'Bowling',
    icon: '🎳',
    bio: 'The legendary lane crusher of Norrköping. Daniel "Strikeman" Svantesson has been known to clear entire pin decks with a single flick of the wrist. Opponents tremble when he laces up his shoes.',
    scores: [
      { score: 245, date: '2026-01-15', venue: "O'Learys Norrköping" },
      { score: 198, date: '2025-12-03', venue: "O'Learys Östermalm" },
      { score: 221, date: '2025-11-18', venue: "O'Learys Norrköping" },
    ],
    leaderboard: { local: LEADERBOARD_BOWLING_LOCAL, global: LEADERBOARD_BOWLING_GLOBAL },
  },
  {
    id: 'basketball',
    label: 'Basketball Arcade',
    icon: '🏀',
    bio: 'They call him "The Machine". Daniel Svantesson holds the unofficial O\'Learys record for most consecutive three-pointers on the arcade hoop. His shooting form has been compared to a trebuchet.',
    scores: [
      { score: 84, date: '2026-03-05', venue: "O'Learys Norrköping" },
      { score: 71, date: '2026-02-14', venue: "O'Learys Norrköping" },
      { score: 62, date: '2026-01-22', venue: "O'Learys Östermalm" },
    ],
    leaderboard: { local: LEADERBOARD_BASKETBALL_LOCAL, global: LEADERBOARD_BASKETBALL_GLOBAL },
  },
  {
    id: 'boxing',
    label: 'Boxing Arcade',
    icon: '🥊',
    bio: 'Don\'t let the calm demeanor fool you — when Daniel Svantesson steps up to the boxing arcade, he transforms into a force of nature. His right hook is clocked at "absolutely ridiculous".',
    scores: [
      { score: 891, date: '2026-02-20', venue: "O'Learys Östermalm" },
      { score: 834, date: '2026-01-08', venue: "O'Learys Norrköping" },
    ],
    leaderboard: { local: LEADERBOARD_BOXING_LOCAL, global: LEADERBOARD_BOXING_GLOBAL },
  },
]

const VENUES = ["O'Learys Norrköping", "O'Learys Östermalm"]

function getRank(leaderboard) {
  const idx = leaderboard.findIndex(e => e.id === 'me')
  return idx === -1 ? null : idx + 1
}

function getFriendsLeaderboard(globalBoard) {
  return globalBoard.filter(e => e.id === 'me' || FRIENDS.includes(e.id))
}

const SCOPE_LABELS = { local: 'Norrköping', global: 'Global', friends: 'Friends' }
const HERO_LABELS = { local: 'Local Hero', global: 'Global Champion', friends: 'Nr. 1 Among Friends' }

function RankBadge({ rank, total, scope, isHero }) {
  const isFriends = scope === 'friends'
  return (
    <div className={`flex-1 rounded-2xl p-3 ${isHero ? (isFriends ? 'bg-gradient-to-br from-green-primary to-green-dark' : 'bg-gradient-to-br from-amber-400 to-amber-500') : 'bg-brand-gray-100'}`}>
      {isHero && (
        <div className="flex items-center gap-1 mb-1.5">
          {isFriends ? <Users size={12} className="text-white" /> : <Crown size={12} className="text-white" />}
          <span className="text-[9px] font-bold text-white uppercase tracking-wider">
            {HERO_LABELS[scope]}
          </span>
        </div>
      )}
      <p className={`text-[9px] font-semibold uppercase tracking-wider ${isHero ? 'text-white/80' : 'text-brand-gray-500'}`}>
        {SCOPE_LABELS[scope]}
      </p>
      <div className="flex items-baseline gap-1 mt-0.5">
        <span className={`text-2xl font-bold ${isHero ? 'text-white' : 'text-brand-black'}`}>#{rank}</span>
        <span className={`text-[10px] ${isHero ? 'text-white/70' : 'text-brand-gray-400'}`}>/ {total}</span>
      </div>
    </div>
  )
}

function MedalIcon({ rank }) {
  if (rank === 1) return <span className="text-base">🥇</span>
  if (rank === 2) return <span className="text-base">🥈</span>
  if (rank === 3) return <span className="text-base">🥉</span>
  return <span className="text-xs font-bold text-brand-gray-400 w-5 text-center">{rank}</span>
}

function Leaderboard({ local, global }) {
  const [scope, setScope] = useState('local')
  const [search, setSearch] = useState('')
  const myRowRef = useRef(null)
  const friends = getFriendsLeaderboard(global)
  const data = scope === 'local' ? local : scope === 'friends' ? friends : global
  const searchLower = search.toLowerCase()
  const filtered = search
    ? data.filter(e => e.name.toLowerCase().includes(searchLower) || (e.id === 'me' && 'you'.includes(searchLower)))
    : data

  useEffect(() => {
    if (!search && myRowRef.current) {
      myRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [scope, search])

  return (
    <div>
      {/* Scope toggle */}
      <div className="flex bg-brand-gray-100 rounded-xl p-1 mb-4">
        {['local', 'friends', 'global'].map(s => (
          <button
            key={s}
            onClick={() => { setScope(s); setSearch('') }}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              scope === s ? 'bg-white text-brand-black shadow-sm' : 'text-brand-gray-500'
            }`}
          >
            {s === 'local' ? 'Norrköping' : s === 'friends' ? 'Friends' : 'Global'}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search players or friends..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer">
            <X size={16} className="text-brand-gray-400" />
          </button>
        )}
      </div>

      {/* Leaderboard rows */}
      <div className="flex flex-col gap-1.5">
        {filtered.map((entry, idx) => {
          const rank = data.indexOf(entry) + 1
          const isMe = entry.id === 'me'
          const isFriend = FRIENDS.includes(entry.id)
          return (
            <div
              key={entry.id}
              ref={isMe ? myRowRef : null}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-150 ${
                isMe
                  ? 'bg-green-primary/10 border border-green-primary/30'
                  : rank <= 3
                  ? 'bg-amber-50'
                  : 'bg-brand-gray-100'
              }`}
            >
              <MedalIcon rank={rank} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-sm font-semibold truncate ${isMe ? 'text-green-primary' : 'text-brand-black'}`}>
                    {isMe ? 'You' : entry.name}
                  </span>
                  {isFriend && <Users size={12} className="text-green-primary flex-shrink-0" />}
                </div>
                <span className="text-[11px] text-brand-gray-400">{entry.venue}</span>
              </div>
              <span className={`text-base font-bold ${isMe ? 'text-green-primary' : 'text-brand-black'}`}>{entry.score}</span>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-brand-gray-500 text-center py-6">No players found</p>
        )}
      </div>
    </div>
  )
}

export default function Highscore() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const [selectedGame, setSelectedGame] = useState(null)
  const [logGame, setLogGame] = useState(null)
  const [scoreInput, setScoreInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [venueInput, setVenueInput] = useState('')
  const [honored, setHonored] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const userName = profile?.name || 'Member'
  const game = HIGHSCORE_GAMES.find(g => g.id === selectedGame)

  function resetLog() {
    setLogGame(null)
    setScoreInput('')
    setDateInput('')
    setVenueInput('')
    setHonored(false)
    setSubmitted(false)
  }

  // Submitted confirmation
  if (submitted) {
    return (
      <div className="pb-4">
        <div className="flex flex-col items-center pt-32 px-5">
          <div className="w-20 h-20 rounded-full bg-green-primary/10 flex items-center justify-center mb-5">
            <Check size={36} className="text-green-primary" />
          </div>
          <h2 className="text-xl font-bold text-brand-black mb-2">Score Submitted!</h2>
          <p className="text-sm text-brand-gray-500 text-center px-6 mb-8">
            We will review it and add to your high score as soon as possible.
          </p>
          <button
            onClick={() => { resetLog(); setSelectedGame(logGame) }}
            className="w-full py-3 rounded-full bg-green-primary text-white font-semibold text-sm cursor-pointer transition-all duration-200 active:scale-[0.97]"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  // Log score form
  if (logGame) {
    const logGameData = HIGHSCORE_GAMES.find(g => g.id === logGame)
    return (
      <div className="pb-4">
        <div className="px-5 pt-14 pb-4">
          <button onClick={resetLog} className="flex items-center gap-1 text-sm text-brand-gray-500 mb-4 cursor-pointer">
            <ChevronLeft size={18} /> Back
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{logGameData?.icon}</span>
            <h1 className="text-xl font-bold text-brand-black">Log Score</h1>
          </div>
          <p className="text-sm text-brand-gray-500">{logGameData?.label}</p>
        </div>
        <div className="px-5 pb-8">
          <label className="text-sm font-semibold text-brand-black mb-1.5 block">Your Score</label>
          <input type="number" value={scoreInput} onChange={(e) => setScoreInput(e.target.value)} placeholder="Enter your score"
            className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary mb-4" />
          <label className="text-sm font-semibold text-brand-black mb-1.5 block">Date</label>
          <div className="relative mb-4">
            <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray-400" />
            <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary" />
          </div>
          <label className="text-sm font-semibold text-brand-black mb-1.5 block">O'Learys Restaurant</label>
          <div className="flex gap-2 mb-4">
            {VENUES.map((v) => (
              <button key={v} onClick={() => setVenueInput(v)}
                className={`flex-1 py-3 px-3 rounded-xl text-sm font-semibold text-center cursor-pointer transition-all duration-150 ${
                  venueInput === v ? 'bg-green-primary text-white' : 'bg-brand-gray-100 text-brand-black'
                }`}>{v.replace("O'Learys ", '')}</button>
            ))}
          </div>
          <label className="text-sm font-semibold text-brand-black mb-1.5 block">Photo Evidence</label>
          <button className="w-full py-3 rounded-xl border-2 border-dashed border-brand-gray-300 flex items-center justify-center gap-2 cursor-pointer text-sm font-medium text-brand-gray-500 mb-5">
            <Camera size={18} className="text-brand-gray-400" /> Upload photo evidence
          </button>
          <button onClick={() => setHonored(!honored)} className="flex items-center gap-3 mb-6 cursor-pointer">
            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
              honored ? 'bg-green-primary border-green-primary' : 'border-brand-gray-300'
            }`}>{honored && <Check size={14} className="text-white" />}</div>
            <span className="text-sm text-brand-black">I honor that this score is true</span>
          </button>
          <button onClick={() => setSubmitted(true)} disabled={!scoreInput || !honored || !dateInput || !venueInput}
            className={`w-full py-3 rounded-full font-semibold text-sm cursor-pointer transition-all duration-200 ${
              scoreInput && honored && dateInput && venueInput ? 'bg-green-primary text-white active:scale-[0.97]' : 'bg-brand-gray-200 text-brand-gray-400 cursor-not-allowed'
            }`}>Submit Score</button>
        </div>
      </div>
    )
  }

  // Game detail
  if (selectedGame && game) {
    const localRank = getRank(game.leaderboard.local)
    const globalRank = getRank(game.leaderboard.global)
    const friendsBoard = getFriendsLeaderboard(game.leaderboard.global)
    const friendsRank = getRank(friendsBoard)
    const isLocalHero = localRank === 1
    const isGlobalChamp = globalRank === 1
    const isFriendsBest = friendsRank === 1
    const best = [...game.scores].sort((a, b) => b.score - a.score)[0]

    return (
      <div className="pb-4">
        <div className="px-5 pt-14 pb-2">
          <button onClick={() => setSelectedGame(null)} className="flex items-center gap-1 text-sm text-brand-gray-500 mb-4 cursor-pointer">
            <ChevronLeft size={18} /> Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{game.icon}</span>
            <div>
              <h1 className="text-xl font-bold text-brand-black">{game.label}</h1>
              <p className="text-xs text-brand-gray-400">{userName}'s Record</p>
            </div>
          </div>
        </div>

        {/* Personal best */}
        <div className="mx-5 mb-4 bg-gradient-to-br from-green-primary to-green-dark rounded-2xl p-5 text-white">
          <p className="text-xs font-medium opacity-80 mb-1">Personal Best</p>
          <p className="text-5xl font-bold">{best.score}</p>
          <div className="flex items-center gap-3 mt-2 text-xs opacity-80">
            <span className="flex items-center gap-1"><MapPin size={12} /> {best.venue}</span>
            <span>{best.date}</span>
          </div>
        </div>

        {/* Rank cards */}
        <div className="mx-5 mb-5 flex gap-2">
          <RankBadge rank={localRank} total={game.leaderboard.local.length} scope="local" isHero={isLocalHero} />
          <RankBadge rank={friendsRank} total={friendsBoard.length} scope="friends" isHero={isFriendsBest} />
          <RankBadge rank={globalRank} total={game.leaderboard.global.length} scope="global" isHero={isGlobalChamp} />
        </div>

        {/* AI bio */}
        <div className="mx-5 mb-5 bg-brand-gray-100 rounded-2xl p-4">
          <p className="text-[10px] font-bold text-green-primary uppercase tracking-wider mb-2">AI Scouting Report</p>
          <p className="text-sm text-brand-gray-500 leading-relaxed">{game.bio}</p>
        </div>

        {/* Leaderboard */}
        <div className="px-5 mb-5">
          <h3 className="text-sm font-bold text-brand-black mb-3">Leaderboard</h3>
          <Leaderboard local={game.leaderboard.local} global={game.leaderboard.global} />
        </div>

        {/* Log score */}
        <div className="px-5 pb-8">
          <button onClick={() => setLogGame(selectedGame)}
            className="w-full py-3 rounded-full bg-green-primary text-white font-semibold text-sm cursor-pointer transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2">
            <Plus size={16} /> Log New Score
          </button>
        </div>
      </div>
    )
  }

  // Game list overview
  return (
    <div className="pb-4">
      <div className="px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-brand-gray-500 mb-4 cursor-pointer">
          <ChevronLeft size={18} /> Back
        </button>
        <h1 className="text-2xl font-bold text-brand-black mb-1">My Highscores</h1>
        <p className="text-sm text-brand-gray-500">{userName}</p>
      </div>

      {/* Game cards */}
      <div className="px-5 pb-4 flex flex-col gap-3">
        {HIGHSCORE_GAMES.map((g) => {
          const best = [...g.scores].sort((a, b) => b.score - a.score)[0]
          const localRank = getRank(g.leaderboard.local)
          const globalRank = getRank(g.leaderboard.global)
          const friendsBoard = getFriendsLeaderboard(g.leaderboard.global)
          const friendsRank = getRank(friendsBoard)
          const isLocalHero = localRank === 1
          const isGlobalChamp = globalRank === 1
          const isFriendsBest = friendsRank === 1

          return (
            <button
              key={g.id}
              onClick={() => setSelectedGame(g.id)}
              className="bg-brand-gray-100 rounded-2xl p-5 cursor-pointer transition-all duration-150 active:scale-[0.98] text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{g.icon}</span>
                <span className="text-base font-semibold text-brand-black flex-1">{g.label}</span>
                <ChevronLeft size={16} className="text-brand-gray-400 rotate-180" />
              </div>

              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-[10px] font-medium text-brand-gray-400 uppercase tracking-wider">Personal Best</p>
                  <p className="text-4xl font-bold text-brand-black">{best.score}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-brand-gray-500">{best.venue.replace("O'Learys ", '')}</p>
                  <p className="text-xs text-brand-gray-400">{best.date}</p>
                </div>
              </div>

              {/* Rank pills */}
              <div className="flex flex-wrap gap-1.5">
                <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full ${isLocalHero ? 'bg-amber-400 text-white' : 'bg-white'}`}>
                  {isLocalHero && <Crown size={11} />}
                  <span className={`text-[10px] font-semibold ${isLocalHero ? '' : 'text-brand-black'}`}>
                    {isLocalHero ? 'Local Hero' : `#${localRank} Local`}
                  </span>
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full ${isFriendsBest ? 'bg-green-primary text-white' : 'bg-white'}`}>
                  {isFriendsBest && <Users size={11} />}
                  <span className={`text-[10px] font-semibold ${isFriendsBest ? '' : 'text-brand-black'}`}>
                    {isFriendsBest ? 'Nr. 1 among friends' : `#${friendsRank} Friends`}
                  </span>
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full ${isGlobalChamp ? 'bg-amber-400 text-white' : 'bg-white'}`}>
                  {isGlobalChamp && <Crown size={11} />}
                  <span className={`text-[10px] font-semibold ${isGlobalChamp ? '' : 'text-brand-black'}`}>
                    {isGlobalChamp ? 'Global Champion' : `#${globalRank} Global`}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Hall of Fame link */}
      <div className="px-5 pb-8">
        <button
          onClick={() => navigate('/challenges', { state: { tab: 'hallOfFame' } })}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-full border-2 border-green-primary text-green-primary font-semibold text-sm cursor-pointer transition-transform duration-200 active:scale-[0.97]"
        >
          <Trophy size={16} />
          Hall of Fame
        </button>
      </div>
    </div>
  )
}

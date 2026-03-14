import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Check, Camera, MapPin, Calendar, Plus } from 'lucide-react'

const HIGHSCORE_GAMES = [
  {
    id: 'bowling',
    label: 'Bowling',
    icon: '🎳',
    bio: 'The legendary lane crusher of Norrköping. Daniel "Strikeman" Svantesson has been known to clear entire pin decks with a single flick of the wrist. Opponents tremble when he laces up his shoes. His signature move — the reverse hook — has been studied by bowling scientists worldwide.',
    scores: [
      { score: 245, date: '2026-01-15', venue: "O'Learys Norrköping" },
      { score: 198, date: '2025-12-03', venue: "O'Learys Östermalm" },
      { score: 221, date: '2025-11-18', venue: "O'Learys Norrköping" },
    ],
  },
  {
    id: 'basketball',
    label: 'Basketball Arcade',
    icon: '🏀',
    bio: 'They call him "The Machine". Daniel Svantesson holds the unofficial O\'Learys record for most consecutive three-pointers on the arcade hoop. His shooting form has been compared to a trebuchet — mechanical, devastating, and slightly terrifying. Rumor has it the machine asked for a day off after his last visit.',
    scores: [
      { score: 84, date: '2026-03-05', venue: "O'Learys Norrköping" },
      { score: 71, date: '2026-02-14', venue: "O'Learys Norrköping" },
      { score: 62, date: '2026-01-22', venue: "O'Learys Östermalm" },
    ],
  },
  {
    id: 'boxing',
    label: 'Boxing Arcade',
    icon: '🥊',
    bio: 'Don\'t let the calm demeanor fool you — when Daniel Svantesson steps up to the boxing arcade, he transforms into a force of nature. His right hook has been clocked at "absolutely ridiculous" on the machine\'s internal scale. Staff have considered installing a warning sign. His fists are registered as sporting equipment in two municipalities.',
    scores: [
      { score: 891, date: '2026-02-20', venue: "O'Learys Östermalm" },
      { score: 834, date: '2026-01-08', venue: "O'Learys Norrköping" },
    ],
  },
]

const VENUES = ["O'Learys Norrköping", "O'Learys Östermalm"]

export default function Highscore() {
  const navigate = useNavigate()
  const [selectedGame, setSelectedGame] = useState(null)
  const [logGame, setLogGame] = useState(null)
  const [scoreInput, setScoreInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [venueInput, setVenueInput] = useState('')
  const [honored, setHonored] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
        {/* Header */}
        <div className="px-5 pt-14 pb-4">
          <button
            onClick={resetLog}
            className="flex items-center gap-1 text-sm text-brand-gray-500 mb-4 cursor-pointer"
          >
            <ChevronLeft size={18} /> Back
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{logGameData?.icon}</span>
            <h1 className="text-xl font-bold text-brand-black">Log Score</h1>
          </div>
          <p className="text-sm text-brand-gray-500">{logGameData?.label}</p>
        </div>

        <div className="px-5 pb-8">
          {/* Score */}
          <label className="text-sm font-semibold text-brand-black mb-1.5 block">Your Score</label>
          <input
            type="number"
            value={scoreInput}
            onChange={(e) => setScoreInput(e.target.value)}
            placeholder="Enter your score"
            className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary mb-4"
          />

          {/* Date */}
          <label className="text-sm font-semibold text-brand-black mb-1.5 block">Date</label>
          <div className="relative mb-4">
            <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray-400" />
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary"
            />
          </div>

          {/* Venue */}
          <label className="text-sm font-semibold text-brand-black mb-1.5 block">O'Learys Restaurant</label>
          <div className="flex gap-2 mb-4">
            {VENUES.map((v) => (
              <button
                key={v}
                onClick={() => setVenueInput(v)}
                className={`flex-1 py-3 px-3 rounded-xl text-sm font-semibold text-center cursor-pointer transition-all duration-150 ${
                  venueInput === v
                    ? 'bg-green-primary text-white'
                    : 'bg-brand-gray-100 text-brand-black'
                }`}
              >
                {v.replace("O'Learys ", '')}
              </button>
            ))}
          </div>

          {/* Photo evidence */}
          <label className="text-sm font-semibold text-brand-black mb-1.5 block">Photo Evidence</label>
          <button
            className="w-full py-3 rounded-xl border-2 border-dashed border-brand-gray-300 flex items-center justify-center gap-2 cursor-pointer text-sm font-medium text-brand-gray-500 mb-5"
          >
            <Camera size={18} className="text-brand-gray-400" />
            Upload photo evidence
          </button>

          {/* Honor checkbox */}
          <button
            onClick={() => setHonored(!honored)}
            className="flex items-center gap-3 mb-6 cursor-pointer"
          >
            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
              honored ? 'bg-green-primary border-green-primary' : 'border-brand-gray-300'
            }`}>
              {honored && <Check size={14} className="text-white" />}
            </div>
            <span className="text-sm text-brand-black">I honor that this score is true</span>
          </button>

          {/* Submit */}
          <button
            onClick={() => setSubmitted(true)}
            disabled={!scoreInput || !honored || !dateInput || !venueInput}
            className={`w-full py-3 rounded-full font-semibold text-sm cursor-pointer transition-all duration-200 ${
              scoreInput && honored && dateInput && venueInput
                ? 'bg-green-primary text-white active:scale-[0.97]'
                : 'bg-brand-gray-200 text-brand-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Score
          </button>
        </div>
      </div>
    )
  }

  // Game detail — scores + bio
  if (selectedGame && game) {
    return (
      <div className="pb-4">
        {/* Header */}
        <div className="px-5 pt-14 pb-2">
          <button
            onClick={() => setSelectedGame(null)}
            className="flex items-center gap-1 text-sm text-brand-gray-500 mb-4 cursor-pointer"
          >
            <ChevronLeft size={18} /> Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{game.icon}</span>
            <div>
              <h1 className="text-xl font-bold text-brand-black">{game.label}</h1>
              <p className="text-xs text-brand-gray-400">Daniel Svantesson's Record</p>
            </div>
          </div>
        </div>

        {/* Best score highlight */}
        {(() => {
          const sorted = [...game.scores].sort((a, b) => b.score - a.score)
          const best = sorted[0]
          return (
            <div className="mx-5 mb-4 bg-gradient-to-br from-green-primary to-emerald-600 rounded-2xl p-5 text-white">
              <p className="text-xs font-medium opacity-80 mb-1">Personal Best</p>
              <p className="text-5xl font-bold">{best.score}</p>
              <div className="flex items-center gap-3 mt-2 text-xs opacity-80">
                <span className="flex items-center gap-1"><MapPin size={12} /> {best.venue}</span>
                <span>{best.date}</span>
              </div>
            </div>
          )
        })()}

        {/* AI bio */}
        <div className="mx-5 mb-5 bg-brand-gray-100 rounded-2xl p-4">
          <p className="text-[10px] font-bold text-green-primary uppercase tracking-wider mb-2">AI Scouting Report</p>
          <p className="text-sm text-brand-gray-600 leading-relaxed">{game.bio}</p>
        </div>

        {/* Score history */}
        <div className="px-5 mb-6">
          <h3 className="text-sm font-bold text-brand-black mb-3">Score History</h3>
          <div className="flex flex-col gap-2">
            {[...game.scores].sort((a, b) => b.score - a.score).map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-gray-100">
                <span className="text-lg font-bold text-brand-black w-14">{s.score}</span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-brand-black">{s.venue}</p>
                  <p className="text-[11px] text-brand-gray-400">{s.date}</p>
                </div>
                {i === 0 && (
                  <span className="text-[10px] font-bold text-green-primary bg-green-primary/10 px-2 py-0.5 rounded-full">BEST</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Log score button */}
        <div className="px-5 pb-8">
          <button
            onClick={() => setLogGame(selectedGame)}
            className="w-full py-3 rounded-full bg-green-primary text-white font-semibold text-sm cursor-pointer transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Log New Score
          </button>
        </div>
      </div>
    )
  }

  // Game list overview
  return (
    <div className="pb-4">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-brand-gray-500 mb-4 cursor-pointer"
        >
          <ChevronLeft size={18} /> Back
        </button>
        <h1 className="text-2xl font-bold text-brand-black mb-1">My Highscores</h1>
        <p className="text-sm text-brand-gray-500">Daniel Svantesson</p>
      </div>

      {/* Game cards */}
      <div className="px-5 pb-8 flex flex-col gap-3">
        {HIGHSCORE_GAMES.map((g) => (
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
            {(() => {
              const best = [...g.scores].sort((a, b) => b.score - a.score)[0]
              return (
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-medium text-brand-gray-400 uppercase tracking-wider">Personal Best</p>
                    <p className="text-4xl font-bold text-brand-black">{best.score}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-brand-gray-500">{best.venue.replace("O'Learys ", '')}</p>
                    <p className="text-xs text-brand-gray-400">{best.date}</p>
                  </div>
                </div>
              )
            })()}
          </button>
        ))}
      </div>

      {/* Player card */}
      <div className="flex justify-center pb-8">
        <div className="w-[160px] rounded-xl overflow-hidden shadow-lg">
          <img src="/images/player-card-baseball.png" alt="Player card" className="w-full h-auto" />
        </div>
      </div>
    </div>
  )
}

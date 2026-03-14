import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Plus, X, Shuffle, Minus, Trophy, RotateCcw } from 'lucide-react'

const GAME_DATA = {
  '3kamp': { title: '3 Kamp', defaultActivities: ['Bowling', 'Darts', 'Shuffleboard'] },
  '5kamp': { title: '5 Kamp', defaultActivities: ['Bowling', 'Darts', 'Shuffleboard', 'Beer Pong', 'Foosball'] },
}

const ALL_ACTIVITIES = ['Bowling', 'Darts', 'Shuffleboard', 'Beer Pong', 'Foosball', 'Billiards', 'Air Hockey', 'Ping Pong', 'Karaoke', 'Trivia', 'Arm Wrestling', 'Cornhole']

// --- SETUP PHASE ---
function SetupPhase({ gameData, onStart, onBack }) {
  const [mode, setMode] = useState('individual')
  const [players, setPlayers] = useState([])
  const [playerName, setPlayerName] = useState('')
  const [activities, setActivities] = useState(gameData.defaultActivities)
  const [showActivities, setShowActivities] = useState(false)
  const [customActivity, setCustomActivity] = useState('')

  const minPlayers = mode === 'teams' ? 4 : 2
  const canContinue = players.length >= minPlayers && activities.length >= 1

  const addPlayer = () => {
    const name = playerName.trim()
    if (name && !players.includes(name)) {
      setPlayers([...players, name])
      setPlayerName('')
    }
  }

  const toggleActivity = (a) => {
    setActivities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a])
  }

  const addCustom = () => {
    const name = customActivity.trim()
    if (name && !activities.includes(name)) {
      setActivities([...activities, name])
      setCustomActivity('')
    }
  }

  return (
    <div className="px-4 pb-8">
      {/* Mode toggle */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-brand-black mb-2">Game mode</p>
        <div className="flex gap-2">
          {[{ id: 'individual', label: 'Everyone vs Everyone' }, { id: 'teams', label: 'Team Play' }].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors duration-200 border ${
                mode === m.id ? 'bg-green-primary text-white border-green-primary' : 'bg-white text-brand-black border-brand-gray-300'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-brand-black">Activities ({activities.length})</p>
          <button onClick={() => setShowActivities(!showActivities)} className="text-xs text-green-primary cursor-pointer font-medium">
            {showActivities ? 'Done' : 'Edit'}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {activities.map((a) => (
            <span key={a} className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-primary/10 text-green-primary">{a}</span>
          ))}
        </div>
        {showActivities && (
          <div className="border border-brand-gray-300 rounded-xl p-3 mt-2">
            <div className="flex flex-wrap gap-2 mb-3">
              {ALL_ACTIVITIES.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleActivity(a)}
                  className={`text-xs px-2.5 py-1.5 rounded-full cursor-pointer transition-colors duration-150 border ${
                    activities.includes(a) ? 'bg-green-primary text-white border-green-primary' : 'bg-white text-brand-black border-brand-gray-300'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={customActivity}
                onChange={(e) => setCustomActivity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustom()}
                placeholder="Custom activity..."
                className="flex-1 h-9 rounded-lg border border-brand-gray-300 px-3 text-sm outline-none focus:border-green-primary"
              />
              <button onClick={addCustom} className="h-9 px-3 rounded-lg bg-green-primary text-white text-sm font-medium cursor-pointer">Add</button>
            </div>
          </div>
        )}
      </div>

      {/* Players */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-brand-black mb-2">Players ({players.length})</p>
        <div className="flex gap-2 mb-3">
          <input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
            placeholder="Player name..."
            className="flex-1 h-11 rounded-xl border border-brand-gray-300 px-3 text-sm outline-none focus:border-green-primary"
          />
          <button onClick={addPlayer} className="h-11 w-11 rounded-xl bg-green-primary text-white flex items-center justify-center cursor-pointer">
            <Plus size={18} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {players.map((p) => (
            <div key={p} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-gray-100 text-sm">
              <span className="text-brand-black">{p}</span>
              <button onClick={() => setPlayers(players.filter((x) => x !== p))} className="cursor-pointer">
                <X size={14} className="text-brand-gray-500" />
              </button>
            </div>
          ))}
        </div>
        {players.length > 0 && players.length < minPlayers && (
          <p className="text-xs text-brand-gray-500 mt-2">Need at least {minPlayers} players for {mode === 'teams' ? 'team play' : 'this mode'}</p>
        )}
      </div>

      {/* Continue */}
      <button
        onClick={() => canContinue && onStart({ mode, players, activities })}
        disabled={!canContinue}
        className={`w-full py-3.5 rounded-2xl text-sm font-bold cursor-pointer transition-all duration-200 active:scale-[0.97] ${
          canContinue ? 'bg-brand-black text-white' : 'bg-brand-gray-100 text-brand-gray-500'
        }`}
      >
        {mode === 'teams' ? 'Set up teams' : 'Start game'}
      </button>
    </div>
  )
}

// --- TEAMS PHASE ---
function TeamsPhase({ players, onStart, onBack }) {
  const [teams, setTeams] = useState([
    { name: 'Team 1', players: [] },
    { name: 'Team 2', players: [] },
  ])
  const [unassigned, setUnassigned] = useState([...players])
  const [selected, setSelected] = useState(null)

  const allAssigned = unassigned.length === 0 && teams.every((t) => t.players.length > 0)

  const moveToTeam = (teamIdx) => {
    if (!selected) return
    const { name, from } = selected
    if (from === 'unassigned') {
      setUnassigned((u) => u.filter((p) => p !== name))
    } else {
      setTeams((t) => t.map((team, i) => i === from ? { ...team, players: team.players.filter((p) => p !== name) } : team))
    }
    setTeams((t) => t.map((team, i) => i === teamIdx ? { ...team, players: [...team.players, name] } : team))
    setSelected(null)
  }

  const moveToUnassigned = () => {
    if (!selected || selected.from === 'unassigned') return
    const { name, from } = selected
    setTeams((t) => t.map((team, i) => i === from ? { ...team, players: team.players.filter((p) => p !== name) } : team))
    setUnassigned((u) => [...u, name])
    setSelected(null)
  }

  const shuffle = () => {
    const all = [...unassigned, ...teams.flatMap((t) => t.players)]
    const shuffled = all.sort(() => Math.random() - 0.5)
    const numTeams = Math.max(2, Math.ceil(shuffled.length / 2))
    const newTeams = Array.from({ length: numTeams }, (_, i) => ({
      name: `Team ${i + 1}`,
      players: [],
    }))
    shuffled.forEach((p, i) => newTeams[i % numTeams].players.push(p))
    setTeams(newTeams)
    setUnassigned([])
    setSelected(null)
  }

  const addTeam = () => {
    setTeams([...teams, { name: `Team ${teams.length + 1}`, players: [] }])
  }

  return (
    <div className="px-4 pb-8">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-brand-black">Assign players to teams</p>
        <div className="flex gap-2">
          <button onClick={shuffle} className="flex items-center gap-1 text-xs font-medium text-green-primary cursor-pointer">
            <Shuffle size={14} /> Shuffle
          </button>
          <button onClick={addTeam} className="flex items-center gap-1 text-xs font-medium text-green-primary cursor-pointer">
            <Plus size={14} /> Add team
          </button>
        </div>
      </div>

      {/* Unassigned */}
      {unassigned.length > 0 && (
        <div
          className={`mb-4 p-3 rounded-xl border-2 border-dashed transition-colors ${selected && selected.from !== 'unassigned' ? 'border-green-primary bg-green-primary/5' : 'border-brand-gray-300'}`}
          onClick={moveToUnassigned}
        >
          <p className="text-xs text-brand-gray-500 mb-2">Unassigned ({unassigned.length})</p>
          <div className="flex flex-wrap gap-2">
            {unassigned.map((p) => (
              <button
                key={p}
                onClick={(e) => { e.stopPropagation(); setSelected({ name: p, from: 'unassigned' }) }}
                className={`text-sm px-3 py-1.5 rounded-full cursor-pointer transition-all ${
                  selected?.name === p ? 'bg-green-primary text-white scale-105' : 'bg-brand-gray-100 text-brand-black'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Teams */}
      <div className="space-y-3 mb-6">
        {teams.map((team, idx) => (
          <div
            key={idx}
            onClick={() => selected && moveToTeam(idx)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              selected && selected.from !== idx ? 'border-green-primary shadow-md' : 'border-brand-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <input
                value={team.name}
                onChange={(e) => setTeams((t) => t.map((tm, i) => i === idx ? { ...tm, name: e.target.value } : tm))}
                onClick={(e) => e.stopPropagation()}
                className="text-sm font-bold text-brand-black bg-transparent outline-none border-b border-transparent focus:border-green-primary"
              />
              {teams.length > 2 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setUnassigned((u) => [...u, ...team.players])
                    setTeams((t) => t.filter((_, i) => i !== idx))
                  }}
                  className="cursor-pointer"
                >
                  <X size={16} className="text-brand-gray-500" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 min-h-[32px]">
              {team.players.length === 0 ? (
                <span className="text-xs text-brand-gray-500">Tap a player, then tap here</span>
              ) : (
                team.players.map((p) => (
                  <button
                    key={p}
                    onClick={(e) => { e.stopPropagation(); setSelected({ name: p, from: idx }) }}
                    className={`text-sm px-3 py-1.5 rounded-full cursor-pointer transition-all ${
                      selected?.name === p ? 'bg-green-primary text-white scale-105' : 'bg-green-primary/10 text-green-primary'
                    }`}
                  >
                    {p}
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3.5 rounded-2xl border border-brand-gray-300 text-sm font-bold text-brand-black cursor-pointer">Back</button>
        <button
          onClick={() => allAssigned && onStart(teams)}
          disabled={!allAssigned}
          className={`flex-1 py-3.5 rounded-2xl text-sm font-bold cursor-pointer ${allAssigned ? 'bg-brand-black text-white' : 'bg-brand-gray-100 text-brand-gray-500'}`}
        >
          Start game
        </button>
      </div>
    </div>
  )
}

// --- PLAY PHASE ---
function PlayPhase({ teams, activities, onFinish, onBack }) {
  const [actIdx, setActIdx] = useState(0)
  const [scores, setScores] = useState(() => {
    const s = {}
    teams.forEach((t) => { s[t.name] = {} ; activities.forEach((a) => { s[t.name][a] = 0 }) })
    return s
  })

  const activity = activities[actIdx]
  const isLast = actIdx === activities.length - 1

  const setScore = (team, val) => {
    setScores((s) => ({ ...s, [team]: { ...s[team], [activity]: Math.max(0, val) } }))
  }

  const totals = useMemo(() => {
    return teams.map((t) => ({
      name: t.name,
      players: t.players,
      total: Object.values(scores[t.name] || {}).reduce((a, b) => a + b, 0),
    })).sort((a, b) => b.total - a.total)
  }, [scores, teams])

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="px-4 pb-8">
      {/* Activity tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5 -mx-4 px-4">
        {activities.map((a, i) => (
          <button
            key={a}
            onClick={() => setActIdx(i)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              i === actIdx ? 'bg-green-primary text-white' : 'bg-brand-gray-100 text-brand-gray-500'
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <p className="text-xs text-brand-gray-500 mb-3">Activity {actIdx + 1} of {activities.length}</p>

      {/* Score inputs */}
      <div className="space-y-3 mb-6">
        {teams.map((t) => (
          <div key={t.name} className="flex items-center justify-between p-4 rounded-xl border border-brand-gray-300">
            <div>
              <p className="font-semibold text-sm text-brand-black">{t.name}</p>
              {t.players.length > 1 && (
                <p className="text-[10px] text-brand-gray-500 mt-0.5">{t.players.join(', ')}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setScore(t.name, (scores[t.name]?.[activity] || 0) - 1)}
                className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer"
              >
                <Minus size={16} className="text-brand-black" />
              </button>
              <span className="text-xl font-bold text-brand-black w-8 text-center">
                {scores[t.name]?.[activity] || 0}
              </span>
              <button
                onClick={() => setScore(t.name, (scores[t.name]?.[activity] || 0) + 1)}
                className="w-9 h-9 rounded-full bg-green-primary flex items-center justify-center cursor-pointer"
              >
                <Plus size={16} className="text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Live scoreboard */}
      <div className="p-4 rounded-xl bg-brand-gray-100 mb-6">
        <p className="text-xs font-semibold text-brand-gray-500 uppercase mb-2">Scoreboard</p>
        {totals.map((t, i) => (
          <div key={t.name} className="flex items-center justify-between py-1.5">
            <span className="text-sm text-brand-black">
              <span className="w-6 inline-block">{i < 3 ? medals[i] : `${i + 1}.`}</span> {t.name}
            </span>
            <span className="text-sm font-bold text-brand-black">{t.total}</span>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => actIdx > 0 ? setActIdx(actIdx - 1) : onBack()}
          className="flex-1 py-3.5 rounded-2xl border border-brand-gray-300 text-sm font-bold text-brand-black cursor-pointer"
        >
          {actIdx > 0 ? 'Previous' : 'Back'}
        </button>
        <button
          onClick={() => isLast ? onFinish(scores) : setActIdx(actIdx + 1)}
          className="flex-1 py-3.5 rounded-2xl bg-brand-black text-white text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform"
        >
          {isLast ? 'Finish game' : 'Next activity'}
        </button>
      </div>
    </div>
  )
}

// --- RESULTS PHASE ---
function ResultsPhase({ teams, scores, activities, onPlayAgain, onDone }) {
  const totals = useMemo(() => {
    return teams.map((t) => ({
      name: t.name,
      players: t.players,
      total: Object.values(scores[t.name] || {}).reduce((a, b) => a + b, 0),
      scores: scores[t.name] || {},
    })).sort((a, b) => b.total - a.total)
  }, [scores, teams])

  const winner = totals[0]
  const medals = ['🥇', '🥈', '🥉']
  const confettiEmojis = ['🎉', '🏆', '⭐', '🎊', '🥇', '🔥', '💪', '👑']

  return (
    <div className="px-4 pb-8 relative overflow-hidden">
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-xl animate-[fall_3s_ease-in_forwards]"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: -30,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.8,
            }}
          >
            {confettiEmojis[i % confettiEmojis.length]}
          </div>
        ))}
      </div>

      {/* Winner */}
      <div className="text-center mb-6 relative">
        <div className="w-16 h-16 rounded-full bg-green-primary/10 flex items-center justify-center mx-auto mb-3">
          <Trophy size={32} className="text-green-primary" fill="#2d9b87" />
        </div>
        <h2 className="text-2xl font-bold text-brand-black">{winner.name}</h2>
        {winner.players.length > 1 && (
          <p className="text-sm text-brand-gray-500 mt-0.5">{winner.players.join(', ')}</p>
        )}
        <p className="text-3xl font-bold text-green-primary mt-1">{winner.total} pts</p>
      </div>

      {/* Rankings */}
      <div className="space-y-2 mb-6">
        {totals.map((t, i) => (
          <div
            key={t.name}
            className={`flex items-center justify-between p-3 rounded-xl ${
              i === 0 ? 'bg-green-primary/10 border border-green-primary' : 'bg-brand-gray-100'
            }`}
          >
            <span className="text-sm font-semibold text-brand-black">
              {i < 3 ? medals[i] : `${i + 1}.`} {t.name}
            </span>
            <span className="text-sm font-bold text-brand-black">{t.total}</span>
          </div>
        ))}
      </div>

      {/* Activity breakdown */}
      {activities.length >= 2 && (
        <div className="overflow-x-auto no-scrollbar mb-6 border border-brand-gray-300 rounded-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-gray-300">
                <th className="text-left p-2.5 text-xs font-semibold text-brand-gray-500">Team</th>
                {activities.map((a) => (
                  <th key={a} className="p-2.5 text-xs font-semibold text-brand-gray-500 text-center">{a}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {totals.map((t) => (
                <tr key={t.name} className="border-b border-brand-gray-100 last:border-0">
                  <td className="p-2.5 font-medium text-brand-black">{t.name}</td>
                  {activities.map((a) => (
                    <td key={a} className="p-2.5 text-center text-brand-black">{t.scores[a] || 0}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={onPlayAgain} className="flex-1 py-3.5 rounded-2xl border border-brand-gray-300 text-sm font-bold text-brand-black cursor-pointer flex items-center justify-center gap-2">
          <RotateCcw size={16} /> Play again
        </button>
        <button onClick={onDone} className="flex-1 py-3.5 rounded-2xl bg-brand-black text-white text-sm font-bold cursor-pointer">
          Done
        </button>
      </div>
    </div>
  )
}

// --- MAIN GAME DETAIL ---
export default function GameDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const game = GAME_DATA[id] || GAME_DATA['3kamp']

  const [phase, setPhase] = useState('setup')
  const [gameConfig, setGameConfig] = useState(null)
  const [teams, setTeams] = useState([])
  const [finalScores, setFinalScores] = useState(null)

  const handleSetupDone = (config) => {
    setGameConfig(config)
    if (config.mode === 'teams') {
      setPhase('teams')
    } else {
      const autoTeams = config.players.map((p) => ({ name: p, players: [p] }))
      setTeams(autoTeams)
      setPhase('play')
    }
  }

  const handleTeamsDone = (t) => {
    setTeams(t)
    setPhase('play')
  }

  const handleFinish = (scores) => {
    setFinalScores(scores)
    setPhase('results')
  }

  const handlePlayAgain = () => {
    setPhase('setup')
    setGameConfig(null)
    setTeams([])
    setFinalScores(null)
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <div className="px-4 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => phase === 'setup' ? navigate(-1) : setPhase('setup')} className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2" aria-label="Go back">
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
        <h1 className="text-sm font-bold text-brand-black uppercase tracking-wide">{game.title}</h1>
      </div>

      {phase === 'setup' && (
        <SetupPhase gameData={game} onStart={handleSetupDone} onBack={() => navigate(-1)} />
      )}
      {phase === 'teams' && (
        <TeamsPhase players={gameConfig.players} onStart={handleTeamsDone} onBack={() => setPhase('setup')} />
      )}
      {phase === 'play' && (
        <PlayPhase teams={teams} activities={gameConfig.activities} onFinish={handleFinish} onBack={() => setPhase(gameConfig.mode === 'teams' ? 'teams' : 'setup')} />
      )}
      {phase === 'results' && (
        <ResultsPhase teams={teams} scores={finalScores} activities={gameConfig.activities} onPlayAgain={handlePlayAgain} onDone={() => navigate('/play')} />
      )}
    </div>
  )
}

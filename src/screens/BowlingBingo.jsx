import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, UserPlus, X, Trophy, RotateCcw } from 'lucide-react'

const BINGO_LETTERS = ['B', 'I', 'N', 'G', 'O']
const CELL_POOL = [...Array.from({ length: 9 }, (_, i) => i + 1), ...Array.from({ length: 9 }, (_, i) => i + 1), 'STRIKE', 'STRIKE', 'SPARE', 'SPARE', 'GUTTER', 'GUTTER']

function generateCard() {
  const shuffled = [...CELL_POOL].sort(() => Math.random() - 0.5).slice(0, 24)
  const cells = [...shuffled.slice(0, 12), 'FREE', ...shuffled.slice(12)]
  const marked = Array(25).fill(false)
  marked[12] = true // free space
  return { cells, marked }
}

function checkBingo(marked) {
  // Rows
  for (let r = 0; r < 5; r++) {
    if (marked.slice(r * 5, r * 5 + 5).every(Boolean)) return true
  }
  // Columns
  for (let c = 0; c < 5; c++) {
    if ([0, 1, 2, 3, 4].every((r) => marked[r * 5 + c])) return true
  }
  // Diagonals
  if ([0, 6, 12, 18, 24].every((i) => marked[i])) return true
  if ([4, 8, 12, 16, 20].every((i) => marked[i])) return true
  return false
}

function SetupPhase({ onStart }) {
  const [names, setNames] = useState([])
  const [name, setName] = useState('')

  const add = () => {
    const n = name.trim()
    if (n && !names.includes(n)) { setNames([...names, n]); setName('') }
  }

  return (
    <div className="px-4 pb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-primary tracking-wider">BOWLING BINGO</h2>
        <p className="text-sm text-brand-gray-500 mt-1">Mark cells as you bowl. First to complete a line wins!</p>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold text-brand-black mb-2">Players</p>
        <div className="flex gap-2 mb-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="Player name..."
            className="flex-1 h-11 rounded-xl border border-brand-gray-300 px-3 text-sm outline-none focus:border-green-primary"
          />
          <button onClick={add} className="h-11 w-11 rounded-xl bg-green-primary text-white flex items-center justify-center cursor-pointer">
            <UserPlus size={18} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {names.map((n) => (
            <div key={n} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-gray-100 text-sm">
              <span className="text-brand-black">{n}</span>
              <button onClick={() => setNames(names.filter((x) => x !== n))} className="cursor-pointer"><X size={14} className="text-brand-gray-500" /></button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => names.length >= 1 && onStart(names)}
        disabled={names.length < 1}
        className={`w-full py-3.5 rounded-2xl text-sm font-bold cursor-pointer ${names.length >= 1 ? 'bg-brand-black text-white' : 'bg-brand-gray-100 text-brand-gray-500'}`}
      >
        Start Bowling Bingo
      </button>
    </div>
  )
}

function PlayPhase({ players, onWin }) {
  const [cards, setCards] = useState(() => players.map((p) => ({ name: p, ...generateCard() })))
  const [activeIdx, setActiveIdx] = useState(0)

  const toggleCell = useCallback((cellIdx) => {
    if (cellIdx === 12) return // free space
    setCards((prev) => {
      const next = [...prev]
      const card = { ...next[activeIdx] }
      card.marked = [...card.marked]
      card.marked[cellIdx] = !card.marked[cellIdx]
      next[activeIdx] = card
      if (checkBingo(card.marked)) {
        setTimeout(() => onWin(card.name), 100)
      }
      return next
    })
  }, [activeIdx, onWin])

  const card = cards[activeIdx]

  return (
    <div className="px-4 pb-8">
      {/* Player tabs */}
      {players.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 -mx-4 px-4">
          {players.map((p, i) => (
            <button
              key={p}
              onClick={() => setActiveIdx(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                i === activeIdx ? 'bg-green-primary text-white' : 'bg-brand-gray-100 text-brand-gray-500'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* BINGO header */}
      <div className="grid grid-cols-5 mb-1">
        {BINGO_LETTERS.map((l) => (
          <div key={l} className="text-center text-lg font-bold text-green-primary py-1">{l}</div>
        ))}
      </div>

      {/* Bingo grid */}
      <div className="grid grid-cols-5 border border-brand-gray-300 rounded-xl overflow-hidden">
        {card.cells.map((cell, i) => {
          const isFree = i === 12
          const isMarked = card.marked[i]
          return (
            <button
              key={i}
              onClick={() => toggleCell(i)}
              className={`aspect-square flex items-center justify-center border border-brand-gray-100 cursor-pointer transition-all duration-150 ${
                isFree
                  ? 'bg-green-primary/20 text-green-primary'
                  : isMarked
                    ? 'bg-green-primary text-white scale-[0.92] rounded-lg'
                    : 'bg-white text-brand-black active:bg-brand-gray-100'
              }`}
            >
              <span className={`font-bold ${typeof cell === 'string' ? 'text-[9px]' : 'text-lg'}`}>
                {isFree ? 'FREE' : cell}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function WinnerPhase({ winner, onPlayAgain, onDone }) {
  return (
    <div className="px-4 pb-8 text-center">
      <h2 className="text-4xl font-bold text-green-primary mb-4 tracking-wider">BINGO!</h2>
      <div className="p-6 rounded-2xl border-2 border-green-primary bg-green-primary/5 mb-6">
        <Trophy size={40} className="text-green-primary mx-auto mb-3" />
        <p className="text-xl font-bold text-brand-black">{winner}</p>
        <p className="text-sm text-brand-gray-500 mt-1">Got Bingo first! 🎳</p>
      </div>
      <div className="flex gap-3">
        <button onClick={onPlayAgain} className="flex-1 py-3.5 rounded-2xl border border-brand-gray-300 text-sm font-bold text-brand-black cursor-pointer flex items-center justify-center gap-2">
          <RotateCcw size={16} /> Play again
        </button>
        <button onClick={onDone} className="flex-1 py-3.5 rounded-2xl bg-brand-black text-white text-sm font-bold cursor-pointer">Done</button>
      </div>
    </div>
  )
}

export default function BowlingBingo() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('setup')
  const [players, setPlayers] = useState([])
  const [winner, setWinner] = useState(null)

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <div className="px-4 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => phase === 'setup' ? navigate(-1) : setPhase('setup')} className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2" aria-label="Go back">
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
        <h1 className="text-sm font-bold text-brand-black uppercase tracking-wide">Bowling Bingo</h1>
      </div>

      {phase === 'setup' && (
        <SetupPhase onStart={(names) => { setPlayers(names); setPhase('play') }} />
      )}
      {phase === 'play' && (
        <PlayPhase players={players} onWin={(name) => { setWinner(name); setPhase('winner') }} />
      )}
      {phase === 'winner' && (
        <WinnerPhase winner={winner} onPlayAgain={() => { setPhase('setup'); setPlayers([]); setWinner(null) }} onDone={() => navigate('/play')} />
      )}
    </div>
  )
}

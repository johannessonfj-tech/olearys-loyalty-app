import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronDown, ChevronUp, Minus, Plus, Check } from 'lucide-react'

const MATCHES = [
  { id: '1', home: 'Arsenal', away: 'Chelsea', time: '19:00', status: 'upcoming' },
  { id: '2', home: 'Barcelona', away: 'Real Madrid', time: '21:00', status: 'upcoming' },
  { id: '3', home: 'Liverpool', away: 'Man City', time: 'LIVE', status: 'live' },
  { id: '4', home: 'PSG', away: 'Bayern Munich', time: '20:45', status: 'upcoming' },
]

function MatchCard({ match, prediction, expanded, onToggle, onPredict, tempScore, onTempChange }) {
  return (
    <div className="border border-brand-gray-300 rounded-2xl overflow-hidden transition-all duration-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs text-brand-gray-500">{match.time}</span>
            {match.status === 'live' && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-red-500">LIVE</span>
              </span>
            )}
          </div>
          <p className="font-semibold text-sm text-brand-black">{match.home} vs {match.away}</p>
        </div>
        {prediction ? (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-primary/10 text-green-primary text-xs font-bold">
            <Check size={12} /> {prediction.home}–{prediction.away}
          </span>
        ) : (
          expanded ? <ChevronUp size={18} className="text-brand-gray-500" /> : <ChevronDown size={18} className="text-brand-gray-500" />
        )}
      </button>

      {expanded && !prediction && (
        <div className="px-4 pb-4 border-t border-brand-gray-100 pt-4">
          <div className="flex items-center justify-between gap-4">
            {/* Home score */}
            <div className="flex-1 text-center">
              <p className="text-xs font-medium text-brand-gray-500 mb-2">{match.home}</p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => onTempChange('home', Math.max(0, (tempScore?.home || 0) - 1))}
                  className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="text-2xl font-bold text-brand-black w-8 text-center">{tempScore?.home || 0}</span>
                <button
                  onClick={() => onTempChange('home', (tempScore?.home || 0) + 1)}
                  className="w-9 h-9 rounded-full bg-green-primary flex items-center justify-center cursor-pointer"
                >
                  <Plus size={14} className="text-white" />
                </button>
              </div>
            </div>

            <span className="text-xl font-bold text-brand-gray-300 mt-5">–</span>

            {/* Away score */}
            <div className="flex-1 text-center">
              <p className="text-xs font-medium text-brand-gray-500 mb-2">{match.away}</p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => onTempChange('away', Math.max(0, (tempScore?.away || 0) - 1))}
                  className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="text-2xl font-bold text-brand-black w-8 text-center">{tempScore?.away || 0}</span>
                <button
                  onClick={() => onTempChange('away', (tempScore?.away || 0) + 1)}
                  className="w-9 h-9 rounded-full bg-green-primary flex items-center justify-center cursor-pointer"
                >
                  <Plus size={14} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => onPredict(match.id, tempScore?.home || 0, tempScore?.away || 0)}
            className="w-full mt-4 py-3 rounded-xl bg-brand-black text-white text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform"
          >
            Submit Prediction
          </button>
        </div>
      )}
    </div>
  )
}

export default function PredictMatch() {
  const navigate = useNavigate()
  const [expandedId, setExpandedId] = useState(null)
  const [predictions, setPredictions] = useState({})
  const [tempScores, setTempScores] = useState({})
  const [showSummary, setShowSummary] = useState(false)
  const [toast, setToast] = useState(false)

  const handlePredict = (matchId, home, away) => {
    setPredictions((p) => ({ ...p, [matchId]: { home, away } }))
    setExpandedId(null)
    setToast(true)
    setTimeout(() => setToast(false), 2500)
  }

  const handleTempChange = (matchId, side, val) => {
    setTempScores((s) => ({ ...s, [matchId]: { ...s[matchId], [side]: val } }))
  }

  const predictionCount = Object.keys(predictions).length

  return (
    <div className="min-h-dvh flex flex-col bg-white relative">
      {/* Toast */}
      {toast && (
        <div className="absolute top-12 left-4 right-4 z-50 bg-green-primary text-white rounded-xl px-4 py-3 flex items-center gap-2 shadow-lg animate-[fadeIn_200ms_ease-out]">
          <Check size={18} />
          <span className="text-sm font-medium">Prediction submitted!</span>
        </div>
      )}

      <div className="px-4 pt-12 pb-2 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2" aria-label="Go back">
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
        <div>
          <h1 className="text-sm font-bold text-brand-black uppercase tracking-wide">Predict Match</h1>
          <p className="text-xs text-brand-gray-500">Predict the final scores</p>
        </div>
      </div>

      {/* Matches */}
      <div className="px-4 pt-2 pb-4 space-y-3">
        {MATCHES.map((m) => (
          <MatchCard
            key={m.id}
            match={m}
            prediction={predictions[m.id]}
            expanded={expandedId === m.id}
            onToggle={() => setExpandedId(expandedId === m.id ? null : m.id)}
            onPredict={handlePredict}
            tempScore={tempScores[m.id]}
            onTempChange={(side, val) => handleTempChange(m.id, side, val)}
          />
        ))}
      </div>

      {/* My predictions summary */}
      {predictionCount > 0 && (
        <div className="px-4 pb-8">
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="flex items-center justify-between w-full py-3 cursor-pointer"
          >
            <span className="text-sm font-bold text-brand-black">My Predictions ({predictionCount})</span>
            {showSummary ? <ChevronUp size={16} className="text-brand-gray-500" /> : <ChevronDown size={16} className="text-brand-gray-500" />}
          </button>
          {showSummary && (
            <div className="space-y-2">
              {Object.entries(predictions).map(([matchId, pred]) => {
                const match = MATCHES.find((m) => m.id === matchId)
                return (
                  <div key={matchId} className="flex items-center justify-between p-3 rounded-xl bg-brand-gray-100">
                    <span className="text-sm text-brand-black">{match.home} vs {match.away}</span>
                    <span className="text-sm font-bold text-green-primary">{pred.home}–{pred.away}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

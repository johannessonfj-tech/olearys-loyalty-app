import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Zap, Users, Target, ChevronRight } from 'lucide-react'

const GAME_MODES = [
  {
    id: '3kamp',
    title: '3 Kamp',
    Icon: Zap,
    description: 'Compete in 3 exciting activities against your friends. Perfect for a quick battle!',
    activities: ['Bowling', 'Darts', 'Shuffleboard'],
  },
  {
    id: '5kamp',
    title: '5 Kamp',
    Icon: Users,
    description: 'The ultimate 5-activity showdown. More games, more glory!',
    activities: ['Bowling', 'Darts', 'Shuffleboard', 'Beer Pong', 'Foosball'],
  },
  {
    id: 'bowling-bingo',
    title: 'Bowling Bingo',
    Icon: Target,
    description: 'Combine bowling with bingo! Complete a row of bowling challenges to win.',
    activities: ['Strikes', 'Spares', 'Trick Shots', 'Challenges'],
  },
]

export default function PlayGame() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <div className="px-4 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2" aria-label="Go back">
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
        <h1 className="text-sm font-bold text-brand-black uppercase tracking-wide">Play Game</h1>
      </div>

      <div className="px-4 pb-8 flex flex-col gap-4">
        {GAME_MODES.map((mode, i) => (
          <button
            key={mode.id}
            onClick={() => navigate(mode.id === 'bowling-bingo' ? '/play/bowling-bingo' : `/play/${mode.id}`)}
            className="flex items-start gap-4 rounded-2xl border border-brand-gray-300 bg-white p-5 text-left cursor-pointer transition-all duration-200 active:scale-[0.98] active:border-green-primary"
            aria-label={mode.title}
          >
            <div className="w-12 h-12 rounded-xl bg-green-primary/10 flex items-center justify-center flex-shrink-0">
              <mode.Icon size={24} className="text-green-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-brand-black text-base">{mode.title}</p>
              <p className="text-sm text-brand-gray-500 mt-0.5 leading-relaxed">{mode.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {mode.activities.map((a) => (
                  <span key={a} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand-gray-100 text-brand-gray-500">
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <ChevronRight size={18} className="text-brand-gray-500 flex-shrink-0 mt-1" />
          </button>
        ))}
      </div>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Gamepad2 } from 'lucide-react'

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

      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-16">
        <div className="w-20 h-20 rounded-2xl bg-green-primary/10 flex items-center justify-center mb-5">
          <Gamepad2 size={36} className="text-green-primary" />
        </div>
        <h2 className="text-xl font-bold text-brand-black mb-2">3 Kamp · 5 Kamp</h2>
        <p className="text-sm text-brand-gray-500 text-center leading-relaxed">
          Challenge your friends to a 3 Kamp or 5 Kamp competition. Pick your activities and let the games begin!
        </p>
        <button className="mt-6 px-8 py-3.5 rounded-2xl bg-green-primary text-white font-bold text-sm cursor-pointer transition-transform duration-200 active:scale-[0.97]">
          Coming soon
        </button>
      </div>
    </div>
  )
}

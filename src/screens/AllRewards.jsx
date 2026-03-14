import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const POINTS_TOTAL = 58231

const REWARDS = [
  { id: 'bowling', name: 'Bowling', pts: 800, image: '/images/redeem-bowling.png' },
  { id: 'softdrink', name: 'Soft Drink', pts: 400, image: '/images/redeem-softdrink.png' },
  { id: 'shuffleboard', name: 'Shuffleboard', pts: 800, image: '/images/redeem-shuffleboard.png' },
  { id: 'wings', name: 'Wings', pts: 1200, image: '/images/redeem-wings.png' },
]

function RewardCard({ reward, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col cursor-pointer group"
      aria-label={`${reward.name} — ${reward.pts} points`}
    >
      <div className="aspect-square rounded-2xl overflow-hidden bg-brand-gray-100 relative">
        <img
          src={reward.image}
          alt={reward.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.innerHTML += `<div class="absolute inset-0 flex items-center justify-center bg-green-light/20"><span class="text-green-primary font-bold text-sm">${reward.name}</span></div>`
          }}
        />
        <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-200 group-active:scale-90">
          <ChevronRight size={16} className="text-brand-black" />
        </div>
      </div>
      <p className="font-semibold text-sm text-brand-black mt-2">{reward.name}</p>
      <div className="flex items-center gap-1 mt-0.5">
        <Plus size={12} className="text-brand-black" />
        <span className="text-sm text-brand-black">{reward.pts.toLocaleString()}</span>
      </div>
    </button>
  )
}

export default function AllRewards() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2"
          aria-label="Go back"
        >
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
        <h1 className="text-sm font-bold text-brand-black uppercase tracking-wide">All Rewards</h1>
      </div>

      {/* Points summary */}
      <div className="px-4 flex items-center justify-between mb-4">
        <span className="text-sm text-brand-gray-500">Your points total</span>
        <span className="bg-brand-gray-100 text-brand-black text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
          <Plus size={12} />
          {POINTS_TOTAL.toLocaleString('sv-SE')}
        </span>
      </div>

      {/* Info banner */}
      <div className="mx-4 p-4 rounded-2xl border border-brand-gray-300 flex items-start justify-between mb-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-green-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Plus size={16} className="text-green-primary" />
          </div>
          <div>
            <p className="font-bold text-sm text-brand-black">REDEEM WITH POINTS</p>
            <p className="text-xs text-brand-gray-500 mt-0.5 leading-relaxed">
              Exchange your points for free items. Select your favorite item and receive a reward card to use on your orders!
            </p>
          </div>
        </div>
        <ChevronRight size={16} className="text-brand-gray-500 flex-shrink-0 mt-1" />
      </div>

      {/* Rewards grid */}
      <div className="px-4 grid grid-cols-2 gap-4 pb-8">
        {REWARDS.map((r) => (
          <RewardCard
            key={r.id}
            reward={r}
            onClick={() => navigate(`/rewards/${r.id}`)}
          />
        ))}
      </div>
    </div>
  )
}

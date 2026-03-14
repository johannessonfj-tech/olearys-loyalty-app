import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DEALS = [
  { id: 'sunday', name: 'Half Price Sunday', sub: 'Activities at 50% off', image: '/images/deal-sunday.png' },
  { id: 'burger', name: '2 for 1 Burger', sub: 'Limited time only', image: '/images/deal-burger.png' },
]

export default function AllDeals() {
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
        <h1 className="text-sm font-bold text-brand-black uppercase tracking-wide">All Deals</h1>
      </div>

      {/* Deals grid */}
      <div className="px-4 grid grid-cols-2 gap-4 pb-8">
        {DEALS.map((deal) => (
          <button
            key={deal.id}
            onClick={() => navigate(`/deals/${deal.id}`)}
            className="flex flex-col cursor-pointer group"
            aria-label={deal.name}
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-brand-gray-100 relative">
              <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-200 group-active:scale-90">
                <ChevronRight size={16} className="text-brand-black" />
              </div>
            </div>
            <p className="font-semibold text-sm text-brand-black mt-2 text-left">{deal.name}</p>
            <p className="text-xs text-brand-gray-500 text-left">{deal.sub}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

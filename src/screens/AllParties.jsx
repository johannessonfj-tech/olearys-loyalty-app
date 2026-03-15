import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Cake, Briefcase, Heart, ChevronRight } from 'lucide-react'

const PARTY_LIST = [
  { id: 'kidsparty', name: 'Kidsparty', desc: 'Bowling, food & fun for ages 4–12', from: '229 kr/child', color: '#FF6B6B', Icon: Cake },
  { id: 'birthdays', name: 'Birthdays', desc: 'Food, games & party vibes for every age', from: '459 kr/person', color: '#7C5CFC', Icon: Cake },
  { id: 'team-building', name: 'Team Building', desc: 'Challenges & dinner for the whole team', from: '519 kr/person', color: '#2DB87F', Icon: Briefcase },
  { id: 'date-night', name: 'Date Night', desc: 'Dinner, games & zero awkward silences', from: '249 kr/person', color: '#FF8C42', Icon: Heart },
]

export default function AllParties() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <button onClick={() => navigate('/book', { state: { tab: 'party' } })} className="w-10 h-10 flex items-center justify-center cursor-pointer -ml-2">
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
        <h1 className="text-lg font-bold text-brand-black">Party & Events</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-3">
        {PARTY_LIST.map((p) => {
          const Icon = p.Icon
          return (
            <button
              key={p.id}
              onClick={() => navigate(`/book/party/${p.id}`)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-brand-gray-200 text-left cursor-pointer active:bg-brand-gray-100/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: p.color + '15' }}>
                <Icon size={22} style={{ color: p.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-brand-black">{p.name}</p>
                <p className="text-xs text-brand-gray-500 mt-0.5">{p.desc}</p>
                <p className="text-xs font-semibold mt-1" style={{ color: p.color }}>From {p.from}</p>
              </div>
              <ChevronRight size={16} className="text-brand-gray-300 flex-shrink-0" />
            </button>
          )
        })}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, ChevronRight, Tv, UtensilsCrossed, Layers, PartyPopper, Gamepad2 } from 'lucide-react'

const CATEGORIES = [
  { id: 'watch', label: 'Watch', Icon: Tv },
  { id: 'eat', label: 'Eat & Drink', Icon: UtensilsCrossed },
  { id: 'combo', label: 'Combo', Icon: Layers },
  { id: 'party', label: 'Party &\nEvents', Icon: PartyPopper },
  { id: 'play', label: 'Play', Icon: Gamepad2 },
]

const DAYS = ['S', 'S', 'M', 'T', 'W', 'T', 'F']
const DATES = [14, 15, 16, 17, 18, 19, 20]

const MATCHES = [
  { id: 'lulea-farjestad', home: 'Luleå HF', away: 'Färjestad BK', league: 'SHL', time: '15:15', date: '14 Mar 2026' },
  { id: 'linkoping-orebro', home: 'Linköping HC', away: 'Örebro Hockey', league: 'SHL', time: '15:15', date: '14 Mar 2026' },
  { id: 'inter-atalanta', home: 'Inter', away: 'Atalanta', league: 'Serie A', time: '15:00', date: '14 Mar 2026' },
  { id: 'burnley-bournemouth', home: 'Burnley', away: 'AFC Bournemouth', league: 'Premier League', time: '16:00', date: '14 Mar 2026' },
  { id: 'arsenal-everton', home: 'Arsenal FC', away: 'Everton', league: 'Premier League', time: '18:30', date: '14 Mar 2026' },
  { id: 'chelsea-newcastle', home: 'Chelsea', away: 'Newcastle United', league: 'Premier League', time: '18:30', date: '14 Mar 2026' },
  { id: 'capitals-bruins', home: 'Washington Capitals', away: 'Boston Bruins', league: 'NHL', time: '20:00', date: '14 Mar 2026' },
  { id: 'westham-city', home: 'West Ham United', away: 'Manchester City', league: 'Premier League', time: '21:00', date: '14 Mar 2026' },
]

export default function Book() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('watch')
  const [selectedDate, setSelectedDate] = useState(14)

  return (
    <div className="pb-4">
      <div className="px-4 pt-10 flex items-center justify-between">
        <button className="px-4 py-2 rounded-full border border-brand-gray-300 text-sm font-medium text-brand-black cursor-pointer" aria-label="My bookings">My bookings</button>
        <button className="flex items-center gap-1.5 font-medium text-sm text-brand-black cursor-pointer" aria-label="Change location">
          Östermalm <Settings size={16} className="text-brand-gray-500" />
        </button>
        <div style={{ width: 100 }} />
      </div>

      <div className="px-4 mt-4 flex gap-3">
        <button className="flex-1 h-11 rounded-xl border border-brand-gray-300 text-sm text-brand-gray-500 flex items-center justify-center gap-1 cursor-pointer">
          <span>2 guests</span><ChevronRight size={14} className="rotate-90" />
        </button>
        <button className="flex-1 h-11 rounded-xl border border-brand-gray-300 text-sm text-brand-gray-500 flex items-center justify-center gap-1 cursor-pointer">
          <span>14/03</span><ChevronRight size={14} className="rotate-90" />
        </button>
      </div>

      <div className="flex gap-3 px-4 mt-5 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map(({ id, label, Icon }) => {
          const active = activeCategory === id
          return (
            <button key={id} onClick={() => setActiveCategory(id)} className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer" aria-pressed={active}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${active ? 'bg-green-primary border-green-primary' : 'bg-white border-brand-gray-300'}`}>
                <Icon size={22} className={active ? 'text-white' : 'text-brand-gray-500'} />
              </div>
              <span className={`text-[10px] font-medium text-center leading-tight whitespace-pre-line ${active ? 'text-green-primary' : 'text-brand-gray-500'}`}>{label}</span>
            </button>
          )
        })}
      </div>

      <div className="px-4 mt-7">
        <h2 className="text-base font-bold mb-3 text-brand-black">Upcoming Games</h2>
        <div className="mb-1">
          <p className="text-xs text-brand-gray-500 mb-2">March 2026</p>
          <div className="flex justify-between">
            {DAYS.map((d, i) => {
              const date = DATES[i]
              const isSelected = date === selectedDate
              return (
                <button key={i} onClick={() => setSelectedDate(date)} className="flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] justify-center cursor-pointer">
                  <span className="text-[10px] text-brand-gray-500 font-medium">{d}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isSelected ? 'bg-green-primary' : ''}`}>
                    <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-brand-black'}`}>{date}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {MATCHES.map((m) => (
          <div key={m.id} className="border border-brand-gray-300 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-sm text-brand-black">{m.home} – {m.away}</p>
                <p className="text-xs text-brand-gray-500 mt-0.5">{m.time}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-brand-gray-100 text-brand-gray-500 ml-2 whitespace-nowrap">{m.league}</span>
            </div>
            <button
              className="mt-3 w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-green-primary cursor-pointer transition-transform duration-200 active:scale-[0.97]"
              onClick={() => navigate(`/book/${m.id}`)}
            >
              Book a table
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

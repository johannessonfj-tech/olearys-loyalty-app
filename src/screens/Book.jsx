import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, ChevronRight, Tv, UtensilsCrossed, Sparkles, PartyPopper, Gamepad2, Users, Baby } from 'lucide-react'

const CATEGORIES = [
  { id: 'watch', label: 'Watch', Icon: Tv },
  { id: 'eat', label: 'Eat &\nDrink', Icon: UtensilsCrossed },
  { id: 'happenings', label: 'Happenings', Icon: Sparkles },
  { id: 'party', label: 'Party &\nEvents', Icon: PartyPopper },
  { id: 'play', label: 'Play', Icon: Gamepad2 },
]

const DAYS = ['W', 'T', 'F', 'S', 'S', 'M', 'T']
const DATES = [11, 12, 13, 14, 15, 16, 17]

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
  const [selectedDate, setSelectedDate] = useState(15)
  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState(0)
  const totalGuests = adults + kids

  return (
    <div className="pb-4">
      {/* Top bar */}
      <div className="px-4 pt-10 flex items-center justify-between">
        <button className="px-3 py-1.5 rounded-full border border-brand-gray-300 text-xs font-medium text-brand-black cursor-pointer" aria-label="My bookings">
          My bookings
        </button>
        <button className="flex items-center gap-1.5 font-medium text-sm text-brand-black cursor-pointer" aria-label="Change location">
          Östermalm <Settings size={16} className="text-brand-gray-500" />
        </button>
      </div>

      {/* Category pills */}
      <div className="flex gap-3 px-4 mt-4 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map(({ id, label, Icon }) => {
          const active = activeCategory === id
          return (
            <button key={id} onClick={() => setActiveCategory(id)} className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer" aria-pressed={active}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${active ? 'bg-green-primary border-green-primary' : 'bg-white border-brand-gray-300'}`}>
                <Icon size={20} className={active ? 'text-white' : 'text-brand-gray-500'} />
              </div>
              <span className={`text-[10px] font-medium text-center leading-tight whitespace-pre-line ${active ? 'text-green-primary' : 'text-brand-gray-500'}`}>{label}</span>
            </button>
          )
        })}
      </div>

      {/* Guest pickers */}
      <div className="px-4 mt-4 flex gap-2">
        <div className="flex-1 h-10 rounded-lg border border-brand-gray-300 flex items-center justify-between px-3">
          <span className="text-xs text-brand-gray-500">Nr. of adults</span>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-6 h-6 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer text-brand-black text-xs">−</button>
            <span className="text-xs font-semibold text-brand-black w-4 text-center">{adults}</span>
            <button onClick={() => setAdults(adults + 1)} className="w-6 h-6 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer text-brand-black text-xs">+</button>
          </div>
        </div>
        <div className="flex-1 h-10 rounded-lg border border-brand-gray-300 flex items-center justify-between px-3">
          <span className="text-xs text-brand-gray-500">Nr. of kids</span>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setKids(Math.max(0, kids - 1))} className="w-6 h-6 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer text-brand-black text-xs">−</button>
            <span className="text-xs font-semibold text-brand-black w-4 text-center">{kids}</span>
            <button onClick={() => setKids(kids + 1)} className="w-6 h-6 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer text-brand-black text-xs">+</button>
          </div>
        </div>
        <div className="h-10 rounded-lg bg-brand-gray-100 flex items-center px-3">
          <span className="text-xs font-bold text-brand-black whitespace-nowrap">x{totalGuests} guests</span>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-4 mt-5">
        <p className="text-xs text-brand-gray-500 mb-2">Mars 2026</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-0 flex-1 justify-between">
            {DAYS.map((d, i) => {
              const date = DATES[i]
              const isSelected = date === selectedDate
              return (
                <button key={i} onClick={() => setSelectedDate(date)} className="flex flex-col items-center gap-1 min-w-[36px] min-h-[44px] justify-center cursor-pointer">
                  <span className="text-[10px] text-brand-gray-500 font-medium">{d}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isSelected ? 'bg-green-primary' : ''}`}>
                    <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-brand-black'}`}>{date}</span>
                  </div>
                </button>
              )
            })}
          </div>
          <button className="ml-2 px-3 py-2 rounded-lg border border-brand-gray-300 text-[10px] text-brand-gray-500 font-medium cursor-pointer whitespace-nowrap">
            Pick other<br />date
          </button>
        </div>
      </div>

      {/* Matches */}
      <div className="px-4 mt-5 space-y-3">
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

import { useState } from 'react'
import { Settings, ChevronRight, Tv, UtensilsCrossed, Layers, PartyPopper, Gamepad2 } from 'lucide-react'

const CATEGORIES = [
  { id: 'watch', label: 'Watch', Icon: Tv },
  { id: 'eat', label: 'Eat & Drink', Icon: UtensilsCrossed },
  { id: 'combo', label: 'Combo', Icon: Layers },
  { id: 'party', label: 'Party &\nEvents', Icon: PartyPopper },
  { id: 'play', label: 'Play', Icon: Gamepad2 },
]

const DAYS = ['W', 'T', 'F', 'S', 'S', 'M', 'T']
const DATES = [11, 12, 13, 14, 15, 16, 17]

const MATCHES = [
  { id: 1, home: 'Djurgårdens IF', away: 'Skellefteå AIK', league: 'SHL', time: '15.15' },
  { id: 2, home: 'Arsenal FC', away: 'Everton', league: 'Premier League', time: '18.30' },
  { id: 3, home: 'Real Madrid', away: 'Barcelona', league: 'La Liga', time: '21.00' },
]

export default function Book() {
  const [activeCategory, setActiveCategory] = useState('watch')
  const [selectedDate, setSelectedDate] = useState(15)

  return (
    <div className="pb-4">
      {/* Top bar */}
      <div className="px-4 pt-10 flex items-center justify-between">
        <button
          className="px-4 py-2 rounded-full border border-brand-gray-300 text-sm font-medium text-brand-black cursor-pointer"
          aria-label="My bookings"
        >
          My bookings
        </button>
        <button
          className="flex items-center gap-1.5 font-medium text-sm text-brand-black cursor-pointer"
          aria-label="Change location"
        >
          Östermalm
          <Settings size={16} className="text-brand-gray-500" />
        </button>
        <div style={{ width: 100 }} />
      </div>

      {/* Filters */}
      <div className="px-4 mt-4 flex gap-3">
        <button
          className="flex-1 h-11 rounded-xl border border-brand-gray-300 text-sm text-brand-gray-500 flex items-center justify-center gap-1 cursor-pointer"
          aria-label="Select number of guests"
        >
          <span>2 guests</span>
          <ChevronRight size={14} className="rotate-90" />
        </button>
        <button
          className="flex-1 h-11 rounded-xl border border-brand-gray-300 text-sm text-brand-gray-500 flex items-center justify-center gap-1 cursor-pointer"
          aria-label="Select date"
        >
          <span>15/03</span>
          <ChevronRight size={14} className="rotate-90" />
        </button>
      </div>

      {/* Category pills */}
      <div className="flex gap-3 px-4 mt-5 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map(({ id, label, Icon }) => {
          const active = activeCategory === id
          return (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer"
              aria-label={label.replace('\n', ' ')}
              aria-pressed={active}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                  active ? 'bg-green-primary border-green-primary' : 'bg-white border-brand-gray-300'
                }`}
              >
                <Icon size={22} className={active ? 'text-white' : 'text-brand-gray-500'} />
              </div>
              <span
                className={`text-[10px] font-medium text-center leading-tight whitespace-pre-line ${
                  active ? 'text-green-primary' : 'text-brand-gray-500'
                }`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Upcoming Games */}
      <div className="px-4 mt-7">
        <h2 className="text-base font-bold mb-3 text-brand-black">Upcoming Games</h2>

        {/* Week calendar */}
        <div className="mb-1">
          <p className="text-xs text-brand-gray-500 mb-2">Mars 2026</p>
          <div className="flex justify-between">
            {DAYS.map((d, i) => {
              const date = DATES[i]
              const isSelected = date === selectedDate
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className="flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] justify-center cursor-pointer"
                  aria-label={`March ${date}`}
                  aria-pressed={isSelected}
                >
                  <span className="text-[10px] text-brand-gray-500 font-medium">{d}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      isSelected ? 'bg-green-primary' : ''
                    }`}
                  >
                    <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-brand-black'}`}>
                      {date}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Match cards */}
      <div className="px-4 mt-4 space-y-3">
        {MATCHES.map((m) => (
          <div key={m.id} className="border border-brand-gray-300 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-sm text-brand-black">
                  {m.home} – {m.away}
                </p>
                <p className="text-xs text-brand-gray-500 mt-0.5">{m.time}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-brand-gray-100 text-brand-gray-500 ml-2 whitespace-nowrap">
                {m.league}
              </span>
            </div>
            <button
              className="mt-3 w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-green-primary cursor-pointer transition-transform duration-200 active:scale-[0.97]"
              aria-label={`Book a table for ${m.home} vs ${m.away}`}
            >
              Book a table
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

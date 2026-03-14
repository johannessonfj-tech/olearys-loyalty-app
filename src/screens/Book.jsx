import { useState } from 'react'
import { Settings, ChevronLeft, ChevronRight, Tv, UtensilsCrossed, Layers, PartyPopper, Gamepad2 } from 'lucide-react'

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
  const [guests, setGuests] = useState(2)

  return (
    <div className="pb-4">
      {/* Top bar */}
      <div className="px-4 pt-10 flex items-center justify-between">
        <button
          className="px-4 py-2 rounded-full border text-sm font-medium"
          style={{ borderColor: '#e0e0e0', color: '#3c3c3c' }}
        >
          My bookings
        </button>
        <button className="flex items-center gap-1.5 font-medium text-sm" style={{ color: '#3c3c3c' }}>
          Östermalm
          <Settings size={16} color="#9e9e9e" />
        </button>
        <div style={{ width: 100 }} />
      </div>

      {/* Filters */}
      <div className="px-4 mt-4 flex gap-3">
        <button className="flex-1 h-11 rounded-xl border border-gray-200 text-sm text-gray-500 flex items-center justify-center gap-1">
          <span>{guests} guests</span>
          <ChevronRight size={14} className="rotate-90" />
        </button>
        <button className="flex-1 h-11 rounded-xl border border-gray-200 text-sm text-gray-500 flex items-center justify-center gap-1">
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
              className="flex-shrink-0 flex flex-col items-center gap-1"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all"
                style={{
                  backgroundColor: active ? '#2d9b87' : '#fff',
                  borderColor: active ? '#2d9b87' : '#e0e0e0',
                }}
              >
                <Icon size={22} color={active ? '#fff' : '#9e9e9e'} />
              </div>
              <span
                className="text-[10px] font-medium text-center leading-tight whitespace-pre-line"
                style={{ color: active ? '#2d9b87' : '#9e9e9e' }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Upcoming Games */}
      <div className="px-4 mt-7">
        <h2 className="text-base font-bold mb-3" style={{ color: '#3c3c3c' }}>Upcoming Games</h2>

        {/* Week calendar */}
        <div className="mb-1">
          <p className="text-xs text-gray-400 mb-2">Mars 2026</p>
          <div className="flex justify-between">
            {DAYS.map((d, i) => {
              const date = DATES[i]
              const isSelected = date === selectedDate
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-[10px] text-gray-400 font-medium">{d}</span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: isSelected ? '#2d9b87' : 'transparent',
                    }}
                  >
                    <span
                      className="text-sm font-semibold"
                      style={{ color: isSelected ? '#fff' : '#3c3c3c' }}
                    >
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
          <div
            key={m.id}
            className="border border-gray-200 rounded-xl p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-sm" style={{ color: '#3c3c3c' }}>
                  {m.home} – {m.away}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{m.time}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-500 ml-2 whitespace-nowrap">
                {m.league}
              </span>
            </div>
            <button
              className="mt-3 w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all active:scale-95"
              style={{ backgroundColor: '#2d9b87' }}
            >
              Book a table
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

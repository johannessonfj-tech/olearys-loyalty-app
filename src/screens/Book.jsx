import { useState } from 'react'
import { Settings, ChevronRight, Tv, UtensilsCrossed, CalendarDays, PartyPopper, Gamepad2 } from 'lucide-react'

const CATEGORIES = [
  { id: 'watch', label: 'Watch', Icon: Tv },
  { id: 'eat', label: 'Eat & Drink', Icon: UtensilsCrossed },
  { id: 'happenings', label: 'Happenings', Icon: CalendarDays },
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

const EAT_ITEMS = [
  { id: 1, name: 'Smash Burger', desc: 'Double patty, cheddar, pickles, special sauce', price: 169, tag: 'Popular' },
  { id: 2, name: 'Nachos Supreme', desc: 'Loaded nachos with jalapeños, guac & sour cream', price: 139 },
  { id: 3, name: 'Chicken Wings', desc: '10 pcs buffalo wings with ranch dip', price: 149 },
  { id: 4, name: 'Pizza Margherita', desc: 'Classic tomato, mozzarella, fresh basil', price: 129 },
]

const HAPPENINGS = [
  { id: 1, name: 'Champions League Night', desc: 'Live on the big screen — special match menu & drink deals', date: 'Tue 18 Mar', time: '21:00', tag: 'Popular' },
  { id: 2, name: 'Quiz Night', desc: 'Weekly pub quiz with prizes — teams of up to 6', date: 'Wed 19 Mar', time: '19:00' },
  { id: 3, name: 'Live Music Friday', desc: 'Live band + DJ from 21:00 — no cover charge', date: 'Fri 21 Mar', time: '21:00' },
  { id: 4, name: 'Kids Sunday', desc: 'Face painting, bowling & kids menu deals all day', date: 'Sun 23 Mar', time: '11:00', tag: 'Family' },
]

const PARTY_ITEMS = [
  { id: 1, name: 'Birthday Party', desc: 'Bowling, food & cake for up to 10 kids', price: 2499, tag: 'Popular' },
  { id: 2, name: 'After Work', desc: 'Drinks, bowling & snacks for 10+ people', price: 299, perPerson: true },
  { id: 3, name: 'Company Event', desc: 'Custom event package — contact us for details', price: null },
]

const PLAY_ITEMS = [
  { id: 1, name: 'Bowling', desc: '1 hour per lane, up to 6 players', price: 249, tag: 'Popular' },
  { id: 2, name: 'Shuffleboard', desc: '1 hour, up to 4 players', price: 149 },
  { id: 3, name: '3 Kamp', desc: 'Bowling + Shuffleboard + Darts', price: 349 },
  { id: 4, name: '5 Kamp', desc: 'Bowling + Shuffleboard + Darts + Billiard + Table Tennis', price: 499 },
]

function WatchContent({ selectedDate, setSelectedDate }) {
  return (
    <>
      <div className="px-4 mt-7">
        <h2 className="text-base font-bold mb-3 text-brand-black">Upcoming Games</h2>
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
    </>
  )
}

function ItemList({ items, ctaLabel = 'Book now' }) {
  return (
    <div className="px-4 mt-5 space-y-3">
      {items.map((item) => (
        <div key={item.id} className="border border-brand-gray-300 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm text-brand-black">{item.name}</p>
                {item.tag && (
                  <span className="text-[10px] font-bold text-green-primary bg-green-primary/10 px-2 py-0.5 rounded-full">{item.tag}</span>
                )}
              </div>
              <p className="text-xs text-brand-gray-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
            {item.price !== null && (
              <div className="text-right ml-3 flex-shrink-0">
                <p className="text-sm font-bold text-brand-black">{item.price} kr</p>
                {item.perPerson && <p className="text-[10px] text-brand-gray-500">/person</p>}
              </div>
            )}
          </div>
          <button
            className="mt-3 w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-green-primary cursor-pointer transition-transform duration-200 active:scale-[0.97]"
          >
            {item.price === null ? 'Contact us' : ctaLabel}
          </button>
        </div>
      ))}
    </div>
  )
}

function HappeningsContent() {
  return (
    <div className="px-4 mt-5 space-y-3">
      {HAPPENINGS.map((h) => (
        <div key={h.id} className="border border-brand-gray-300 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm text-brand-black">{h.name}</p>
                {h.tag && (
                  <span className="text-[10px] font-bold text-green-primary bg-green-primary/10 px-2 py-0.5 rounded-full">{h.tag}</span>
                )}
              </div>
              <p className="text-xs text-brand-gray-500 mt-1 leading-relaxed">{h.desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs font-medium text-brand-black">{h.date}</span>
            <span className="text-xs text-brand-gray-500">{h.time}</span>
          </div>
          <button className="mt-3 w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-green-primary cursor-pointer transition-transform duration-200 active:scale-[0.97]">
            Book a spot
          </button>
        </div>
      ))}
    </div>
  )
}

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

      {/* Category content */}
      {activeCategory === 'watch' && <WatchContent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
      {activeCategory === 'eat' && <ItemList items={EAT_ITEMS} ctaLabel="Order now" />}
      {activeCategory === 'happenings' && <HappeningsContent />}
      {activeCategory === 'party' && <ItemList items={PARTY_ITEMS} ctaLabel="Book event" />}
      {activeCategory === 'play' && <ItemList items={PLAY_ITEMS} ctaLabel="Book now" />}
    </div>
  )
}

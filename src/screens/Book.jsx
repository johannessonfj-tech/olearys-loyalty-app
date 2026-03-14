import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, ChevronDown, Tv, UtensilsCrossed, Sparkles, PartyPopper, Gamepad2 } from 'lucide-react'

const LOCATIONS = ['Norrköping', 'Östermalm']

const CATEGORIES = [
  { id: 'watch', label: 'Watch', Icon: Tv },
  { id: 'eat', label: 'Eat &\nDrink', Icon: UtensilsCrossed },
  { id: 'happenings', label: 'Happenings', Icon: Sparkles },
  { id: 'party', label: 'Party &\nEvents', Icon: PartyPopper },
  { id: 'play', label: 'Play', Icon: Gamepad2 },
]

const DAYS = ['T', 'F', 'S', 'S', 'M']
const DATES = [13, 14, 15, 16, 17]

const MATCHES = [
  { id: 'lulea-farjestad', home: 'Luleå HF', away: 'Färjestad BK', league: 'SHL', time: '15:15' },
  { id: 'linkoping-orebro', home: 'Linköping HC', away: 'Örebro Hockey', league: 'SHL', time: '15:15' },
  { id: 'inter-atalanta', home: 'Inter', away: 'Atalanta', league: 'Serie A', time: '15:00' },
  { id: 'burnley-bournemouth', home: 'Burnley', away: 'AFC Bournemouth', league: 'Premier League', time: '16:00' },
  { id: 'arsenal-everton', home: 'Arsenal FC', away: 'Everton', league: 'Premier League', time: '18:30' },
  { id: 'chelsea-newcastle', home: 'Chelsea', away: 'Newcastle United', league: 'Premier League', time: '18:30' },
  { id: 'capitals-bruins', home: 'Washington Capitals', away: 'Boston Bruins', league: 'NHL', time: '20:00' },
  { id: 'westham-city', home: 'West Ham United', away: 'Manchester City', league: 'Premier League', time: '21:00' },
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
  const navigate = useNavigate()
  const [location, setLocation] = useState('Norrköping')
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [activeCategory, setActiveCategory] = useState('watch')
  const [selectedDate, setSelectedDate] = useState(15)
  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState(0)
  const [editingAdults, setEditingAdults] = useState(false)
  const [editingKids, setEditingKids] = useState(false)
  const totalGuests = adults + kids

  return (
    <div className="pb-2">
      {/* Top bar: My bookings + centered location */}
      <div className="px-4 pt-4 flex items-center justify-between">
        <button onClick={() => navigate('/my-bookings')} className="px-3 py-1.5 rounded-full border border-brand-gray-300 text-xs font-medium text-brand-black cursor-pointer" aria-label="My bookings">
          My bookings
        </button>
        <button
          onClick={() => setShowLocationPicker(!showLocationPicker)}
          className="flex items-center gap-1.5 font-medium text-sm text-brand-black cursor-pointer absolute left-1/2 -translate-x-1/2"
          aria-label="Change location"
        >
          <MapPin size={14} className="text-green-primary" />
          {location}
          <ChevronDown size={14} className="text-brand-gray-500" />
        </button>
        <div style={{ width: 80 }} />
      </div>

      {/* Location picker dropdown */}
      {showLocationPicker && (
        <div className="mx-4 mt-2 border border-brand-gray-300 rounded-xl bg-white shadow-lg overflow-hidden z-50 relative">
          {LOCATIONS.map((loc) => (
            <button
              key={loc}
              onClick={() => { setLocation(loc); setShowLocationPicker(false) }}
              className={`w-full px-4 py-3 text-left text-sm cursor-pointer transition-colors flex items-center gap-2 ${
                location === loc ? 'bg-green-primary/5 text-green-primary font-semibold' : 'text-brand-black hover:bg-brand-gray-100'
              }`}
            >
              <MapPin size={14} className={location === loc ? 'text-green-primary' : 'text-brand-gray-500'} />
              {loc}
            </button>
          ))}
        </div>
      )}

      {/* Category pills — centered */}
      <div className="flex justify-center gap-4 px-4 mt-4">
        {CATEGORIES.map(({ id, label, Icon }) => {
          const active = activeCategory === id
          return (
            <button key={id} onClick={() => setActiveCategory(id)} className="flex flex-col items-center gap-1 cursor-pointer" aria-pressed={active}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${active ? 'bg-green-primary border-green-primary' : 'bg-white border-brand-gray-300'}`}>
                <Icon size={20} className={active ? 'text-white' : 'text-brand-gray-500'} />
              </div>
              <span className={`text-[10px] font-medium text-center leading-tight whitespace-pre-line ${active ? 'text-green-primary' : 'text-brand-gray-500'}`}>{label}</span>
            </button>
          )
        })}
      </div>

      {/* Guest inputs — tappable to type */}
      <div className="px-4 mt-4 flex gap-2 items-center">
        <button
          onClick={() => { setEditingAdults(true); setEditingKids(false) }}
          className="flex-1 h-11 rounded-xl border border-brand-gray-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          {editingAdults ? (
            <input
              type="number"
              min="1"
              value={adults}
              onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
              onBlur={() => setEditingAdults(false)}
              autoFocus
              className="w-full h-full text-center text-sm font-semibold text-brand-black outline-none bg-transparent"
            />
          ) : (
            <>
              <span className="text-xs text-brand-gray-500">Nr. of adults</span>
              <span className="text-sm font-bold text-brand-black">{adults}</span>
            </>
          )}
        </button>
        <button
          onClick={() => { setEditingKids(true); setEditingAdults(false) }}
          className="flex-1 h-11 rounded-xl border border-brand-gray-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          {editingKids ? (
            <input
              type="number"
              min="0"
              value={kids}
              onChange={(e) => setKids(Math.max(0, parseInt(e.target.value) || 0))}
              onBlur={() => setEditingKids(false)}
              autoFocus
              className="w-full h-full text-center text-sm font-semibold text-brand-black outline-none bg-transparent"
            />
          ) : (
            <>
              <span className="text-xs text-brand-gray-500">Nr. of kids</span>
              <span className="text-sm font-bold text-brand-black">{kids}</span>
            </>
          )}
        </button>
        <div className="h-11 rounded-xl bg-brand-gray-100 flex items-center px-3 flex-shrink-0">
          <span className="text-xs font-bold text-brand-black whitespace-nowrap">{totalGuests} guests</span>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-4 mt-4">
        <p className="text-xs text-brand-gray-500 mb-2">Mars 2026</p>
        <div className="flex items-center gap-1">
          <div className="flex flex-1 justify-between">
            {DAYS.map((d, i) => {
              const date = DATES[i]
              const isSelected = date === selectedDate
              return (
                <button key={i} onClick={() => setSelectedDate(date)} className="flex flex-col items-center gap-1 min-w-[34px] min-h-[44px] justify-center cursor-pointer">
                  <span className="text-[10px] text-brand-gray-500 font-medium">{d}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isSelected ? 'bg-green-primary' : ''}`}>
                    <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-brand-black'}`}>{date}</span>
                  </div>
                </button>
              )
            })}
          </div>
          <button className="ml-1 px-2.5 py-2 rounded-lg border border-brand-gray-300 text-[10px] text-brand-gray-500 font-medium cursor-pointer whitespace-nowrap leading-tight text-center">
            Pick other<br />date
          </button>
        </div>
      </div>

      {/* Category content */}
      {activeCategory === 'watch' && (
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
      )}
      {activeCategory === 'eat' && <ItemList items={EAT_ITEMS} ctaLabel="Order now" />}
      {activeCategory === 'happenings' && <HappeningsContent />}
      {activeCategory === 'party' && <ItemList items={PARTY_ITEMS} ctaLabel="Book event" />}
      {activeCategory === 'play' && <ItemList items={PLAY_ITEMS} ctaLabel="Book now" />}
    </div>
  )
}

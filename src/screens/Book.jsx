import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MapPin, ChevronDown, Tv, UtensilsCrossed, Sparkles, PartyPopper, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react'

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
  { id: 'lulea-farjestad', home: 'Luleå HF', away: 'Färjestad BK', league: 'SHL', time: '15:15', homeColor: '#e31837', awayColor: '#006847', homeShort: 'LHF', awayShort: 'FBK' },
  { id: 'linkoping-orebro', home: 'Linköping HC', away: 'Örebro Hockey', league: 'SHL', time: '15:15', homeColor: '#003d7c', awayColor: '#000000', homeShort: 'LHC', awayShort: 'ÖRE' },
  { id: 'inter-atalanta', home: 'Inter', away: 'Atalanta', league: 'Serie A', time: '15:00', homeColor: '#002f87', awayColor: '#1e71b8', homeShort: 'INT', awayShort: 'ATA' },
  { id: 'burnley-bournemouth', home: 'Burnley', away: 'AFC Bournemouth', league: 'Premier League', time: '16:00', homeColor: '#6c1d45', awayColor: '#da291c', homeShort: 'BUR', awayShort: 'BOU' },
  { id: 'arsenal-everton', home: 'Arsenal FC', away: 'Everton', league: 'Premier League', time: '18:30', homeColor: '#ef0107', awayColor: '#003399', homeShort: 'ARS', awayShort: 'EVE' },
  { id: 'chelsea-newcastle', home: 'Chelsea', away: 'Newcastle United', league: 'Premier League', time: '18:30', homeColor: '#034694', awayColor: '#241f20', homeShort: 'CHE', awayShort: 'NEW' },
  { id: 'capitals-bruins', home: 'Washington Capitals', away: 'Boston Bruins', league: 'NHL', time: '20:00', homeColor: '#cf0a2c', awayColor: '#FFB81C', homeShort: 'WSH', awayShort: 'BOS' },
  { id: 'westham-city', home: 'West Ham United', away: 'Manchester City', league: 'Premier League', time: '21:00', homeColor: '#7a263a', awayColor: '#6cabdd', homeShort: 'WHU', awayShort: 'MCI' },
]

const PACKAGES = [
  { id: 'dinner-bowling', name: 'Dinner & Bowling', duration: '2 hours', priceFrom: 349, img: 'https://media.umbraco.io/olearys-group/wyoj0nkv/img_0023-1-2_updated.jpg' },
  { id: 'dinner-5game', name: 'Dinner & 5 Game Challenge', duration: '3–4 hours', priceFrom: 499, img: 'https://media.umbraco.io/olearys-group/w3clym4y/shuffle.jpg' },
  { id: 'afterwork', name: 'After Work', duration: '2–3 hours', priceFrom: 299, img: 'https://media.umbraco.io/olearys-group/kx0hqm0f/guests_aw_dinner.jpg' },
]

const EAT_TIME_SLOTS = ['16:00', '18:00', '18:15', '19:30', '21:30']

const POPULAR_HAPPENINGS = [
  { id: 'cl-night', name: 'Champions League', subtitle: 'Dinner & Game', date: 'Tue 18 Mar', time: '21:00', img: 'https://delivery2.objectic.io/7QMcOQTPxZudozTrjFxeQs/HNbtnbmfMkQx/soaoiWxBIJLPqMcEjsolbV1AsZtuZPeEmpM1DXC4.jpg' },
  { id: 'music-quiz-1', name: 'Music Quiz', subtitle: 'Dinner & Quiz', date: 'Wed 19 Mar', time: '19:00', img: 'https://media.umbraco.io/olearys-group/whonaata/quiz_friends.png' },
  { id: 'by-night-1', name: "O'Learys By Night", subtitle: 'Club Night', date: 'Fri 21 Mar', time: '22:00', img: 'https://media.umbraco.io/olearys-group/hqsj0fb2/trubadur.png' },
]

// Events on the selected date for the happenings tab
const HAPPENINGS_BY_DATE = {
  13: [],
  14: [{ id: 'cl-night', name: 'Champions League Night', time: '21:00', desc: 'Live on the big screen — special match menu & drink deals' }],
  15: [{ id: 'music-quiz-1', name: 'Music Quiz', time: '19:00', desc: 'Melodifestivalen/Eurovision theme, hosted by Anders' }],
  16: [{ id: 'by-night-1', name: "O'Learys By Night Club", time: '22:00', desc: 'DJ, drinks & dancing until 03:00' }],
  17: [],
}

const PARTY_CATEGORIES = [
  { id: 'kidsparty', name: 'Kidsparty', desc: 'Bowling, food & fun for ages 4–12', from: '229 kr/child', color: '#FF6B6B', img: 'https://media.umbraco.io/olearys-group/asypkupw/adobestock_917116219.jpg' },
  { id: 'birthdays', name: 'Birthdays', desc: 'Food, games & party vibes', from: '459 kr/person', color: '#7C5CFC', img: 'https://media.umbraco.io/olearys-group/1ceeihfv/vrijgezellenparty.png' },
  { id: 'team-building', name: 'Team Building', desc: 'Challenges & dinner for the team', from: '519 kr/person', color: '#2DB87F', img: 'https://media.umbraco.io/olearys-group/kx0hqm0f/guests_aw_dinner.jpg' },
  { id: 'date-night', name: 'Date Night', desc: 'Dinner, games & zero awkward silences', from: '249 kr/person', color: '#FF8C42', img: 'https://media.umbraco.io/olearys-group/f0bp0yrl/date-night.jpg' },
]

const PLAY_PACKAGES = [
  { id: 'bowling-dinner', name: 'Bowling & Dinner', duration: '2 hours', priceFrom: 449, img: 'https://media.umbraco.io/olearys-group/wyoj0nkv/img_0023-1-2_updated.jpg' },
  { id: '3kamp-dinner', name: '3-kamp & Dinner', duration: '2.5–3 hours', priceFrom: 499, img: 'https://media.umbraco.io/olearys-group/hqtduiln/gamezone3.jpg' },
]

const PLAY_ACTIVITIES = [
  { id: 'bowling', label: 'Bowling', price: 449, unit: 'lane', duration: '55 min' },
  { id: 'shuffleboard', label: 'Shuffleboard', price: 349, unit: 'board', duration: '1 hour' },
  { id: 'dart', label: 'Interaktiv Dart', price: 299, unit: 'board', duration: '1 hour' },
  { id: 'blacklight', label: 'Blacklight Minigolf', price: 99, unit: 'person', duration: '1 hour' },
  { id: 'karaoke', label: 'Karaokerum', price: 699, unit: 'room', duration: '55 min' },
  { id: 'biljard', label: 'Biljard', price: 299, unit: 'table', duration: '1 hour' },
  { id: '3kamp', label: '3-kamp', price: 279, unit: 'person', duration: '1.5–2.5 hours' },
  { id: 'arcade', label: 'Arkadhall', price: null, unit: null, duration: 'Drop-in' },
]

const PLAY_TIME_SLOTS_DEFAULT = ['16:00', '17:00', '18:00', '18:15', '19:00', '20:00']
const PLAY_TIME_SLOTS_BY_ACTIVITY = {
  bowling: ['16:00', '18:15', '20:00'],
  shuffleboard: ['16:00', '17:00', '19:00'],
  dart: ['16:00', '18:00', '19:00', '20:00'],
  blacklight: ['16:00', '17:00', '18:00', '19:00', '20:00'],
  karaoke: ['17:00', '18:15', '20:00'],
  biljard: ['16:00', '18:00', '19:00'],
  '3kamp': ['16:00', '18:15'],
  arcade: ['16:00', '17:00', '18:00', '19:00', '20:00'],
}

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


function HappeningsContent({ selectedDate, navigate }) {
  const events = HAPPENINGS_BY_DATE[selectedDate] || []

  return (
    <div className="mt-5">
      {/* Popular horizontal scroll */}
      <div className="pt-5 pb-4 rounded-t-3xl" style={{ background: 'linear-gradient(180deg, #e8f5ee 0%, #f0f9f4 70%, #ffffff 100%)' }}>
      <div className="flex items-center justify-between px-4 mb-3">
        <h3 className="text-sm font-bold text-brand-black">Popular</h3>
        <button onClick={() => navigate('/book/events')} className="text-xs font-semibold text-green-primary cursor-pointer">
          See all
        </button>
      </div>
      <div className="flex gap-3 pl-4 pr-2 overflow-x-auto pb-3 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
        {POPULAR_HAPPENINGS.map((h) => (
          <button
            key={h.id}
            onClick={() => navigate(`/book/happening/${h.id}`)}
            className="flex-shrink-0 w-[200px] snap-start rounded-2xl overflow-hidden cursor-pointer active:scale-[0.97] transition-transform text-left bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
          >
            <div className="h-[120px] overflow-hidden">
              <img src={h.img} alt={h.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <p className="text-[13px] font-bold text-brand-black leading-snug">{h.name}</p>
              <p className="text-[11px] text-brand-gray-500 mt-0.5">{h.date}</p>
              <p className="text-[11px] text-green-primary font-medium">{h.subtitle}</p>
            </div>
          </button>
        ))}
        <div className="w-2 flex-shrink-0" />
      </div>
      </div>

      {/* Events for selected date */}
      <div className="px-4 mt-4">
        {events.length > 0 ? (
          <div className="space-y-3">
            {events.map((e) => (
              <div key={e.id} className="border border-brand-gray-300 rounded-xl p-4">
                <p className="font-semibold text-sm text-brand-black">{e.name}</p>
                <p className="text-xs text-brand-gray-500 mt-1">{e.desc}</p>
                <p className="text-xs text-brand-gray-500 mt-1">{e.time}</p>
                <button
                  onClick={() => navigate(`/book/happening/${e.id}`)}
                  className="mt-3 w-full py-2.5 rounded-lg text-sm font-semibold text-brand-black cursor-pointer transition-transform duration-200 active:scale-[0.97] border border-brand-gray-300"
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-brand-gray-500 text-center py-6">No events on this date</p>
        )}
      </div>
    </div>
  )
}

const WEEKDAYS = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön']
const CALENDAR_DAYS = [
  { day: 27, currentMonth: false }, { day: 28, currentMonth: false }, { day: 29, currentMonth: false }, { day: 30, currentMonth: false },
  ...Array.from({ length: 31 }, (_, i) => ({ day: i + 1, currentMonth: true })),
]

// Simulated availability: 0 = none, 1 = few, 2 = some, 3 = many slots
const AVAILABILITY = {
  1: 3, 2: 2, 3: 1, 4: 0, 5: 3, 6: 3, 7: 2,
  8: 1, 9: 0, 10: 2, 11: 3, 12: 3, 13: 2, 14: 1,
  15: 3, 16: 2, 17: 3, 18: 1, 19: 0, 20: 2, 21: 3,
  22: 3, 23: 1, 24: 0, 25: 2, 26: 3, 27: 2, 28: 1,
  29: 3, 30: 2, 31: 1,
}

function AvailabilityBars({ level }) {
  if (level === 0) return null
  return (
    <div className="flex gap-[2px] mt-1 justify-center">
      {[1, 2, 3].map((bar) => (
        <div
          key={bar}
          className={`w-[6px] h-[3px] rounded-full ${bar <= level ? 'bg-green-primary' : 'bg-brand-gray-200'}`}
        />
      ))}
    </div>
  )
}

function CalendarModal({ isOpen, onClose, selectedDate, onSelectDate }) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[100] animate-in fade-in duration-200" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[101] p-4 pb-12 animate-in slide-in-from-bottom duration-300">
        <div className="w-12 h-1.5 bg-brand-gray-300 rounded-full mx-auto mb-6" />

        <div className="flex items-center justify-between mb-8 px-2">
          <button className="text-brand-black cursor-pointer p-1">
            <ChevronLeft size={20} className="stroke-[2.5]" />
          </button>
          <span className="font-bold text-[17px] text-brand-black">Mars 2026</span>
          <button className="text-brand-black cursor-pointer p-1">
            <ChevronRight size={20} className="stroke-[2.5]" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-y-3 mb-2">
          {WEEKDAYS.map(day => (
            <div key={day} className="text-center text-[13px] font-medium text-brand-gray-500">
              {day}
            </div>
          ))}

          {CALENDAR_DAYS.map((d, i) => {
            const isSelected = d.currentMonth && d.day === selectedDate
            const availability = d.currentMonth ? (AVAILABILITY[d.day] ?? 0) : 0
            const noSlots = d.currentMonth && availability === 0

            return (
              <div key={i} className="flex flex-col items-center">
                <button
                  onClick={() => {
                    if (d.currentMonth && availability > 0) {
                      onSelectDate(d.day)
                      onClose()
                    }
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-[15px] transition-colors
                    ${!d.currentMonth ? 'text-brand-gray-400 cursor-default' : noSlots ? 'text-brand-gray-300 cursor-default' : 'cursor-pointer'}
                    ${isSelected ? 'bg-[#ffdc1e] text-brand-black font-bold shadow-sm' : d.currentMonth && !noSlots ? 'text-brand-black' : ''}
                  `}
                  disabled={!d.currentMonth || noSlots}
                >
                  {d.day}
                </button>
                {d.currentMonth && <AvailabilityBars level={availability} />}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-brand-gray-200">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-[2px]">
              <div className="w-[6px] h-[3px] rounded-full bg-green-primary" />
              <div className="w-[6px] h-[3px] rounded-full bg-green-primary" />
              <div className="w-[6px] h-[3px] rounded-full bg-green-primary" />
            </div>
            <span className="text-[10px] text-brand-gray-500">Many</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-[2px]">
              <div className="w-[6px] h-[3px] rounded-full bg-green-primary" />
              <div className="w-[6px] h-[3px] rounded-full bg-brand-gray-200" />
              <div className="w-[6px] h-[3px] rounded-full bg-brand-gray-200" />
            </div>
            <span className="text-[10px] text-brand-gray-500">Few</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-brand-gray-200" />
            <span className="text-[10px] text-brand-gray-500">None</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Book() {
  const navigate = useNavigate()
  const routerLocation = useLocation()
  const [location, setLocation] = useState('Norrköping')
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [activeCategory, setActiveCategory] = useState(routerLocation.state?.tab || 'watch')
  const [selectedDate, setSelectedDate] = useState(15)
  const [pickedFromCalendar, setPickedFromCalendar] = useState(false)
  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState(0)
  const [editingAdults, setEditingAdults] = useState(false)
  const [editingKids, setEditingKids] = useState(false)
  const [selectedPlayActivity, setSelectedPlayActivity] = useState(null)
  const totalGuests = adults + kids

  // Navigate to SelectActivities with an item pre-added to cart
  function goToSelectActivities(cartItem) {
    navigate('/book/package-checkout', {
      state: {
        fromPackage: {
          cart: [cartItem],
          guests: totalGuests,
        },
        startPhase: 'activities',
      },
    })
  }

  return (
    <div className="pb-2">
      {/* Top bar: My bookings + centered location */}
      <div className="px-4 pt-14 flex items-center justify-between">
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
              const isYellow = isSelected && pickedFromCalendar
              return (
                <button key={i} onClick={() => { setSelectedDate(date); setPickedFromCalendar(false) }} className="flex flex-col items-center gap-1 min-w-[34px] min-h-[44px] justify-center cursor-pointer">
                  <span className="text-[10px] text-brand-gray-500 font-medium">{d}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isSelected ? (isYellow ? 'bg-[#ffdc1e]' : 'bg-green-primary') : ''}`}>
                    <span className={`text-sm font-semibold ${isSelected ? (isYellow ? 'text-brand-black' : 'text-white') : 'text-brand-black'}`}>{date}</span>
                  </div>
                </button>
              )
            })}
          </div>
          <button 
            onClick={() => setShowCalendar(true)}
            className="ml-1 px-2.5 py-2 rounded-lg border border-brand-gray-300 text-[10px] text-brand-gray-500 font-medium cursor-pointer whitespace-nowrap leading-tight text-center"
          >
            Pick other<br />date
          </button>
        </div>
      </div>

      {/* Category content */}
      {activeCategory === 'watch' && (
        <div className="mt-4 pt-5 pb-4 px-4 space-y-3 rounded-t-3xl" style={{ background: 'linear-gradient(180deg, #e8f5ee 0%, #f0f9f4 40%, #ffffff 100%)' }}>
          {MATCHES.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.08)] cursor-pointer transition-transform duration-200 active:scale-[0.98]"
              onClick={() => navigate(`/book/${m.id}`)}
            >
              <div className="flex items-center justify-between">
                {/* Home team */}
                <div className="flex flex-col items-center w-[90px]">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
                    style={{ backgroundColor: m.homeColor }}
                  >
                    {m.homeShort}
                  </div>
                  <p className="text-xs font-medium text-brand-black mt-2 text-center leading-tight">{m.home}</p>
                </div>

                {/* Time + Reminder */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-brand-gray-100 text-brand-gray-500">
                    {m.league}
                  </span>
                  <p className="text-[17px] font-bold text-brand-black tracking-wide">{m.time}</p>
                </div>

                {/* Away team */}
                <div className="flex flex-col items-center w-[90px]">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
                    style={{ backgroundColor: m.awayColor }}
                  >
                    {m.awayShort}
                  </div>
                  <p className="text-xs font-medium text-brand-black mt-2 text-center leading-tight">{m.away}</p>
                </div>
              </div>

              {/* Book a table */}
              <div className="flex justify-center mt-3">
                <span className="text-sm font-semibold text-green-primary">Book a table</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeCategory === 'eat' && (
        <div className="mt-5">
          {/* Popular Packages with green bg */}
          <div className="pt-5 pb-4 rounded-t-3xl" style={{ background: 'linear-gradient(180deg, #e8f5ee 0%, #f0f9f4 70%, #ffffff 100%)' }}>
            <h3 className="px-4 text-sm font-bold text-brand-black mb-3">Popular Packages</h3>
            <div className="flex gap-3 pl-4 pr-2 overflow-x-auto pb-1 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
              {PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => navigate(`/book/package/${pkg.id}`)}
                  className="flex-shrink-0 w-[200px] snap-start rounded-2xl overflow-hidden cursor-pointer active:scale-[0.97] transition-transform text-left bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
                >
                  <div className="h-[120px] overflow-hidden">
                    <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="text-[13px] font-bold text-brand-black leading-snug">{pkg.name}</p>
                    <p className="text-[11px] text-brand-gray-500 mt-0.5">From {pkg.priceFrom} kr · {pkg.duration}</p>
                  </div>
                </button>
              ))}
              <div className="w-2 flex-shrink-0" />
            </div>
          </div>

          {/* Available table times */}
          <div className="px-4 mt-2">
            <h3 className="text-sm font-bold text-brand-black mb-3">Available table times</h3>
              <div className="flex flex-wrap gap-2">
                {EAT_TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    onClick={() => goToSelectActivities({ name: 'Table reservation', selectedTime: t.replace(':', '.'), duration: null, totalPrice: 0 })}
                    className="px-5 py-3 rounded-xl border border-brand-gray-300 text-sm font-medium text-brand-black cursor-pointer active:scale-[0.97] transition-transform hover:border-green-primary"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
        </div>
      )}
      {activeCategory === 'happenings' && <HappeningsContent selectedDate={selectedDate} navigate={navigate} />}
      {activeCategory === 'party' && (
        <div className="mt-5 px-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-brand-black italic">Always at O'Learys</p>
            <button onClick={() => navigate('/book/parties')} className="text-xs font-semibold text-green-primary cursor-pointer">See all</button>
          </div>
          <div className="grid grid-cols-2 gap-3 items-stretch">
            {PARTY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/book/party/${cat.id}`)}
                className="rounded-2xl overflow-hidden cursor-pointer active:scale-[0.97] transition-transform text-left shadow-[0_2px_12px_rgba(0,0,0,0.08)] bg-white flex flex-col"
              >
                <div className="relative h-[100px] overflow-hidden flex-shrink-0">
                  <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-3 flex-1">
                  <p className="text-sm font-bold text-brand-black">{cat.name}</p>
                  <p className="text-[11px] text-brand-gray-500 mt-0.5">{cat.desc}</p>
                  <p className="text-[11px] font-semibold mt-1 text-green-primary">From {cat.from}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {activeCategory === 'play' && (
        <div className="mt-5">
          {/* Popular Packages with green bg */}
          <div className="pt-5 pb-5 rounded-t-3xl" style={{ background: 'linear-gradient(180deg, #e8f5ee 0%, #f0f9f4 60%, #ffffff 100%)' }}>
            <h3 className="px-4 text-sm font-bold text-brand-black mb-3">Popular Packages</h3>
            <div className="flex gap-3 pl-4 pr-2 overflow-x-auto pb-3 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
              {PLAY_PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => navigate(`/book/package/${pkg.id}`)}
                  className="flex-shrink-0 w-[200px] snap-start rounded-2xl overflow-hidden cursor-pointer active:scale-[0.97] transition-transform text-left bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
                >
                  <div className="h-[120px] overflow-hidden">
                    <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="text-[13px] font-bold text-brand-black leading-snug">{pkg.name}</p>
                    <p className="text-[11px] text-brand-gray-500 mt-0.5">From {pkg.priceFrom} kr · {pkg.duration}</p>
                  </div>
                </button>
              ))}
              <div className="w-2 flex-shrink-0" />
            </div>
          </div>

          {/* Activity pills */}
          <div className="flex items-center justify-between px-4 mt-4 mb-3">
            <p className="text-xs text-brand-gray-500">or book an activity directly</p>
          </div>
          <div className="flex flex-wrap gap-2 px-4">
            {PLAY_ACTIVITIES.map((a) => {
              const active = selectedPlayActivity === a.id
              return (
                <button
                  key={a.id}
                  onClick={() => setSelectedPlayActivity(active ? null : a.id)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-medium cursor-pointer active:scale-[0.97] transition-all ${active ? 'border-green-primary bg-green-primary text-white' : 'border-brand-gray-300 text-brand-black'}`}
                >
                  {a.label}
                </button>
              )
            })}
          </div>

          {/* Available activity times */}
          <div className="px-4 mt-5">
            <h3 className="text-sm font-bold text-brand-black mb-3">Available activity times</h3>
            <div className="flex flex-wrap gap-2">
              {(selectedPlayActivity ? (PLAY_TIME_SLOTS_BY_ACTIVITY[selectedPlayActivity] || PLAY_TIME_SLOTS_DEFAULT) : PLAY_TIME_SLOTS_DEFAULT).map((t) => {
                const activity = selectedPlayActivity ? PLAY_ACTIVITIES.find((a) => a.id === selectedPlayActivity) : null
                return (
                  <button
                    key={t}
                    onClick={() => {
                      if (activity) {
                        const pkgId = activity.id === '3kamp' ? '3kamp-dinner' : `activity-${activity.id}`
                        navigate(`/book/package/${pkgId}`, { state: { preSelectedTime: t.replace(':', '.') } })
                      } else {
                        goToSelectActivities({ name: 'Table reservation', selectedTime: t.replace(':', '.'), duration: null, totalPrice: 0 })
                      }
                    }}
                    className="px-5 py-3 rounded-xl border border-brand-gray-300 text-sm font-medium text-brand-black cursor-pointer active:scale-[0.97] transition-transform hover:border-green-primary"
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
      
      <CalendarModal 
        isOpen={showCalendar} 
        onClose={() => setShowCalendar(false)} 
        selectedDate={selectedDate} 
        onSelectDate={(d) => { setSelectedDate(d); setPickedFromCalendar(true) }}
      />
    </div>
  )
}

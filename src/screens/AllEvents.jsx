import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

const CATEGORIES = ['All', 'Quiz', 'Nightlife', 'Sports']

const EVENTS = [
  { id: 'cl-night', name: 'Champions League Night', desc: 'Live on the big screen — special match menu & drink deals', date: '18 Mar', day: 'Tue', time: '21:00', tag: 'Popular', category: 'Sports' },
  { id: 'music-quiz-1', name: 'Music Quiz — Melodifestivalen/Eurovision', desc: 'Hosted by Anders. Teams of up to 6 people', date: '19 Mar', day: 'Wed', time: '19:00–21:00', tag: 'Popular', category: 'Quiz' },
  { id: 'by-night-1', name: "O'Learys By Night Club", desc: 'DJ, drinks & dancing until 03:00', date: '20 Mar', day: 'Thu', time: '22:00–03:00', category: 'Nightlife' },
  { id: 'by-night-2', name: "O'Learys By Night Club", desc: 'DJ, drinks & dancing until 03:00', date: '21 Mar', day: 'Fri', time: '22:00–03:00', category: 'Nightlife' },
  { id: 'music-quiz-2', name: 'Music Quiz', desc: 'Hosted by Sebbe. Teams of up to 6 people', date: '26 Mar', day: 'Wed', time: '19:00–21:00', category: 'Quiz' },
  { id: 'by-night-3', name: "O'Learys By Night Club", desc: 'DJ, drinks & dancing until 03:00', date: '27 Mar', day: 'Thu', time: '22:00–03:00', category: 'Nightlife' },
  { id: 'by-night-4', name: "O'Learys By Night Club", desc: 'DJ, drinks & dancing until 03:00', date: '28 Mar', day: 'Fri', time: '22:00–03:00', category: 'Nightlife' },
  { id: 'music-quiz-3', name: 'Music Quiz', desc: 'Hosted by Anders. Teams of up to 6 people', date: '2 Apr', day: 'Wed', time: '19:00–21:00', category: 'Quiz' },
  { id: 'by-night-5', name: "O'Learys By Night Club", desc: 'DJ, drinks & dancing until 03:00', date: '3 Apr', day: 'Thu', time: '22:00–03:00', category: 'Nightlife' },
  { id: 'by-night-6', name: "O'Learys By Night Club", desc: 'DJ, drinks & dancing until 03:00', date: '4 Apr', day: 'Fri', time: '22:00–03:00', category: 'Nightlife' },
  { id: 'music-quiz-4', name: 'Music Quiz', desc: 'Hosted by Anders. Teams of up to 6 people', date: '9 Apr', day: 'Wed', time: '19:00–21:00', category: 'Quiz' },
  { id: 'by-night-7', name: "O'Learys By Night Club", desc: 'DJ, drinks & dancing until 03:00', date: '10 Apr', day: 'Thu', time: '22:00–03:00', category: 'Nightlife' },
  { id: 'by-night-8', name: "O'Learys By Night Club", desc: 'DJ, drinks & dancing until 03:00', date: '11 Apr', day: 'Fri', time: '22:00–03:00', category: 'Nightlife' },
  { id: 'music-quiz-5', name: 'Music Quiz', desc: 'Hosted by Anders. Teams of up to 6 people', date: '16 Apr', day: 'Wed', time: '19:00–21:00', category: 'Quiz' },
  { id: 'music-quiz-6', name: 'Music Quiz — 1980s Theme', desc: 'Hosted by Anders. 80s special edition!', date: '23 Apr', day: 'Wed', time: '19:00–21:00', tag: 'Special', category: 'Quiz' },
  { id: 'music-quiz-7', name: 'Music Quiz', desc: 'Hosted by Sebbe. Teams of up to 6 people', date: '30 Apr', day: 'Wed', time: '19:00–21:00', category: 'Quiz' },
  { id: 'music-quiz-8', name: 'Music Quiz', desc: 'Hosted by Anders. Teams of up to 6 people', date: '7 May', day: 'Wed', time: '19:00–21:00', category: 'Quiz' },
  { id: 'music-quiz-9', name: 'Music Quiz', desc: 'Hosted by Anders. Teams of up to 6 people', date: '14 May', day: 'Wed', time: '19:00–21:00', category: 'Quiz' },
  { id: 'music-quiz-10', name: 'Music Quiz — Covers Theme', desc: 'Hosted by Anders. Covers special!', date: '21 May', day: 'Wed', time: '19:00–21:00', tag: 'Special', category: 'Quiz' },
  { id: 'music-quiz-11', name: 'Music Quiz', desc: 'Hosted by Sebbe. Teams of up to 6 people', date: '28 May', day: 'Wed', time: '19:00–21:00', category: 'Quiz' },
  { id: 'music-quiz-12', name: 'Music Quiz — Summer Theme', desc: 'Hosted by Sebbe. Summer special!', date: '18 Jun', day: 'Wed', time: '19:00–21:00', tag: 'Special', category: 'Quiz' },
]

export default function AllEvents() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? EVENTS : EVENTS.filter((e) => e.category === filter)

  // Group by month
  const grouped = {}
  for (const e of filtered) {
    const month = e.date.split(' ')[1] || 'Mar'
    if (!grouped[month]) grouped[month] = []
    grouped[month].push(e)
  }

  const monthNames = { Mar: 'Mars 2026', Apr: 'April 2026', May: 'Maj 2026', Jun: 'Juni 2026' }

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <button onClick={() => navigate('/book', { state: { tab: 'happenings' } })} className="w-10 h-10 flex items-center justify-center cursor-pointer -ml-2">
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
        <h1 className="text-lg font-bold text-brand-black">Events</h1>
      </div>

      {/* Category filter pills */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
              filter === cat
                ? 'bg-green-primary text-white'
                : 'bg-brand-gray-100 text-brand-gray-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event list grouped by month */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {Object.entries(grouped).map(([month, events]) => (
          <div key={month} className="mb-6">
            <p className="text-xs font-bold text-brand-gray-500 uppercase tracking-wider mb-3">
              {monthNames[month] || month}
            </p>
            <div className="space-y-2">
              {events.map((e, i) => (
                <button
                  key={`${e.id}-${i}`}
                  onClick={() => navigate(`/book/happening/${e.id}`, { state: { eventDate: e.date, eventDay: e.day, eventName: e.name } })}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-brand-gray-200 text-left cursor-pointer active:bg-brand-gray-100/50 transition-colors"
                >
                  {/* Date block */}
                  <div className="w-12 h-14 rounded-lg bg-green-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-medium text-green-primary uppercase">{e.day}</span>
                    <span className="text-sm font-bold text-green-primary">{e.date.split(' ')[0]}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-brand-black truncate">{e.name}</p>
                      {e.tag && (
                        <span className="text-[9px] font-bold text-green-primary bg-green-primary/10 px-1.5 py-0.5 rounded-full flex-shrink-0">{e.tag}</span>
                      )}
                    </div>
                    <p className="text-xs text-brand-gray-500 mt-0.5 truncate">{e.desc}</p>
                    <p className="text-[11px] text-brand-gray-400 mt-0.5">{e.time}</p>
                  </div>

                  <ChevronLeft size={16} className="text-brand-gray-300 rotate-180 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

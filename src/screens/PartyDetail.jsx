import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Minus, Plus, Cake, Briefcase, Heart, Users, Check, Clock, Calendar } from 'lucide-react'

const PARTY_DATA = {
  kidsparty: {
    title: 'Kidsparty',
    subtitle: 'Ages 4–12',
    Icon: Cake,
    img: 'https://media.umbraco.io/olearys-group/asypkupw/adobestock_917116219.jpg',
    description: 'Let us handle the party while you enjoy the moment. Three hours of non-stop fun — arcade, bowling, and a meet & greet with Larry. Everything your child needs for an unforgettable birthday.',
    note: 'Available Wed, Sat & Sun afternoons. Adult supervision required.',
    packages: [
      {
        id: 'kids',
        name: 'Kids Party',
        price: 229,
        unit: 'kr/child',
        duration: '3 hours (14:00–17:00)',
        minGuests: 6,
        badge: 'Most popular',
        includes: [
          'Unlimited soft drinks, popcorn & cotton candy',
          '50 min arcade games',
          '50 min bowling',
          'Pancakes or chicken nuggets',
          'Meet & greet with Larry',
        ],
      },
      {
        id: 'teen',
        name: 'Teenage Party',
        price: 289,
        unit: 'kr/person',
        duration: '100 min activities',
        minGuests: 6,
        ageRange: 'Ages 12–18',
        includes: [
          '100 min bowling or karaoke',
          'Unlimited soft drinks & lemonade',
          'Fresh fries with sauces',
        ],
      },
    ],
    guestLabels: { primary: 'Children', secondary: 'Adults' },
  },
  birthdays: {
    title: 'Birthdays',
    subtitle: 'For every age',
    Icon: Cake,
    img: 'https://media.umbraco.io/olearys-group/1ceeihfv/vrijgezellenparty.png',
    description: 'Whether you are turning 18 or 80 — we will make it a night to remember. Great food, competitive activities, and a party atmosphere that brings everyone together.',
    packages: [
      {
        id: 'party',
        name: 'Party Package',
        price: 459,
        unit: 'kr/person',
        duration: '100 min activities',
        minGuests: 6,
        badge: 'Best value',
        includes: [
          'Homemade loaded nachos to share',
          'Lunch or dinner (burger, fish & chips + more)',
          '100 min bowling or karaoke (or 50/50 split)',
          '80 arcade game credits',
        ],
      },
      {
        id: 'the-party',
        name: 'The Party',
        price: 909,
        unit: 'kr/person',
        duration: '100 min activities + race',
        minGuests: 7,
        ageRange: 'Ages 16+',
        badge: 'Premium',
        includes: [
          'Lunch or dinner (burger, fish & chips + more)',
          'Race deal — 10 min qualifying + 10 min final',
          '100 min bowling or karaoke (or 50/50 split)',
          '80 arcade game credits',
          'Racing gloves, helmet cap & membership card',
        ],
      },
    ],
    guestLabels: { primary: 'Guests', secondary: null },
  },
  'team-building': {
    title: 'Team Building',
    subtitle: 'Corporate & groups',
    Icon: Briefcase,
    img: 'https://media.umbraco.io/olearys-group/kx0hqm0f/guests_aw_dinner.jpg',
    description: 'Skip the boring conference room. Our team packages combine competitive activities with great food — perfect for kick-offs, after-works, or just getting the team together.',
    packages: [
      {
        id: 'masterplan',
        name: 'Masterplan',
        price: 519,
        unit: 'kr/person',
        duration: '75 min challenge + arcade',
        minGuests: 4,
        ageRange: 'Ages 14+',
        includes: [
          'Lunch or dinner (burger, fish & chips + more)',
          '75 min Black Box Battle — team puzzle challenge',
          '80 arcade game credits',
        ],
      },
      {
        id: 'bucketlist',
        name: 'The Bucketlist',
        price: 639,
        unit: 'kr/person',
        duration: '75 min challenge + activities',
        minGuests: 4,
        ageRange: 'Ages 14+',
        badge: 'All-inclusive',
        includes: [
          'Homemade loaded nachos to share',
          'Lunch or dinner (burger, fish & chips + more)',
          '75 min Black Box Battle — team puzzle challenge',
          '50 min bowling or karaoke',
          '80 arcade game credits',
        ],
      },
    ],
    guestLabels: { primary: 'Participants', secondary: null },
  },
  'date-night': {
    title: 'Date Night',
    subtitle: 'An evening for two',
    Icon: Heart,
    img: 'https://media.umbraco.io/olearys-group/f0bp0yrl/date-night.jpg',
    description: 'Good food, a little competition, and zero awkward silences. Our date night packages are designed for couples who want more than just dinner.',
    packages: [
      {
        id: 'date',
        name: 'Date Night',
        price: 249,
        unit: 'kr/person',
        duration: 'Dinner + games',
        minGuests: 2,
        badge: 'For two',
        includes: [
          'Dinner (burger, fish & chips or similar)',
          'Interactive icebreaker game',
          '30 min unlimited arcade games',
        ],
      },
      {
        id: 'double-date',
        name: 'Double Date Night',
        price: 369,
        unit: 'kr/person',
        duration: 'Dinner + bowling + games',
        minGuests: 4,
        includes: [
          'Dinner (burger, fish & chips or similar)',
          'Interactive icebreaker game',
          '50 min bowling',
          '30 min unlimited arcade games',
        ],
      },
      {
        id: 'speed-date',
        name: 'Speed Date Night',
        price: 559,
        unit: 'kr/person',
        duration: 'Dinner + karting',
        minGuests: 2,
        badge: 'Adrenaline',
        ageRange: 'Tue–Sun only',
        includes: [
          'Dinner (burger, fish & chips or similar)',
          'Interactive icebreaker game',
          'Go-karting — 2 heats of 10 min',
        ],
      },
    ],
    guestLabels: { primary: 'Guests', secondary: null },
  },
}

export default function PartyDetail() {
  const { partyType } = useParams()
  const navigate = useNavigate()
  const data = PARTY_DATA[partyType]

  const [selectedPkg, setSelectedPkg] = useState(null)
  const [primaryGuests, setPrimaryGuests] = useState(partyType === 'date-night' ? 2 : 6)
  const [secondaryGuests, setSecondaryGuests] = useState(data?.guestLabels.secondary ? 2 : 0)
  const [sent, setSent] = useState(false)
  const [selectedDate, setSelectedDate] = useState('15 Mar 2026')
  const [editingDate, setEditingDate] = useState(false)

  if (!data) {
    return (
      <div className="min-h-dvh flex flex-col bg-white items-center justify-center">
        <p className="text-sm text-brand-gray-500">Party type not found.</p>
        <button onClick={() => navigate('/book')} className="mt-4 text-sm text-green-primary font-medium cursor-pointer">Go back</button>
      </div>
    )
  }

  const activePkg = data.packages.find((p) => p.id === selectedPkg)
  const totalPrice = activePkg ? activePkg.price * primaryGuests : 0

  if (sent) {
    return (
      <div className="min-h-dvh flex flex-col bg-white">
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5 bg-green-primary/10">
            <Check size={36} className="text-green-primary" />
          </div>
          <h2 className="text-xl font-bold text-brand-black">Inquiry sent!</h2>
          <p className="text-sm text-brand-gray-500 mt-2 leading-relaxed">
            Thank you for your interest in our {data.title.toLowerCase()} package. We will get back to you within 24 hours.
          </p>
          <button onClick={() => navigate('/book')} className="mt-8 w-full py-4 rounded-2xl text-sm font-bold cursor-pointer active:scale-[0.97] transition-transform" style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}>
            Back to booking
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Hero with image */}
      <div className="h-48 relative overflow-hidden">
        <img src={data.img} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <button
          onClick={() => navigate('/book', { state: { tab: 'party' } })}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer z-10"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
          <h1 className="text-white font-bold text-xl">{data.title}</h1>
          <p className="text-white/70 text-xs mt-0.5 font-medium">{data.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-5 mt-5">
          <p className="text-sm text-brand-black leading-relaxed">{data.description}</p>
          {data.note && (
            <p className="text-[11px] text-brand-gray-500 mt-2 italic">{data.note}</p>
          )}
        </div>

        {/* Date selector */}
        <div className="px-5 mt-4">
          {editingDate ? (
            <div className="p-3 rounded-xl border border-green-primary bg-green-primary/5">
              <p className="text-xs font-bold text-brand-black uppercase tracking-wider mb-2">Select date</p>
              <input
                type="date"
                defaultValue="2026-03-15"
                onChange={(e) => {
                  const d = new Date(e.target.value)
                  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                  setSelectedDate(`${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`)
                  setEditingDate(false)
                }}
                className="w-full rounded-lg border border-brand-gray-300 px-3 py-2 text-sm outline-none"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-xl border border-brand-gray-300">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-brand-gray-500" />
                <span className="text-sm font-medium text-brand-black">{selectedDate}</span>
              </div>
              <button onClick={() => setEditingDate(true)} className="text-xs text-green-primary font-medium cursor-pointer">Change</button>
            </div>
          )}
        </div>

        {/* Packages */}
        <div className="px-5 mt-4">
          <p className="text-xs font-bold text-brand-black uppercase tracking-wider mb-3">Choose your package</p>
          <div className="space-y-3">
            {data.packages.map((pkg) => {
              const active = selectedPkg === pkg.id
              return (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPkg(pkg.id)}
                  className={`w-full text-left rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${active ? 'border-green-primary shadow-md' : 'border-brand-gray-200'}`}
                >
                  <div className="px-4 pt-4 pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-brand-black">{pkg.name}</p>
                          {pkg.badge && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white bg-green-primary">
                              {pkg.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="flex items-center gap-1 text-[11px] text-brand-gray-500">
                            <Clock size={10} /> {pkg.duration}
                          </span>
                          {pkg.minGuests && (
                            <span className="flex items-center gap-1 text-[11px] text-brand-gray-500">
                              <Users size={10} /> Min {pkg.minGuests}
                            </span>
                          )}
                          {pkg.ageRange && (
                            <span className="text-[11px] text-brand-gray-500">{pkg.ageRange}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-3">
                        <p className={`text-base font-bold ${active ? 'text-green-primary' : 'text-brand-black'}`}>{pkg.price} kr</p>
                        <p className="text-[10px] text-brand-gray-500">{pkg.unit}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="pt-3 border-t border-brand-gray-100 space-y-2">
                      {pkg.includes.map((item) => (
                        <p key={item} className="text-xs text-brand-gray-500 flex items-start gap-2">
                          <Check size={12} className="text-green-primary flex-shrink-0 mt-0.5" />
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                  {active && <div className="h-1 w-full bg-green-primary" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Guest count */}
        <div className="px-5 mt-6">
          <p className="text-xs font-bold text-brand-black uppercase tracking-wider mb-3">How many guests?</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl border border-brand-gray-300">
              <span className="text-sm font-medium text-brand-black">{data.guestLabels.primary}</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setPrimaryGuests(Math.max(1, primaryGuests - 1))} className="w-9 h-9 rounded-full bg-green-primary/10 flex items-center justify-center cursor-pointer active:scale-95 transition-transform">
                  <Minus size={14} className="text-green-primary" />
                </button>
                <span className="text-sm font-bold text-brand-black w-6 text-center">{primaryGuests}</span>
                <button onClick={() => setPrimaryGuests(Math.min(30, primaryGuests + 1))} className="w-9 h-9 rounded-full bg-green-primary/10 flex items-center justify-center cursor-pointer active:scale-95 transition-transform">
                  <Plus size={14} className="text-green-primary" />
                </button>
              </div>
            </div>
            {data.guestLabels.secondary && (
              <div className="flex items-center justify-between p-3 rounded-xl border border-brand-gray-300">
                <span className="text-sm font-medium text-brand-black">{data.guestLabels.secondary}</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setSecondaryGuests(Math.max(0, secondaryGuests - 1))} className="w-9 h-9 rounded-full bg-green-primary/10 flex items-center justify-center cursor-pointer active:scale-95 transition-transform">
                    <Minus size={14} className="text-green-primary" />
                  </button>
                  <span className="text-sm font-bold text-brand-black w-6 text-center">{secondaryGuests}</span>
                  <button onClick={() => setSecondaryGuests(Math.min(30, secondaryGuests + 1))} className="w-9 h-9 rounded-full bg-green-primary/10 flex items-center justify-center cursor-pointer active:scale-95 transition-transform">
                    <Plus size={14} className="text-green-primary" />
                  </button>
                </div>
              </div>
            )}
          </div>
          {activePkg && (
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="text-xs text-brand-gray-500">{primaryGuests} {data.guestLabels.primary.toLowerCase()} total</span>
              <span className="text-sm font-bold text-green-primary">{totalPrice} kr</span>
            </div>
          )}
        </div>

        <p className="text-[10px] text-brand-gray-400 mt-4 px-5">Free cancellation up to 5 days before the event.</p>
      </div>

      {/* CTA */}
      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
        <button
          onClick={() => selectedPkg && setSent(true)}
          disabled={!selectedPkg}
          className={`w-full py-4 rounded-2xl text-sm font-bold transition-transform ${selectedPkg ? 'cursor-pointer active:scale-[0.97]' : 'opacity-40 cursor-not-allowed'}`}
          style={{ backgroundColor: selectedPkg ? '#ffdc1e' : '#e0e0e0', color: '#3c3c3c' }}
        >
          {activePkg ? `Book — ${totalPrice} kr` : 'Select a package to continue'}
        </button>
      </div>
    </div>
  )
}

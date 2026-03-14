import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Minus, Plus, Cake, Briefcase, Heart, Users, Check } from 'lucide-react'

const PARTY_DATA = {
  kidsparty: {
    title: 'Kidsparty',
    subtitle: 'Ages 4–12',
    Icon: Cake,
    description:
      'Celebrate your child\'s birthday at O\'Learys! Our kids party packages include bowling, food, and plenty of fun. We take care of everything so you can relax and enjoy the party.',
    packages: [
      { id: 'basic', name: 'Basic Package', price: 199, unit: 'kr/child', includes: ['1 hour bowling', 'Hot dog + drink', 'Party area'] },
      { id: 'premium', name: 'Premium Package', price: 299, unit: 'kr/child', includes: ['1.5 hour bowling', 'Burger menu + drink', 'Party area', 'Dessert buffet', 'Party invitations'] },
    ],
    guestLabels: { primary: 'Children', secondary: 'Adults' },
  },
  birthdays: {
    title: 'Birthdays',
    subtitle: 'Celebrate at O\'Learys',
    Icon: Cake,
    description:
      'Make your birthday unforgettable at O\'Learys. Whether you\'re turning 18 or 80, we\'ve got packages that combine great food, fun activities, and a party atmosphere.',
    packages: [
      { id: 'basic', name: 'Basic Package', price: 299, unit: 'kr/person', includes: ['Activity of choice', 'Dinner buffet', 'Reserved area'] },
      { id: 'premium', name: 'Premium Package', price: 449, unit: 'kr/person', includes: ['2 activities of choice', '3-course dinner', 'Reserved area', 'Welcome drink', 'Dedicated host'] },
    ],
    guestLabels: { primary: 'Adults', secondary: 'Kids' },
  },
  'team-building': {
    title: 'Team Building',
    subtitle: 'Corporate events',
    Icon: Briefcase,
    description:
      'Strengthen your team with a fun and engaging event at O\'Learys. Our team building packages combine competitive activities with great food and drinks — perfect for company outings, kick-offs, or after-works.',
    packages: [
      { id: 'basic', name: 'Basic Package', price: 399, unit: 'kr/person', includes: ['2 activities', 'Buffet lunch/dinner', 'Meeting room (1h)', 'Drinks package'] },
      { id: 'premium', name: 'Premium Package', price: 599, unit: 'kr/person', includes: ['3 activities', 'Premium buffet', 'Meeting room (2h)', 'Open bar (2h)', 'Dedicated event host', 'Custom scoreboard'] },
    ],
    guestLabels: { primary: 'Participants', secondary: null },
  },
  'date-night': {
    title: 'Date Night',
    subtitle: 'Romantic evening',
    Icon: Heart,
    description:
      'A perfect evening for two at O\'Learys. Enjoy a delicious dinner, a round of bowling, and drinks in a relaxed atmosphere. Our date night package is designed for couples who want great food and a fun activity.',
    packages: [
      { id: 'basic', name: 'Classic Date', price: 499, unit: 'kr/couple', includes: ['1 hour bowling', '2-course dinner', 'Glass of wine each'] },
      { id: 'premium', name: 'Premium Date', price: 699, unit: 'kr/couple', includes: ['1.5 hour bowling', '3-course dinner', 'Bottle of wine', 'Dessert to share', 'Reserved corner booth'] },
    ],
    guestLabels: { primary: 'Couples', secondary: null },
  },
}

export default function PartyDetail() {
  const { partyType } = useParams()
  const navigate = useNavigate()
  const data = PARTY_DATA[partyType]

  const [selectedPkg, setSelectedPkg] = useState(null)
  const [primaryGuests, setPrimaryGuests] = useState(partyType === 'date-night' ? 1 : 4)
  const [secondaryGuests, setSecondaryGuests] = useState(
    data?.guestLabels.secondary ? 2 : 0,
  )
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  if (!data) {
    return (
      <div className="min-h-dvh flex flex-col bg-white items-center justify-center">
        <p className="text-sm text-brand-gray-500">Party type not found.</p>
        <button onClick={() => navigate('/book')} className="mt-4 text-sm text-green-primary font-medium cursor-pointer">Go back</button>
      </div>
    )
  }

  const HeroIcon = data.Icon

  const handleField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const canSend = form.name.trim() && form.email.trim() && selectedPkg

  /* ── Sent state ── */
  if (sent) {
    return (
      <div className="min-h-dvh flex flex-col bg-white">
        <div className="px-4 pt-12 pb-2 flex items-center gap-3">
          <button onClick={() => navigate('/book')} className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2" aria-label="Go back">
            <ChevronLeft size={24} className="text-brand-black" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-primary/10 flex items-center justify-center mb-4">
            <Check size={32} className="text-green-primary" />
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
      {/* Back button */}
      <div className="px-4 pt-12 pb-2 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2" aria-label="Go back">
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
      </div>

      {/* Hero */}
      <div className="rounded-b-3xl overflow-hidden relative" style={{ background: 'linear-gradient(180deg, #1a3a2a 0%, #0d1f15 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 30%, #2d5a3d 0%, transparent 60%)' }} />
        <div className="relative px-5 pt-6 pb-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-3">
            <HeroIcon size={28} className="text-white" />
          </div>
          <h1 className="text-white font-bold text-xl">{data.title}</h1>
          <p className="text-white/50 text-xs mt-1">{data.subtitle}</p>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 mt-5">
        <p className="text-sm text-brand-black leading-relaxed">{data.description}</p>
      </div>

      {/* Packages */}
      <div className="px-5 mt-6">
        <p className="text-xs font-bold text-brand-black uppercase tracking-wider mb-3">Choose a package</p>
        <div className="space-y-3">
          {data.packages.map((pkg) => {
            const active = selectedPkg === pkg.id
            return (
              <button
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${active ? 'border-green-primary bg-green-primary/5' : 'border-brand-gray-300'}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-brand-black uppercase">{pkg.name}</p>
                    <p className="text-xs text-green-primary mt-0.5">From {pkg.price} {pkg.unit}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${active ? 'border-green-primary bg-green-primary' : 'border-brand-gray-300'}`}>
                    {active && <Check size={12} className="text-white" />}
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  {pkg.includes.map((item) => (
                    <p key={item} className="text-xs text-brand-gray-500 flex items-center gap-1.5">
                      <Check size={10} className="text-green-primary flex-shrink-0" />
                      {item}
                    </p>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Guest count */}
      <div className="px-5 mt-6">
        <p className="text-xs font-bold text-brand-black uppercase tracking-wider mb-3">
          <Users size={12} className="inline mr-1" />
          Guests
        </p>
        <div className="space-y-3">
          {/* Primary */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-brand-gray-300">
            <span className="text-sm font-medium text-brand-black">{data.guestLabels.primary}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setPrimaryGuests(Math.max(1, primaryGuests - 1))} className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer active:bg-brand-gray-300 transition-colors" aria-label={`Decrease ${data.guestLabels.primary}`}>
                <Minus size={14} />
              </button>
              <span className="text-sm font-bold text-brand-black w-6 text-center">{primaryGuests}</span>
              <button onClick={() => setPrimaryGuests(Math.min(30, primaryGuests + 1))} className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer active:bg-brand-gray-300 transition-colors" aria-label={`Increase ${data.guestLabels.primary}`}>
                <Plus size={14} />
              </button>
            </div>
          </div>
          {/* Secondary */}
          {data.guestLabels.secondary && (
            <div className="flex items-center justify-between p-3 rounded-xl border border-brand-gray-300">
              <span className="text-sm font-medium text-brand-black">{data.guestLabels.secondary}</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setSecondaryGuests(Math.max(0, secondaryGuests - 1))} className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer active:bg-brand-gray-300 transition-colors" aria-label={`Decrease ${data.guestLabels.secondary}`}>
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold text-brand-black w-6 text-center">{secondaryGuests}</span>
                <button onClick={() => setSecondaryGuests(Math.min(30, secondaryGuests + 1))} className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer active:bg-brand-gray-300 transition-colors" aria-label={`Increase ${data.guestLabels.secondary}`}>
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact form */}
      <div className="px-5 mt-6 pb-4">
        <p className="text-xs font-bold text-brand-black uppercase tracking-wider mb-3">Contact details</p>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleField('name')}
            aria-label="Name"
            className="w-full min-h-[44px] rounded-xl border border-brand-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-primary"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleField('email')}
            aria-label="Email"
            className="w-full min-h-[44px] rounded-xl border border-brand-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-primary"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={form.phone}
            onChange={handleField('phone')}
            aria-label="Phone"
            className="w-full min-h-[44px] rounded-xl border border-brand-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-primary"
          />
          <textarea
            placeholder="Message (e.g. preferred date, special requests)"
            value={form.message}
            onChange={handleField('message')}
            rows={3}
            aria-label="Message"
            className="w-full rounded-xl border border-brand-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-primary resize-none"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="sticky bottom-0 bg-white border-t border-brand-gray-100 px-5 py-4 z-10">
        <button
          onClick={() => canSend && setSent(true)}
          disabled={!canSend}
          className={`w-full py-4 rounded-2xl text-sm font-bold transition-transform ${canSend ? 'cursor-pointer active:scale-[0.97]' : 'opacity-50 cursor-not-allowed'}`}
          style={{ backgroundColor: canSend ? '#ffdc1e' : '#e0e0e0', color: '#3c3c3c' }}
        >
          Send inquiry
        </button>
      </div>
    </div>
  )
}

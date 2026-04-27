import { useState, useRef } from 'react'
import { ChevronLeft, User, Mail, Cake, Lock, Check, MapPin, Search, X, Trophy, Upload, Users, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import TEAMS from '../data/teams'
import VENUES from '../data/venues'

function ProgressBar({ step, total }) {
  return (
    <div className="h-1 bg-brand-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-green-primary rounded-full transition-all duration-300" style={{ width: `${(step / total) * 100}%` }} />
    </div>
  )
}

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="text-[11px] font-semibold tracking-wider text-brand-gray-500 uppercase">{label}</label>
      <div className="mt-1.5 flex items-center gap-3 px-4 py-3 rounded-xl border border-brand-gray-300 focus-within:border-green-primary transition-colors">
        {icon}
        {children}
      </div>
    </div>
  )
}

// Step 1: Welcome
function StepWelcome({ onGetStarted, onSignIn }) {
  return (
    <div className="min-h-[100dvh] flex flex-col text-white relative overflow-hidden" style={{ backgroundColor: '#23695a' }}>
      <img src="/images/welcome-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: '50% 35%' }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(15,42,38,0.35) 0%, rgba(15,42,38,0.15) 30%, rgba(15,42,38,0.55) 58%, rgba(15,42,38,0.92) 78%, rgba(15,42,38,0.97) 100%)'
      }} />
      <div className="absolute top-24 -left-12 w-32 h-32 rounded-full" style={{ backgroundColor: '#ffdc1e', opacity: 0.18, filter: 'blur(28px)' }} />

      <div className="relative z-10 flex flex-col h-full px-7 pt-20 pb-8 min-h-[100dvh]">
        <div className="flex items-center gap-2 mt-2">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
            <span className="text-green-dark font-extrabold text-lg" style={{ letterSpacing: '-0.05em' }}>O'</span>
          </div>
          <span className="font-bold tracking-widest text-sm">O'LEARYS</span>
        </div>

        <div className="mt-auto">
          <h1 className="text-[42px] font-bold leading-[1.05] tracking-tight">
            Sports, food, entertainment<br />&amp; rewards.
          </h1>
          <p className="mt-4 text-base text-white/85 leading-relaxed max-w-[300px]">
            Earn Bonus Points every visit. Climb tiers from Regular to MVP. Play games. Book the best seat. Take part of exclusive rewards.
          </p>

          <button onClick={onGetStarted} className="mt-8 w-full py-4 rounded-2xl font-bold text-base text-brand-black active:scale-[0.98] transition-transform cursor-pointer" style={{ backgroundColor: '#ffdc1e' }}>
            Get started
          </button>
          <button onClick={onSignIn} className="mt-3 w-full py-4 rounded-2xl font-semibold text-base text-white border border-white/30 active:scale-[0.98] transition-transform cursor-pointer">
            I already have an account
          </button>
        </div>
      </div>
    </div>
  )
}

// Step 2: Profile (registration — or demo mode skip)
function StepProfile({ onBack, onNext, demoMode }) {
  const { signUp } = useAuth()
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [password, setPassword] = useState('')
  const [terms, setTerms] = useState(false)
  const [news, setNews] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const valid = demoMode
    ? true  // allow skipping in demo mode
    : first.trim() && last.trim() && email.includes('@') && dob && password.length >= 6 && terms

  async function handleSubmit() {
    if (demoMode) {
      // Store name in localStorage for demo, skip actual signup
      const name = first.trim() ? `${first} ${last}`.trim() : ''
      if (name) localStorage.setItem('demo_name', name)
      onNext(first || 'there')
      return
    }
    if (!valid) return
    setError('')
    setLoading(true)
    try {
      await signUp(email, password, `${first} ${last}`, dob)
      onNext(first)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <div className="px-6 pt-14 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 -ml-2 flex items-center justify-center text-brand-black active:scale-90 transition-transform cursor-pointer">
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
        <span className="text-xs font-semibold text-brand-gray-500">STEP 1 OF 6</span>
        <div className="w-10" />
      </div>

      <div className="px-6 mt-3"><ProgressBar step={1} total={6} /></div>

      <div className="px-6 pt-10 pb-8 flex-1 flex flex-col">
        <h1 className="text-[28px] font-bold text-brand-black leading-tight">Tell us about<br />yourself</h1>
        <p className="mt-3 text-sm text-brand-gray-500">Just the basics — we'll keep it that way.</p>

        {error && <div className="mt-4 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>}

        <div className="mt-6 space-y-4">
          <Field label="First name" icon={<User size={18} className="text-brand-gray-500" />}>
            <input value={first} onChange={(e) => setFirst(e.target.value)} placeholder="Daniel" className="w-full text-base font-semibold text-brand-black placeholder-brand-gray-400 outline-none" />
          </Field>
          <Field label="Last name" icon={<User size={18} className="text-brand-gray-500" />}>
            <input value={last} onChange={(e) => setLast(e.target.value)} placeholder="Svantesson" className="w-full text-base font-semibold text-brand-black placeholder-brand-gray-400 outline-none" />
          </Field>
          <Field label="Email" icon={<Mail size={18} className="text-brand-gray-500" />}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="daniel@example.com" className="w-full text-base font-semibold text-brand-black placeholder-brand-gray-400 outline-none" />
          </Field>
          <Field label="Birthday" icon={<Cake size={18} className="text-brand-gray-500" />}>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full text-base font-semibold text-brand-black outline-none" />
          </Field>
          <Field label="Password" icon={<Lock size={18} className="text-brand-gray-500" />}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" className="w-full text-base font-semibold text-brand-black placeholder-brand-gray-400 outline-none" />
          </Field>
        </div>

        <label className="mt-6 flex items-start gap-3 cursor-pointer select-none">
          <button onClick={() => setTerms(!terms)} className="mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center cursor-pointer"
            style={{ borderColor: terms ? '#2d9b87' : '#c4c4c4', backgroundColor: terms ? '#2d9b87' : '#ffffff' }}>
            {terms && <Check size={14} className="text-white" strokeWidth={3} />}
          </button>
          <span className="text-sm text-brand-gray-500 leading-snug">
            I accept the <span className="underline font-semibold text-brand-black">Terms</span> and <span className="underline font-semibold text-brand-black">Privacy Policy</span>.
            <span className="ml-1 text-[10px] font-bold tracking-wider text-green-primary uppercase">Required</span>
          </span>
        </label>

        <label className="mt-3 flex items-start gap-3 cursor-pointer select-none">
          <button onClick={() => setNews(!news)} className="mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center cursor-pointer"
            style={{ borderColor: news ? '#2d9b87' : '#c4c4c4', backgroundColor: news ? '#2d9b87' : '#ffffff' }}>
            {news && <Check size={14} className="text-white" strokeWidth={3} />}
          </button>
          <span className="text-sm text-brand-gray-500 leading-snug">Send me birthday rewards and offers from O'Learys.</span>
        </label>

        <div className="mt-auto pt-8">
          <button onClick={handleSubmit} disabled={!valid || loading}
            className={`w-full py-4 rounded-2xl font-bold text-base active:scale-[0.98] transition-all cursor-pointer ${valid && !loading ? 'bg-green-primary text-white' : 'bg-brand-gray-100 text-brand-gray-500'}`}>
            {loading ? 'Creating account...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Step 3: Follow Teams
function StepTeams({ onBack, onNext, selectedTeams, setSelectedTeams }) {
  const [sport, setSport] = useState('football')
  const [query, setQuery] = useState('')

  const toggle = (id) => setSelectedTeams(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id])
  const currentSport = TEAMS[sport]
  const q = query.trim().toLowerCase()

  // Filter across all sections within the sport
  const filteredSections = currentSport ? currentSport.sections.map(section => ({
    ...section,
    teams: q ? section.teams.filter(t => t.name.toLowerCase().includes(q)) : section.teams,
  })).filter(s => s.teams.length > 0) : []

  const noResults = q && filteredSections.length === 0

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <div className="px-5 pt-14 pb-2 flex items-center justify-between flex-shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-brand-gray-200 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-sm">
          <ChevronLeft size={20} className="text-brand-black" />
        </button>
        <span className="text-base font-bold text-brand-black">Follow teams</span>
        <button onClick={onNext} className="px-4 py-2 rounded-full bg-white border border-brand-gray-200 text-sm font-semibold text-brand-black shadow-sm cursor-pointer">Skip</button>
      </div>

      <div className="px-6 mt-2">
        <ProgressBar step={2} total={6} />
        <p className="text-[10px] font-semibold tracking-wider text-brand-gray-500 mt-2">STEP 2 OF 6 · OPTIONAL</p>
      </div>

      {/* Sport toggle — only Football and Ice Hockey */}
      <div className="px-5 mt-4 flex-shrink-0">
        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-brand-gray-100">
          {Object.entries(TEAMS).map(([key, { label }]) => (
            <button key={key} onClick={() => { setSport(key); setQuery('') }}
              className={`py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.98] cursor-pointer ${sport === key ? 'bg-white text-brand-black shadow-sm' : 'text-brand-gray-500'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Sections within sport */}
      <div className="px-5 pt-4 pb-28 flex-1 overflow-y-auto no-scrollbar">
        {noResults && <div className="text-center py-10 text-sm text-brand-gray-500">No teams match "{query}"</div>}
        {filteredSections.map((section) => (
          <div key={section.title} className="mb-5">
            <h3 className="text-base font-bold text-brand-black mb-2 px-1">{section.title}</h3>
            <div className="rounded-2xl bg-brand-gray-100 overflow-hidden">
              {section.teams.map((t, i) => {
                const followed = selectedTeams.includes(t.id)
                return (
                  <div key={t.id} className={`flex items-center gap-3 px-4 py-2.5 ${i > 0 ? 'border-t border-white' : ''}`}>
                    <img src={t.logo} alt={t.name} className="w-8 h-8 object-contain rounded-full" onError={(e) => { e.target.style.display = 'none' }} />
                    <p className="font-semibold text-brand-black text-[15px] leading-tight truncate flex-1">{t.name}</p>
                    <button onClick={() => toggle(t.id)}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold active:scale-95 transition-all cursor-pointer ${followed ? 'bg-green-primary text-white' : 'bg-white text-brand-black'}`}>
                      {followed ? 'Following' : 'Follow'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating search + done */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-6 pointer-events-none z-20">
        <div className="max-w-[430px] mx-auto pointer-events-auto flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-brand-gray-200">
            <Search size={18} className="text-brand-gray-500" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={sport === 'hockey' ? 'Search hockey teams...' : 'Search football teams...'}
              className="w-full text-sm font-medium text-brand-black placeholder-brand-gray-400 outline-none bg-transparent" />
            {query && <button onClick={() => setQuery('')} className="w-5 h-5 rounded-full bg-brand-gray-300 flex items-center justify-center flex-shrink-0 cursor-pointer">
              <X size={12} className="text-white" strokeWidth={3} />
            </button>}
          </div>
          {selectedTeams.length > 0 && (
            <button onClick={onNext} className="px-5 py-3 rounded-full bg-green-primary text-white font-bold text-sm shadow-[0_4px_20px_rgba(45,155,135,0.4)] active:scale-95 transition-transform whitespace-nowrap cursor-pointer">
              Done · {selectedTeams.length}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Step 4: Pick Venue
function StepVenue({ onBack, onNext, selectedVenue, setSelectedVenue }) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const venues = q ? VENUES.filter(v => v.name.toLowerCase().includes(q)) : VENUES

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <div className="px-6 pt-14 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 -ml-2 flex items-center justify-center active:scale-90 transition-transform cursor-pointer">
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
        <span className="text-xs font-semibold text-brand-gray-500">STEP 5 OF 6</span>
        <div className="w-10" />
      </div>

      <div className="px-6 mt-3"><ProgressBar step={5} total={6} /></div>

      <div className="px-6 pt-10 pb-4">
        <h1 className="text-[28px] font-bold text-brand-black leading-tight">Pick your home<br />O'Learys</h1>
        <p className="mt-3 text-sm text-brand-gray-500">We'll show its matches, deals, and events first. You can change it any time.</p>
        <div className="mt-5 flex items-center gap-2 px-4 py-3 rounded-xl border border-brand-gray-300 focus-within:border-green-primary transition-colors">
          <Search size={18} className="text-brand-gray-500" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search city or address"
            className="w-full text-sm font-medium text-brand-black placeholder-brand-gray-400 outline-none" />
          {query && <button onClick={() => setQuery('')} className="text-xs text-brand-gray-500 font-semibold cursor-pointer">Clear</button>}
        </div>
      </div>

      <div className="px-6 flex-1 overflow-y-auto no-scrollbar space-y-2">
        {venues.length === 0 && <div className="text-center py-8 text-sm text-brand-gray-500">No venues match "{query}"</div>}
        {venues.map((v) => {
          const sel = selectedVenue === v.id
          return (
            <button key={v.id} onClick={() => setSelectedVenue(v.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all active:scale-[0.99] cursor-pointer"
              style={{ border: sel ? '2px solid #2d9b87' : '1px solid #e0e0e0', backgroundColor: sel ? 'rgba(45,155,135,0.06)' : '#ffffff' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: sel ? '#2d9b87' : '#f5f5f5' }}>
                <MapPin size={18} className={sel ? 'text-white' : 'text-brand-gray-500'} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brand-black">{v.name}</p>
                {v.address && <p className="text-xs text-brand-gray-500 truncate">{v.address}</p>}
              </div>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: sel ? 'none' : '1.5px solid #c4c4c4', backgroundColor: sel ? '#2d9b87' : 'transparent' }}>
                {sel && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
            </button>
          )
        })}
      </div>

      <div className="px-6 pt-4 pb-8">
        <button onClick={selectedVenue ? onNext : undefined} disabled={!selectedVenue}
          className={`w-full py-4 rounded-2xl font-bold text-base active:scale-[0.98] transition-all cursor-pointer ${selectedVenue ? 'bg-green-primary text-white' : 'bg-brand-gray-100 text-brand-gray-500'}`}>
          Continue
        </button>
      </div>
    </div>
  )
}

// Step 5: Success
function StepSuccess({ onFinish, userName }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[42%] bg-gradient-to-b from-green-primary/10 to-white pointer-events-none" />

      <div className="relative z-10 px-6 pt-20 flex flex-col items-center text-center flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-green-primary flex items-center justify-center shadow-[0_8px_22px_rgba(45,155,135,0.35)]">
          <Check size={30} className="text-white" strokeWidth={3} />
        </div>
        <h1 className="mt-4 font-bold text-brand-black leading-[1.05] text-[32px]">
          Welcome to the<br />club {userName}
        </h1>
        <p className="mt-2 text-[13px] text-brand-gray-500 max-w-[290px]">
          Your account is ready. Two rewards have been added — one for tonight, one for your next visit.
        </p>
      </div>

      <div className="relative z-10 mt-5 mx-6 rounded-2xl bg-gradient-to-br from-green-primary to-green-dark p-4 text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider opacity-80">Current tier</p>
            <p className="text-xl font-bold mt-0.5">Regular</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <Trophy size={22} className="text-white" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-[11px] opacity-80 mb-1">
            <span>0 / 1,000 pts</span><span>Next: Starter</span>
          </div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: '0%', backgroundColor: '#ffdc1e' }} />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-6 mt-3 space-y-2 flex-shrink-0">
        <div className="rounded-2xl border border-green-primary p-3.5 flex items-center gap-3" style={{ backgroundColor: 'rgba(45,155,135,0.05)' }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-green-primary">
            <span className="text-white font-bold text-[15px]">-10%</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-primary" />
              <span className="text-[9px] font-bold tracking-[0.18em] text-green-primary uppercase">Active now</span>
            </div>
            <p className="font-semibold text-brand-black text-[14px] leading-tight mt-0.5">10% off your first bill</p>
            <p className="text-[11px] text-brand-gray-500 leading-snug mt-0.5">Valid for 6 months</p>
          </div>
          <Check size={18} className="text-green-primary flex-shrink-0" strokeWidth={2.5} />
        </div>

        <div className="rounded-2xl border border-brand-gray-300 p-3.5 flex items-center gap-3 bg-white">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ffdc1e' }}>
            <Trophy size={20} className="text-brand-black" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gray-400" />
              <span className="text-[9px] font-bold tracking-[0.18em] text-brand-gray-500 uppercase">Unlocks in 24 h</span>
            </div>
            <p className="font-semibold text-brand-black text-[14px] leading-tight mt-0.5">Free wings + 2x points</p>
            <p className="text-[11px] text-brand-gray-500 leading-snug mt-0.5">With any 2 mains · Valid 3 months</p>
          </div>
        </div>
      </div>

      <div className="mt-auto px-6 pb-8 relative z-10 flex-shrink-0">
        <button onClick={onFinish} className="w-full py-4 rounded-2xl font-bold text-base bg-green-primary text-white active:scale-[0.98] transition-transform cursor-pointer">
          Explore my app
        </button>
      </div>
    </div>
  )
}

// Step: Player Card — vintage Topps-style card builder (from design spec)
function StepPlayerCard({ onBack, onNext, onSkip, userName, selectedTeams: followedTeams }) {
  const fileRef = useRef(null)
  const [photo, setPhoto] = useState(null)
  const [currentKit, setCurrentKit] = useState(null)

  const allTeams = Object.values(TEAMS).flatMap(s => s.sections.flatMap(sec => sec.teams))
  const followedSet = new Set(followedTeams || [])
  // Followed teams first, then the rest
  const orderedTeams = [
    ...allTeams.filter(t => followedSet.has(t.id)),
    ...allTeams.filter(t => !followedSet.has(t.id)),
  ].slice(0, 18)

  const kit = currentKit || orderedTeams[0]

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result)
    reader.readAsDataURL(f)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative" style={{ backgroundColor: '#f4f0e8' }}>
      {/* paper texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 30% 20%, #e8dec0 0%, transparent 50%), radial-gradient(circle at 80% 80%, #d4c89e 0%, transparent 50%)'
      }} />

      {/* header */}
      <div className="relative z-10 px-5 pt-14 pb-2 flex items-center justify-between flex-shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-brand-gray-200 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-sm">
          <ChevronLeft size={20} className="text-brand-black" />
        </button>
        <span className="text-base font-bold text-brand-black">Player card</span>
        <button onClick={onSkip} className="px-4 py-2 rounded-full bg-white border border-brand-gray-200 text-sm font-semibold text-brand-black shadow-sm cursor-pointer">Skip</button>
      </div>

      {/* progress */}
      <div className="relative z-10 px-6 mt-2">
        <ProgressBar step={3} total={6} />
        <p className="text-[10px] font-semibold tracking-wider text-brand-gray-500 mt-2">STEP 3 OF 6 · OPTIONAL</p>
      </div>

      {/* card preview — vintage style */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-4 pb-2 overflow-hidden">
        <div className="text-center mb-2 px-6">
          <h2 className="text-[22px] font-bold text-brand-black leading-tight" style={{ fontFamily: 'Georgia, serif' }}>Your player card</h2>
          <p className="text-xs text-brand-gray-500 mt-1">Pick a kit, drop in a photo. We'll mint it on signup.</p>
        </div>
        <div style={{ transform: 'rotate(-2deg)' }}>
          <div className="relative flex-shrink-0 rounded-lg overflow-hidden" style={{
            width: 220, height: 308, backgroundColor: '#f4ead2',
            border: '3px solid #c9b378',
            boxShadow: '0 8px 30px rgba(0,0,0,0.25), inset 0 0 0 2px rgba(255,255,255,0.4)',
          }}>
            {/* Photo area */}
            <div className="absolute" style={{ left: 8, right: 8, top: 8, bottom: '35%', borderRadius: 4, overflow: 'hidden', backgroundColor: '#bfd9e8' }}>
              {photo ? (
                <img src={photo} alt="You" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #bfd9e8 0%, #e8d4a8 65%, #5a8c4a 65.1%, #5a8c4a 100%)' }}>
                  <User size={60} className="text-brand-gray-400/50" style={{ marginTop: -20 }} />
                </div>
              )}
            </div>
            {/* Number disc */}
            <div className="absolute flex items-center justify-center" style={{
              right: 14, top: '40%', width: 36, height: 36, borderRadius: '50%',
              backgroundColor: '#fff', border: '2px solid #1a1a1a',
              fontFamily: 'Arial', fontWeight: 900, fontSize: 18, color: '#1a1a1a',
            }}>10</div>
            {/* Bottom banner */}
            <div className="absolute left-0 right-0 bottom-0 flex flex-col items-center justify-center px-3" style={{ height: '32%', backgroundColor: '#2d9b87' }}>
              <span className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>
                {userName || 'YOUR NAME'}
              </span>
              <span className="text-white/70 text-[10px] font-semibold tracking-widest mt-0.5">O'LEARYS · 2026</span>
            </div>
            {/* Team badge */}
            {kit && (
              <div className="absolute" style={{ left: 14, top: '40%' }}>
                <img src={kit.logo} alt="" className="w-8 h-8 object-contain rounded-full bg-white/80 p-0.5" />
              </div>
            )}
            {/* Wear overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(80,50,20,0.2) 0%, transparent 30%), radial-gradient(circle at 5% 95%, rgba(80,50,20,0.15) 0%, transparent 30%)',
              mixBlendMode: 'multiply',
            }} />
          </div>
        </div>
      </div>

      {/* jersey picker — followed teams first */}
      <div className="relative z-10 flex-shrink-0 pb-3">
        <div className="px-5 mb-2 flex items-center justify-between">
          <h3 className="text-xs font-bold tracking-wider text-brand-gray-500 uppercase">Choose kit</h3>
          {followedTeams?.length > 0 && <span className="text-[10px] font-semibold text-green-primary">★ Following first</span>}
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-2 px-5 pb-1" style={{ width: 'max-content' }}>
            {orderedTeams.map((t) => {
              const sel = kit?.id === t.id
              const followed = followedSet.has(t.id)
              return (
                <button key={t.id} onClick={() => setCurrentKit(t)}
                  className="flex flex-col items-center gap-1 px-2 py-2 rounded-xl active:scale-95 transition-all relative flex-shrink-0 cursor-pointer"
                  style={{ backgroundColor: sel ? '#fff' : 'transparent', border: sel ? '2px solid #2d9b87' : '2px solid transparent', minWidth: 64 }}>
                  <div className="relative">
                    <img src={t.logo} alt={t.name} className="w-9 h-9 object-contain rounded-full" onError={(e) => { e.target.style.display = 'none' }} />
                    {followed && (
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-primary flex items-center justify-center">
                        <Check size={9} className="text-white" strokeWidth={4} />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold text-brand-black truncate max-w-[60px] text-center leading-tight">{t.name.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* upload + cta */}
      <div className="relative z-10 flex-shrink-0 px-5 pb-6 flex gap-2">
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <button onClick={() => fileRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white border border-brand-gray-300 active:scale-[0.98] transition-transform cursor-pointer">
          <Upload size={18} className="text-brand-black" />
          <span className="font-semibold text-sm text-brand-black">{photo ? 'Change photo' : 'Upload photo'}</span>
        </button>
        <button onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-green-primary text-white font-bold text-sm active:scale-[0.98] transition-transform cursor-pointer">
          <Check size={18} className="text-white" strokeWidth={2.4} />
          Save card
        </button>
      </div>
    </div>
  )
}

// Step: Friends — from design spec (crew up with benefit chips, mini cards, invite section)
const FRIEND_SUGGESTIONS = [
  { id: 'sofia', name: 'Sofia Lindberg', tier: 'Pro', mutual: 4, note: 'Hockey buddy · Frölunda', hue: 320 },
  { id: 'erik', name: 'Erik Bergqvist', tier: 'Starter', mutual: 7, note: 'Bowling rival · 247 high', hue: 200 },
  { id: 'amelia', name: 'Amelia Norén', tier: 'Pro', mutual: 3, note: 'Saturday regular', hue: 30 },
  { id: 'johan', name: 'Johan Söderberg', tier: 'Regular', mutual: 2, note: 'Arsenal fan · prediction king', hue: 145 },
  { id: 'maja', name: 'Maja Holm', tier: 'Starter', mutual: 5, note: 'Quiz night co-captain', hue: 270 },
  { id: 'oscar', name: 'Oscar Wikander', tier: 'Pro', mutual: 1, note: 'Beats you at darts', hue: 10 },
]

function StepFriends({ onBack, onNext, onSkip, selectedFriends, setSelectedFriends }) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const list = q ? FRIEND_SUGGESTIONS.filter(f => f.name.toLowerCase().includes(q)) : FRIEND_SUGGESTIONS
  const selected = FRIEND_SUGGESTIONS.filter(f => selectedFriends.includes(f.id))

  const toggle = (id) => setSelectedFriends(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white relative overflow-hidden">
      {/* header */}
      <div className="px-5 pt-14 pb-2 flex items-center justify-between flex-shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-brand-gray-200 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-sm">
          <ChevronLeft size={20} className="text-brand-black" />
        </button>
        <span className="text-base font-bold text-brand-black">Add friends</span>
        <button onClick={onSkip} className="px-4 py-2 rounded-full bg-white border border-brand-gray-200 text-sm font-semibold text-brand-black shadow-sm cursor-pointer">Skip</button>
      </div>

      {/* progress */}
      <div className="px-6 mt-2 flex-shrink-0">
        <ProgressBar step={4} total={6} />
        <p className="text-[10px] font-semibold tracking-wider text-brand-gray-500 mt-2">STEP 4 OF 6 · OPTIONAL</p>
      </div>

      {/* hero */}
      <div className="px-5 pt-5 pb-3 flex-shrink-0">
        <h1 className="text-[26px] font-bold text-brand-black leading-[1.1]">Crew up.</h1>
        <p className="mt-2 text-[13px] text-brand-gray-500 leading-relaxed">
          Book lanes &amp; tables together, climb the prediction leaderboard, and brag about your bowling highscore.
        </p>
        {/* benefit chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[{ icon: '📅', label: 'Bookings' }, { icon: '🏆', label: 'Predictions' }, { icon: '🎳', label: 'Highscores' }].map(c => (
            <div key={c.label} className="flex items-center gap-1 px-2.5 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(45,155,135,0.08)' }}>
              <span className="text-[13px] leading-none">{c.icon}</span>
              <span className="text-[11px] font-semibold text-brand-black whitespace-nowrap">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* search */}
      <div className="px-5 mb-3 flex-shrink-0">
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-brand-gray-100">
          <Search size={16} className="text-brand-gray-500" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or phone"
            className="w-full text-sm font-medium text-brand-black placeholder-brand-gray-400 outline-none bg-transparent" />
          {query && <button onClick={() => setQuery('')} className="w-5 h-5 rounded-full bg-brand-gray-300 flex items-center justify-center flex-shrink-0 cursor-pointer">
            <X size={11} className="text-white" strokeWidth={3} />
          </button>}
        </div>
      </div>

      {/* list */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32">
        {!q && (
          <div className="flex items-baseline justify-between mb-2 px-1">
            <h3 className="text-[13px] font-bold text-brand-black">Suggested for you</h3>
            <span className="text-[11px] text-brand-gray-500">{FRIEND_SUGGESTIONS.length} on O'Learys</span>
          </div>
        )}
        <div className="space-y-1.5">
          {list.map(f => {
            const sel = selectedFriends.includes(f.id)
            return (
              <div key={f.id} onClick={() => toggle(f.id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer active:scale-[0.99] transition-all"
                style={{ backgroundColor: sel ? 'rgba(45,155,135,0.06)' : '#fff', border: sel ? '1.5px solid #2d9b87' : '1.5px solid #f0f0f0' }}>
                {/* Avatar with hue-based color */}
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `hsl(${f.hue}, 40%, 90%)` }}>
                  <span className="text-sm font-bold" style={{ color: `hsl(${f.hue}, 50%, 40%)` }}>{f.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-brand-black text-[14px] leading-tight truncate">{f.name}</p>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{
                      backgroundColor: f.tier === 'Pro' ? '#1a6f60' : f.tier === 'Starter' ? '#ffdc1e' : '#f0f0f0',
                      color: f.tier === 'Pro' ? '#fff' : '#3c3c3c',
                    }}>{f.tier}</span>
                  </div>
                  <p className="text-[11px] text-brand-gray-500 truncate leading-tight mt-0.5">{f.note} · {f.mutual} mutual</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggle(f.id) }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform cursor-pointer ${sel ? 'bg-green-primary' : 'bg-brand-gray-100'}`}>
                  {sel ? <Check size={16} className="text-white" strokeWidth={3} /> : <span className="text-lg font-light text-brand-gray-500 leading-none -mt-0.5">+</span>}
                </button>
              </div>
            )
          })}
          {list.length === 0 && <div className="text-center py-8 text-sm text-brand-gray-500">No friends match "{query}"</div>}
        </div>

        {/* invite via */}
        {!q && (
          <div className="mt-5">
            <h3 className="text-[13px] font-bold text-brand-black mb-2 px-1">Invite via</h3>
            <div className="grid grid-cols-3 gap-2">
              {[{ icon: '📱', label: 'Contacts', sub: 'Allow access' }, { icon: '🔗', label: 'Share link', sub: 'olearys.app/invite' }, { icon: '✉️', label: 'Email', sub: 'Type address' }].map(opt => (
                <button key={opt.label} className="flex flex-col items-center justify-center py-3 px-2 rounded-2xl bg-brand-gray-100 active:scale-[0.97] transition-transform cursor-pointer">
                  <span className="text-xl mb-1">{opt.icon}</span>
                  <span className="text-[11px] font-bold text-brand-black">{opt.label}</span>
                  <span className="text-[9px] text-brand-gray-500 mt-0.5">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* bottom CTA with stacked mini avatars */}
      <div className="absolute left-0 right-0 bottom-0 px-5 pb-6 pt-3 flex-shrink-0" style={{ background: 'linear-gradient(to top, #fff 60%, rgba(255,255,255,0))' }}>
        {selected.length > 0 && (
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex">
              {selected.slice(0, 4).map((f, i) => (
                <div key={f.id} className="w-7 h-7 rounded-full flex items-center justify-center border-2 border-white"
                  style={{ marginLeft: i === 0 ? 0 : -8, backgroundColor: `hsl(${f.hue}, 40%, 85%)`, zIndex: 4 - i }}>
                  <span className="text-[8px] font-bold" style={{ color: `hsl(${f.hue}, 50%, 35%)` }}>{f.name[0]}</span>
                </div>
              ))}
              {selected.length > 4 && (
                <div className="w-7 h-7 rounded-full bg-brand-black text-white flex items-center justify-center text-[10px] font-bold border-2 border-white" style={{ marginLeft: -8 }}>+{selected.length - 4}</div>
              )}
            </div>
            <span className="text-[12px] font-semibold text-brand-black">
              {selected.length === 1 ? `${selected[0].name.split(' ')[0]} added` : `${selected.length} friends added`}
            </span>
          </div>
        )}
        <button onClick={onNext}
          className="w-full py-4 rounded-2xl font-bold text-base bg-green-primary text-white active:scale-[0.98] transition-transform cursor-pointer shadow-[0_4px_20px_rgba(45,155,135,0.3)]">
          {selected.length > 0 ? `Continue with ${selected.length}` : 'Continue without friends'}
        </button>
      </div>
    </div>
  )
}

// Simple login (from "I already have an account")
function LoginInline({ onBack }) {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try { await signIn(email, password) } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      <div className="px-6 pt-14">
        <button onClick={onBack} className="w-10 h-10 -ml-2 flex items-center justify-center text-brand-black active:scale-90 transition-transform cursor-pointer">
          <ChevronLeft size={24} className="text-brand-black" />
        </button>
      </div>
      <div className="px-6 pt-10 pb-8 flex-1 flex flex-col">
        <h1 className="text-[28px] font-bold text-brand-black leading-tight">Welcome back</h1>
        <p className="mt-3 text-sm text-brand-gray-500">Sign in to your O'Learys account</p>
        {error && <div className="mt-4 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4 flex-1 flex flex-col">
          <Field label="Email" icon={<Mail size={18} className="text-brand-gray-500" />}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
              className="w-full text-base font-semibold text-brand-black placeholder-brand-gray-400 outline-none" />
          </Field>
          <Field label="Password" icon={<Lock size={18} className="text-brand-gray-500" />}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password"
              className="w-full text-base font-semibold text-brand-black placeholder-brand-gray-400 outline-none" />
          </Field>
          <div className="mt-auto pt-8">
            <button type="submit" disabled={loading || !email || !password}
              className={`w-full py-4 rounded-2xl font-bold text-base active:scale-[0.98] transition-all cursor-pointer ${email && password && !loading ? 'bg-green-primary text-white' : 'bg-brand-gray-100 text-brand-gray-500'}`}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Main flow controller
export default function Onboarding({ onDemoComplete }) {
  const { user, updateProfile } = useAuth()
  const [step, setStep] = useState('welcome')
  const [selectedTeams, setSelectedTeams] = useState([])
  const [selectedFriends, setSelectedFriends] = useState([])
  const [selectedVenue, setSelectedVenue] = useState('')
  const [userName, setUserName] = useState('')

  const demoMode = !user && !!onDemoComplete

  async function finishOnboarding() {
    if (demoMode) {
      onDemoComplete()
      return
    }
    if (selectedTeams.length > 0 && user) {
      const rows = []
      for (const [sport, { sections }] of Object.entries(TEAMS)) {
        for (const section of sections) {
          for (const team of section.teams) {
            if (selectedTeams.includes(team.id)) rows.push({ user_id: user.id, team_id: team.id, sport })
          }
        }
      }
      if (rows.length > 0) await supabase.from('user_teams').upsert(rows, { onConflict: 'user_id,team_id' })
    }
    await updateProfile({ favorite_restaurant: selectedVenue || null, onboarding_completed: true })
  }

  switch (step) {
    case 'welcome': return <StepWelcome onGetStarted={() => setStep('profile')} onSignIn={() => setStep('login')} />
    case 'login': return <LoginInline onBack={() => setStep('welcome')} />
    case 'profile': return <StepProfile demoMode={demoMode} onBack={() => setStep('welcome')} onNext={(firstName) => { setUserName(firstName); setStep('teams') }} />
    case 'teams': return <StepTeams onBack={() => setStep('profile')} onNext={() => setStep('card')} selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} />
    case 'card': return <StepPlayerCard onBack={() => setStep('teams')} onNext={() => setStep('friends')} onSkip={() => setStep('friends')} userName={userName} selectedTeams={selectedTeams} />
    case 'friends': return <StepFriends onBack={() => setStep('card')} onNext={() => setStep('venue')} onSkip={() => setStep('venue')} selectedFriends={selectedFriends} setSelectedFriends={setSelectedFriends} />
    case 'venue': return <StepVenue onBack={() => setStep('friends')} onNext={() => setStep('success')} selectedVenue={selectedVenue} setSelectedVenue={setSelectedVenue} />
    case 'success': return <StepSuccess userName={userName || 'there'} onFinish={finishOnboarding} />
    default: return <StepWelcome onGetStarted={() => setStep('profile')} onSignIn={() => setStep('login')} />
  }
}

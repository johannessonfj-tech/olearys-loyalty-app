import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  Plus,
  Trophy,
  Settings,
  QrCode,
  Calendar,
  Users,
  Upload,
  RefreshCw,
  Check,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const SPORTS = [
  { id: 'hockey', label: 'Hockey' },
  { id: 'football', label: 'Football' },
  { id: 'baseball', label: 'Baseball' },
  { id: 'american-football', label: 'American Football' },
  { id: 'handball', label: 'Handball' },
  { id: 'floorball', label: 'Floorball' },
  { id: 'tennis', label: 'Tennis' },
  { id: 'bowling', label: 'Bowling' },
]

const POINTS = 58231
const POINTS_TO_GO = 11769
const PROGRESS_PCT = 83

const DEALS = [
  { id: 'sunday', image: '/images/deal-sunday.png' },
  { id: 'burger', image: '/images/deal-burger.png' },
]

const REDEEM = [
  { id: 'bowling', name: 'Bowling', pts: 800, image: '/images/redeem-bowling.png' },
  { id: 'softdrink', name: 'Soft Drink', pts: 400, image: '/images/redeem-softdrink.png' },
  { id: 'shuffleboard', name: 'Shuffleboard', pts: 800, image: '/images/redeem-shuffleboard.png' },
  { id: 'wings', name: 'Wings', pts: 1200, image: '/images/redeem-wings.png' },
]

function TopBar({ navigate }) {
  return (
    <div className="px-5 pt-3 pb-4 flex items-center justify-between" style={{ color: '#2d9b87' }}>
      <button
        onClick={() => navigate('/settings')}
        className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-brand-gray-500"
        aria-label="Settings"
      >
        <Settings size={20} />
      </button>
      <img src="/images/olearys-logo-green.png" alt="O'Learys" className="h-12 w-auto" />
      <button
        onClick={() => navigate('/loyalty-explained')}
        className="-mr-1 px-2 py-1 rounded-md text-[10px] font-semibold text-brand-gray-600 leading-tight text-right max-w-[80px] active:opacity-70 transition"
      >
        Loyalty<br />Explained
      </button>
    </div>
  )
}

function SectionHeader({ title, action, onAction }) {
  return (
    <div className="px-5 mt-7 mb-3 flex items-end justify-between">
      <h2 className="text-[12px] uppercase tracking-[0.16em] font-semibold text-brand-gray-500 whitespace-nowrap">
        {title}
      </h2>
      {action &&
        (onAction ? (
          <button
            onClick={onAction}
            className="text-[12px] font-medium text-brand-gray-700 underline-offset-2 hover:underline"
          >
            {action}
          </button>
        ) : (
          <span className="text-[12px] font-medium text-brand-gray-500">{action}</span>
        ))}
    </div>
  )
}

function HeroFront({ name, navigate, onFlip, onOpenCardModal }) {
  const stop = (e) => e.stopPropagation()
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onFlip}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onFlip()
        }
      }}
      aria-label="Show member details"
      className="rounded-3xl bg-white p-4 overflow-hidden border border-brand-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] h-full cursor-pointer active:scale-[0.995] transition-transform"
    >
      <div className="relative flex items-stretch gap-4">
        <button
          onClick={(e) => {
            stop(e)
            onOpenCardModal()
          }}
          className="flex-shrink-0 w-[96px] rounded-2xl overflow-hidden shadow-md active:scale-95 transition-transform self-center"
          aria-label="Player card"
        >
          <img
            src="/images/player-card-baseball.png"
            alt="Player card"
            className="w-full h-auto block"
          />
        </button>
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          <div>
            <h1 className="text-[18px] font-bold text-brand-black leading-tight truncate">{name}</h1>
            <div className="mt-2">
              <p className="text-[10px] uppercase tracking-[0.16em] text-brand-gray-500 font-semibold">
                Your points
              </p>
              <p className="mt-0.5 text-[28px] leading-none font-semibold tabular-nums text-brand-black">
                {POINTS.toLocaleString('sv-SE')}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              stop(e)
              navigate('/loyalty-explained')
            }}
            className="mt-2 self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-primary text-white text-[12px] font-semibold whitespace-nowrap"
          >
            <Trophy size={12} /> All Star
          </button>
        </div>
      </div>
      <button
        onClick={(e) => {
          stop(e)
          navigate('/loyalty-explained')
        }}
        className="relative mt-4 w-full text-left active:opacity-80 transition"
      >
        <div className="flex items-center justify-between text-[10.5px] text-brand-gray-500 mb-1.5">
          <span>Progress to Champion</span>
          <span className="tabular-nums text-brand-gray-700">
            {POINTS_TO_GO.toLocaleString('sv-SE')} to go
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-brand-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-green-primary"
            style={{ width: `${PROGRESS_PCT}%` }}
          />
        </div>
      </button>
    </div>
  )
}

function HeroBack({ name }) {
  return (
    <div
      className="rounded-3xl p-5 h-full flex flex-col"
      style={{
        backgroundColor: '#fdf0d5',
        boxShadow: '0 12px 40px -8px rgba(0,0,0,0.22), 0 4px 14px -4px rgba(0,0,0,0.10)',
      }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-[88px] rounded-xl overflow-hidden shadow-md">
          <img
            src="/images/player-card-baseball.png"
            alt="Player card"
            className="w-full h-auto block"
          />
        </div>
        <div className="flex-1 min-w-0 pt-0.5 relative">
          <p className="text-[12px] font-bold tracking-[0.12em] text-green-primary">All Star</p>
          <h2 className="text-[26px] font-bold text-brand-black leading-tight mt-0.5">{name}</h2>
          <p className="text-[11.5px] text-brand-gray-700 mt-1.5 leading-snug">Member since: 2024</p>
          <p className="text-[11.5px] text-brand-gray-700 leading-snug">Starred location: Norrköping</p>
        </div>
      </div>
      <p className="mt-4 text-[12.5px] italic text-brand-gray-700 leading-relaxed">
        A dedicated All Star member known for his competitive spirit in bowling and trivia
        nights. {name.split(' ')[0]} has been a regular at O'Learys Norrköping since 2024, earning his
        way up from Starter tier. His impressive 58K point total and 12 game wins make him one of
        the top performers in the region.
      </p>
      <div className="mt-4 pt-3 flex items-end justify-between border-t border-brand-black/10">
        <div className="flex items-center gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"
            alt="Arsenal"
            className="w-7 h-7 object-contain"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0c/AIK_logo.svg"
            alt="AIK"
            className="w-7 h-7 object-contain"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/c/cd/Sweden_national_football_team_logo.svg"
            alt="Sweden"
            className="w-7 h-7 object-contain"
          />
        </div>
        <p className="text-[10px] text-brand-gray-600 italic">Tap outside to close</p>
      </div>
    </div>
  )
}

function HeroCard({ name, navigate, onFlip, onOpenCardModal }) {
  return (
    <div className="px-5">
      <p className="text-[13px] text-brand-gray-500 mb-2 px-1">Good evening,</p>
      <HeroFront
        name={name}
        navigate={navigate}
        onFlip={onFlip}
        onOpenCardModal={onOpenCardModal}
      />
    </div>
  )
}

function MemberQRCard({ navigate }) {
  return (
    <button
      onClick={() => navigate('/qr')}
      className="mx-5 mt-4 w-[calc(100%-40px)] rounded-3xl text-white p-4 flex items-center gap-4 active:scale-[0.99] transition-transform overflow-hidden relative"
      style={{ backgroundColor: '#2d9b87' }}
    >
      <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-brand-yellow/15 blur-2xl pointer-events-none" />
      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-black flex-shrink-0">
        <QrCode size={28} />
      </div>
      <div className="flex-1 text-left relative">
        <p className="text-[15px] font-semibold">Show Member QR</p>
        <p className="text-[12.5px] text-white/70">Scan at checkout to earn &amp; redeem</p>
      </div>
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-yellow text-brand-black flex-shrink-0">
        <ChevronRight size={18} />
      </div>
    </button>
  )
}

function NextGameCard({ navigate }) {
  const arsenalUrl = 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg'
  const liverpoolUrl = 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg'
  return (
    <button
      onClick={() => navigate('/book/arsenal-liverpool')}
      className="mx-5 w-[calc(100%-40px)] rounded-3xl bg-white p-3 flex items-center gap-3 text-left active:scale-[0.99] transition-transform"
    >
      <div className="flex-shrink-0 flex items-center">
        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full">
          <img src={arsenalUrl} alt="Arsenal" className="w-9 h-9 object-contain" />
        </div>
        <div className="w-10 h-10 -ml-2 flex items-center justify-center bg-white rounded-full ring-2 ring-white">
          <img src={liverpoolUrl} alt="Liverpool" className="w-9 h-9 object-contain" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-brand-black truncate">Arsenal vs Liverpool</p>
        <p className="text-[11.5px] text-brand-gray-500 mt-0.5 truncate">Sat · 16:30 · Premier League</p>
      </div>
      <span className="flex-shrink-0 px-3 py-1.5 rounded-full bg-brand-black text-white text-[12px] font-semibold">
        Book
      </span>
    </button>
  )
}

function UpcomingBookingsCard({ navigate }) {
  return (
    <div className="mx-5 w-[calc(100%-40px)] rounded-3xl bg-white p-3 flex items-center gap-3">
      <button
        onClick={() => navigate('/my-bookings')}
        className="w-9 h-9 rounded-xl bg-green-primary/10 text-green-primary flex items-center justify-center flex-shrink-0"
        aria-label="View bookings"
      >
        <Calendar size={18} />
      </button>
      <button
        onClick={() => navigate('/my-bookings')}
        className="flex-1 min-w-0 text-left active:opacity-80"
      >
        <p className="text-[14px] font-semibold text-brand-black truncate">Shuffleboard · Table 3</p>
        <p className="text-[11.5px] text-brand-gray-500 mt-0.5 truncate">Fri · 19:00 · 4 people</p>
      </button>
      <button
        onClick={() => navigate('/my-bookings')}
        className="flex-shrink-0 px-3 py-1.5 rounded-full bg-brand-black text-white text-[12px] font-semibold"
      >
        Invite friends
      </button>
    </div>
  )
}

function QuickLinks({ navigate }) {
  const items = [
    { id: 'friends', label: 'Friends', Icon: Users, to: '/friends' },
    { id: 'highscore', label: 'My Highscores', Icon: Trophy, to: '/highscore' },
  ]
  return (
    <div className="px-5 grid grid-cols-2 gap-2.5">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => navigate(it.to)}
          className="rounded-2xl bg-white px-3.5 py-3 flex items-center gap-2.5 text-left active:scale-[0.98] transition-transform"
        >
          <span className="text-green-primary flex-shrink-0">
            <it.Icon size={16} />
          </span>
          <span className="text-[13px] font-semibold text-brand-black leading-tight">
            {it.label}
          </span>
        </button>
      ))}
    </div>
  )
}

function DealCarousel({ navigate }) {
  return (
    <div>
      <div className="overflow-x-auto no-scrollbar pl-5 -mr-5">
        <div className="flex gap-4 pr-5">
          {DEALS.map((d) => (
            <button
              key={d.id}
              onClick={() => navigate(`/deals/${d.id}`)}
              className="flex-shrink-0 w-[300px] rounded-2xl overflow-hidden active:scale-[0.99] transition-transform"
            >
              <div className="aspect-[16/9] bg-brand-gray-100">
                <img src={d.image} alt="Deal" className="w-full h-full object-cover" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function RedeemStrip({ navigate }) {
  return (
    <div>
      <div className="overflow-x-auto no-scrollbar pl-5 -mr-5">
        <div className="flex gap-4 pr-5">
          {REDEEM.map((r) => (
            <button
              key={r.id}
              onClick={() => navigate(`/rewards/${r.id}`)}
              className="flex-shrink-0 w-[140px] flex flex-col text-left active:scale-[0.98] transition-transform"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-brand-gray-100 relative">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center">
                  <ChevronRight size={14} className="text-brand-black" />
                </div>
              </div>
              <p className="font-semibold text-[14px] text-brand-black mt-2">{r.name}</p>
              <div className="flex items-center gap-0.5 mt-0.5 text-[13px] text-brand-black">
                <Plus size={12} /> <span className="tabular-nums">{r.pts}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function PlayerCardModal({ onClose }) {
  const [step, setStep] = useState('view')
  const [selectedSport, setSelectedSport] = useState(null)

  if (step === 'preview') {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={onClose}>
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <div className="w-[280px] rounded-2xl overflow-hidden shadow-2xl">
            <img src="/images/player-card-baseball.png" alt="Generated player card" className="w-full h-auto" />
          </div>
          <div className="flex gap-2 mt-4 justify-center">
            <button
              onClick={() => setStep('generate')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-sm font-semibold text-brand-black cursor-pointer transition-transform duration-200 active:scale-95"
            >
              <RefreshCw size={14} />
              Regenerate
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-full bg-white/20 border border-white/40 text-sm font-semibold text-white cursor-pointer transition-transform duration-200 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-green-primary text-sm font-semibold text-white cursor-pointer transition-transform duration-200 active:scale-95"
            >
              <Check size={14} />
              Keep
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'generate') {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={onClose}>
        <div className="bg-white rounded-2xl w-[340px] mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="px-5 pt-5 pb-4">
            <h3 className="text-lg font-bold text-brand-black mb-1">Generate Player Card</h3>
            <p className="text-sm text-brand-gray-500 mb-4">Choose your sport to create a custom card</p>

            <button className="w-full mb-4 py-3 rounded-xl border-2 border-dashed border-brand-gray-300 flex items-center justify-center gap-2 cursor-pointer text-sm font-medium text-brand-gray-500 transition-colors duration-150 hover:border-green-primary hover:text-green-primary">
              <Upload size={16} />
              Upload your photo
            </button>

            <p className="text-xs text-brand-gray-500 mb-2 font-semibold">Select sport</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {SPORTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSport(s.id)}
                  className={`py-3 px-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-150 ${
                    selectedSport === s.id
                      ? 'bg-green-primary text-white'
                      : 'bg-brand-gray-100 text-brand-black'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <button
              disabled={!selectedSport}
              onClick={() => selectedSport && setStep('preview')}
              className={`w-full py-3 rounded-full font-semibold text-sm cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 ${
                selectedSport
                  ? 'bg-green-primary text-white active:scale-[0.97]'
                  : 'bg-brand-gray-200 text-brand-gray-400 cursor-not-allowed'
              }`}
            >
              <RefreshCw size={14} />
              Generate Card
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={onClose}>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <div className="w-[280px] rounded-2xl overflow-hidden shadow-2xl">
          <img src="/images/player-card-baseball.png" alt="Player card" className="w-full h-auto" />
        </div>
        <div className="flex gap-3 mt-4 justify-center">
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-sm font-semibold text-brand-black cursor-pointer transition-transform duration-200 active:scale-95">
            <Upload size={14} />
            Upload Photo
          </button>
          <button
            onClick={() => setStep('generate')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-green-primary text-sm font-semibold text-white cursor-pointer transition-transform duration-200 active:scale-95"
          >
            <RefreshCw size={14} />
            Generate
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const [flipped, setFlipped] = useState(false)
  const [showCardModal, setShowCardModal] = useState(false)

  const name = profile?.name || localStorage.getItem('demo_name') || 'Daniel Svantesson'

  return (
    <div className="pb-4">
      <TopBar navigate={navigate} />

      <HeroCard
        name={name}
        navigate={navigate}
        onFlip={() => setFlipped(true)}
        onOpenCardModal={() => setShowCardModal(true)}
      />

      <MemberQRCard navigate={navigate} />

      <SectionHeader title="Don't miss" />
      <NextGameCard navigate={navigate} />

      <SectionHeader title="Up next" />
      <UpcomingBookingsCard navigate={navigate} />

      <SectionHeader title="Shortcuts" />
      <QuickLinks navigate={navigate} />

      <SectionHeader title="Featured deal" action="See all" onAction={() => navigate('/deals')} />
      <DealCarousel navigate={navigate} />

      <SectionHeader title="Redeem with points" action="See all" onAction={() => navigate('/rewards')} />
      <RedeemStrip navigate={navigate} />

      {flipped && (
        <>
          <button
            onClick={() => setFlipped(false)}
            aria-label="Close member card"
            className="fixed inset-0 backdrop-fade z-30"
            style={{ backgroundColor: 'rgba(60, 60, 60, 0.55)' }}
          />
          <div
            className="fixed left-0 right-0 px-5 flip-scene z-40 max-w-[430px] mx-auto"
            style={{ top: '40%', transform: 'translateY(-50%)' }}
          >
            <div className="flip-in">
              <HeroBack name={name} />
            </div>
          </div>
        </>
      )}

      {showCardModal && <PlayerCardModal onClose={() => setShowCardModal(false)} />}
    </div>
  )
}

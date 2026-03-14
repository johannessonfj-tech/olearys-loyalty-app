import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, QrCode, Coins, Gift, Sun, PartyPopper, Heart, ChevronRight, Receipt } from 'lucide-react'

const VOUCHERS = [
  { id: 1, title: '25 kr off', sub: 'Valid until 31 Mar 2026', dark: false },
  { id: 3, title: 'VIP Norrköping Night Club', sub: 'Exclusive VIP access — Valid until 30 Jun 2026', dark: true },
]

const CARDS = [
  {
    id: 'summer-card',
    title: 'Summer Card',
    subtitle: 'Unlimited fun all summer',
    price: 499,
    value: '2 000+',
    gradient: 'linear-gradient(135deg, #ff9a3c 0%, #ff6b2b 50%, #e84545 100%)',
    icon: 'sun',
    badge: 'Best Value',
  },
  {
    id: 'family-card',
    title: 'Family Card',
    subtitle: 'Fun for the whole family',
    price: 349,
    value: '1 200+',
    gradient: 'linear-gradient(135deg, #2d9b87 0%, #23695a 100%)',
    icon: 'heart',
  },
]

const GIFT_CARDS = [
  {
    id: 'gift-birthday',
    category: 'Birthday',
    cards: [
      { id: 'bday-1', title: 'Happy Birthday', color: '#ffdc1e', textColor: '#3c3c3c' },
      { id: 'bday-2', title: 'Party Time', color: '#ff6b2b', textColor: '#fff' },
    ],
  },
  {
    id: 'gift-thankyou',
    category: 'Thank You',
    cards: [
      { id: 'ty-1', title: 'Thank You', color: '#2d9b87', textColor: '#fff' },
      { id: 'ty-2', title: 'You\'re the Best', color: '#23695a', textColor: '#fff' },
    ],
  },
  {
    id: 'gift-general',
    category: 'Just Because',
    cards: [
      { id: 'gen-1', title: 'Treat Yourself', color: '#3c3c3c', textColor: '#fff' },
      { id: 'gen-2', title: 'Enjoy!', color: '#6366f1', textColor: '#fff' },
    ],
  },
]

function QRModal({ onClose }) {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white"
      style={{ maxWidth: 390, margin: '0 auto' }}
      role="dialog"
      aria-modal="true"
      aria-label="QR code for scanning"
    >
      <div className="flex items-center justify-between px-4 pt-10 pb-4 border-b border-brand-gray-100">
        <h2 className="text-lg font-bold text-brand-black">Scan at register</h2>
        <button
          onClick={onClose}
          className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer"
          aria-label="Close QR code"
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <p className="text-sm text-brand-gray-500 text-center mb-8">
          Show this QR code to the cashier to collect your Bonus Points
        </p>
        <div className="w-56 h-56 rounded-2xl border-2 border-green-primary flex items-center justify-center">
          <div className="grid grid-cols-7 gap-0.5 p-2">
            {Array.from({ length: 49 }).map((_, i) => {
              const row = Math.floor(i / 7)
              const col = i % 7
              const isCorner = (row < 2 && col < 2) || (row < 2 && col > 4) || (row > 4 && col < 2)
              const isRandom = (i * 17 + row * 3 + col * 7) % 3 === 0
              return (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-sm ${isCorner || isRandom ? 'bg-green-primary' : 'bg-brand-gray-100'}`}
                />
              )
            })}
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="font-bold text-base text-brand-black">Daniel Svantesson</p>
          <span className="mt-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-green-primary inline-block">
            All Star
          </span>
        </div>
        <p className="text-xs text-brand-gray-500 mt-6 text-center">
          Code refreshes every 60 seconds for security
        </p>
      </div>
    </div>
  )
}

function CardIcon({ name, size = 20, className = '' }) {
  const props = { size, className }
  switch (name) {
    case 'sun': return <Sun {...props} />
    case 'heart': return <Heart {...props} />
    case 'gift': return <Gift {...props} />
    case 'party': return <PartyPopper {...props} />
    default: return <Gift {...props} />
  }
}

export default function Wallet() {
  const [showQR, setShowQR] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-10 pb-4">
      {/* Loyalty Card — flippable */}
      <div
        className="cursor-pointer"
        style={{ perspective: 1000 }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className="relative w-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transitionDuration: '600ms',
            transitionProperty: 'transform',
          }}
        >
          {/* Front — loyalty card */}
          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #2d9b87 0%, #23695a 100%)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -right-2 top-8 w-20 h-20 rounded-full bg-white/10" />
            <div className="relative">
              <p className="text-white/70 text-xs font-medium uppercase tracking-widest">O'Learys</p>
              <h2 className="text-white text-xl font-bold mt-1">Daniel Svantesson</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-brand-yellow text-xs font-bold px-2.5 py-0.5 rounded-full text-brand-black">
                  All Star
                </span>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-white/60 text-[10px] uppercase tracking-wider">Bonus Points</p>
                  <p className="text-white text-2xl font-bold flex items-center gap-1.5">
                    <Coins size={18} className="text-white/70" />
                    58 231
                  </p>
                </div>
                <div className="opacity-30">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M20 4L36 20L20 36L4 20L20 4Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Back — baseball player card */}
          <div
            className="rounded-2xl absolute inset-0 overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #1a1a1a 0%, #3c3c3c 100%)',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="flex flex-col items-center justify-center h-full relative px-5 py-5">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mb-2">
                <circle cx="28" cy="14" r="7" fill="rgba(255,255,255,0.8)" />
                <path d="M20 26C20 26 23 23 28 23C33 23 36 26 36 26L38 42H18L20 26Z" fill="rgba(255,255,255,0.8)" />
                <path d="M36 20L46 11" stroke="#ffdc1e" strokeWidth="3" strokeLinecap="round" />
                <path d="M44 9L48 6" stroke="#ffdc1e" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <p className="text-white font-bold text-base text-center">Daniel Svantesson</p>
              <p className="text-white/40 text-[10px] mt-0.5 uppercase tracking-wider">O'Learys All Star</p>
              <div className="flex gap-5 mt-3">
                <div className="text-center">
                  <p className="text-brand-yellow text-sm font-bold">58K</p>
                  <p className="text-white/30 text-[9px]">PTS</p>
                </div>
                <div className="text-center">
                  <p className="text-brand-yellow text-sm font-bold">47</p>
                  <p className="text-white/30 text-[9px]">VISITS</p>
                </div>
                <div className="text-center">
                  <p className="text-brand-yellow text-sm font-bold">12</p>
                  <p className="text-white/30 text-[9px]">WINS</p>
                </div>
              </div>
              <p className="text-white/20 text-[8px] mt-3">Tap to flip back</p>
            </div>
          </div>
        </div>
      </div>

      {/* Show QR Code */}
      <button
        onClick={() => setShowQR(true)}
        className="mt-4 w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm text-white bg-green-primary cursor-pointer transition-transform duration-200 active:scale-[0.97]"
        aria-label="Show QR code for scanning"
      >
        <QrCode size={18} />
        Show QR Code
      </button>

      {/* Vouchers */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-brand-black">My Cards</h2>
          <button
            onClick={() => navigate('/wallet/vouchers')}
            className="text-sm text-green-primary cursor-pointer"
          >
            See all
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
          {VOUCHERS.map((v) => (
            <button
              key={v.id}
              onClick={() => navigate(`/wallet/voucher/${v.id}`)}
              className={`flex-shrink-0 rounded-xl p-4 relative overflow-hidden text-left cursor-pointer transition-transform duration-200 active:scale-[0.97] ${v.dark ? 'bg-green-dark' : 'bg-green-primary'}`}
              style={{ width: 176, height: 100 }}
            >
              {v.birthday && (
                <div className="absolute top-2 right-2">
                  <PartyPopper size={16} className="text-white/40" />
                </div>
              )}
              <p className="text-white font-bold text-sm leading-tight">{v.title}</p>
              <p className="text-white/70 text-[10px] mt-1 leading-snug">{v.sub}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Buy Cards */}
      <section className="mt-8">
        <h2 className="text-base font-bold mb-1 text-brand-black">Buy Cards</h2>
        <p className="text-sm text-brand-gray-500 mb-4">
          Prepaid cards and gift cards for you or someone special
        </p>

        {/* Passes */}
        <div className="flex flex-col gap-3 mb-6">
          {CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => navigate(`/wallet/card/${card.id}`)}
              className="relative rounded-2xl p-5 text-left overflow-hidden cursor-pointer transition-transform duration-200 active:scale-[0.98]"
              style={{ background: card.gradient }}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute right-8 -bottom-4 w-16 h-16 rounded-full bg-white/10" />

              {card.badge && (
                <span className="inline-block bg-white text-xs font-bold px-2.5 py-0.5 rounded-full text-brand-black mb-2">
                  {card.badge}
                </span>
              )}

              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardIcon name={card.icon} size={18} className="text-white/80" />
                    <h3 className="text-white text-lg font-bold">{card.title}</h3>
                  </div>
                  <p className="text-white/70 text-xs">{card.subtitle}</p>
                </div>
                <div className="text-right ml-3">
                  <p className="text-white text-xl font-bold">{card.price} kr</p>
                  <p className="text-white/60 text-[10px]">{card.value}+ kr value</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-3 text-white/80 text-xs font-medium">
                View details
                <ChevronRight size={14} />
              </div>
            </button>
          ))}
        </div>

        {/* Gift Cards */}
        {GIFT_CARDS.map((category) => (
          <div key={category.id} className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider">{category.category}</h3>
              <button className="text-xs text-green-primary cursor-pointer">See all</button>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
              {category.cards.map((gc) => (
                <button
                  key={gc.id}
                  onClick={() => navigate(`/wallet/gift/${gc.id}`)}
                  className="flex-shrink-0 rounded-xl relative overflow-hidden cursor-pointer transition-transform duration-200 active:scale-[0.97]"
                  style={{ background: gc.color, width: 160, height: 100 }}
                >
                  <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-white/15" />
                  <div className="absolute right-6 top-2 w-8 h-8 rounded-full bg-white/10" />
                  <div className="relative p-3 h-full flex flex-col justify-end">
                    <p className="font-bold text-sm leading-tight" style={{ color: gc.textColor }}>
                      {gc.title}
                    </p>
                    <p className="text-[10px] mt-0.5 opacity-70" style={{ color: gc.textColor }}>
                      From 100 kr
                    </p>
                  </div>
                </button>
              ))}
              <div className="flex-shrink-0 w-6 flex items-center justify-center">
                <ChevronRight size={16} className="text-brand-gray-300" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Order History */}
      <section className="mt-8">
        <button
          onClick={() => navigate('/wallet/history')}
          className="w-full flex items-center gap-3 p-4 rounded-2xl border border-brand-gray-300 cursor-pointer transition-transform duration-200 active:scale-[0.98] text-left"
        >
          <div className="w-10 h-10 rounded-full bg-green-primary/10 flex items-center justify-center flex-shrink-0">
            <Receipt size={18} className="text-green-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-brand-black">Order History</p>
            <p className="text-[11px] text-brand-gray-500">Spending, points earned & redeemed</p>
          </div>
          <ChevronRight size={16} className="text-brand-gray-300" />
        </button>
      </section>

      {showQR && <QRModal onClose={() => setShowQR(false)} />}
    </div>
  )
}

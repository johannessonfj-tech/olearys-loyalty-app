import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, QrCode, Coins, Gift, Sun, PartyPopper, Heart, ChevronRight, Receipt } from 'lucide-react'
import { useTeams } from '../context/TeamsContext'

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

function CardBack() {
  const { getSelectedTeamObjects } = useTeams()
  const teams = getSelectedTeamObjects()

  return (
    <div className="h-full flex flex-col p-3.5 relative">
      {/* Header row */}
      <div className="flex items-start gap-2.5 mb-2">
        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-[#c4a87a]">
          <img src="/images/player-card-baseball.png" alt="Player card" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-bold text-[#c4382a] uppercase tracking-wider">O'Learys</p>
            <span className="bg-[#2d9b87] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm">47</span>
          </div>
          <p className="text-sm font-extrabold text-[#3c3c3c] leading-tight">Daniel Svantesson</p>
          <p className="text-[9px] text-[#8a7a5a] mt-0.5">Member since: 2024 &bull; Tier: All Star</p>
          <p className="text-[9px] text-[#8a7a5a]">Location: Norrköping &bull; Visits: 47</p>
        </div>
      </div>

      {/* Stats table */}
      <div className="border border-[#c4a87a] rounded-sm overflow-hidden mb-2">
        <div className="bg-[#2d9b87] px-2 py-1">
          <p className="text-[8px] font-bold text-white uppercase tracking-wider text-center">Season Performance Record</p>
        </div>
        <table className="w-full text-[8px] text-[#3c3c3c]">
          <thead>
            <tr className="bg-[#d4c49a]">
              <th className="py-0.5 px-1.5 text-left font-bold">YEAR</th>
              <th className="py-0.5 px-1 text-center font-bold">VIS</th>
              <th className="py-0.5 px-1 text-center font-bold">PTS</th>
              <th className="py-0.5 px-1 text-center font-bold">WINS</th>
              <th className="py-0.5 px-1 text-center font-bold">SPT</th>
              <th className="py-0.5 px-1 text-center font-bold">RDM</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[#d4c49a]">
              <td className="py-0.5 px-1.5 font-semibold">2024</td>
              <td className="py-0.5 px-1 text-center">23</td>
              <td className="py-0.5 px-1 text-center">24.1K</td>
              <td className="py-0.5 px-1 text-center">5</td>
              <td className="py-0.5 px-1 text-center">6.2K</td>
              <td className="py-0.5 px-1 text-center">2.1K</td>
            </tr>
            <tr className="border-t border-[#d4c49a] bg-[#f0e4c8]">
              <td className="py-0.5 px-1.5 font-semibold">2025</td>
              <td className="py-0.5 px-1 text-center">18</td>
              <td className="py-0.5 px-1 text-center">22.4K</td>
              <td className="py-0.5 px-1 text-center">5</td>
              <td className="py-0.5 px-1 text-center">4.8K</td>
              <td className="py-0.5 px-1 text-center">1.8K</td>
            </tr>
            <tr className="border-t border-[#c4a87a] bg-[#d4c49a]">
              <td className="py-0.5 px-1.5 font-bold">2026</td>
              <td className="py-0.5 px-1 text-center font-bold">6</td>
              <td className="py-0.5 px-1 text-center font-bold">11.7K</td>
              <td className="py-0.5 px-1 text-center font-bold">2</td>
              <td className="py-0.5 px-1 text-center font-bold">1.4K</td>
              <td className="py-0.5 px-1 text-center font-bold">420</td>
            </tr>
            <tr className="border-t border-[#c4a87a] bg-[#c4a87a]/30">
              <td className="py-0.5 px-1.5 font-extrabold">TOT</td>
              <td className="py-0.5 px-1 text-center font-extrabold">47</td>
              <td className="py-0.5 px-1 text-center font-extrabold">58.2K</td>
              <td className="py-0.5 px-1 text-center font-extrabold">12</td>
              <td className="py-0.5 px-1 text-center font-extrabold">12.4K</td>
              <td className="py-0.5 px-1 text-center font-extrabold">4.3K</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bio text */}
      <p className="text-[8px] text-[#6b5d45] leading-relaxed italic">
        A dedicated All Star member known for his competitive spirit in bowling and trivia nights.
        Daniel has been a regular at O'Learys Norrköping since 2024, earning his way up from Starter tier.
        His impressive 58K point total and 12 game wins make him one of the top performers in the region.
      </p>

      {/* My Teams */}
      {teams.length > 0 && (
        <div className="mt-1.5">
          <p className="text-[7px] font-bold text-[#8a7a5a] uppercase tracking-wider mb-1">Supports</p>
          <div className="flex items-center gap-2 flex-wrap">
            {teams.map((team) => (
              <div key={team.id} className="flex items-center gap-1 bg-[#d4c49a]/50 rounded-sm px-1.5 py-0.5">
                <img src={team.logo} alt={team.name} className="w-3 h-3 object-contain" onError={(e) => { e.target.style.display = 'none' }} />
                <span className="text-[7px] font-semibold text-[#3c3c3c]">{team.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between pt-1.5">
        <p className="text-[7px] text-[#8a7a5a] font-semibold">O'LEARYS LOYALTY &bull; NORRKÖPING</p>
        <p className="text-[7px] text-[#b0a080]">Tap to flip back</p>
      </div>
    </div>
  )
}

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
  const [showCardModal, setShowCardModal] = useState(false)
  const navigate = useNavigate()
  const { getSelectedTeamObjects } = useTeams()
  const teams = getSelectedTeamObjects()

  return (
    <div className="px-4 pt-10 pb-4">
      {/* Loyalty Card — flippable */}
      <div
        className="cursor-pointer"
        style={{ perspective: 1000 }}
        onClick={() => {
          if (!flipped) {
            setFlipped(true)
            setTimeout(() => setShowCardModal(true), 350)
          } else {
            setFlipped(false)
          }
        }}
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

          {/* Back — vintage Topps baseball card */}
          <div
            className="rounded-2xl absolute inset-0 overflow-hidden"
            style={{
              background: '#e8d5b0',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <CardBack />
          </div>
        </div>
      </div>
      {!flipped && (
        <p className="text-[10px] text-brand-gray-500 text-center mt-1.5">Tap card to flip</p>
      )}

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

      {/* Enlarged card back modal — same as inline, just bigger */}
      {showCardModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ maxWidth: 390, margin: '0 auto' }}
          onClick={() => {
            setShowCardModal(false)
            setFlipped(false)
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative rounded-2xl overflow-hidden mx-3 w-full shadow-2xl"
            style={{
              background: '#e8d5b0',
              animation: 'cardPopIn 300ms ease-out',
              transform: 'scale(1.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              @keyframes cardPopIn {
                from { transform: scale(0.7); opacity: 0; }
                to { transform: scale(1.1); opacity: 1; }
              }
            `}</style>
            <div className="flex flex-col p-5 relative">
              {/* Header row */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 border border-[#c4a87a]">
                  <img src="/images/player-card-baseball.png" alt="Player card" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-[#c4382a] uppercase tracking-wider">O'Learys</p>
                    <span className="bg-[#2d9b87] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm">47</span>
                  </div>
                  <p className="text-lg font-extrabold text-[#3c3c3c] leading-tight mt-0.5">Daniel Svantesson</p>
                  <p className="text-[10px] text-[#8a7a5a] mt-0.5">Member since: 2024 &bull; Tier: All Star</p>
                  <p className="text-[10px] text-[#8a7a5a]">Location: Norrköping &bull; Visits: 47</p>
                </div>
              </div>

              {/* Bio text */}
              <p className="text-xs text-[#6b5d45] leading-relaxed italic mb-3">
                A dedicated All Star member known for his competitive spirit in bowling and trivia nights.
                Daniel has been a regular at O'Learys Norrköping since 2024, earning his way up from Starter tier.
                His impressive 58K point total and 12 game wins make him one of the top performers in the region.
              </p>

              {/* My Teams */}
              {teams.length > 0 && (
                <div className="mb-3">
                  <p className="text-[9px] font-bold text-[#8a7a5a] uppercase tracking-wider mb-1.5">Supports</p>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {teams.map((team) => (
                      <div key={team.id} className="flex items-center gap-1.5 bg-[#d4c49a]/50 rounded-sm px-2 py-1">
                        <img src={team.logo} alt={team.name} className="w-4 h-4 object-contain" onError={(e) => { e.target.style.display = 'none' }} />
                        <span className="text-[9px] font-semibold text-[#3c3c3c]">{team.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-1">
                <p className="text-[8px] text-[#8a7a5a] font-semibold">O'LEARYS LOYALTY &bull; NORRKÖPING</p>
                <p className="text-[8px] text-[#b0a080]">Tap outside to close</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

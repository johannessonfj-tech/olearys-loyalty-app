import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Calendar, Sun, Heart, Gift, Check, Send, Copy } from 'lucide-react'

/* ── Pass data ── */
const PASS_DATA = {
  'summer-card': {
    title: 'Summer Card',
    subtitle: 'Your all-access pass to the best summer ever',
    price: 499,
    value: '2 000+',
    gradient: 'linear-gradient(135deg, #ff9a3c 0%, #ff6b2b 50%, #e84545 100%)',
    icon: 'sun',
    badge: 'Best Value',
    validity: 'Valid 1 Jun – 31 Aug 2026',
    includes: [
      'Unlimited bowling (Mon–Thu)',
      '20% off food & non-alcoholic beverages',
      'Earn 2x Bonus Points on all purchases',
      '2 free game sessions per week (shuffleboard, darts)',
      'Free birthday dessert during validity',
      'Priority booking for events',
    ],
    terms: [
      'Valid at all O\'Learys locations in Sweden',
      'Not valid on public holidays',
      'Card is personal and non-transferable',
      'Valid for 90 days from date of purchase',
    ],
  },
  'family-card': {
    title: 'Family Card',
    subtitle: 'Fun for the whole family — up to 2 adults + 3 kids',
    price: 349,
    value: '1 200+',
    gradient: 'linear-gradient(135deg, #2d9b87 0%, #23695a 100%)',
    icon: 'heart',
    badge: null,
    validity: 'Valid for 60 days from purchase',
    includes: [
      'Unlimited bowling for the family (Mon–Fri)',
      '15% off food & non-alcoholic beverages',
      'Earn 1.5x Bonus Points on all purchases',
      '1 free kids meal per visit (under 12)',
      'Free game session per week',
    ],
    terms: [
      'Valid at all O\'Learys locations in Sweden',
      'Family = max 2 adults + 3 children (under 16)',
      'Card is non-transferable',
      'Valid for 60 days from date of purchase',
    ],
  },
}

/* ── Gift card data ── */
const GIFT_DATA = {
  'bday-1': { title: 'Happy Birthday', color: '#ffdc1e', textColor: '#3c3c3c', category: 'Birthday' },
  'bday-2': { title: 'Party Time', color: '#ff6b2b', textColor: '#fff', category: 'Birthday' },
  'ty-1': { title: 'Thank You', color: '#2d9b87', textColor: '#fff', category: 'Thank You' },
  'ty-2': { title: 'You\'re the Best', color: '#23695a', textColor: '#fff', category: 'Thank You' },
  'gen-1': { title: 'Treat Yourself', color: '#3c3c3c', textColor: '#fff', category: 'Just Because' },
  'gen-2': { title: 'Enjoy!', color: '#6366f1', textColor: '#fff', category: 'Just Because' },
}

/* ── Voucher data ── */
const VOUCHER_DATA = {
  1: {
    title: '25 kr off',
    label: '25 KR OFF',
    desc: 'This voucher gives you 25 kr off your next purchase at any O\'Learys location. Valid on food, drinks and activities.',
    color: '#2d9b87',
    textWhite: true,
    expires: '31/MAR/2026',
    items: 1,
    itemLabel: 'Valid for 1 discount of 25 kr on any purchase',
  },
  2: {
    title: 'Free Chicken Wings',
    label: 'CHICKEN WINGS',
    desc: 'Happy Birthday! This voucher is valid for a free portion of chicken wings at any O\'Learys location. Enjoy your birthday treat!',
    color: '#23695a',
    textWhite: true,
    expires: '15/APR/2026',
    items: 1,
    itemLabel: 'Valid for 1 free portion of chicken wings',
    birthday: true,
  },
}

const ALL_VOUCHERS = [
  { id: 1, title: '25 kr off', sub: 'Valid until 31 Mar 2026', dark: false },
  { id: 2, title: 'Free Chicken Wings', sub: 'Birthday treat', dark: true, birthday: true },
  { id: 3, title: '10% off your bill', sub: 'Valid until 15 Apr 2026', dark: true },
  { id: 4, title: 'Free Nachos', sub: 'Valid until 30 Apr 2026', dark: false },
  { id: 5, title: 'Free Beer', sub: 'Valid until 31 May 2026', dark: false },
  { id: 6, title: '50 kr off bowling', sub: 'Valid until 30 Jun 2026', dark: true },
]

const GIFT_AMOUNTS = [100, 200, 500, 1000]

function CardIcon({ name, size = 20, className = '' }) {
  const props = { size, className }
  switch (name) {
    case 'sun': return <Sun {...props} />
    case 'heart': return <Heart {...props} />
    default: return <Gift {...props} />
  }
}

/* ── Voucher detail (matches JOE card detail screenshot) ── */
function VoucherDetail({ data }) {
  const txtColor = data.textWhite ? '#fff' : '#3c3c3c'
  const subColor = data.textWhite ? 'rgba(255,255,255,0.6)' : 'rgba(60,60,60,0.5)'

  return (
    <div className="px-5 pt-2 pb-4">
      <h2 className="text-lg font-bold text-brand-black mb-2">{data.title}</h2>
      <p className="text-sm text-brand-gray-500 leading-relaxed mb-5">{data.desc}</p>

      {/* Card visual */}
      <div
        className="rounded-2xl relative overflow-hidden mx-auto mb-4"
        style={{ background: data.color, width: '100%', aspectRatio: '1.5' }}
      >
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10" />
        <div className="absolute right-10 bottom-6 w-16 h-16 rounded-full bg-white/10" />

        {/* Expiry badge */}
        <div className="absolute top-4 right-5 text-right">
          <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: subColor }}>Expires</p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: txtColor, opacity: 0.6 }} />
            <p className="text-xs font-bold" style={{ color: txtColor }}>{data.expires}</p>
          </div>
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 flex items-end justify-between">
          <div>
            <p className="font-bold text-xl leading-tight" style={{ color: txtColor }}>{data.label}</p>
            <p className="text-[10px] mt-0.5 leading-snug" style={{ color: subColor }}>{data.itemLabel}</p>
          </div>
          <p className="text-sm font-bold" style={{ color: subColor }}>{data.items} item</p>
        </div>
      </div>

      {/* Scan instruction */}
      <div className="flex items-center justify-center gap-2 my-5">
        <p className="text-sm text-brand-black">To use your cards, Scan to Pay or Pre-Order!</p>
        <Copy size={16} className="text-brand-gray-500" />
      </div>

      {/* Card information */}
      <button className="w-full py-3.5 rounded-xl text-sm font-semibold text-brand-black border border-brand-gray-300 cursor-pointer transition-transform duration-200 active:scale-[0.97]">
        Card information
      </button>
    </div>
  )
}

/* ── All Vouchers grid (like AllDeals) ── */
function AllVouchers() {
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-2 pb-4">
      <div className="grid grid-cols-2 gap-3">
        {ALL_VOUCHERS.map((v) => (
          <button
            key={v.id}
            onClick={() => navigate(`/wallet/voucher/${v.id}`)}
            className={`rounded-xl p-4 text-left cursor-pointer transition-transform duration-200 active:scale-[0.97] ${v.dark ? 'bg-green-dark' : 'bg-green-primary'}`}
            style={{ height: 110 }}
          >
            <p className="text-white font-bold text-sm leading-tight">{v.title}</p>
            <p className="text-white/70 text-[10px] mt-1 leading-snug">{v.sub}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Pass detail ── */
function PassDetail({ data }) {
  const [purchased, setPurchased] = useState(false)
  const [showSend, setShowSend] = useState(false)

  if (purchased) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green-primary flex items-center justify-center mb-4">
          <Check size={28} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-brand-black mb-2">Card Purchased!</h2>
        <p className="text-sm text-brand-gray-500 mb-1">Your {data.title} is now active.</p>
        <p className="text-xs text-brand-gray-500 mb-6">{data.validity}</p>

        <div className="w-full rounded-2xl p-5 relative overflow-hidden" style={{ background: data.gradient }}>
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
          <div className="flex items-center gap-2 mb-1">
            <CardIcon name={data.icon} size={18} className="text-white/80" />
            <h3 className="text-white text-lg font-bold">{data.title}</h3>
          </div>
          <p className="text-white/70 text-xs mb-3">{data.validity}</p>
          <p className="text-white/60 text-[10px] uppercase tracking-wider">Cardholder</p>
          <p className="text-white font-bold text-sm">Daniel Svantesson</p>
        </div>

        <p className="text-xs text-brand-gray-500 mt-6">
          You can find your card in the Wallet tab at any time.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: data.gradient }}>
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute right-12 bottom-0 w-24 h-24 rounded-full bg-white/10" />
        <div className="relative px-5 pt-6 pb-8">
          {data.badge && (
            <span className="inline-block bg-white text-xs font-bold px-2.5 py-0.5 rounded-full text-brand-black mb-3">
              {data.badge}
            </span>
          )}
          <div className="flex items-center gap-2 mb-2">
            <CardIcon name={data.icon} size={22} className="text-white/80" />
            <h1 className="text-white text-2xl font-bold">{data.title}</h1>
          </div>
          <p className="text-white/70 text-sm">{data.subtitle}</p>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-white text-3xl font-bold">{data.price} kr</span>
            <span className="text-white/50 text-sm line-through mb-0.5">{data.value} kr</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 pb-4">
        <p className="text-xs text-brand-gray-500 mb-5">{data.validity}</p>

        <h2 className="text-base font-bold text-brand-black mb-3">What's included</h2>
        <div className="flex flex-col gap-2.5 mb-6">
          {data.includes.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-green-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={12} className="text-green-primary" />
              </div>
              <p className="text-sm text-brand-black">{item}</p>
            </div>
          ))}
        </div>

        <h2 className="text-sm font-bold text-brand-black mb-2">Terms & conditions</h2>
        <ul className="mb-6">
          {data.terms.map((term, i) => (
            <li key={i} className="text-xs text-brand-gray-500 mb-1 flex items-start gap-2">
              <span className="text-brand-gray-300 mt-0.5">•</span>
              {term}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setPurchased(true)}
          className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-green-primary cursor-pointer transition-transform duration-200 active:scale-[0.97]"
        >
          Buy for {data.price} kr
        </button>

        {/* Send to a friend */}
        <button
          onClick={() => setShowSend(!showSend)}
          className="w-full mt-3 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-green-primary border border-green-primary cursor-pointer transition-transform duration-200 active:scale-[0.97]"
        >
          <Send size={14} />
          Send to a friend
        </button>

        {showSend && (
          <div className="mt-4 border border-brand-gray-300 rounded-2xl p-4">
            <p className="text-sm text-brand-gray-500 mb-2">Recipient email</p>
            <input
              type="email"
              className="w-full border border-brand-gray-300 rounded-xl px-3 py-2.5 text-sm text-brand-black focus:outline-none focus:border-green-primary transition-colors mb-3"
              placeholder="friend@email.com"
            />
            <p className="text-sm text-brand-gray-500 mb-2">Message (optional)</p>
            <textarea
              className="w-full border border-brand-gray-300 rounded-xl p-3 text-sm text-brand-black resize-none focus:outline-none focus:border-green-primary transition-colors"
              rows={2}
              placeholder="Enjoy your card!"
            />
            <button className="w-full mt-3 py-3 rounded-xl text-sm font-semibold text-white bg-green-primary cursor-pointer transition-transform duration-200 active:scale-[0.97]">
              Send {data.title} — {data.price} kr
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Gift card detail ── */
function GiftDetail({ data }) {
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [purchased, setPurchased] = useState(false)
  const [showSend, setShowSend] = useState(false)

  if (purchased) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green-primary flex items-center justify-center mb-4">
          <Check size={28} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-brand-black mb-2">Gift Card {showSend ? 'Sent' : 'Purchased'}!</h2>
        <p className="text-sm text-brand-gray-500 mb-6">
          Your "{data.title}" gift card of {selectedAmount} kr has been created.
        </p>
        <div
          className="w-48 h-28 rounded-xl relative overflow-hidden flex flex-col justify-end p-4"
          style={{ background: data.color }}
        >
          <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-white/15" />
          <p className="font-bold text-sm" style={{ color: data.textColor }}>{data.title}</p>
          <p className="text-xs font-bold mt-0.5" style={{ color: data.textColor, opacity: 0.8 }}>{selectedAmount} kr</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 pt-2 pb-4">
      <div className="flex justify-center mb-6">
        <div
          className="w-56 h-32 rounded-2xl relative overflow-hidden flex flex-col justify-end p-5"
          style={{ background: data.color }}
        >
          <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-white/15" />
          <div className="absolute right-8 bottom-4 w-12 h-12 rounded-full bg-white/10" />
          <p className="relative font-bold text-lg" style={{ color: data.textColor }}>{data.title}</p>
          <p className="relative text-xs mt-0.5 opacity-60" style={{ color: data.textColor }}>O'Learys Gift Card</p>
        </div>
      </div>

      <p className="text-xs text-brand-gray-500 text-center mb-1">{data.category}</p>
      <h2 className="text-lg font-bold text-brand-black text-center mb-5">{data.title}</h2>

      <p className="text-sm text-brand-gray-500 mb-3">Choose an amount (SEK)</p>
      <div className="grid grid-cols-4 gap-2 mb-5">
        {GIFT_AMOUNTS.map((a) => (
          <button
            key={a}
            onClick={() => setSelectedAmount(a)}
            className={`py-2.5 rounded-lg text-sm font-semibold border cursor-pointer transition-colors duration-200 ${
              selectedAmount === a
                ? 'border-green-primary bg-green-primary text-white'
                : 'border-brand-gray-300 bg-white text-brand-black'
            }`}
            aria-pressed={selectedAmount === a}
          >
            {a}
          </button>
        ))}
      </div>

      <button
        onClick={() => selectedAmount && setPurchased(true)}
        className={`w-full py-3.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 active:scale-[0.97] ${
          selectedAmount
            ? 'bg-green-primary text-white'
            : 'bg-brand-gray-300 text-brand-gray-500'
        }`}
        disabled={!selectedAmount}
      >
        {selectedAmount ? `Buy ${selectedAmount} kr Gift Card` : 'Select an amount'}
      </button>

      {/* Send to a friend */}
      <button
        onClick={() => setShowSend(!showSend)}
        className="w-full mt-3 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-green-primary border border-green-primary cursor-pointer transition-transform duration-200 active:scale-[0.97]"
      >
        <Send size={14} />
        Send to a friend
      </button>

      {showSend && (
        <div className="mt-4 border border-brand-gray-300 rounded-2xl p-4">
          <p className="text-sm text-brand-gray-500 mb-2">Recipient email</p>
          <input
            type="email"
            className="w-full border border-brand-gray-300 rounded-xl px-3 py-2.5 text-sm text-brand-black focus:outline-none focus:border-green-primary transition-colors mb-3"
            placeholder="friend@email.com"
          />
          <p className="text-sm text-brand-gray-500 mb-2">Message (optional)</p>
          <textarea
            className="w-full border border-brand-gray-300 rounded-xl p-3 text-sm text-brand-black resize-none focus:outline-none focus:border-green-primary transition-colors"
            rows={2}
            placeholder="Enjoy your gift card!"
          />
          <button
            onClick={() => selectedAmount && setPurchased(true)}
            className={`w-full mt-3 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 active:scale-[0.97] ${
              selectedAmount ? 'bg-green-primary text-white' : 'bg-brand-gray-300 text-brand-gray-500'
            }`}
            disabled={!selectedAmount}
          >
            {selectedAmount ? `Send ${selectedAmount} kr Gift Card` : 'Select an amount first'}
          </button>
        </div>
      )}

      <p className="text-[10px] text-brand-gray-500 text-center mt-3">
        Gift cards are valid for 12 months from purchase. Non-refundable.
      </p>
    </div>
  )
}

export default function WalletCardDetail() {
  const { type, id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const isVoucherList = location.pathname === '/wallet/vouchers'
  const isVoucher = type === 'voucher'
  const isCard = type === 'card'
  const isGift = type === 'gift'

  const voucherData = isVoucher ? VOUCHER_DATA[id] : null
  const passData = isCard ? PASS_DATA[id] : null
  const giftData = isGift ? GIFT_DATA[id] : null

  if (!voucherData && !passData && !giftData && !isVoucherList) {
    return (
      <div className="px-5 pt-14 text-center">
        <p className="text-brand-gray-500">Card not found</p>
      </div>
    )
  }

  const title = isVoucherList
    ? 'My Vouchers'
    : isVoucher
    ? 'Card Details'
    : isCard
    ? passData.title
    : giftData.title

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-10 pb-3">
        <button
          onClick={() => navigate('/wallet')}
          className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-sm font-bold text-brand-black uppercase tracking-wider">{title}</h1>
        {isVoucher ? (
          <div className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center">
            <Calendar size={16} className="text-brand-gray-500" />
          </div>
        ) : (
          <div className="w-9" />
        )}
      </div>

      {isVoucherList && <AllVouchers />}
      {isVoucher && voucherData && <VoucherDetail data={voucherData} />}
      {isCard && passData && <PassDetail data={passData} />}
      {isGift && giftData && <GiftDetail data={giftData} />}
    </div>
  )
}

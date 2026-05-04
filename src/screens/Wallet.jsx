import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowDown,
  ArrowUp,
  ChevronRight,
  CreditCard,
  Gamepad2,
  Gift,
  Pizza,
  Plus,
  QrCode,
  Settings as SettingsIcon,
  Sparkles,
  Sun,
  Trophy,
  X,
} from 'lucide-react'
import BuyCards from './BuyCards'

const POINTS = 58231
const MEMBER_NUMBER = '8821 4427 0093'

const TIERS = [
  { name: 'Regular', min: 0, perks: ['Member QR', 'Birthday treat'] },
  { name: 'Starter', min: 10000, perks: ['+10% points on visits', 'Free soft drink monthly'] },
  { name: 'All Star', min: 30000, perks: ['Free starter every visit', '2 free arcade games / month', 'Priority booking'] },
  { name: 'MVP', min: 70000, perks: ['Free main course monthly', 'Squad arcade hour', 'Early access to events'] },
]

const VOUCHERS = [
  { id: 'v1', icon: 'pizza', title: 'Free starter', sub: 'All Star perk', expires: '30 Apr' },
  { id: 'v2', icon: 'gift', title: 'Birthday treat', sub: 'Any main course on us', expires: '04 Jun' },
  { id: 'v3', icon: 'gamepad', title: '2 free arcade games', sub: 'Squad reward', expires: '12 May' },
  { id: 'v4', icon: 'gift', title: 'Free dessert', sub: 'Visit reward', expires: '18 May' },
  { id: 'v5', icon: 'pizza', title: 'Buy 1 get 1 pizza', sub: 'Tuesday treat', expires: '07 Jul' },
]

const CARDS = [
  { id: 'gc1', label: 'Gift card', balance: '250 kr', code: 'OL-7K2P-9M4Q', tone: 'black' },
  {
    id: 'vip-nightclub',
    label: 'VIP · Nightclub',
    balance: 'Free entries',
    sub: 'Jun – Aug',
    code: 'OL-VIP-NC26',
    tone: 'yellow',
    kind: 'vip',
  },
]

const REDEEM_ITEMS = [
  { id: 'bowling', title: 'Bowling', pts: 800, image: '/images/redeem-bowling.png' },
  { id: 'softdrink', title: 'Soft Drink', pts: 400, image: '/images/redeem-softdrink.png' },
  { id: 'shuffleboard', title: 'Shuffleboard', pts: 800, image: '/images/redeem-shuffleboard.png' },
  { id: 'wings', title: 'Wings', pts: 1200, image: '/images/redeem-wings.png' },
]

const ACTIVITY = [
  { id: 'a1', kind: 'earn', title: 'Visit · Norrköping', sub: 'Tue · 24 Apr', expires: 'Expires 24 Apr 2027', delta: '+420' },
  { id: 'a2', kind: 'spend', title: 'Redeemed · Soft drink', sub: 'Sat · 20 Apr', delta: '−500' },
  { id: 'a3', kind: 'earn', title: 'Squad arcade reward', sub: 'Tue · 24 Apr', expires: 'Expires 24 Apr 2027', delta: '+1 000' },
  { id: 'a4', kind: 'earn', title: 'Visit · Östermalm', sub: 'Wed · 17 Apr', expires: 'Expires 17 Apr 2027', delta: '+285' },
]

function formatPoints(n) {
  return n.toLocaleString('sv-SE').replace(/,/g, ' ')
}

function VoucherIcon({ name, size = 20, className = '' }) {
  switch (name) {
    case 'pizza': return <Pizza size={size} className={className} />
    case 'gamepad': return <Gamepad2 size={size} className={className} />
    case 'gift':
    default: return <Gift size={size} className={className} />
  }
}

function MemberQR({ size = 200 }) {
  const cells = 21
  return (
    <div className="bg-white rounded-2xl p-4 inline-block">
      <div
        className="grid gap-[1px]"
        style={{ gridTemplateColumns: `repeat(${cells}, 1fr)`, width: size, height: size }}
      >
        {Array.from({ length: cells * cells }).map((_, i) => {
          const r = Math.floor(i / cells)
          const c = i % cells
          const isCorner = (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7)
          const seed = (r * 31 + c * 17) % 7
          const on = isCorner
            ? r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)
            : seed < 3
          return <div key={i} className={on ? 'bg-brand-black' : 'bg-white'} />
        })}
      </div>
    </div>
  )
}

function Sheet({ children, onClose }) {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ maxWidth: 430, margin: '0 auto' }} onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-full bg-white rounded-t-[28px] max-h-[85%] overflow-y-auto"
        style={{ animation: 'sheetpop 320ms cubic-bezier(0.2, 0.9, 0.3, 1.05)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes sheetpop {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>
        {children}
      </div>
    </div>
  )
}

function SheetHeader({ title, onClose }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <p className="text-base font-semibold text-brand-black">{title}</p>
      <button
        onClick={onClose}
        className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer"
        aria-label="Close"
      >
        <X size={18} />
      </button>
    </div>
  )
}

function QRSheet({ onClose }) {
  return (
    <Sheet onClose={onClose}>
      <div className="px-6 pt-5 pb-8">
        <SheetHeader title="Member QR" onClose={onClose} />
        <div className="rounded-3xl bg-brand-black p-6 text-center">
          <MemberQR size={200} />
          <p className="text-white/80 text-[13px] mt-4 tabular-nums tracking-widest">{MEMBER_NUMBER}</p>
          <p className="text-white/50 text-[11px] mt-1">Member since 2024</p>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-brand-gray-600">
          <Sun size={14} /> Brightness raised for scanning
        </div>
      </div>
    </Sheet>
  )
}

function VoucherSheet({ voucher, onClose }) {
  return (
    <Sheet onClose={onClose}>
      <div className="px-6 pt-5 pb-8">
        <SheetHeader title="Voucher" onClose={onClose} />
        <div className="rounded-3xl p-6 text-center bg-green-primary text-white">
          <div className="w-14 h-14 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-3">
            <VoucherIcon name={voucher.icon} size={26} className="text-white" />
          </div>
          <p className="text-xl font-bold leading-tight">{voucher.title}</p>
          {voucher.sub && <p className="text-[13px] opacity-90 mt-1">{voucher.sub}</p>}
        </div>
        <div className="mt-5 rounded-2xl bg-brand-gray-100 p-5 text-center">
          <p className="text-[11px] uppercase tracking-[0.14em] text-brand-gray-600 font-semibold mb-3">Show to staff</p>
          <MemberQR size={160} />
          <p className="text-[12.5px] text-brand-gray-700 mt-3 tabular-nums tracking-widest">{MEMBER_NUMBER}</p>
          {voucher.expires && <p className="text-xs text-brand-gray-500 mt-1.5">Expires {voucher.expires}</p>}
        </div>
      </div>
    </Sheet>
  )
}

function GiftCardSheet({ card, onClose }) {
  const dark = card.tone === 'black'
  const isVip = card.kind === 'vip'
  const Icon = isVip ? Sparkles : CreditCard
  const valueLabel = isVip ? 'Validity' : 'Balance'
  const valueSize = isVip ? 'text-[24px]' : 'text-[32px]'
  return (
    <Sheet onClose={onClose}>
      <div className="px-6 pt-5 pb-8">
        <SheetHeader title={card.label} onClose={onClose} />
        <div className={`rounded-3xl p-6 ${dark ? 'bg-brand-black text-white' : 'bg-brand-yellow text-brand-black'}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-xs uppercase tracking-[0.14em] font-semibold ${dark ? 'text-white/60' : 'text-brand-black/60'}`}>
                {valueLabel}
              </p>
              <p className={`mt-1 ${valueSize} font-bold leading-none`}>{card.balance}</p>
              {card.sub && (
                <p className={`mt-1 text-sm font-medium ${dark ? 'text-white/80' : 'text-brand-black/70'}`}>
                  {card.sub}
                </p>
              )}
            </div>
            <Icon size={26} className={dark ? 'text-white/70' : 'text-brand-black/70'} />
          </div>
          <p className={`mt-6 text-xs tabular-nums tracking-widest ${dark ? 'text-white/70' : 'text-brand-black/70'}`}>
            {card.code}
          </p>
        </div>
        <div className="mt-5 rounded-2xl bg-brand-gray-100 p-5 text-center">
          <p className="text-[11px] uppercase tracking-[0.14em] text-brand-gray-600 font-semibold mb-3">Show to staff</p>
          <MemberQR size={160} />
          <p className="text-[12.5px] text-brand-gray-700 mt-3 tabular-nums tracking-widest">{MEMBER_NUMBER}</p>
          <p className="text-xs text-brand-gray-500 mt-1.5">Linked to your member QR</p>
        </div>
      </div>
    </Sheet>
  )
}

function ActivitySheet({ onClose, onViewAll }) {
  return (
    <Sheet onClose={onClose}>
      <div className="px-6 pt-5 pb-8">
        <SheetHeader title="Activity" onClose={onClose} />
        <div className="divide-y divide-brand-gray-200">
          {ACTIVITY.map((a) => (
            <div key={a.id} className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    a.kind === 'earn' ? 'bg-green-primary/10 text-green-primary' : 'bg-brand-gray-100 text-brand-gray-700'
                  }`}
                >
                  {a.kind === 'earn' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-brand-black truncate">{a.title}</p>
                  <p className="text-xs text-brand-gray-500">
                    {a.sub}
                    {a.expires && <span className="text-brand-gray-400"> · {a.expires}</span>}
                  </p>
                </div>
              </div>
              <p
                className={`text-sm font-semibold tabular-nums ${
                  a.kind === 'earn' ? 'text-green-primary' : 'text-brand-gray-700'
                }`}
              >
                {a.delta}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={onViewAll}
          className="mt-5 w-full py-3.5 rounded-2xl border border-brand-gray-300 text-sm font-semibold text-brand-black cursor-pointer active:scale-[0.99] transition-transform"
        >
          View full order history
        </button>
      </div>
    </Sheet>
  )
}

function TierSheet({ onClose }) {
  return (
    <Sheet onClose={onClose}>
      <div className="px-6 pt-5 pb-8">
        <SheetHeader title="Tiers & perks" onClose={onClose} />
        <p className="text-[12.5px] text-brand-gray-600 mb-4 -mt-2">
          Points reset 12 months after they're earned. Tier is based on points earned in the last 12 months.
        </p>
        <div className="space-y-2.5">
          {TIERS.map((t, i) => {
            const isCurrent = POINTS >= t.min && (i === TIERS.length - 1 || POINTS < TIERS[i + 1].min)
            const reached = POINTS >= t.min
            const next = TIERS[i + 1]
            const toGo = next ? next.min - POINTS : 0
            return (
              <div
                key={t.name}
                className={`rounded-2xl p-4 ${
                  isCurrent ? 'bg-brand-yellow' : reached ? 'bg-brand-gray-100' : 'bg-white border border-brand-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className={reached ? 'text-brand-black' : 'text-brand-gray-400'} />
                    <p className="text-[15px] font-semibold text-brand-black">{t.name}</p>
                  </div>
                  {isCurrent ? (
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-black">You</span>
                  ) : (
                    <span className="text-xs text-brand-gray-700 tabular-nums">{formatPoints(t.min)} pts</span>
                  )}
                </div>
                {isCurrent && next && (
                  <p className="mt-2 text-[12.5px] text-brand-black/80">
                    {formatPoints(toGo)} pts to <span className="font-semibold">{next.name}</span>
                  </p>
                )}
                <ul className="mt-2.5 space-y-1">
                  {t.perks.map((p) => (
                    <li
                      key={p}
                      className={`text-[12.5px] flex items-start gap-1.5 ${
                        reached ? 'text-brand-black/85' : 'text-brand-gray-600'
                      }`}
                    >
                      <span
                        className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${
                          reached ? 'bg-brand-black/60' : 'bg-brand-gray-400'
                        }`}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </Sheet>
  )
}

function AllVouchersSheet({ vouchers, onClose, onPick }) {
  const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }
  const parse = (s) => {
    const [d, m] = s.split(' ')
    return new Date(2026, months[m] ?? 0, parseInt(d, 10))
  }
  const sorted = [...vouchers].sort((a, b) => parse(a.expires) - parse(b.expires))
  return (
    <Sheet onClose={onClose}>
      <div className="px-5 pt-5 pb-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <p className="text-base font-semibold text-brand-black">All vouchers</p>
            <p className="text-xs text-brand-gray-500 mt-0.5">{vouchers.length} active · sorted by expiry</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-2.5">
          {sorted.map((v) => (
            <VoucherTicket key={v.id} voucher={v} onTap={() => onPick(v)} />
          ))}
        </div>
      </div>
    </Sheet>
  )
}

function VoucherTicket({ voucher, onTap }) {
  return (
    <button
      onClick={onTap}
      className="relative w-full text-left active:scale-[0.99] transition-transform cursor-pointer"
    >
      <div className="flex bg-white rounded-2xl overflow-hidden">
        <div className="w-[52px] flex-shrink-0 bg-green-primary text-white flex items-center justify-center">
          <VoucherIcon name={voucher.icon} size={20} />
        </div>
        <div className="relative w-0">
          <span
            className="absolute left-1/2 -translate-x-1/2 -top-[10px] w-5 h-5 rounded-full bg-brand-gray-50"
            aria-hidden="true"
          />
          <span
            className="absolute left-1/2 -translate-x-1/2 -bottom-[10px] w-5 h-5 rounded-full bg-brand-gray-50"
            aria-hidden="true"
          />
          <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 border-l border-dashed border-brand-gray-300" />
        </div>
        <div className="flex-1 py-2.5 pl-3.5 pr-3 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-brand-black leading-tight truncate">{voucher.title}</p>
            {voucher.sub && (
              <p className="text-[11.5px] text-brand-gray-500 leading-tight truncate mt-0.5">{voucher.sub}</p>
            )}
          </div>
          {voucher.expires && (
            <p className="text-[11px] text-brand-gray-500 tabular-nums flex-shrink-0">{voucher.expires}</p>
          )}
          <ChevronRight size={16} className="text-brand-gray-400 flex-shrink-0" />
        </div>
      </div>
    </button>
  )
}

function PointsCard({ onTier, onActivity }) {
  const next = TIERS.find((t) => t.min > POINTS)
  const toGo = next ? next.min - POINTS : 0
  const prevMin = next ? TIERS[TIERS.indexOf(next) - 1]?.min ?? 0 : POINTS
  const pct = next ? Math.round(((POINTS - prevMin) / (next.min - prevMin)) * 100) : 100
  return (
    <div className="px-1 pt-2 pb-1">
      <div className="relative rounded-3xl bg-brand-black text-white p-5 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-brand-yellow/15 blur-3xl pointer-events-none" />
        <div className="relative flex items-baseline justify-between gap-3">
          <button onClick={onActivity} className="text-left active:opacity-80 transition cursor-pointer">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/60 font-semibold flex items-center gap-1">
              Bonus Points <ChevronRight size={11} className="text-white/50" />
            </p>
            <p className="mt-1.5 text-[44px] leading-none font-semibold tabular-nums">{formatPoints(POINTS)}</p>
          </button>
          <button
            onClick={onTier}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-yellow text-brand-black text-[13px] font-semibold cursor-pointer flex-shrink-0"
          >
            <Trophy size={14} /> All Star
          </button>
        </div>
        <div className="relative mt-5">
          <button onClick={onTier} className="w-full text-left active:opacity-80 transition cursor-pointer">
            <div className="flex items-center justify-between text-[11px] text-white/60 mb-1.5">
              <span className="flex items-center gap-1">
                Progress to {next ? next.name : 'top tier'} <ChevronRight size={11} className="text-white/50" />
              </span>
              {next && <span className="tabular-nums text-white/80">{formatPoints(toGo)} to go</span>}
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-brand-yellow" style={{ width: `${pct}%` }} />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

function MemberQRRow({ onTap }) {
  return (
    <button
      onClick={onTap}
      className="w-full rounded-3xl bg-green-primary text-white p-4 flex items-center gap-4 active:scale-[0.99] transition-transform overflow-hidden relative cursor-pointer"
    >
      <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-brand-yellow/10 blur-2xl pointer-events-none" />
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

function SectionHeader({ title, action, onAction }) {
  return (
    <div className="mt-8 mb-3 flex items-end justify-between">
      <h2 className="text-xs uppercase tracking-[0.16em] font-semibold text-brand-gray-500">{title}</h2>
      {action &&
        (onAction ? (
          <button
            onClick={onAction}
            className="text-xs font-medium text-brand-gray-700 underline-offset-2 hover:underline cursor-pointer"
          >
            {action}
          </button>
        ) : (
          <span className="text-xs font-medium text-brand-gray-500">{action}</span>
        ))}
    </div>
  )
}

function LoyaltyCard({ card, onTap }) {
  const dark = card.tone === 'black'
  const isVip = card.kind === 'vip'
  const Icon = isVip ? Sparkles : CreditCard
  return (
    <button
      onClick={onTap}
      className={`relative w-full text-left p-4 rounded-3xl active:scale-[0.99] transition-transform cursor-pointer ${
        dark ? 'bg-brand-black text-white' : 'bg-brand-yellow text-brand-black'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p
            className={`text-xs uppercase tracking-[0.14em] font-semibold truncate ${
              dark ? 'text-white/60' : 'text-brand-black/60'
            }`}
          >
            {card.label}
          </p>
          {isVip ? (
            <>
              <p className="mt-1 text-[18px] font-bold leading-tight">{card.balance}</p>
              {card.sub && (
                <p
                  className={`mt-0.5 text-[12px] font-medium ${
                    dark ? 'text-white/70' : 'text-brand-black/70'
                  }`}
                >
                  {card.sub}
                </p>
              )}
            </>
          ) : (
            <p className="mt-1 text-[26px] font-bold tabular-nums leading-none">{card.balance}</p>
          )}
        </div>
        <Icon size={22} className={`flex-shrink-0 ml-2 ${dark ? 'text-white/70' : 'text-brand-black/70'}`} />
      </div>
      <p
        className={`mt-6 text-xs tabular-nums tracking-widest ${
          dark ? 'text-white/70' : 'text-brand-black/70'
        }`}
      >
        {card.code}
      </p>
    </button>
  )
}

function RedeemRow({ onItem, onSeeAll }) {
  return (
    <div>
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-[15px] font-semibold text-brand-black">Redeem with points</h2>
        <button
          onClick={onSeeAll}
          className="flex items-center gap-0.5 text-[13px] text-green-primary font-medium cursor-pointer"
        >
          See all <ChevronRight size={14} />
        </button>
      </div>
      <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
        <div className="flex gap-4 pr-4">
          {REDEEM_ITEMS.map((it) => (
            <button
              key={it.id}
              onClick={() => onItem(it)}
              className="flex-shrink-0 w-[140px] flex flex-col text-left active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-brand-gray-100 relative">
                <img
                  src={it.image}
                  alt={it.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center">
                  <ChevronRight size={14} className="text-brand-black" />
                </div>
              </div>
              <p className="font-semibold text-sm text-brand-black mt-2">{it.title}</p>
              <div className="flex items-center gap-0.5 mt-0.5 text-[13px] text-brand-black">
                <Plus size={12} />
                <span className="tabular-nums">{it.pts}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TopToggle({ value, onChange, onSettings }) {
  return (
    <div className="-mx-4 px-5 pt-3 pb-4 flex items-center justify-between">
      <button
        onClick={onSettings}
        className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-brand-gray-500 cursor-pointer"
        aria-label="Settings"
      >
        <SettingsIcon size={20} />
      </button>
      <div className="flex items-center gap-7">
        <button
          onClick={() => onChange('wallet')}
          className={`text-[19px] font-semibold transition-colors cursor-pointer ${
            value === 'wallet' ? 'text-brand-black' : 'text-brand-gray-400'
          }`}
        >
          Wallet
        </button>
        <button
          onClick={() => onChange('buy')}
          className={`text-[19px] font-semibold transition-colors cursor-pointer ${
            value === 'buy' ? 'text-brand-black' : 'text-brand-gray-400'
          }`}
        >
          Buy Cards
        </button>
      </div>
      <div className="w-9 h-9" />
    </div>
  )
}

export default function Wallet() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('wallet')
  const [sheet, setSheet] = useState(null)
  const closeSheet = () => setSheet(null)

  const visibleVouchers = VOUCHERS.slice(0, 3)
  const hasMore = VOUCHERS.length > 3

  const openVoucher = (v) => setSheet({ kind: 'voucher', voucher: v })
  const openCard = (c) => setSheet({ kind: 'card', card: c })

  return (
    <div className="px-4 pt-6 pb-4 bg-brand-gray-50 min-h-full">
      <TopToggle value={tab} onChange={setTab} onSettings={() => navigate('/settings')} />

      {tab === 'wallet' ? (
        <>
          <PointsCard
            onTier={() => setSheet({ kind: 'tier' })}
            onActivity={() => setSheet({ kind: 'activity' })}
          />

          <SectionHeader title="My Member QR" />
          <MemberQRRow onTap={() => setSheet({ kind: 'qr' })} />

          <SectionHeader
            title="Vouchers"
            action={hasMore ? `See all (${VOUCHERS.length})` : null}
            onAction={hasMore ? () => setSheet({ kind: 'allVouchers' }) : null}
          />
          <div className="space-y-2.5">
            {visibleVouchers.map((v) => (
              <VoucherTicket key={v.id} voucher={v} onTap={() => openVoucher(v)} />
            ))}
          </div>

          <SectionHeader title="Cards" />
          <div className="grid grid-cols-2 gap-3">
            {CARDS.map((c) => (
              <LoyaltyCard key={c.id} card={c} onTap={() => openCard(c)} />
            ))}
          </div>

          <div className="mt-8">
            <RedeemRow
              onItem={(it) => navigate(`/rewards/${it.id}`)}
              onSeeAll={() => navigate('/rewards')}
            />
          </div>

          <button
            onClick={() => navigate('/wallet/history')}
            className="mt-8 w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white cursor-pointer active:scale-[0.99] transition-transform"
          >
            <span className="text-sm font-medium text-brand-black">Order history</span>
            <ChevronRight size={16} className="text-brand-gray-400" />
          </button>
        </>
      ) : (
        <BuyCards onExit={() => setTab('wallet')} />
      )}

      {sheet?.kind === 'qr' && <QRSheet onClose={closeSheet} />}
      {sheet?.kind === 'voucher' && <VoucherSheet voucher={sheet.voucher} onClose={closeSheet} />}
      {sheet?.kind === 'card' && <GiftCardSheet card={sheet.card} onClose={closeSheet} />}
      {sheet?.kind === 'tier' && <TierSheet onClose={closeSheet} />}
      {sheet?.kind === 'activity' && (
        <ActivitySheet
          onClose={closeSheet}
          onViewAll={() => {
            closeSheet()
            navigate('/wallet/history')
          }}
        />
      )}
      {sheet?.kind === 'allVouchers' && (
        <AllVouchersSheet
          vouchers={VOUCHERS}
          onClose={closeSheet}
          onPick={(v) => setSheet({ kind: 'voucher', voucher: v })}
        />
      )}
    </div>
  )
}

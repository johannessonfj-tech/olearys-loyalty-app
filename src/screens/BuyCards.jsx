import { useMemo, useState } from 'react'
import { ArrowLeft, Calendar, Check } from 'lucide-react'

const AMOUNTS = [100, 250, 500, 1000]

const CARD_THEMES = [
  { id: 'classic', name: 'Classic', fg: '#ffdc1e', sub: 'rgba(255,220,30,0.72)', chip: 'bg-brand-yellow text-brand-black', tag: null },
  { id: 'birthday', name: 'Birthday', fg: '#3c3c3c', sub: 'rgba(60,60,60,0.72)', chip: 'bg-brand-black text-brand-yellow', tag: 'Happy birthday' },
  { id: 'sport', name: 'Sport', fg: '#ffffff', sub: 'rgba(255,255,255,0.78)', chip: 'bg-white text-green-primary', tag: 'Game on' },
  { id: 'celebration', name: 'Celebration', fg: '#3c3c3c', sub: 'rgba(60,60,60,0.72)', chip: 'bg-brand-black text-brand-yellow', tag: 'Cheers' },
  { id: 'gamewinner', name: 'Game winner', fg: '#ffdc1e', sub: 'rgba(255,220,30,0.7)', chip: 'bg-brand-yellow text-brand-black', tag: '5KAMP champion' },
]

function CardArt({ theme, uid }) {
  if (theme.id === 'classic') {
    return (
      <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`cgC1-${uid}`} cx="100%" cy="0%" r="120%">
            <stop offset="0%" stopColor="#ffdc1e" stopOpacity="0.32" />
            <stop offset="55%" stopColor="#ffdc1e" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ffdc1e" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`cgC2-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a4a4a" />
            <stop offset="100%" stopColor="#1f1f1f" />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill={`url(#cgC2-${uid})`} />
        <rect width="320" height="200" fill={`url(#cgC1-${uid})`} />
        <g stroke="#ffdc1e" strokeOpacity="0.06" strokeWidth="1">
          <line x1="0" y1="60" x2="320" y2="60" />
          <line x1="0" y1="140" x2="320" y2="140" />
        </g>
        <g transform="translate(258 152)">
          <circle r="34" fill="none" stroke="#ffdc1e" strokeOpacity="0.35" strokeWidth="1" />
          <circle r="26" fill="none" stroke="#ffdc1e" strokeOpacity="0.22" strokeWidth="1" />
          <text textAnchor="middle" y="6" fontFamily="Jost, sans-serif" fontSize="22" fontWeight="700" fill="#ffdc1e" letterSpacing="1">O'L</text>
        </g>
        <path d="M 28 30 l 3 6 6 1 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -1 z" fill="#ffdc1e" opacity="0.55" />
      </svg>
    )
  }
  if (theme.id === 'birthday') {
    return (
      <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`cgB1-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff0a0" />
            <stop offset="100%" stopColor="#ffdc1e" />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill={`url(#cgB1-${uid})`} />
        {Array.from({ length: 22 }).map((_, i) => {
          const t = i / 21
          const x = 30 + t * 260
          const y = 40 - Math.sin(t * Math.PI) * 22 + (i % 3) * 4
          const r = 2 + (i % 4)
          const c = ['#3c3c3c', '#23695a', '#2d9b87', '#3c3c3c'][i % 4]
          return <circle key={i} cx={x} cy={y} r={r} fill={c} opacity="0.82" />
        })}
        <g transform="translate(160 175)">
          {[-22, 0, 22].map((dx, i) => (
            <g key={i} transform={`translate(${dx} 0)`}>
              <rect x="-3" y="-44" width="6" height="44" rx="1" fill="#3c3c3c" />
              <path d="M 0 -52 Q 3 -48 0 -44 Q -3 -48 0 -52 Z" fill="#ff7a00" />
              <circle cx="0" cy="-49" r="1.5" fill="#fff" opacity="0.9" />
            </g>
          ))}
        </g>
        <path d="M 60 175 Q 160 165 260 175" stroke="#3c3c3c" strokeOpacity="0.18" strokeWidth="1.5" fill="none" />
      </svg>
    )
  }
  if (theme.id === 'sport') {
    return (
      <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`cgS1-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2d9b87" />
            <stop offset="100%" stopColor="#1a4f44" />
          </linearGradient>
          <radialGradient id={`cgS2-${uid}`} cx="78%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffdc1e" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ffdc1e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="200" fill={`url(#cgS1-${uid})`} />
        <rect width="320" height="200" fill={`url(#cgS2-${uid})`} />
        <g transform="translate(260 -10)" opacity="0.18">
          {[-50, -30, -10, 10, 30, 50].map((deg, i) => (
            <rect key={i} x="-2" y="0" width="4" height="260" fill="#ffdc1e" transform={`rotate(${deg})`} />
          ))}
        </g>
        <g stroke="#fff" strokeOpacity="0.18" strokeWidth="1">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1={20 + i * 45} y1="180" x2={20 + i * 45} y2="190" />
          ))}
          <line x1="0" y1="180" x2="320" y2="180" />
        </g>
        <g transform="translate(58 148)">
          <circle r="22" fill="#ffdc1e" />
          <path d="M -22 0 L 22 0 M 0 -22 L 0 22 M -16 -16 L 16 16 M -16 16 L 16 -16" stroke="#3c3c3c" strokeOpacity="0.35" strokeWidth="1.2" />
          <polygon points="0,-12 10,-4 6,8 -6,8 -10,-4" fill="none" stroke="#3c3c3c" strokeWidth="1.5" strokeLinejoin="round" />
        </g>
      </svg>
    )
  }
  if (theme.id === 'gamewinner') {
    return (
      <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`cgG1-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1f1f1f" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          <radialGradient id={`cgG2-${uid}`} cx="20%" cy="100%" r="80%">
            <stop offset="0%" stopColor="#ffdc1e" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffdc1e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="200" fill={`url(#cgG1-${uid})`} />
        <rect width="320" height="200" fill={`url(#cgG2-${uid})`} />
        {[[40, 28], [290, 40], [60, 170], [280, 160], [220, 28]].map(([x, y], i) => (
          <path
            key={i}
            d={`M ${x} ${y - 5} L ${x + 1} ${y - 1} L ${x + 5} ${y} L ${x + 1} ${y + 1} L ${x} ${y + 5} L ${x - 1} ${y + 1} L ${x - 5} ${y} L ${x - 1} ${y - 1} Z`}
            fill="#ffdc1e"
            opacity="0.7"
          />
        ))}
        <g transform="translate(258 100)">
          <path d="M -26 -8 Q -42 -8 -42 8 Q -42 22 -26 22" fill="none" stroke="#ffdc1e" strokeWidth="3" strokeLinecap="round" />
          <path d="M 26 -8 Q 42 -8 42 8 Q 42 22 26 22" fill="none" stroke="#ffdc1e" strokeWidth="3" strokeLinecap="round" />
          <path d="M -26 -22 L 26 -22 L 24 18 Q 22 28 14 30 L -14 30 Q -22 28 -24 18 Z" fill="#ffdc1e" />
          <path d="M 0 -10 L 3 -2 L 11 -1 L 5 4 L 7 12 L 0 7 L -7 12 L -5 4 L -11 -1 L -3 -2 Z" fill="#3c3c3c" />
          <rect x="-6" y="30" width="12" height="10" fill="#ffdc1e" />
          <rect x="-22" y="40" width="44" height="6" rx="2" fill="#ffdc1e" />
        </g>
        <g transform="translate(40 170)">
          <rect x="0" y="0" width="78" height="22" rx="2" fill="#ffdc1e" />
          <text x="39" y="15" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="11" fontWeight="700" fill="#3c3c3c" letterSpacing="2">5KAMP</text>
        </g>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`cgX1-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff7c4" />
          <stop offset="100%" stopColor="#ffdc1e" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#cgX1-${uid})`} />
      <g fill="none" strokeWidth="3" strokeLinecap="round">
        <path d="M 30 -10 Q 50 30 30 60 Q 10 90 30 120" stroke="#3c3c3c" opacity="0.85" />
        <path d="M 70 -10 Q 90 30 70 60 Q 50 90 70 120" stroke="#23695a" opacity="0.85" />
        <path d="M 290 200 Q 270 170 290 140 Q 310 110 290 80" stroke="#3c3c3c" opacity="0.85" />
        <path d="M 250 210 Q 230 180 250 150 Q 270 120 250 90" stroke="#2d9b87" opacity="0.85" />
      </g>
      {[
        [120, 40, '#3c3c3c', -12],
        [160, 28, '#23695a', 18],
        [200, 48, '#3c3c3c', -30],
        [140, 160, '#2d9b87', 24],
        [180, 170, '#3c3c3c', -10],
        [220, 150, '#23695a', 40],
      ].map(([x, y, c, r], i) => (
        <rect key={i} x={x - 7} y={y - 2} width="14" height="4" rx="1" fill={c} transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <path d="M 160 100 l 4 8 8 1 -6 5.5 1.5 8 -7.5 -4 -7.5 4 1.5 -8 -6 -5.5 8 -1 z" fill="#3c3c3c" opacity="0.85" />
    </svg>
  )
}

let __cardUid = 0
function CardPreview({ theme, recipient, message, amount }) {
  const uid = useMemo(() => `cp${++__cardUid}`, [])
  return (
    <div className="relative rounded-[20px] overflow-hidden aspect-[8/5] shadow-[0_18px_38px_-18px_rgba(0,0,0,0.45)]">
      <CardArt theme={theme} uid={uid} />
      <div className="relative h-full flex flex-col justify-between p-5" style={{ color: theme.fg }}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className="text-[9.5px] uppercase tracking-[0.22em] font-semibold opacity-75"
              style={{ color: theme.sub }}
            >
              O'Learys gift card
            </p>
            <p className="mt-1.5 text-[16px] font-bold leading-tight break-words" style={{ color: theme.fg }}>
              {recipient ? `To ${recipient}` : 'To a friend'}
            </p>
            {theme.tag && (
              <span
                className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[9.5px] font-semibold uppercase tracking-[0.14em] ${theme.chip}`}
              >
                {theme.tag}
              </span>
            )}
          </div>
          <div className="text-right shrink-0">
            <p
              className="text-[9.5px] uppercase tracking-[0.22em] font-semibold opacity-75"
              style={{ color: theme.sub }}
            >
              Value
            </p>
            <p className="text-[26px] font-bold tabular-nums leading-none mt-1">
              {amount}
              <span className="text-[14px] font-semibold opacity-80 ml-1">kr</span>
            </p>
          </div>
        </div>
        <p
          className="text-[12.5px] leading-snug max-w-[240px] line-clamp-2"
          style={{ color: theme.fg, opacity: 0.95 }}
        >
          {message || ' '}
        </p>
      </div>
    </div>
  )
}

function StepHeader({ step, total, title, onBack }) {
  return (
    <div className="px-1 pt-1 pb-2 flex items-center gap-3">
      {onBack ? (
        <button
          onClick={onBack}
          className="w-9 h-9 -ml-2 flex items-center justify-center text-brand-black cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </button>
      ) : (
        <div className="w-9 h-9" />
      )}
      <div className="flex-1">
        <p className="text-[11px] uppercase tracking-[0.16em] text-brand-gray-500 font-semibold tabular-nums">
          Step {step} of {total}
        </p>
        <p className="text-[16px] font-semibold text-brand-black mt-0.5">{title}</p>
      </div>
    </div>
  )
}

function StepFooter({ children }) {
  return (
    <div className="sticky bottom-0 left-0 right-0 -mx-4 px-5 pt-3 pb-5 bg-brand-gray-50/95 backdrop-blur-sm border-t border-brand-gray-200">
      {children}
    </div>
  )
}

const TOTAL_STEPS = 3

export default function BuyCards({ onExit }) {
  const [step, setStep] = useState(1)
  const [themeId, setThemeId] = useState('classic')
  const [amount, setAmount] = useState(250)
  const [customAmount, setCustomAmount] = useState('')
  const [delivery, setDelivery] = useState('sms')
  const [recipientName, setRecipientName] = useState('Maja')
  const [recipientContact, setRecipientContact] = useState('+46 70 123 45 67')
  const [sendDate, setSendDate] = useState('now')
  const [message, setMessage] = useState('Have a great game!')
  const [payMethod, setPayMethod] = useState('applepay')

  const theme = CARD_THEMES.find((t) => t.id === themeId)
  const finalAmount = customAmount ? parseInt(customAmount, 10) || 0 : amount
  const fee = 0
  const total = finalAmount + fee

  const goNext = () => setStep((s) => Math.min(TOTAL_STEPS + 1, s + 1))
  const goBack = () => setStep((s) => Math.max(1, s - 1))

  if (step === 4) {
    return (
      <div className="pt-2 pb-8">
        <div className="flex flex-col items-center text-center mt-6">
          <div className="w-16 h-16 rounded-full bg-green-primary text-white flex items-center justify-center">
            <Check size={28} strokeWidth={2.4} />
          </div>
          <p className="mt-5 text-[24px] font-bold text-brand-black leading-tight">Card sent</p>
          <p className="mt-1.5 text-sm text-brand-gray-600 max-w-[260px]">
            {delivery === 'self'
              ? `Added to your wallet — ${total} kr ready to spend.`
              : `${recipientName || 'Your recipient'} will get a notification ${
                  delivery === 'sms' ? 'by SMS' : 'by email'
                } in a moment.`}
          </p>
        </div>

        <div className="mt-7 px-3">
          <CardPreview theme={theme} recipient={recipientName} message={message} amount={finalAmount} />
        </div>

        <div className="mt-7 rounded-3xl bg-white p-5">
          <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-gray-500">Receipt</p>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-brand-gray-700">Gift card</span>
            <span className="text-brand-black tabular-nums">{finalAmount} kr</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-sm">
            <span className="text-brand-gray-700">Fee</span>
            <span className="text-brand-black tabular-nums">{fee} kr</span>
          </div>
          <div className="mt-3 pt-3 border-t border-brand-gray-200 flex items-center justify-between text-[15px]">
            <span className="font-semibold text-brand-black">Charged</span>
            <span className="font-semibold text-brand-black tabular-nums">{total} kr</span>
          </div>
          <p className="mt-3 text-xs text-brand-gray-500">
            Reference · OL-{Math.floor(Math.random() * 9000 + 1000)}-GC
          </p>
        </div>

        <button
          onClick={() => {
            setStep(1)
            onExit && onExit()
          }}
          className="mt-6 w-full py-4 rounded-2xl bg-brand-black text-white text-[15px] font-semibold cursor-pointer active:scale-[0.99] transition-transform"
        >
          Done
        </button>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className="pt-2 pb-2">
        <StepHeader step={1} total={TOTAL_STEPS} title="Design your card" />
        <div className="px-1 pt-2 pb-32">
          <CardPreview theme={theme} recipient={recipientName} message={message} amount={finalAmount} />

          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-brand-gray-500 mb-2.5">Design</p>
            <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
              <div className="flex gap-2.5">
                {CARD_THEMES.map((t) => {
                  const active = t.id === themeId
                  return (
                    <button
                      key={t.id}
                      onClick={() => setThemeId(t.id)}
                      className="flex-shrink-0 w-[88px] flex flex-col items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                    >
                      <div
                        className={`relative w-[88px] aspect-[8/5] rounded-xl overflow-hidden ${
                          active ? 'ring-2 ring-brand-black ring-offset-2 ring-offset-brand-gray-50' : ''
                        }`}
                      >
                        <CardArt theme={t} uid={`thumb-${t.id}`} />
                      </div>
                      <span
                        className={`text-[11.5px] font-medium ${
                          active ? 'text-brand-black' : 'text-brand-gray-600'
                        }`}
                      >
                        {t.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-brand-gray-500 mb-2.5">Amount</p>
            <div className="flex flex-wrap gap-2">
              {AMOUNTS.map((a) => {
                const active = a === amount && !customAmount
                return (
                  <button
                    key={a}
                    onClick={() => {
                      setAmount(a)
                      setCustomAmount('')
                    }}
                    className={`px-4 py-2.5 rounded-full text-sm font-semibold tabular-nums transition-transform active:scale-95 cursor-pointer ${
                      active ? 'bg-brand-black text-white' : 'bg-white text-brand-black'
                    }`}
                  >
                    {a} kr
                  </button>
                )
              })}
              <div className={`flex items-center bg-white rounded-full px-3 ${customAmount ? 'ring-2 ring-brand-black' : ''}`}>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="Custom"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value.replace(/\D/g, ''))}
                  className="w-20 py-2.5 text-sm font-semibold text-brand-black placeholder-brand-gray-400 bg-transparent outline-none tabular-nums"
                />
                {customAmount && <span className="text-sm font-semibold text-brand-black pr-1">kr</span>}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-white p-1">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-gray-500">Message</p>
                <p className="text-[11px] text-brand-gray-400 tabular-nums">{message.length}/80</p>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 80))}
                placeholder="Write a personal note…"
                rows={2}
                className="w-full mt-1 text-[15px] text-brand-black bg-transparent outline-none placeholder-brand-gray-400 resize-none leading-snug"
              />
            </div>
          </div>
        </div>
        <StepFooter>
          <button
            onClick={goNext}
            disabled={!finalAmount}
            className={`w-full py-4 rounded-2xl text-[15px] font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer ${
              finalAmount ? 'bg-brand-black text-white' : 'bg-brand-gray-200 text-brand-gray-500 cursor-not-allowed'
            }`}
          >
            Continue · <span className="tabular-nums">{finalAmount} kr</span>
          </button>
        </StepFooter>
      </div>
    )
  }

  if (step === 2) {
    const canContinue = delivery === 'self' || (recipientName.trim() && recipientContact.trim())
    return (
      <div className="pt-2 pb-2">
        <StepHeader step={2} total={TOTAL_STEPS} title="Who's it for?" onBack={goBack} />
        <div className="px-1 pt-2 pb-32">
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-brand-gray-500 mb-2.5">Send via</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'sms', label: 'SMS' },
              { id: 'email', label: 'Email' },
              { id: 'self', label: 'Keep it' },
            ].map((d) => {
              const active = delivery === d.id
              return (
                <button
                  key={d.id}
                  onClick={() => setDelivery(d.id)}
                  className={`py-3.5 rounded-2xl text-sm font-semibold transition-transform active:scale-95 cursor-pointer ${
                    active ? 'bg-brand-black text-white' : 'bg-white text-brand-black'
                  }`}
                >
                  {d.label}
                </button>
              )
            })}
          </div>

          {delivery !== 'self' && (
            <div className="mt-5 rounded-3xl bg-white">
              <div className="px-4 py-3 border-b border-brand-gray-200">
                <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-gray-500">Recipient name</p>
                <input
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value.slice(0, 24))}
                  placeholder="First name"
                  className="w-full mt-1 text-[15px] text-brand-black bg-transparent outline-none placeholder-brand-gray-400"
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-gray-500">
                  {delivery === 'sms' ? 'Phone number' : 'Email address'}
                </p>
                <input
                  type={delivery === 'email' ? 'email' : 'tel'}
                  value={recipientContact}
                  onChange={(e) => setRecipientContact(e.target.value)}
                  placeholder={delivery === 'sms' ? '+46 70 123 45 67' : 'name@example.com'}
                  className="w-full mt-1 text-[15px] text-brand-black bg-transparent outline-none placeholder-brand-gray-400"
                />
              </div>
            </div>
          )}

          {delivery !== 'self' && (
            <div className="mt-5">
              <p className="text-xs uppercase tracking-[0.14em] font-semibold text-brand-gray-500 mb-2.5">When to send</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'now', label: 'Send now' },
                  { id: 'scheduled', label: 'Schedule' },
                ].map((s) => {
                  const active = sendDate === s.id
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSendDate(s.id)}
                      className={`py-3.5 rounded-2xl text-sm font-semibold transition-transform active:scale-95 cursor-pointer ${
                        active ? 'bg-brand-black text-white' : 'bg-white text-brand-black'
                      }`}
                    >
                      {s.label}
                    </button>
                  )
                })}
              </div>
              {sendDate === 'scheduled' && (
                <div className="mt-2 px-4 py-3 rounded-2xl bg-white flex items-center justify-between">
                  <span className="text-sm text-brand-black">Send on</span>
                  <span className="text-sm font-medium text-brand-black flex items-center gap-1.5">
                    <Calendar size={14} className="text-brand-gray-500" /> 04 Jun, 09:00
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-brand-gray-500 mb-2.5">Preview</p>
            <CardPreview
              theme={theme}
              recipient={delivery === 'self' ? 'You' : recipientName}
              message={message}
              amount={finalAmount}
            />
          </div>
        </div>
        <StepFooter>
          <button
            onClick={goNext}
            disabled={!canContinue}
            className={`w-full py-4 rounded-2xl text-[15px] font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer ${
              canContinue ? 'bg-brand-black text-white' : 'bg-brand-gray-200 text-brand-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </StepFooter>
      </div>
    )
  }

  return (
    <div className="pt-2 pb-2">
      <StepHeader step={3} total={TOTAL_STEPS} title="Review & pay" onBack={goBack} />
      <div className="px-1 pt-2 pb-32">
        <CardPreview
          theme={theme}
          recipient={delivery === 'self' ? 'You' : recipientName}
          message={message}
          amount={finalAmount}
        />

        <div className="mt-6 rounded-3xl bg-white">
          <div className="px-4 py-3.5 border-b border-brand-gray-200 flex items-center justify-between">
            <span className="text-[13px] text-brand-gray-600">To</span>
            <span className="text-sm text-brand-black text-right">
              {delivery === 'self' ? 'My wallet' : `${recipientName} · ${recipientContact}`}
            </span>
          </div>
          <div className="px-4 py-3.5 border-b border-brand-gray-200 flex items-center justify-between">
            <span className="text-[13px] text-brand-gray-600">Send</span>
            <span className="text-sm text-brand-black">
              {delivery === 'self' ? 'Add to wallet' : sendDate === 'now' ? 'Now' : '04 Jun, 09:00'}
            </span>
          </div>
          <div className="px-4 py-3.5 flex items-center justify-between">
            <span className="text-[13px] text-brand-gray-600">Amount</span>
            <span className="text-sm text-brand-black tabular-nums">{finalAmount} kr</span>
          </div>
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.14em] font-semibold text-brand-gray-500 mb-2.5">Pay with</p>
        <div className="rounded-3xl bg-white overflow-hidden">
          {[
            { id: 'applepay', label: 'Apple Pay', sub: '••• Card ending 4321' },
            { id: 'card', label: 'Visa ••• 4321', sub: 'Expires 04/27' },
            { id: 'klarna', label: 'Klarna', sub: 'Pay later in 14 days' },
          ].map((p, i, arr) => {
            const active = payMethod === p.id
            return (
              <button
                key={p.id}
                onClick={() => setPayMethod(p.id)}
                className={`w-full px-4 py-3.5 flex items-center justify-between text-left cursor-pointer ${
                  i < arr.length - 1 ? 'border-b border-brand-gray-200' : ''
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-brand-black">{p.label}</p>
                  <p className="text-xs text-brand-gray-500">{p.sub}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    active ? 'border-brand-black' : 'border-brand-gray-300'
                  }`}
                >
                  {active && <div className="w-2.5 h-2.5 rounded-full bg-brand-black" />}
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-5 px-1 space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-brand-gray-600">Subtotal</span>
            <span className="text-brand-black tabular-nums">{finalAmount} kr</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-brand-gray-600">Service fee</span>
            <span className="text-brand-black tabular-nums">{fee} kr</span>
          </div>
          <div className="flex items-center justify-between text-[15px] pt-2 border-t border-brand-gray-200 mt-2">
            <span className="font-semibold text-brand-black">Total</span>
            <span className="font-semibold text-brand-black tabular-nums">{total} kr</span>
          </div>
        </div>
      </div>
      <StepFooter>
        <button
          onClick={goNext}
          className="w-full py-4 rounded-2xl bg-brand-black text-white text-[15px] font-semibold flex items-center justify-center gap-2 active:scale-[0.99] transition-transform cursor-pointer"
        >
          Pay {total} kr {payMethod === 'applepay' ? '· Apple Pay' : ''}
        </button>
        <p className="mt-2 text-center text-[11.5px] text-brand-gray-500">
          Cards delivered instantly · No expiry
        </p>
      </StepFooter>
    </div>
  )
}

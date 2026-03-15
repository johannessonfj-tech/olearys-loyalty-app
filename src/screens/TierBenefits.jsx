import { useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Star, Gift, Share2, Trophy, Percent, TrendingUp, Crown, Utensils, CalendarCheck, Ticket } from 'lucide-react'

const TIERS = [
  {
    id: 'regular',
    name: 'Regular',
    points: '0',
    visits: '0',
    bgFrom: '#96beaf',
    bgTo: '#96beaf',
    current: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    points: '5 000',
    visits: '3',
    bgFrom: '#7ab8a5',
    bgTo: '#6aab97',
    current: false,
  },
  {
    id: 'allstar',
    name: 'All Star',
    points: '20 000',
    visits: '10',
    bgFrom: '#2d9b87',
    bgTo: '#23695a',
    current: true,
  },
  {
    id: 'mvp',
    name: 'MVP',
    points: '50 000',
    visits: '25',
    bgFrom: '#23695a',
    bgTo: '#1a4d3f',
    current: false,
  },
]

const BENEFITS = [
  {
    Icon: Gift,
    label: 'Discount from O\'Learys & partners',
    values: ['—', '3%', '5%', '10%'],
  },
  {
    Icon: Star,
    label: 'Earn & spend points',
    values: ['✓', '✓', '✓', '✓'],
  },
  {
    Icon: Share2,
    label: 'Point sharing',
    values: ['—', '—', '✓', '✓'],
  },
  {
    Icon: Utensils,
    label: 'Free birthday meal',
    values: ['—', '—', '1 meal', '1 meal + dessert'],
  },
  {
    Icon: CalendarCheck,
    label: 'Priority booking',
    values: ['—', '—', '3 days ahead', '7 days ahead'],
  },
  {
    Icon: Trophy,
    label: 'Exclusive match events',
    values: ['—', '—', '✓', 'VIP access'],
  },
  {
    Icon: Ticket,
    label: 'Free bowling rounds / month',
    values: ['—', '—', '1 round', '3 rounds'],
  },
  {
    Icon: Percent,
    label: 'Discount on activities',
    values: ['—', '5%', '10%', '20%'],
  },
  {
    Icon: TrendingUp,
    label: 'Bonus points multiplier',
    values: ['1x', '1x', '1.5x', '2x'],
  },
  {
    Icon: Crown,
    label: 'VIP lounge access',
    values: ['—', '—', '—', '✓'],
  },
]

const COL_W = 130
const LABEL_W = 160
const GAP = 12

function TierCard({ tier }) {
  const isLight = tier.id === 'regular' || tier.id === 'starter'
  return (
    <div
      className="flex-shrink-0 h-[110px] rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between"
      style={{
        width: COL_W,
        background: `linear-gradient(135deg, ${tier.bgFrom} 0%, ${tier.bgTo} 100%)`,
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20">
        <svg viewBox="0 0 200 32" fill="none" className="w-full h-full">
          <path d="M0 16C30 8 60 24 100 16C140 8 170 24 200 16V32H0V16Z" fill="white" />
        </svg>
      </div>
      <div>
        <p className={`text-[10px] font-medium ${isLight ? 'text-brand-black/60' : 'text-white/70'}`}>O'Learys</p>
        <p className={`text-sm font-bold ${isLight ? 'text-brand-black' : 'text-white'}`}>{tier.name}</p>
      </div>
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star size={10} className={isLight ? 'text-brand-black/50' : 'text-white/70'} />
            <span className={`text-[10px] font-medium ${isLight ? 'text-brand-black/70' : 'text-white/80'}`}>{tier.points}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarCheck size={10} className={isLight ? 'text-brand-black/50' : 'text-white/70'} />
            <span className={`text-[10px] font-medium ${isLight ? 'text-brand-black/70' : 'text-white/80'}`}>{tier.visits}</span>
          </div>
        </div>
        {tier.current && (
          <span className="bg-brand-yellow text-brand-black text-[9px] font-bold px-2 py-0.5 rounded-full">
            MY LEVEL
          </span>
        )}
      </div>
    </div>
  )
}

export default function TierBenefits() {
  const navigate = useNavigate()
  const cardsRef = useRef(null)
  const tableRef = useRef(null)
  const syncing = useRef(false)

  const syncScroll = useCallback((source, target) => {
    if (syncing.current) return
    syncing.current = true
    if (target.current) {
      // Map scroll positions proportionally since widths differ
      const sourceEl = source.current
      const targetEl = target.current
      const sourceMax = sourceEl.scrollWidth - sourceEl.clientWidth
      const targetMax = targetEl.scrollWidth - targetEl.clientWidth
      if (sourceMax > 0) {
        targetEl.scrollLeft = (sourceEl.scrollLeft / sourceMax) * targetMax
      }
    }
    requestAnimationFrame(() => { syncing.current = false })
  }, [])

  return (
    <div className="min-h-dvh flex flex-col bg-green-primary">
      {/* Green header — flush to top */}
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-11 h-11 flex items-center justify-center cursor-pointer -ml-2"
            aria-label="Go back"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Tier level benefits</h1>
        </div>
      </div>

      {/* Tier cards — horizontal scroll, synced with table */}
      <div className="pb-6">
        <div
          ref={cardsRef}
          onScroll={() => syncScroll(cardsRef, tableRef)}
          className="overflow-x-auto no-scrollbar"
        >
          <div className="flex gap-3 px-4" style={{ paddingLeft: LABEL_W + 16 }}>
            {TIERS.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>
        </div>
      </div>

      {/* Benefits comparison table — synced scroll */}
      <div className="flex-1 bg-white rounded-t-3xl pt-2">
        <div
          ref={tableRef}
          onScroll={() => syncScroll(tableRef, cardsRef)}
          className="overflow-x-auto no-scrollbar"
        >
          <table style={{ minWidth: LABEL_W + TIERS.length * (COL_W + GAP) }}>
            <thead>
              <tr className="border-b border-brand-gray-300">
                <th className="px-4 pb-3 text-left" style={{ width: LABEL_W, minWidth: LABEL_W }} />
                {TIERS.map((tier) => (
                  <th key={tier.id} className="px-1.5 pb-3 text-center" style={{ width: COL_W, minWidth: COL_W }}>
                    <span className={`text-sm font-bold ${tier.current ? 'text-green-primary' : 'text-brand-black'}`}>
                      {tier.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BENEFITS.map((b, idx) => (
                <tr key={idx} className="border-b border-brand-gray-100">
                  <td className="px-4 py-4" style={{ width: LABEL_W, minWidth: LABEL_W }}>
                    <div className="flex items-start gap-2">
                      <b.Icon size={18} className="text-green-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-brand-black leading-snug">{b.label}</span>
                    </div>
                  </td>
                  {b.values.map((val, i) => (
                    <td key={i} className="px-1.5 py-4 text-center" style={{ width: COL_W, minWidth: COL_W }}>
                      <span
                        className={`text-sm font-semibold ${
                          val === '—' ? 'text-brand-gray-300' :
                          val === '✓' ? 'text-green-primary' :
                          (val.includes('%') || val.includes('x')) ? 'text-green-primary' :
                          'text-brand-black'
                        }`}
                      >
                        {val}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

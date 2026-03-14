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
    cardBg: 'bg-green-light',
    textColor: 'text-brand-black',
    current: false,
  },
  {
    id: 'allstar',
    name: 'All Star',
    points: '20 000',
    visits: '10',
    bgFrom: '#2d9b87',
    bgTo: '#23695a',
    cardBg: '',
    textColor: 'text-white',
    current: true,
  },
  {
    id: 'mvp',
    name: 'MVP',
    points: '50 000',
    visits: '25',
    bgFrom: '#23695a',
    bgTo: '#1a4d3f',
    cardBg: '',
    textColor: 'text-white',
    current: false,
  },
]

const BENEFITS = [
  {
    Icon: Gift,
    label: 'Discount from O\'Learys & partners',
    values: ['5%', '10%', '15%'],
  },
  {
    Icon: Star,
    label: 'Earn & spend points',
    values: ['✓', '✓', '✓'],
  },
  {
    Icon: Share2,
    label: 'Point sharing',
    values: ['—', '✓', '✓'],
  },
  {
    Icon: Utensils,
    label: 'Free birthday meal',
    values: ['—', '1 meal', '1 meal + dessert'],
  },
  {
    Icon: CalendarCheck,
    label: 'Priority booking',
    values: ['—', '3 days ahead', '7 days ahead'],
  },
  {
    Icon: Trophy,
    label: 'Exclusive match events',
    values: ['—', '✓', 'VIP access'],
  },
  {
    Icon: Ticket,
    label: 'Free bowling rounds / month',
    values: ['—', '1 round', '3 rounds'],
  },
  {
    Icon: Percent,
    label: 'Discount on activities',
    values: ['—', '10%', '20%'],
  },
  {
    Icon: TrendingUp,
    label: 'Bonus points multiplier',
    values: ['1x', '1.5x', '2x'],
  },
  {
    Icon: Crown,
    label: 'VIP lounge access',
    values: ['—', '—', '✓'],
  },
]

function TierCard({ tier }) {
  const isLight = tier.id === 'regular'
  return (
    <div
      className="flex-shrink-0 w-[200px] h-[120px] rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between"
      style={{
        background: `linear-gradient(135deg, ${tier.bgFrom} 0%, ${tier.bgTo} 100%)`,
      }}
    >
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-10 opacity-20">
        <svg viewBox="0 0 200 40" fill="none" className="w-full h-full">
          <path d="M0 20C30 10 60 30 100 20C140 10 170 30 200 20V40H0V20Z" fill="white" />
        </svg>
      </div>

      <div>
        <p className={`text-xs font-medium ${isLight ? 'text-brand-black/60' : 'text-white/70'}`}>O'Learys</p>
        <p className={`text-base font-bold ${isLight ? 'text-brand-black' : 'text-white'}`}>{tier.name}</p>
      </div>

      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star size={12} className={isLight ? 'text-brand-black/50' : 'text-white/70'} />
            <span className={`text-xs font-medium ${isLight ? 'text-brand-black/70' : 'text-white/80'}`}>{tier.points}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarCheck size={12} className={isLight ? 'text-brand-black/50' : 'text-white/70'} />
            <span className={`text-xs font-medium ${isLight ? 'text-brand-black/70' : 'text-white/80'}`}>{tier.visits}</span>
          </div>
        </div>
        {tier.current && (
          <span className="bg-brand-yellow text-brand-black text-[10px] font-bold px-2 py-0.5 rounded-full">
            MY LEVEL
          </span>
        )}
      </div>
    </div>
  )
}

export default function TierBenefits() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Green header */}
      <div className="bg-green-primary px-4 pt-12 pb-5">
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

      {/* Tier cards — horizontal scroll */}
      <div className="bg-green-primary pb-6 -mb-4">
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>

      {/* Benefits comparison */}
      <div className="flex-1 bg-white rounded-t-3xl -mt-2 pt-6 px-0">
        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-[600px]">
            {/* Column headers (sticky tier names) */}
            <div className="flex px-4 pb-3 border-b border-brand-gray-300">
              <div className="w-[200px] flex-shrink-0" />
              {TIERS.map((tier) => (
                <div key={tier.id} className="w-[200px] flex-shrink-0 text-center">
                  <span className={`text-sm font-bold ${tier.current ? 'text-green-primary' : 'text-brand-black'}`}>
                    {tier.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Benefit rows */}
            {BENEFITS.map((b, idx) => (
              <div key={idx} className="flex items-center px-4 py-4 border-b border-brand-gray-100">
                {/* Benefit name */}
                <div className="w-[200px] flex-shrink-0 flex items-start gap-3 pr-4">
                  <b.Icon size={20} className="text-green-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-brand-black leading-snug">{b.label}</span>
                </div>
                {/* Tier values */}
                {b.values.map((val, i) => (
                  <div key={i} className="w-[200px] flex-shrink-0 text-center">
                    <span
                      className={`text-sm font-semibold ${
                        val === '—' ? 'text-brand-gray-500' :
                        val.includes('%') || val.includes('x') ? 'text-green-primary' :
                        'text-brand-black'
                      }`}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

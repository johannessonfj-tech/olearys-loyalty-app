import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Star, Award, Shield, Trophy, Gift, Coins, TrendingUp, CheckCircle } from 'lucide-react'

const TIERS = [
  { name: 'Regular', Icon: Award, color: '#9ca3af', requirement: 'Sign up', multiplier: '1x', discount: '0%' },
  { name: 'Starter', Icon: Shield, color: '#2d9b87', requirement: '5 000 pts', multiplier: '1.25x', discount: '3%' },
  { name: 'All Star', Icon: Trophy, color: '#2d9b87', requirement: '25 000 pts', multiplier: '1.5x', discount: '5%' },
  { name: 'MVP', Icon: Star, color: '#d4af37', requirement: '75 000 pts', multiplier: '2x', discount: '10%' },
]

const HOW_TO_EARN = [
  { text: 'Eat & drink at O\'Learys', detail: '10 pts per 1 kr spent' },
  { text: 'Book activities', detail: '10 pts per 1 kr spent' },
  { text: 'Complete challenges', detail: 'Up to 8 000 pts per challenge' },
  { text: 'Refer a friend', detail: '2 000 pts when they join' },
  { text: 'Visit on your birthday', detail: '5 000 bonus pts' },
]

const HOW_TO_SPEND = [
  { text: 'Redeem for free activities', detail: 'Bowling, shuffleboard & more' },
  { text: 'Get free food & drinks', detail: 'Burgers, soft drinks & more' },
  { text: 'Buy gift cards at a discount', detail: 'Up to 10% off with MVP tier' },
  { text: 'Exclusive experiences', detail: 'VIP events, meet & greets' },
]

export default function LoyaltyExplained() {
  const navigate = useNavigate()

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-green-primary px-5 pt-14 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-4 cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeft size={18} className="text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white mb-1">How O'Learys Loyalty Works</h1>
        <p className="text-sm text-white/80">Everything you need to know in one place</p>
      </div>

      <div className="px-5">
        {/* Step 1: The basics */}
        <section className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-green-primary flex items-center justify-center">
              <span className="text-xs font-bold text-white">1</span>
            </div>
            <h2 className="text-base font-bold text-brand-black">Earn Bonus Points on everything</h2>
          </div>
          <p className="text-sm text-brand-gray-500 leading-relaxed">
            Every time you eat, drink, bowl, or book an activity at O'Learys, you earn <span className="font-semibold text-brand-black">Bonus Points</span>. The more you visit, the more points you collect.
          </p>
        </section>

        {/* How to earn */}
        <section className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Coins size={18} className="text-green-primary" />
            <h3 className="text-sm font-bold text-brand-black">Ways to earn points</h3>
          </div>
          <div className="space-y-2">
            {HOW_TO_EARN.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 px-3 bg-brand-gray-50 rounded-xl">
                <CheckCircle size={16} className="text-green-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-brand-black">{item.text}</p>
                  <p className="text-xs text-brand-gray-500">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 2: Tiers */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-green-primary flex items-center justify-center">
              <span className="text-xs font-bold text-white">2</span>
            </div>
            <h2 className="text-base font-bold text-brand-black">Level up through 4 tiers</h2>
          </div>
          <p className="text-sm text-brand-gray-500 leading-relaxed mb-4">
            Your total points earned determine your tier. Higher tiers unlock better discounts and faster point earning.
          </p>

          <div className="space-y-2">
            {TIERS.map((tier) => (
              <div key={tier.name} className="flex items-center gap-3 p-3 rounded-xl border border-brand-gray-200">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${tier.color}15` }}
                >
                  <tier.Icon size={20} style={{ color: tier.color }} fill={tier.color} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-brand-black">{tier.name}</p>
                  <p className="text-xs text-brand-gray-500">{tier.requirement}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-semibold text-green-primary">{tier.multiplier} pts</p>
                  <p className="text-xs text-brand-gray-500">{tier.discount} off</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 3: Spend */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-green-primary flex items-center justify-center">
              <span className="text-xs font-bold text-white">3</span>
            </div>
            <h2 className="text-base font-bold text-brand-black">Use your points for rewards</h2>
          </div>
          <p className="text-sm text-brand-gray-500 leading-relaxed mb-4">
            Your Bonus Points are like a currency. Spend them on free activities, food, and exclusive experiences.
          </p>

          <div className="space-y-2">
            {HOW_TO_SPEND.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 px-3 bg-brand-gray-50 rounded-xl">
                <Gift size={16} className="text-green-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-brand-black">{item.text}</p>
                  <p className="text-xs text-brand-gray-500">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges callout */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-green-primary" />
            <h3 className="text-sm font-bold text-brand-black">Bonus tip: Complete challenges</h3>
          </div>
          <div className="p-4 rounded-2xl bg-green-primary/5 border border-green-primary/20">
            <p className="text-sm text-brand-black leading-relaxed">
              Challenges are the fastest way to earn big points. Join sponsored challenges, complete activity goals, or track your progress — and earn thousands of bonus points along the way.
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="mt-8 mb-4">
          <div className="p-5 rounded-2xl bg-green-primary text-white text-center">
            <Star size={24} className="mx-auto mb-2" fill="white" />
            <h3 className="text-base font-bold mb-1">It's that simple</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Visit O'Learys. Earn points. Level up. Get rewarded.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

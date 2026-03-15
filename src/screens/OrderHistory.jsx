import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, TrendingDown, Coins, ShoppingBag } from 'lucide-react'

const SUMMARY = {
  totalSpent: 12450,
  pointsEarned: 18675,
  pointsSpent: 4200,
  discountApplied: 1860,
}

const ORDERS = [
  {
    id: 1,
    date: '12 Mar 2026',
    location: 'O\'Learys Norrköping',
    items: ['2x Smash Burger', '1x Nachos', '2x Coca-Cola'],
    total: 489,
    pointsEarned: 734,
    pointsSpent: 0,
    discount: 0,
  },
  {
    id: 2,
    date: '8 Mar 2026',
    location: 'O\'Learys Östermalm',
    items: ['1h Bowling (4 pers)', '4x Beer'],
    total: 780,
    pointsEarned: 1170,
    pointsSpent: 0,
    discount: 0,
  },
  {
    id: 3,
    date: '1 Mar 2026',
    location: 'O\'Learys Norrköping',
    items: ['Burger Ronaldo meal', '1x Milkshake'],
    total: 219,
    pointsEarned: 329,
    pointsSpent: 2000,
    discount: 200,
  },
  {
    id: 4,
    date: '22 Feb 2026',
    location: 'O\'Learys Östermalm',
    items: ['3 Kamp (3 pers)', '3x Nachos', '3x Soft drink'],
    total: 1150,
    pointsEarned: 1725,
    pointsSpent: 0,
    discount: 0,
  },
  {
    id: 5,
    date: '14 Feb 2026',
    location: 'O\'Learys Norrköping',
    items: ['Valentine\'s Dinner (2 pers)', '2x Dessert'],
    total: 890,
    pointsEarned: 1335,
    pointsSpent: 1200,
    discount: 120,
  },
  {
    id: 6,
    date: '5 Feb 2026',
    location: 'O\'Learys Norrköping',
    items: ['1h Bowling (2 pers)', '2x Chicken Wings'],
    total: 520,
    pointsEarned: 780,
    pointsSpent: 1000,
    discount: 100,
  },
]

export default function OrderHistory() {
  const navigate = useNavigate()
  const [expandedId, setExpandedId] = useState(null)

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-10 pb-3">
        <button
          onClick={() => navigate('/wallet')}
          className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-base font-bold text-brand-black">Order History</h1>
      </div>

      {/* Summary cards */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-brand-gray-100 p-3.5">
            <div className="flex items-center gap-1.5 mb-1">
              <ShoppingBag size={14} className="text-brand-gray-500" />
              <p className="text-[10px] text-brand-gray-500 uppercase tracking-wider">Total Spent</p>
            </div>
            <p className="text-lg font-bold text-brand-black">{SUMMARY.totalSpent.toLocaleString()} kr</p>
          </div>
          <div className="rounded-xl bg-brand-gray-100 p-3.5">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp size={14} className="text-green-primary" />
              <p className="text-[10px] text-brand-gray-500 uppercase tracking-wider">Points Earned</p>
            </div>
            <p className="text-lg font-bold text-green-primary">{SUMMARY.pointsEarned.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-brand-gray-100 p-3.5">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingDown size={14} className="text-brand-black" />
              <p className="text-[10px] text-brand-gray-500 uppercase tracking-wider">Points Spent</p>
            </div>
            <p className="text-lg font-bold text-brand-black">{SUMMARY.pointsSpent.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-brand-gray-100 p-3.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Coins size={14} className="text-brand-yellow" />
              <p className="text-[10px] text-brand-gray-500 uppercase tracking-wider">Discount Applied</p>
            </div>
            <p className="text-lg font-bold text-brand-black">{SUMMARY.discountApplied.toLocaleString()} kr</p>
          </div>
        </div>
      </div>

      {/* Orders list */}
      <div className="px-4">
        <h2 className="text-sm font-bold text-brand-black uppercase tracking-wider mb-3">Recent Orders</h2>
        <div className="flex flex-col gap-3">
          {ORDERS.map((order) => {
            const isExpanded = expandedId === order.id
            return (
              <button
                key={order.id}
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
                className="w-full text-left border border-brand-gray-300 rounded-xl p-4 cursor-pointer transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-brand-black">{order.location}</p>
                    <p className="text-[11px] text-brand-gray-500 mt-0.5">{order.date}</p>
                  </div>
                  <p className="text-sm font-bold text-brand-black">{order.total} kr</p>
                </div>

                {/* Always-visible stats */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                  <div className="flex items-center gap-1">
                    <TrendingUp size={11} className="text-green-primary" />
                    <p className="text-[10px] text-green-primary font-semibold">+{order.pointsEarned} pts earned</p>
                  </div>
                  {order.pointsSpent > 0 && (
                    <div className="flex items-center gap-1">
                      <TrendingDown size={11} className="text-red-500" />
                      <p className="text-[10px] text-red-500 font-semibold">-{order.pointsSpent} pts redeemed</p>
                    </div>
                  )}
                  {order.discount > 0 && (
                    <div className="flex items-center gap-1">
                      <Coins size={11} className="text-brand-yellow" />
                      <p className="text-[10px] text-brand-black font-semibold">-{order.discount} kr discount</p>
                    </div>
                  )}
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-brand-gray-100">
                    {order.items.map((item, i) => (
                      <p key={i} className="text-xs text-brand-gray-500 mb-0.5">{item}</p>
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { MapPin, Tv, UtensilsCrossed, Wine, IceCream, ShoppingCart } from 'lucide-react'

const CATEGORIES = [
  { id: 'food', label: 'Food', Icon: UtensilsCrossed },
  { id: 'drinks', label: 'Drinks', Icon: Wine },
  { id: 'watch', label: 'Watch Menu', Icon: Tv },
  { id: 'desserts', label: 'Desserts', Icon: IceCream },
]

const POPULAR = [
  { id: 1, name: 'O\'Learys Burger', price: '189 kr', emoji: '🍔' },
  { id: 2, name: 'Nachos Grande', price: '129 kr', emoji: '🧀' },
  { id: 3, name: 'IPA Draft', price: '89 kr', emoji: '🍺' },
  { id: 4, name: 'Loaded Fries', price: '99 kr', emoji: '🍟' },
]

export default function AlreadyHere() {
  const [table, setTable] = useState('')
  const [orderType, setOrderType] = useState('dine-in')
  const [cart, setCart] = useState([])

  const addToCart = (item) => setCart((c) => [...c, item])
  const cartTotal = cart.reduce((sum) => sum + 1, 0)

  return (
    <div className="pb-24">
      {/* Location banner */}
      <div
        className="px-4 pt-10 pb-5"
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <MapPin size={16} color="#2d9b87" />
          <p className="text-sm text-gray-500">You're at</p>
        </div>
        <h1 className="text-xl font-bold" style={{ color: '#3c3c3c' }}>O'Learys Östermalm</h1>

        {/* Table number */}
        <div className="mt-4 flex gap-2 items-center">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Table number (optional)"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className="flex-1 h-11 rounded-xl border border-gray-200 px-3 text-sm bg-white outline-none focus:border-green-primary"
            style={{ '--tw-border-opacity': 1 }}
          />
        </div>

        {/* Order type toggle */}
        <div className="mt-3 flex rounded-xl border border-gray-200 overflow-hidden bg-white p-1 gap-1">
          {['dine-in', 'takeaway'].map((t) => (
            <button
              key={t}
              onClick={() => setOrderType(t)}
              className="flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all"
              style={{
                backgroundColor: orderType === t ? '#2d9b87' : 'transparent',
                color: orderType === t ? '#fff' : '#9e9e9e',
              }}
            >
              {t === 'dine-in' ? 'Dine in' : 'Takeaway'}
            </button>
          ))}
        </div>
      </div>

      {/* Category grid */}
      <div className="px-4 mt-5">
        <h2 className="text-base font-bold mb-3" style={{ color: '#3c3c3c' }}>What are you looking for?</h2>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map(({ id, label, Icon }) => (
            <button
              key={id}
              className="h-24 rounded-2xl border border-gray-200 bg-white flex flex-col items-center justify-center gap-2 transition-all active:scale-95 active:border-green-primary"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#f0faf8' }}
              >
                <Icon size={20} color="#2d9b87" />
              </div>
              <span className="text-sm font-medium" style={{ color: '#3c3c3c' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular picks */}
      <div className="mt-7 px-4">
        <h2 className="text-base font-bold mb-3" style={{ color: '#3c3c3c' }}>Popular picks</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {POPULAR.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-36 border border-gray-200 rounded-xl bg-white p-3"
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p className="font-semibold text-sm leading-tight" style={{ color: '#3c3c3c' }}>{item.name}</p>
              <p className="text-xs mt-0.5 font-medium" style={{ color: '#2d9b87' }}>{item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="mt-2 w-full py-1.5 rounded-lg text-xs font-semibold text-white active:scale-95 transition-transform"
                style={{ backgroundColor: '#2d9b87' }}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[358px]">
          <button
            className="w-full py-4 rounded-2xl flex items-center justify-between px-5 shadow-lg text-white font-semibold text-sm active:scale-95 transition-transform"
            style={{ backgroundColor: '#2d9b87' }}
          >
            <div className="flex items-center gap-2">
              <ShoppingCart size={18} />
              <span>{cartTotal} item{cartTotal > 1 ? 's' : ''}</span>
            </div>
            <span>View order</span>
          </button>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { MapPin, Tv, UtensilsCrossed, Wine, IceCreamCone, ShoppingCart, Plus } from 'lucide-react'

const CATEGORIES = [
  { id: 'food', label: 'Food', Icon: UtensilsCrossed },
  { id: 'drinks', label: 'Drinks', Icon: Wine },
  { id: 'watch', label: 'Watch Menu', Icon: Tv },
  { id: 'desserts', label: 'Desserts', Icon: IceCreamCone },
]

const POPULAR = [
  { id: 1, name: "O'Learys Burger", price: '189 kr', Icon: UtensilsCrossed },
  { id: 2, name: 'Nachos Grande', price: '129 kr', Icon: UtensilsCrossed },
  { id: 3, name: 'IPA Draft', price: '89 kr', Icon: Wine },
  { id: 4, name: 'Loaded Fries', price: '99 kr', Icon: UtensilsCrossed },
]

export default function AlreadyHere() {
  const [table, setTable] = useState('')
  const [orderType, setOrderType] = useState('dine-in')
  const [cart, setCart] = useState([])

  const addToCart = (item) => setCart((c) => [...c, item])

  return (
    <div className="pb-24">
      {/* Location banner */}
      <div className="px-4 pt-10 pb-5 bg-brand-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <MapPin size={16} className="text-green-primary" />
          <p className="text-sm text-brand-gray-500">You're at</p>
        </div>
        <h1 className="text-xl font-bold text-brand-black">O'Learys Östermalm</h1>

        <div className="mt-4">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Table number (optional)"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className="w-full h-11 rounded-xl border border-brand-gray-300 px-3 text-sm bg-white outline-none focus:border-green-primary transition-colors duration-200"
            aria-label="Table number"
          />
        </div>

        <div className="mt-3 flex rounded-xl border border-brand-gray-300 overflow-hidden bg-white p-1 gap-1">
          {['dine-in', 'takeaway'].map((t) => (
            <button
              key={t}
              onClick={() => setOrderType(t)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize cursor-pointer transition-colors duration-200 ${
                orderType === t ? 'bg-green-primary text-white' : 'text-brand-gray-500'
              }`}
              aria-pressed={orderType === t}
            >
              {t === 'dine-in' ? 'Dine in' : 'Takeaway'}
            </button>
          ))}
        </div>
      </div>

      {/* Category grid */}
      <div className="px-4 mt-5">
        <h2 className="text-base font-bold mb-3 text-brand-black">What are you looking for?</h2>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map(({ id, label, Icon }) => (
            <button
              key={id}
              className="h-24 rounded-2xl border border-brand-gray-300 bg-white flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform duration-200 active:scale-[0.97]"
              aria-label={label}
            >
              <div className="w-10 h-10 rounded-full bg-green-light/30 flex items-center justify-center">
                <Icon size={20} className="text-green-primary" />
              </div>
              <span className="text-sm font-medium text-brand-black">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular picks */}
      <div className="mt-7 px-4">
        <h2 className="text-base font-bold mb-3 text-brand-black">Popular picks</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {POPULAR.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-36 border border-brand-gray-300 rounded-xl bg-white p-3"
            >
              <div className="w-10 h-10 rounded-full bg-brand-gray-100 flex items-center justify-center mb-2">
                <item.Icon size={20} className="text-green-primary" />
              </div>
              <p className="font-semibold text-sm leading-tight text-brand-black">{item.name}</p>
              <p className="text-xs mt-0.5 font-medium text-green-primary">{item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="mt-2 w-full py-1.5 rounded-lg text-xs font-semibold text-white bg-green-primary cursor-pointer transition-transform duration-200 active:scale-[0.97] flex items-center justify-center gap-1"
                aria-label={`Add ${item.name} to cart`}
              >
                <Plus size={12} /> Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[358px] z-10">
          <button
            className="w-full py-4 rounded-2xl flex items-center justify-between px-5 shadow-lg text-white font-semibold text-sm bg-green-primary cursor-pointer transition-transform duration-200 active:scale-[0.97]"
            aria-label={`View order with ${cart.length} items`}
          >
            <div className="flex items-center gap-2">
              <ShoppingCart size={18} />
              <span>{cart.length} item{cart.length > 1 ? 's' : ''}</span>
            </div>
            <span>View order</span>
          </button>
        </div>
      )}
    </div>
  )
}

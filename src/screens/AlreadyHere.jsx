import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, ShoppingBag, Gamepad2, Trophy, X, ChevronRight } from 'lucide-react'

const features = [
  {
    id: 'order',
    Icon: ShoppingBag,
    label: 'Order',
    description: 'Order food & drinks',
    action: 'sheet',
  },
  {
    id: 'play',
    Icon: Gamepad2,
    label: 'Play Game',
    description: '3 Kamp · 5 Kamp',
    path: '/play',
  },
  {
    id: 'predict',
    Icon: Trophy,
    label: 'Predict Match',
    description: 'Predict the scores',
    path: '/predict',
  },
]

function OrderUnavailableSheet({ onClose }) {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Order unavailable"
    >
      <div
        className="bg-white w-full max-w-[390px] rounded-t-2xl p-6 pb-10 animate-[slideUp_300ms_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-brand-black">Order unavailable</h2>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-brand-gray-100 cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center text-center py-4">
          <div className="w-16 h-16 rounded-full bg-green-primary/10 flex items-center justify-center mb-4">
            <ShoppingBag size={28} className="text-green-primary" />
          </div>
          <p className="text-sm text-brand-black leading-relaxed max-w-[280px]">
            Not available for this O'Learys unfortunately. Please order from the waiter or bar.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-3.5 rounded-2xl bg-brand-black text-white text-sm font-bold cursor-pointer transition-transform duration-200 active:scale-[0.97]"
        >
          Got it
        </button>
      </div>
    </div>
  )
}

export default function AlreadyHere() {
  const navigate = useNavigate()
  const [showOrderSheet, setShowOrderSheet] = useState(false)

  const handleFeature = (feature) => {
    if (feature.action === 'sheet') {
      setShowOrderSheet(true)
    } else if (feature.path) {
      navigate(feature.path)
    }
  }

  return (
    <div className="min-h-[80dvh] flex flex-col px-5 pb-24 pt-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl tracking-widest text-green-primary font-bold">O'LEARYS</h1>
        <p className="text-sm text-brand-gray-500 mt-1">Sports · Food · Fun</p>
      </div>

      {/* Location selector */}
      <button
        className="mb-8 flex items-center gap-3 rounded-xl border border-brand-gray-300 bg-white px-4 py-3.5 text-left cursor-pointer transition-colors duration-200 active:border-green-primary"
        aria-label="Select your O'Learys location"
      >
        <MapPin size={20} className="text-green-primary flex-shrink-0" />
        <div className="flex-1">
          <p className="text-[11px] text-brand-gray-500">Your location</p>
          <p className="text-sm font-medium text-brand-black">Select your O'Learys →</p>
        </div>
      </button>

      {/* Feature cards */}
      <div className="flex flex-col gap-4">
        {features.map((feature, i) => (
          <button
            key={feature.id}
            onClick={() => handleFeature(feature)}
            className="flex items-center gap-4 rounded-2xl border border-brand-gray-300 bg-white p-5 text-left cursor-pointer transition-all duration-200 active:scale-[0.98] active:border-green-primary"
            style={{ animationDelay: `${i * 80}ms` }}
            aria-label={feature.label}
          >
            <div className="w-12 h-12 rounded-xl bg-green-primary/10 flex items-center justify-center flex-shrink-0">
              <feature.Icon size={24} className="text-green-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-brand-black">{feature.label}</p>
              <p className="text-sm text-brand-gray-500">{feature.description}</p>
            </div>
            <ChevronRight size={18} className="text-brand-gray-500" />
          </button>
        ))}
      </div>

      {showOrderSheet && <OrderUnavailableSheet onClose={() => setShowOrderSheet(false)} />}
    </div>
  )
}

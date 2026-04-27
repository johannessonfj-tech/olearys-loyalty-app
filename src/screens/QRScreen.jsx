import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function QRScreen() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const userName = profile?.name || 'Member'

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-10 pb-4 border-b border-brand-gray-100">
        <h2 className="text-lg font-bold text-brand-black">Scan at register</h2>
        <button
          onClick={() => navigate(-1)}
          className="w-11 h-11 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer"
          aria-label="Close"
        >
          <X size={18} className="text-brand-black" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <p className="text-sm text-brand-gray-500 text-center mb-8">
          Show this QR code to the cashier to collect your Bonus Points
        </p>

        {/* QR Code */}
        <div className="w-56 h-56 rounded-2xl border-2 border-green-primary flex items-center justify-center">
          <div className="grid grid-cols-7 gap-0.5 p-2">
            {Array.from({ length: 49 }).map((_, i) => {
              const row = Math.floor(i / 7)
              const col = i % 7
              const isCorner = (row < 2 && col < 2) || (row < 2 && col > 4) || (row > 4 && col < 2)
              const isRandom = (i * 17 + row * 3 + col * 7) % 3 === 0
              return (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-sm ${isCorner || isRandom ? 'bg-green-primary' : 'bg-brand-gray-100'}`}
                />
              )
            })}
          </div>
        </div>

        {/* User info */}
        <div className="mt-6 text-center">
          <p className="font-bold text-base text-brand-black">{userName}</p>
          <span className="mt-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-green-primary inline-block">
            All Star
          </span>
        </div>

        <p className="text-xs text-brand-gray-500 mt-6">
          Code refreshes every 60 seconds for security
        </p>
      </div>
    </div>
  )
}

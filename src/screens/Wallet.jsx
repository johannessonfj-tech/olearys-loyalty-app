import { useState } from 'react'
import { X, QrCode } from 'lucide-react'

const VOUCHERS = [
  { id: 1, title: 'Free Beer', sub: 'Valid until 31 Mar 2026', color: '#2d9b87' },
  { id: 2, title: '10% off your bill', sub: 'Valid until 15 Apr 2026', color: '#23695a' },
  { id: 3, title: 'Free Nachos', sub: 'Valid until 30 Apr 2026', color: '#2d9b87' },
]

const GIFT_AMOUNTS = [100, 200, 500, 1000]

function QRModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white" style={{ maxWidth: 390, margin: '0 auto' }}>
      <div className="flex items-center justify-between px-4 pt-10 pb-4 border-b border-gray-100">
        <h2 className="text-lg font-bold" style={{ color: '#3c3c3c' }}>Scan at register</h2>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <p className="text-sm text-gray-500 text-center mb-8">
          Show this QR code to the cashier to collect your Bonus Points
        </p>
        {/* QR code placeholder */}
        <div
          className="w-56 h-56 rounded-2xl border-2 flex items-center justify-center"
          style={{ borderColor: '#2d9b87' }}
        >
          <div className="grid grid-cols-7 gap-0.5 p-2">
            {Array.from({ length: 49 }).map((_, i) => {
              // Simple QR-like pattern
              const row = Math.floor(i / 7)
              const col = i % 7
              const isCorner = (row < 2 && col < 2) || (row < 2 && col > 4) || (row > 4 && col < 2)
              const isRandom = (i * 17 + row * 3 + col * 7) % 3 === 0
              return (
                <div
                  key={i}
                  className="w-6 h-6 rounded-sm"
                  style={{ backgroundColor: isCorner || isRandom ? '#2d9b87' : '#f5f5f5' }}
                />
              )
            })}
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="font-bold text-base" style={{ color: '#3c3c3c' }}>Daniel Svantesson</p>
          <span className="mt-1 px-3 py-1 rounded-full text-xs font-semibold text-white inline-block" style={{ backgroundColor: '#2d9b87' }}>
            All Star
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-6 text-center">
          Code refreshes every 60 seconds for security
        </p>
      </div>
    </div>
  )
}

export default function Wallet() {
  const [showQR, setShowQR] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(null)

  return (
    <div className="px-4 pt-10 pb-4">
      {/* Loyalty Card */}
      <div
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2d9b87 0%, #23695a 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -right-2 top-8 w-20 h-20 rounded-full bg-white/10" />

        <div className="relative">
          <p className="text-white/70 text-xs font-medium uppercase tracking-widest">O'Learys</p>
          <h2 className="text-white text-xl font-bold mt-1">Daniel Svantesson</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-brand-yellow text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: '#ffdc1e', color: '#3c3c3c' }}>
              All Star
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-white/60 text-[10px] uppercase tracking-wider">Bonus Points</p>
              <p className="text-white text-2xl font-bold">58 231</p>
            </div>
            <div className="opacity-30">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 4L36 20L20 36L4 20L20 4Z" fill="white" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Show QR Code */}
      <button
        onClick={() => setShowQR(true)}
        className="mt-4 w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm text-white transition-all active:scale-95"
        style={{ backgroundColor: '#2d9b87' }}
      >
        <QrCode size={18} />
        Show QR Code
      </button>

      {/* Vouchers */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold" style={{ color: '#3c3c3c' }}>My Vouchers</h2>
          <button className="text-sm" style={{ color: '#2d9b87' }}>See all</button>
        </div>
        {VOUCHERS.length === 0 ? (
          <div className="text-center py-8 text-gray-400 border border-dashed border-gray-200 rounded-xl">
            <p className="text-sm">No vouchers yet</p>
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {VOUCHERS.map((v) => (
              <div
                key={v.id}
                className="flex-shrink-0 w-44 rounded-xl p-4"
                style={{ backgroundColor: v.color }}
              >
                <p className="text-white font-bold text-sm leading-tight">{v.title}</p>
                <p className="text-white/70 text-[10px] mt-1">{v.sub}</p>
                <button className="mt-3 text-white/90 text-xs font-medium border border-white/30 rounded-lg px-3 py-1.5">
                  Use now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Buy Gift Card */}
      <section className="mt-8">
        <h2 className="text-base font-bold mb-3" style={{ color: '#3c3c3c' }}>Buy a Gift Card</h2>
        <div className="border border-gray-200 rounded-2xl p-4">
          <p className="text-sm text-gray-500 mb-3">Choose an amount (SEK)</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {GIFT_AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => setSelectedAmount(a)}
                className="py-2.5 rounded-lg text-sm font-semibold border transition-all"
                style={{
                  borderColor: selectedAmount === a ? '#2d9b87' : '#e0e0e0',
                  backgroundColor: selectedAmount === a ? '#2d9b87' : '#fff',
                  color: selectedAmount === a ? '#fff' : '#3c3c3c',
                }}
              >
                {a}
              </button>
            ))}
          </div>
          <button
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all active:scale-95"
            style={{
              backgroundColor: selectedAmount ? '#2d9b87' : '#e0e0e0',
              color: selectedAmount ? '#fff' : '#9e9e9e',
            }}
          >
            {selectedAmount ? `Buy ${selectedAmount} kr Gift Card` : 'Select an amount'}
          </button>
        </div>
      </section>

      {showQR && <QRModal onClose={() => setShowQR(false)} />}
    </div>
  )
}

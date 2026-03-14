import { useEffect, useState } from 'react'
import { Check, PartyPopper } from 'lucide-react'

export default function CelebrationOverlay({ message = "Added to your O'Learys wallet!", onDone }) {
  const [phase, setPhase] = useState('enter') // enter → visible → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 50)
    const t2 = setTimeout(() => setPhase('exit'), 2200)
    const t3 = setTimeout(() => onDone?.(), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-300"
      style={{
        backgroundColor: 'rgba(45, 155, 135, 0.95)',
        opacity: phase === 'enter' ? 0 : phase === 'exit' ? 0 : 1,
        maxWidth: 390,
        margin: '0 auto',
      }}
    >
      {/* Confetti particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 60}%`,
              backgroundColor: ['#ffdc1e', '#ffffff', '#96beaf', '#23695a', '#fff'][i % 5],
              opacity: phase === 'visible' ? 1 : 0,
              transform: phase === 'visible' ? `translateY(0) scale(1)` : `translateY(-40px) scale(0)`,
              transition: `all ${400 + i * 50}ms ease-out ${i * 30}ms`,
            }}
          />
        ))}
      </div>

      {/* Checkmark circle */}
      <div
        className="relative transition-all duration-500 ease-out"
        style={{
          transform: phase === 'visible' ? 'scale(1)' : 'scale(0.5)',
          opacity: phase === 'visible' ? 1 : 0,
        }}
      >
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <Check size={36} className="text-green-primary" strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Text */}
      <div
        className="mt-6 text-center transition-all duration-500 delay-200"
        style={{
          transform: phase === 'visible' ? 'translateY(0)' : 'translateY(20px)',
          opacity: phase === 'visible' ? 1 : 0,
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <PartyPopper size={20} className="text-brand-yellow" />
          <PartyPopper size={20} className="text-brand-yellow" style={{ transform: 'scaleX(-1)' }} />
        </div>
        <p className="text-white font-bold text-xl">{message}</p>
        <p className="text-white/70 text-sm mt-1">Check your wallet to use it</p>
      </div>
    </div>
  )
}

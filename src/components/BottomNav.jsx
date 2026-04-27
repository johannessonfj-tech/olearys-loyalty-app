import { useNavigate, useLocation } from 'react-router-dom'
import { Home, CalendarDays, Trophy, Wallet, MapPin } from 'lucide-react'

const tabs = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/book', label: 'Book', icon: CalendarDays },
  { path: '/here', label: "I'm here", center: true },
  { path: '/challenges', label: 'Challenges', icon: Trophy },
  { path: '/wallet', label: 'Wallet', icon: Wallet },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="flex items-end justify-around bg-white border-t border-brand-gray-300 px-2 pb-2 pt-2 relative z-10" aria-label="Main navigation">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path
        if (tab.center) {
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center cursor-pointer"
              style={{ marginTop: -22 }}
              aria-label="I'm here"
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${isActive ? 'bg-green-primary' : 'bg-white border border-brand-gray-300'}`}
                style={{
                  boxShadow: isActive
                    ? '0 8px 22px rgba(45,155,135,0.35)'
                    : '0 4px 10px rgba(0,0,0,0.08)',
                }}
              >
                <MapPin
                  size={22}
                  className={isActive ? 'text-white' : 'text-brand-gray-500'}
                  fill={isActive ? 'rgba(255,255,255,0.15)' : 'none'}
                  strokeWidth={1.8}
                />
              </div>
              <span className={`text-[10px] font-semibold mt-0.5 ${isActive ? 'text-green-primary' : 'text-brand-gray-500'}`}>
                {tab.label}
              </span>
            </button>
          )
        }
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center gap-0.5 min-w-[44px] min-h-[44px] justify-center cursor-pointer"
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <tab.icon size={22} className={isActive ? 'text-green-primary' : 'text-brand-gray-500'} strokeWidth={isActive ? 2.2 : 1.5} />
            <span className={`text-[10px] font-medium ${isActive ? 'text-green-primary' : 'text-brand-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

import { useNavigate, useLocation } from 'react-router-dom'

const DiamondIcon = ({ filled, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3L21 12L12 21L3 12L12 3Z"
      fill={filled ? '#2d9b87' : 'none'}
      stroke={filled ? '#2d9b87' : '#9e9e9e'}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
)

const tabs = [
  { path: '/', label: 'Home' },
  { path: '/book', label: 'Book' },
  { path: '/here', label: 'Already Here?', center: true },
  { path: '/challenges', label: 'Challenges' },
  { path: '/wallet', label: 'Wallet' },
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
              className="flex flex-col items-center -mt-5 cursor-pointer"
              aria-label="Already Here?"
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md border-2 text-center leading-tight transition-colors duration-200 ${
                  isActive ? 'bg-green-primary border-green-primary' : 'bg-white border-brand-gray-300'
                }`}
              >
                <span className={`text-[10px] font-semibold leading-tight ${isActive ? 'text-white' : 'text-brand-black'}`}>
                  Already<br />Here?
                </span>
              </div>
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
            <DiamondIcon filled={isActive} />
            <span className={`text-[10px] font-medium ${isActive ? 'text-green-primary' : 'text-brand-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

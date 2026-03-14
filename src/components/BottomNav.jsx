import { useNavigate, useLocation } from 'react-router-dom'

const DiamondIcon = ({ filled, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
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
  { path: '/here', label: 'Already\nHere?', center: true },
  { path: '/challenges', label: 'Challenges' },
  { path: '/wallet', label: 'Wallet' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="flex items-end justify-around bg-white border-t border-gray-200 px-2 pb-2 pt-2 relative z-10">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path
        if (tab.center) {
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center -mt-5"
              aria-label="Already Here?"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-md border-2 text-center leading-tight"
                style={{
                  backgroundColor: isActive ? '#2d9b87' : '#fff',
                  borderColor: isActive ? '#2d9b87' : '#e0e0e0',
                }}
              >
                <span
                  className="text-[10px] font-semibold leading-tight"
                  style={{ color: isActive ? '#fff' : '#3c3c3c' }}
                >
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
            className="flex flex-col items-center gap-0.5 min-w-[44px] min-h-[44px] justify-center"
            aria-label={tab.label}
          >
            <DiamondIcon filled={isActive} />
            <span
              className="text-[10px] font-medium"
              style={{ color: isActive ? '#2d9b87' : '#9e9e9e' }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

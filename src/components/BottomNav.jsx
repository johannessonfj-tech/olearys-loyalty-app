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
              className="flex flex-col items-center -mt-3 cursor-pointer"
              aria-label="Already Here?"
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg text-center leading-tight relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #fff 0%, #f5efe6 50%, #e0d6c6 100%)',
                  border: '2.5px solid #3c3c3c',
                }}
              >
                {/* Baseball stitching — kept minimal, pushed to edges */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64" fill="none">
                  {/* Left seam */}
                  <path d="M12 10 C7 22, 7 42, 12 54" stroke="#c4382a" strokeWidth="1.5" fill="none" />
                  <line x1="9" y1="16" x2="13" y2="18" stroke="#c4382a" strokeWidth="1" />
                  <line x1="8" y1="25" x2="12" y2="25.5" stroke="#c4382a" strokeWidth="1" />
                  <line x1="8" y1="34" x2="12" y2="34" stroke="#c4382a" strokeWidth="1" />
                  <line x1="8" y1="43" x2="12" y2="42.5" stroke="#c4382a" strokeWidth="1" />
                  <line x1="9" y1="49" x2="13" y2="47" stroke="#c4382a" strokeWidth="1" />
                  {/* Right seam */}
                  <path d="M52 10 C57 22, 57 42, 52 54" stroke="#c4382a" strokeWidth="1.5" fill="none" />
                  <line x1="55" y1="16" x2="51" y2="18" stroke="#c4382a" strokeWidth="1" />
                  <line x1="56" y1="25" x2="52" y2="25.5" stroke="#c4382a" strokeWidth="1" />
                  <line x1="56" y1="34" x2="52" y2="34" stroke="#c4382a" strokeWidth="1" />
                  <line x1="56" y1="43" x2="52" y2="42.5" stroke="#c4382a" strokeWidth="1" />
                  <line x1="55" y1="49" x2="51" y2="47" stroke="#c4382a" strokeWidth="1" />
                </svg>
                <span className="relative z-10 text-[10px] font-extrabold leading-tight text-[#3c3c3c]" style={{ textShadow: '0 0 3px rgba(255,255,255,0.8)' }}>
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

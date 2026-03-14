import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './screens/Home'
import Book from './screens/Book'
import AlreadyHere from './screens/AlreadyHere'
import Challenges from './screens/Challenges'
import Wallet from './screens/Wallet'
import WalletCardDetail from './screens/WalletCardDetail'
import OrderHistory from './screens/OrderHistory'
import TierBenefits from './screens/TierBenefits'
import ChallengeDetail from './screens/ChallengeDetail'
import AllDeals from './screens/AllDeals'
import DealDetail from './screens/DealDetail'
import AllRewards from './screens/AllRewards'
import ClaimReward from './screens/ClaimReward'
import Highscore from './screens/Highscore'

export default function App() {
  const phoneW = 393
  const phoneH = 852

  const getScale = () => Math.min(1, (window.innerHeight - 32) / phoneH, (window.innerWidth - 32) / phoneW)
  const [scale, setScale] = useState(getScale)

  useEffect(() => {
    const onResize = () => setScale(getScale())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <BrowserRouter>
      {/* Desktop: center the phone on a gray bg */}
      <div className="h-screen bg-[#e8e8e8] flex items-center justify-center overflow-hidden">
        {/* iPhone shell */}
        <div
          className="relative bg-black rounded-[50px] shadow-2xl overflow-hidden flex flex-col"
          style={{ width: phoneW, height: phoneH, border: '8px solid #1a1a1a', transform: `scale(${scale})`, transformOrigin: 'center center' }}
        >
          {/* Status bar area */}
          <div className="h-12 bg-white flex items-end justify-center pb-1 relative z-20">
            {/* Dynamic Island */}
            <div className="w-[120px] h-[32px] bg-black rounded-full absolute top-1" />
          </div>

          {/* Scrollable screen content */}
          <main className="flex-1 bg-white overflow-y-auto overflow-x-hidden relative">
            <div className="pb-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book" element={<Book />} />
                <Route path="/here" element={<AlreadyHere />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/wallet/vouchers" element={<WalletCardDetail />} />
                <Route path="/wallet/history" element={<OrderHistory />} />
                <Route path="/wallet/:type/:id" element={<WalletCardDetail />} />
                <Route path="/benefits" element={<TierBenefits />} />
                <Route path="/challenges/:id" element={<ChallengeDetail />} />
                <Route path="/deals" element={<AllDeals />} />
                <Route path="/deals/:dealId" element={<DealDetail />} />
                <Route path="/rewards" element={<AllRewards />} />
                <Route path="/rewards/:rewardId" element={<ClaimReward />} />
                <Route path="/highscore" element={<Highscore />} />
              </Routes>
            </div>
          </main>

          {/* Bottom nav pinned inside phone */}
          <div className="bg-white relative z-20">
            <BottomNav />
            {/* Home indicator bar */}
            <div className="flex justify-center pb-2 pt-1">
              <div className="w-32 h-1 bg-brand-black/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

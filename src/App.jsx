import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TeamsProvider } from './context/TeamsContext'
import BottomNav from './components/BottomNav'
import Home from './screens/Home'
import Book from './screens/Book'
import AlreadyHere from './screens/AlreadyHere'
import Challenges from './screens/Challenges'
import Wallet from './screens/Wallet'
import WalletCardDetail from './screens/WalletCardDetail'
import OrderHistory from './screens/OrderHistory'
import TierBenefits from './screens/TierBenefits'
import PlayGame from './screens/PlayGame'
import GameDetail from './screens/GameDetail'
import BowlingBingo from './screens/BowlingBingo'
import MatchBooking from './screens/MatchBooking'
import PredictMatch from './screens/PredictMatch'
import ChallengeDetail from './screens/ChallengeDetail'
import MyBookings from './screens/MyBookings'
import AllDeals from './screens/AllDeals'
import AllRewards from './screens/AllRewards'
import DealDetail from './screens/DealDetail'
import ClaimReward from './screens/ClaimReward'
import PartyDetail from './screens/PartyDetail'
import HappeningDetail from './screens/HappeningDetail'
import Highscore from './screens/Highscore'
import SettingsScreen from './screens/Settings'
import PackageDetail from './screens/PackageDetail'
import AllEvents from './screens/AllEvents'
import AllParties from './screens/AllParties'
import LoyaltyExplained from './screens/LoyaltyExplained'

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
    <TeamsProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* Desktop: center the phone on a gray bg */}
      <div className="h-screen bg-black flex items-center justify-center overflow-hidden">
        {/* iPhone shell */}
        <div
          className="relative bg-black rounded-[50px] shadow-2xl overflow-hidden flex flex-col"
          style={{ width: phoneW, height: phoneH, border: '8px solid #1a1a1a', transform: `scale(${scale})`, transformOrigin: 'center center' }}
        >
          {/* Dynamic Island — overlaid so pages can bleed color underneath */}
          <div className="absolute top-0 left-0 right-0 h-12 flex items-end justify-center pb-1 z-20 pointer-events-none">
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
                <Route path="/book/events" element={<AllEvents />} />
                <Route path="/book/parties" element={<AllParties />} />
                <Route path="/book/happening/:happeningId" element={<HappeningDetail />} />
                <Route path="/book/party/:partyType" element={<PartyDetail />} />
                <Route path="/book/package/:packageId" element={<PackageDetail />} />
                <Route path="/book/package-checkout" element={<MatchBooking />} />
                <Route path="/book/:matchId" element={<MatchBooking />} />
                <Route path="/play" element={<PlayGame />} />
                <Route path="/play/:id" element={<GameDetail />} />
                <Route path="/play/bowling-bingo" element={<BowlingBingo />} />
                <Route path="/predict" element={<PredictMatch />} />
                <Route path="/challenges/:id" element={<ChallengeDetail />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/deals" element={<AllDeals />} />
                <Route path="/deals/:dealId" element={<DealDetail />} />
                <Route path="/rewards" element={<AllRewards />} />
                <Route path="/rewards/:rewardId" element={<ClaimReward />} />
                <Route path="/highscore" element={<Highscore />} />
                <Route path="/loyalty-explained" element={<LoyaltyExplained />} />
                <Route path="/settings" element={<SettingsScreen />} />
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
    </TeamsProvider>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './screens/Home'
import Book from './screens/Book'
import AlreadyHere from './screens/AlreadyHere'
import Challenges from './screens/Challenges'
import Wallet from './screens/Wallet'
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

export default function App() {
  return (
    <BrowserRouter>
      {/* Desktop: center the phone on a gray bg */}
      <div className="min-h-screen bg-[#e8e8e8] flex items-center justify-center p-4">
        {/* iPhone shell */}
        <div
          className="relative bg-black rounded-[50px] shadow-2xl overflow-hidden flex flex-col"
          style={{ width: 393, height: 852, border: '8px solid #1a1a1a' }}
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
                <Route path="/benefits" element={<TierBenefits />} />
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

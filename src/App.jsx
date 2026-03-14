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
import PredictMatch from './screens/PredictMatch'

export default function App() {
  return (
    <BrowserRouter>
      {/* Outer centering shell — gray background */}
      <div className="min-h-dvh bg-gray-100 flex items-start justify-center">
        {/* Mobile frame — 390px wide */}
        <div
          className="relative bg-white flex flex-col overflow-hidden shadow-2xl"
          style={{ width: '390px', minHeight: '100dvh' }}
        >
          {/* Scrollable screen content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book" element={<Book />} />
              <Route path="/here" element={<AlreadyHere />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/benefits" element={<TierBenefits />} />
              <Route path="/play" element={<PlayGame />} />
              <Route path="/play/:id" element={<GameDetail />} />
              <Route path="/play/bowling-bingo" element={<BowlingBingo />} />
              <Route path="/predict" element={<PredictMatch />} />
            </Routes>
          </main>

          {/* Fixed bottom nav inside the mobile frame */}
          <div className="absolute bottom-0 left-0 right-0">
            <BottomNav />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

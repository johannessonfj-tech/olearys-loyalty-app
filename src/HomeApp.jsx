import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import TierBenefits from './screens/TierBenefits'
import DealDetail from './screens/DealDetail'
import AllDeals from './screens/AllDeals'
import AllRewards from './screens/AllRewards'
import ClaimReward from './screens/ClaimReward'

export default function HomeApp() {
  return (
    <HashRouter>
      <div className="min-h-dvh bg-gray-100 flex items-start justify-center">
        <div
          className="relative bg-white flex flex-col overflow-hidden shadow-2xl"
          style={{ width: '390px', minHeight: '100dvh' }}
        >
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/benefits" element={<TierBenefits />} />
              <Route path="/deals/:dealId" element={<DealDetail />} />
              <Route path="/deals" element={<AllDeals />} />
              <Route path="/rewards" element={<AllRewards />} />
              <Route path="/rewards/:rewardId" element={<ClaimReward />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  )
}

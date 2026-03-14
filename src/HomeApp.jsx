import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import TierBenefits from './screens/TierBenefits'

export default function HomeApp() {
  return (
    <BrowserRouter>
      <div className="min-h-dvh bg-gray-100 flex items-start justify-center">
        <div
          className="relative bg-white flex flex-col overflow-hidden shadow-2xl"
          style={{ width: '390px', minHeight: '100dvh' }}
        >
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/benefits" element={<TierBenefits />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

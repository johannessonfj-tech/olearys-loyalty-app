import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login({ onSwitchToRegister }) {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[360px]">
        {/* Logo area */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-primary tracking-widest">O'LEARYS</h1>
          <p className="text-sm text-brand-gray-500 mt-2">Sign in to your loyalty account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
          )}

          <label className="block">
            <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary"
              placeholder="you@email.com"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary"
              placeholder="Enter your password"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-green-primary text-white font-bold text-sm disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-brand-gray-500 mt-6">
          Don't have an account?{' '}
          <button onClick={onSwitchToRegister} className="text-green-primary font-semibold">
            Create one
          </button>
        </p>
      </div>
    </div>
  )
}

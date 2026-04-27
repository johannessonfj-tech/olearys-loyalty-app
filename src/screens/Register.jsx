import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Register({ onSwitchToLogin }) {
  const { signUp } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birthday, setBirthday] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signUp(email, password, name, birthday || null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[360px]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-primary tracking-widest">O'LEARYS</h1>
          <p className="text-sm text-brand-gray-500 mt-2">Create your loyalty account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
          )}

          <label className="block">
            <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">Full Name *</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary"
              placeholder="Your full name"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">Email *</span>
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
            <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">Birthday *</span>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">Password *</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary"
              placeholder="Min. 6 characters"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-green-primary text-white font-bold text-sm disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-brand-gray-500 mt-6">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-green-primary font-semibold">
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}

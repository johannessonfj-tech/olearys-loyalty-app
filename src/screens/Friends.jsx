import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, UserPlus, Check, Users, X } from 'lucide-react'

const INITIAL_FRIENDS = [
  { id: 'sofia', name: 'Sofia Lindberg', tier: 'All Star', hue: 320, note: 'Hockey buddy · Frölunda' },
  { id: 'erik', name: 'Erik Bergqvist', tier: 'Starter', hue: 200, note: 'Bowling rival · 247 high' },
  { id: 'amelia', name: 'Amelia Norén', tier: 'All Star', hue: 30, note: 'Saturday regular' },
]

const SUGGESTIONS = [
  { id: 'johan', name: 'Johan Söderberg', tier: 'Regular', hue: 145, mutual: 2, note: 'Arsenal fan · prediction king' },
  { id: 'maja', name: 'Maja Holm', tier: 'Starter', hue: 270, mutual: 5, note: 'Quiz night co-captain' },
  { id: 'oscar', name: 'Oscar Wikander', tier: 'All Star', hue: 10, mutual: 1, note: 'Beats you at darts' },
  { id: 'lina', name: 'Lina Karlsson', tier: 'Starter', hue: 180, mutual: 3, note: 'Shuffleboard partner' },
  { id: 'anders', name: 'Anders Berg', tier: 'Regular', hue: 90, mutual: 1, note: 'Karaoke night regular' },
]

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function Avatar({ name, hue, size = 44 }) {
  return (
    <div
      className="flex-shrink-0 rounded-full flex items-center justify-center text-white font-semibold"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, hsl(${hue} 55% 55%) 0%, hsl(${hue} 60% 40%) 100%)`,
        fontSize: size * 0.36,
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}

function FriendRow({ person, trailing }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <Avatar name={person.name} hue={person.hue} />
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-brand-black truncate">{person.name}</p>
        <p className="text-[11.5px] text-brand-gray-500 truncate mt-0.5">{person.note}</p>
      </div>
      {trailing}
    </div>
  )
}

function TierPill({ tier }) {
  return (
    <span className="px-2 py-0.5 rounded-full bg-brand-gray-100 text-[10px] font-semibold tracking-wide text-brand-gray-700 uppercase">
      {tier}
    </span>
  )
}

export default function Friends() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [friends, setFriends] = useState(INITIAL_FRIENDS)
  const [pending, setPending] = useState([])

  const q = query.trim().toLowerCase()

  const filteredFriends = useMemo(() => {
    if (!q) return friends
    return friends.filter((f) => f.name.toLowerCase().includes(q))
  }, [friends, q])

  const filteredSuggestions = useMemo(() => {
    return SUGGESTIONS.filter((s) => !friends.some((f) => f.id === s.id))
      .filter((s) => (q ? s.name.toLowerCase().includes(q) : true))
  }, [friends, q])

  const togglePending = (id) =>
    setPending((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const removeFriend = (id) =>
    setFriends((list) => list.filter((f) => f.id !== id))

  const sendRequests = () => {
    if (pending.length === 0) return
    const newOnes = SUGGESTIONS.filter((s) => pending.includes(s.id)).map(
      ({ mutual, ...rest }) => rest, // eslint-disable-line no-unused-vars
    )
    setFriends((list) => [...list, ...newOnes])
    setPending([])
  }

  return (
    <div className="pb-24">
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-brand-gray-700"
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-[16px] font-semibold text-brand-black">Friends</h1>
        <div className="w-9 h-9" aria-hidden="true" />
      </div>

      <div className="px-5 mt-2">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-brand-gray-100">
          <Search size={16} className="text-brand-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search friends or add new"
            className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-brand-gray-500 text-brand-black"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-brand-gray-500 active:opacity-60"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="px-5 mt-7 mb-2 flex items-end justify-between">
        <h2 className="text-[12px] uppercase tracking-[0.16em] font-semibold text-brand-gray-500">
          Your friends
        </h2>
        <span className="text-[12px] font-medium text-brand-gray-500 tabular-nums">
          {friends.length}
        </span>
      </div>

      <div className="px-5">
        {filteredFriends.length === 0 ? (
          <div className="rounded-2xl bg-white px-4 py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-gray-100 mx-auto flex items-center justify-center text-brand-gray-500 mb-3">
              <Users size={20} />
            </div>
            <p className="text-[13.5px] text-brand-gray-700 font-medium">
              {q ? 'No friends match your search' : 'No friends yet'}
            </p>
            <p className="text-[12px] text-brand-gray-500 mt-1">
              {q ? 'Try a different name' : 'Add someone from the suggestions below'}
            </p>
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-4 divide-y divide-brand-gray-100">
            {filteredFriends.map((f) => (
              <FriendRow
                key={f.id}
                person={f}
                trailing={
                  <div className="flex items-center gap-2">
                    <TierPill tier={f.tier} />
                    <button
                      onClick={() => removeFriend(f.id)}
                      className="px-3 py-1.5 rounded-full bg-brand-gray-100 text-[12px] font-semibold text-brand-gray-700 active:scale-95 transition-transform"
                    >
                      Remove
                    </button>
                  </div>
                }
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-5 mt-7 mb-2 flex items-end justify-between">
        <h2 className="text-[12px] uppercase tracking-[0.16em] font-semibold text-brand-gray-500">
          {q ? 'Add' : 'Suggestions'}
        </h2>
        {pending.length > 0 && (
          <span className="text-[12px] font-medium text-green-primary tabular-nums">
            {pending.length} selected
          </span>
        )}
      </div>

      <div className="px-5">
        {filteredSuggestions.length === 0 ? (
          <div className="rounded-2xl bg-white px-4 py-6 text-center">
            <p className="text-[13px] text-brand-gray-500">
              {q ? 'No matches — try inviting by phone or email' : 'You know everyone here!'}
            </p>
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-4 divide-y divide-brand-gray-100">
            {filteredSuggestions.map((s) => {
              const isPending = pending.includes(s.id)
              return (
                <FriendRow
                  key={s.id}
                  person={{ ...s, note: `${s.note} · ${s.mutual} mutual` }}
                  trailing={
                    <button
                      onClick={() => togglePending(s.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-semibold active:scale-95 transition-transform ${
                        isPending
                          ? 'bg-green-primary text-white'
                          : 'bg-brand-black text-white'
                      }`}
                    >
                      {isPending ? (
                        <>
                          <Check size={12} /> Added
                        </>
                      ) : (
                        <>
                          <UserPlus size={12} /> Add
                        </>
                      )}
                    </button>
                  }
                />
              )
            })}
          </div>
        )}
      </div>

      {pending.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 max-w-[430px] mx-auto px-5 pb-24 pt-3 pointer-events-none">
          <button
            onClick={sendRequests}
            className="pointer-events-auto w-full py-3.5 rounded-2xl bg-green-primary text-white font-semibold text-[14px] shadow-lg active:scale-[0.99] transition-transform"
          >
            Send {pending.length} friend request{pending.length === 1 ? '' : 's'}
          </button>
        </div>
      )}
    </div>
  )
}

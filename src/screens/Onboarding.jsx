import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import TEAMS from '../data/teams'
import VENUES from '../data/venues'

export default function Onboarding() {
  const { user, updateProfile } = useAuth()
  const [selectedTeams, setSelectedTeams] = useState([])
  const [selectedVenue, setSelectedVenue] = useState('')
  const [saving, setSaving] = useState(false)

  function toggleTeam(teamId) {
    setSelectedTeams((prev) =>
      prev.includes(teamId) ? prev.filter((t) => t !== teamId) : [...prev, teamId]
    )
  }

  async function handleFinish(skip = false) {
    setSaving(true)
    try {
      // Save selected teams (if any and not skipping)
      if (!skip && selectedTeams.length > 0) {
        // Build rows from selected team IDs
        const rows = []
        for (const [sport, { teams }] of Object.entries(TEAMS)) {
          for (const team of teams) {
            if (selectedTeams.includes(team.id)) {
              rows.push({ user_id: user.id, team_id: team.id, sport })
            }
          }
        }
        if (rows.length > 0) {
          await supabase.from('user_teams').upsert(rows, { onConflict: 'user_id,team_id' })
        }
      }

      // Update profile
      await updateProfile({
        favorite_restaurant: skip ? null : selectedVenue || null,
        onboarding_completed: true,
      })
    } catch (err) {
      console.error('Onboarding save error:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-[100dvh] bg-white">
      <div className="max-w-[430px] mx-auto px-5 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-brand-black">Customize Your Experience</h1>
          <p className="text-sm text-brand-gray-500 mt-1">Select your favourite teams and venue (optional)</p>
        </div>

        {/* Teams sections */}
        {Object.entries(TEAMS).map(([sport, { label, teams }]) => (
          <div key={sport} className="mb-6">
            <h2 className="text-xs font-bold text-brand-gray-500 uppercase tracking-wider mb-3">{label}</h2>
            <div className="grid grid-cols-4 gap-3">
              {teams.map((team) => {
                const isSelected = selectedTeams.includes(team.id)
                return (
                  <button
                    key={team.id}
                    onClick={() => toggleTeam(team.id)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-green-primary bg-green-primary/5'
                        : 'border-transparent bg-brand-gray-100'
                    }`}
                  >
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-8 h-8 object-contain"
                      loading="lazy"
                    />
                    <span className="text-[10px] font-medium text-brand-black text-center leading-tight">{team.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Venue picker */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-brand-gray-500 uppercase tracking-wider mb-3">Favourite O'Learys</h2>
          <select
            value={selectedVenue}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary appearance-none"
          >
            <option value="">Select a venue...</option>
            {VENUES.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <button
            onClick={() => handleFinish(true)}
            disabled={saving}
            className="flex-1 py-3.5 rounded-xl border-2 border-brand-gray-300 text-brand-gray-500 font-bold text-sm disabled:opacity-50"
          >
            Skip
          </button>
          <button
            onClick={() => handleFinish(false)}
            disabled={saving}
            className="flex-1 py-3.5 rounded-xl bg-green-primary text-white font-bold text-sm disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save & Start'}
          </button>
        </div>
      </div>
    </div>
  )
}

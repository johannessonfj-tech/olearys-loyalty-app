import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { ALL_TEAMS } from '../data/teams'
import { useAuth } from './AuthContext'

const TeamsContext = createContext()

export function TeamsProvider({ children }) {
  const { user } = useAuth()
  const [selectedTeams, setSelectedTeams] = useState([])
  const [loaded, setLoaded] = useState(false)

  // Load saved teams from Supabase on mount
  useEffect(() => {
    if (!user) return
    supabase
      .from('user_teams')
      .select('team_id')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data) setSelectedTeams(data.map((r) => r.team_id))
        setLoaded(true)
      })
  }, [user])

  const toggleTeam = async (id) => {
    const isSelected = selectedTeams.includes(id)
    // Optimistic update
    setSelectedTeams((prev) =>
      isSelected ? prev.filter((t) => t !== id) : [...prev, id]
    )
    // Sync to Supabase
    if (user) {
      if (isSelected) {
        await supabase.from('user_teams').delete().eq('user_id', user.id).eq('team_id', id)
      } else {
        const team = ALL_TEAMS.find((t) => t.id === id)
        if (team) {
          await supabase.from('user_teams').upsert(
            { user_id: user.id, team_id: id, sport: team.sport },
            { onConflict: 'user_id,team_id' }
          )
        }
      }
    }
  }

  const getSelectedTeamObjects = () =>
    ALL_TEAMS.filter((t) => selectedTeams.includes(t.id))

  return (
    <TeamsContext.Provider value={{ selectedTeams, toggleTeam, getSelectedTeamObjects, AVAILABLE_TEAMS: ALL_TEAMS, loaded }}>
      {children}
    </TeamsContext.Provider>
  )
}

export function useTeams() {
  return useContext(TeamsContext)
}

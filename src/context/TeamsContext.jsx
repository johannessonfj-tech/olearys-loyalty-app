import { createContext, useContext, useState } from 'react'

const AVAILABLE_TEAMS = [
  // Football
  { id: 'arsenal', name: 'Arsenal', sport: 'Football', logo: 'https://resources.premierleague.com/premierleague/badges/50/t3.png' },
  { id: 'liverpool', name: 'Liverpool', sport: 'Football', logo: 'https://resources.premierleague.com/premierleague/badges/50/t14.png' },
  { id: 'man-utd', name: 'Manchester United', sport: 'Football', logo: 'https://resources.premierleague.com/premierleague/badges/50/t1.png' },
  { id: 'man-city', name: 'Manchester City', sport: 'Football', logo: 'https://resources.premierleague.com/premierleague/badges/50/t43.png' },
  { id: 'chelsea', name: 'Chelsea', sport: 'Football', logo: 'https://resources.premierleague.com/premierleague/badges/50/t8.png' },
  { id: 'tottenham', name: 'Tottenham', sport: 'Football', logo: 'https://resources.premierleague.com/premierleague/badges/50/t6.png' },
  { id: 'barcelona', name: 'FC Barcelona', sport: 'Football', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/50px-FC_Barcelona_%28crest%29.svg.png' },
  { id: 'real-madrid', name: 'Real Madrid', sport: 'Football', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/50px-Real_Madrid_CF.svg.png' },
  // Hockey
  { id: 'ny-rangers', name: 'New York Rangers', sport: 'Hockey', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/New_York_Rangers.svg/50px-New_York_Rangers.svg.png' },
  { id: 'lulea-hf', name: 'Luleå HF', sport: 'Hockey', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Lule%C3%A5_HF_logo.svg/50px-Lule%C3%A5_HF_logo.svg.png' },
  { id: 'farjestad', name: 'Färjestad BK', sport: 'Hockey', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/F%C3%A4rjestad_BK_logo.svg/50px-F%C3%A4rjestad_BK_logo.svg.png' },
  { id: 'toronto', name: 'Toronto Maple Leafs', sport: 'Hockey', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Toronto_Maple_Leafs_2016_logo.svg/50px-Toronto_Maple_Leafs_2016_logo.svg.png' },
]

const TeamsContext = createContext()

export function TeamsProvider({ children }) {
  const [selectedTeams, setSelectedTeams] = useState(['arsenal', 'ny-rangers'])

  const toggleTeam = (id) => {
    setSelectedTeams((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const getSelectedTeamObjects = () =>
    AVAILABLE_TEAMS.filter((t) => selectedTeams.includes(t.id))

  return (
    <TeamsContext.Provider value={{ selectedTeams, toggleTeam, getSelectedTeamObjects, AVAILABLE_TEAMS }}>
      {children}
    </TeamsContext.Provider>
  )
}

export function useTeams() {
  return useContext(TeamsContext)
}

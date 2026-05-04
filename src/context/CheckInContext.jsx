import { createContext, useContext, useState } from 'react'

const CheckInContext = createContext()

export function CheckInProvider({ children }) {
  const [venue, setVenue] = useState(null)
  const [notifiedCount, setNotifiedCount] = useState(0)

  return (
    <CheckInContext.Provider value={{ venue, setVenue, notifiedCount, setNotifiedCount }}>
      {children}
    </CheckInContext.Provider>
  )
}

export function useCheckIn() {
  return useContext(CheckInContext)
}

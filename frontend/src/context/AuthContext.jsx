import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

// TEMPORARY (Phase 1): Login.jsx isn't connected to the backend yet, so there
// is no real session/JWT to read from. We check localStorage for a user
// object in case one was set manually for testing, and otherwise treat the
// user as logged out. We never fabricate a name — no confirmed user, no name.
const STORAGE_KEY = 'homeflow_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('kaspa_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        // ignore parse errors
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const mockUsers = {
      'passenger@demo.com': { id: 1, name: 'Alex Passenger', email: 'passenger@demo.com', role: 'passenger' },
      'driver@demo.com': { id: 2, name: 'John Driver', email: 'driver@demo.com', role: 'driver' },
      'operator@demo.com': { id: 3, name: 'Sarah Operator', email: 'operator@demo.com', role: 'operator' },
    }

    if (mockUsers[email] && password === 'demo123') {
      const userData = mockUsers[email]
      setUser(userData)
      localStorage.setItem('kaspa_user', JSON.stringify(userData))
      return { success: true, user: userData }
    }
    return { success: false, error: 'Invalid email or password.' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('kaspa_user')
  }

  const registerPassenger = async (data) => {
    const userData = {
      id: Date.now(),
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: 'passenger',
    }
    setUser(userData)
    localStorage.setItem('kaspa_user', JSON.stringify(userData))
    return { success: true }
  }

  const registerDriver = async (_data) => {
    return { success: true, pending: true }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, registerPassenger, registerDriver }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

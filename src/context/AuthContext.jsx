import React, { createContext, useContext, useState } from 'react'
import { getLocale, setLocale } from '../utils/helpers'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

function AuthProvider({ children }) {

  const initialToken = getLocale('token') || ''

  const [token, setToken] = useState(initialToken)

  function addToken(token) {
    setToken(token)
    setLocale('token', token)
  }

  return (
    <AuthContext.Provider value={{ addToken, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
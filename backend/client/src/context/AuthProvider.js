import { createContext, useState } from "react"
const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  //children represent components that are in the auth provider
  const [auth, setAuth] = useState({})
  return (
    <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>
  )
}

export default AuthContext
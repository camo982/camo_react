import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export const useAuth = () => {
    const auth = useContext(AuthContext)
    if (auth=== undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return auth
}

export const AuthProvider = ({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false)
   
   const login = () => {
    setIsAuthenticated(true)
   }  

   const logout = () => {
    setIsAuthenticated(false)
   } 

   return (
    <AuthContext.Provider value={{isAuthenticated, login, logout}}>
        {children}
    </AuthContext.Provider>
   )

}
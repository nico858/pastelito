import { createContext, useState, useContext } from "react"
import { registerRequest, loginRequest } from "../api/auth"

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])

    const signUp = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        }
        catch (err) {
            console.log(err);
            setErrors(err.response.data);
        }
    }

    const signIn = async (user) => {
        try{
            const res = await loginRequest(user);
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }


    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}
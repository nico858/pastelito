import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.message);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data.token);
      setIsAuthenticated(true);
      setUser(res.data);
      // Guardar la respuesta en el localStorage
      localStorage.setItem('userData', JSON.stringify(res.data.token));
    } catch (err) {
      console.log(err.response.data);
      setErrors(
        "Las credenciales proporcionadas no son válidas. Por favor, verifique su email y contraseña e intente nuevamente."
      );
    }
  };
  const localStorageValue = localStorage.getItem('userData');

  document.cookie = `miCookie=${localStorageValue}; path=/`.replace(/\"/g, '');
  


  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

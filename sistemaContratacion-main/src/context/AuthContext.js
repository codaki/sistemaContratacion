import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getUsuarioApi,
  getUsuariosRequest,
  loginRequest,
  registerRequest,
  verifyTokenRequest,
} from "../api/auth";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      //etUser(res.data);

      const isAdmin = res.data.cand_correo.endsWith("espe.edu.ec");
      const newUser = {
        ...res.data,
        role: isAdmin ? "admin" : "candidato",
      };
      console.log(newUser);
      setUser(newUser);
      setIsAuthenticated(true);
      console.log(user);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const signup = async (user) => {
    try {
      console.log("Dentro del AUTHCONTEXT");
      console.log(user);
      const res = await registerRequest(user);
      setUser(res.data);
      return res;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const getUsuario = async (id) => {
    try {
      const res = await getUsuarioApi(id);
      return res;
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        // const isAdmin = res.data.correo.endsWith("espe.edu.ec");
        // const newUser = {
        //   ...res.data,
        //   role: isAdmin ? "admin" : "candidato",
        // };
        setUser(res.data);
        console.log(res.data);
        console.log(user);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        getUsuario,
        updateUser,
        isAuthenticated,
        errors,
        signin,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

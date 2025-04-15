import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configurar el token en los headers de axios
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Verificar el token al cargar la aplicación
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/auth/user');
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setToken(null);
        }
      } catch (error) {
        console.error('Error al verificar token:', error);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  // Función para iniciar sesión
  const login = async (usuario, password) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/login', { usuario, password });
      
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        return true;
      } else {
        setError(res.data.message || 'Error al iniciar sesión');
        return false;
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError(error.response?.data?.message || 'Error al iniciar sesión');
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // Valor del contexto
  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

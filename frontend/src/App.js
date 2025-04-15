import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import CrearVale from './pages/CrearVale';
import Historial from './pages/Historial';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="text-center p-5">Cargando...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Componente principal de la aplicación
const AppContent = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      {isAuthenticated && <Navbar />}
      <Container fluid>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" /> : <Login />
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <CrearVale />
            </ProtectedRoute>
          } />
          <Route path="/historial" element={
            <ProtectedRoute>
              <Historial />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
};

// Componente App con el proveedor de autenticación
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

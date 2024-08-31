import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, renderiza los hijos (children) solicitados
  return children;
};

export default ProtectedRoute;


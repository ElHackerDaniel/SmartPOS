// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // Intentar obtener un recurso protegido para verificar token
        await api.get("products/");
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response?.status === 401) {
          // Token inválido o expirado
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(false);
        }
      }
    };

    verifyToken();
  }, [token]);

  if (isAuthenticated === null) {
    // Mostrar pantalla de carga mientras se verifica
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Verificando sesión...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
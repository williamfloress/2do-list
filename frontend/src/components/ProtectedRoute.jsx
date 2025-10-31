import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

/**
 * Componente de ruta protegida
 * 
 * Este componente verifica si el usuario está autenticado antes de permitir
 * el acceso a rutas protegidas. Si no está autenticado, redirige al login.
 * 
 * Características:
 * - Verifica estado de autenticación
 * - Muestra estado de carga mientras verifica
 * - Redirige a login si no está autenticado
 * - Inicializa el store de auth si es necesario
 * 
 * Uso:
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading, initialized, initialize } = useAuthStore();

  // Inicializar el store de auth si no se ha hecho
  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  // Mostrar loading mientras se verifica la autenticación
  if (loading || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, mostrar el contenido protegido
  return children;
};

export default ProtectedRoute;

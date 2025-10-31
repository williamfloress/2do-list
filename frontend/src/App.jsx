/**
 * Componente Principal de la Aplicación
 * 
 * Este componente configura todas las rutas de la aplicación usando React Router.
 * Maneja la navegación entre diferentes páginas (Login, Register, Dashboard).
 * 
 * Características implementadas:
 * - Rutas públicas (Login, Register)
 * - Rutas protegidas (Dashboard) con verificación de autenticación
 * - Inicialización automática del store de autenticación
 * - Restauración de sesión al recargar la página
 * - Redirección automática según estado de autenticación
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { useAuthStore } from './store/authStore';
import './index.css';

function App() {
  const { initialize } = useAuthStore();

  // Inicializar el store de autenticación al cargar la aplicación
  // Esto verifica si hay una sesión activa y configura el listener de cambios
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    // ErrorBoundary: Captura errores de React y muestra UI de fallback
    <ErrorBoundary>
      {/* BrowserRouter: Proveedor de enrutamiento para toda la aplicación */}
      <BrowserRouter>
        {/* Routes: Contenedor de todas las rutas */}
        <Routes>
          {/* Ruta por defecto - redirige al login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Rutas de autenticación */}
          <Route path="/login" element={<Login />} />        {/* Página de inicio de sesión */}
          <Route path="/register" element={<Register />} />  {/* Página de registro */}
          
          {/* Rutas principales de la aplicación - PROTEGIDAS */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Ruta catch-all - redirige al login para URLs no definidas */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        
        {/* Toast Notifications - Configurado para toda la aplicación */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

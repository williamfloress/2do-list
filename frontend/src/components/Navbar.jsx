/**
 * Componente Navbar - Barra de Navegación Superior
 * 
 * Muestra:
 * - Logo y título de la aplicación
 * - Información del usuario (email y avatar)
 * - Botón para ir al Dashboard
 * - Botón de cerrar sesión (Logout)
 * 
 * Estilos: TailwindCSS con colores indigo y efectos hover
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  // Obtener estado de autenticación del store
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Función para navegar al dashboard
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  // Función para manejar logout con confirmación
  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutConfirm(false);
      // La redirección se maneja automáticamente por ProtectedRoute
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert(`Error al cerrar sesión: ${error.message || 'Intenta nuevamente'}`);
      setShowLogoutConfirm(false);
    }
  };

  // Función para confirmar logout
  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  // Función para cancelar logout
  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    // Barra de navegación con fondo indigo y sombra
    <nav className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        {/* Contenedor flex para alinear elementos a los extremos */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo y título a la izquierda */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl shadow-lg shadow-indigo-500/30">
              <span role="img" aria-label="Todo List">📝</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Todo List</h1>
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-500">Stay organized</p>
            </div>
          </div>
          
          {/* Información del usuario y botones de navegación a la derecha */}
          <div className="flex items-center gap-3">
            {/* Información del usuario */}
            {user && (
              <div className="flex items-center gap-3 rounded-full border border-white/50 bg-white/70 px-3 py-1.5 shadow-sm">
                {/* Avatar del usuario */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/90 text-white shadow">
                  <span className="text-sm font-semibold uppercase">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                
                {/* Email del usuario */}
                <div className="hidden sm:block">
                  <span className="text-sm font-medium text-gray-700">{user.email}</span>
                </div>
              </div>
            )}
            
            {/* Botón Dashboard */}
            <button 
              onClick={handleDashboardClick}
              className="rounded-full border border-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600 transition-all hover:-translate-y-0.5 hover:bg-indigo-50"
            >
              Dashboard
            </button>
            
            {/* Botón Logout */}
            <button 
              onClick={confirmLogout}
              className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de confirmación para logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform transition-all animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmar Cierre de Sesión
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres cerrar sesión?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


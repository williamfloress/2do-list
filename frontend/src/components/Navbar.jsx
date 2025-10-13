/**
 * Componente Navbar - Barra de Navegación Superior
 * 
 * Muestra:
 * - Logo y título de la aplicación
 * - Botón para ir al Dashboard
 * - Botón de cerrar sesión (Logout)
 * 
 * Estilos: TailwindCSS con colores indigo y efectos hover
 */

import React from 'react';

const Navbar = () => {
  return (
    // Barra de navegación con fondo indigo y sombra
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        {/* Contenedor flex para alinear elementos a los extremos */}
        <div className="flex items-center justify-between">
          {/* Logo y título a la izquierda */}
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">📝 Todo List</h1>
          </div>
          
          {/* Botones de navegación a la derecha */}
          <div className="flex items-center space-x-4">
            {/* Botón Dashboard */}
            <button className="hover:text-indigo-200 transition-colors">
              Dashboard
            </button>
            
            {/* Botón Logout */}
            <button className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-lg transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


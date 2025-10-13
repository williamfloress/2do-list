/**
 * Página Dashboard - Panel Principal de la Aplicación
 * 
 * Esta es la página principal donde los usuarios ven y gestionan sus tareas.
 * 
 * Componentes integrados:
 * - Navbar: Barra de navegación superior
 * - TaskForm: Formulario para agregar nuevas tareas
 * - TaskList: Lista de todas las tareas del usuario
 */

import React from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  return (
    // Contenedor principal con altura mínima de pantalla completa
    <div className="min-h-screen bg-gray-50">
      {/* Barra de navegación superior */}
      <Navbar />
      
      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Contenedor con ancho máximo para mejor legibilidad */}
        <div className="max-w-4xl mx-auto">
          {/* Encabezado de bienvenida */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back! 👋</h2>
            <p className="text-gray-600">Manage your tasks and stay productive</p>
          </div>

          {/* Formulario para agregar tareas */}
          <TaskForm />
          
          {/* Lista de tareas existentes */}
          <TaskList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


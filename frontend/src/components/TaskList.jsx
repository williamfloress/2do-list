/**
 * Componente TaskList - Lista de Tareas
 * 
 * Funcionalidad:
 * - Muestra todas las tareas del usuario
 * - Renderiza cada tarea usando el componente TaskItem
 * - Muestra un mensaje cuando no hay tareas
 * 
 * Props esperadas (en futuro):
 * - tasks: Array de objetos con las tareas
 */

import React from 'react';
import TaskItem from './TaskItem';

const TaskList = () => {
  // Datos de prueba - tareas placeholder para mostrar la interfaz
  // TODO: Reemplazar con datos reales de la API/Supabase
  const placeholderTasks = [
    { id: 1, title: 'Complete project setup', completed: true },
    { id: 2, title: 'Create database schema', completed: false },
    { id: 3, title: 'Build authentication', completed: false },
  ];

  return (
    // Tarjeta blanca con sombra para la lista de tareas
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Tasks</h2>
      
      {/* Renderizado condicional: mostrar mensaje si no hay tareas */}
      {placeholderTasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tasks yet. Add one above!</p>
      ) : (
        // Lista de tareas con espaciado vertical
        <div className="space-y-3">
          {/* Mapear cada tarea a un componente TaskItem */}
          {placeholderTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;


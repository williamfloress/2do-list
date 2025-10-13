/**
 * Componente TaskItem - Elemento Individual de Tarea
 * 
 * Funcionalidad:
 * - Muestra una tarea con su título y estado
 * - Checkbox para marcar como completada/pendiente
 * - Botón para eliminar la tarea
 * - Estilo tachado para tareas completadas
 * 
 * Props:
 * - task: Objeto con { id, title, completed }
 */

import React from 'react';

const TaskItem = ({ task }) => {
  /**
   * Maneja el cambio de estado de la tarea (completada/pendiente)
   */
  const handleToggle = () => {
    console.log('Toggle task:', task.id);
    // TODO: Agregar lógica para actualizar el estado en la base de datos
  };

  /**
   * Maneja la eliminación de la tarea
   */
  const handleDelete = () => {
    console.log('Delete task:', task.id);
    // TODO: Agregar lógica para eliminar la tarea de la base de datos
  };

  return (
    // Contenedor de la tarea con borde y efecto hover
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      {/* Lado izquierdo: Checkbox y título */}
      <div className="flex items-center space-x-3 flex-1">
        {/* Checkbox para marcar como completada */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        />
        
        {/* Título de la tarea con estilo condicional */}
        <span
          className={`text-lg ${
            task.completed
              ? 'line-through text-gray-400'  // Tachado si está completada
              : 'text-gray-800'                // Normal si está pendiente
          }`}
        >
          {task.title}
        </span>
      </div>
      
      {/* Lado derecho: Botón de eliminar */}
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;


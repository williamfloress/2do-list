/**
 * Componente TaskForm - Formulario para Agregar Tareas
 * 
 * Funcionalidad:
 * - Input para ingresar el título de la tarea
 * - Botón para agregar la tarea
 * - Limpia el input después de agregar
 * 
 * Estado:
 * - taskTitle: Almacena el título de la tarea mientras se escribe
 */

import React, { useState } from 'react';

const TaskForm = () => {
  // Estado para almacenar el título de la tarea
  const [taskTitle, setTaskTitle] = useState('');

  /**
   * Maneja el envío del formulario
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir recarga de página
    console.log('Task submitted:', taskTitle);
    // TODO: Agregar lógica de creación de tarea (llamada a API)
    setTaskTitle(''); // Limpiar el input después de agregar
  };

  return (
    // Tarjeta blanca con sombra para el formulario
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
      
      {/* Formulario con input y botón en línea */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        {/* Input para el título de la tarea */}
        <input
          type="text"
          placeholder="Enter task title..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)} // Actualizar estado al escribir
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        
        {/* Botón para agregar la tarea */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;


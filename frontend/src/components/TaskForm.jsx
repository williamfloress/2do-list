/**
 * Componente TaskForm - Formulario para Agregar Tareas
 * 
 * Funcionalidad:
 * - Input para ingresar el título de la tarea
 * - Input opcional para descripción
 * - Botón para agregar la tarea
 * - Estado de carga durante la creación
 * - Manejo de errores
 * - Validación de formulario
 * - Limpia el formulario después de agregar
 * 
 * Estado:
 * - taskTitle: Almacena el título de la tarea mientras se escribe
 * - taskDescription: Almacena la descripción de la tarea
 * - loading: Estado de carga durante la creación
 * - error: Mensaje de error si falla la creación
 */

import React, { useState } from 'react';
import { useTodoStore } from '../store/todoStore';

const TaskForm = () => {
  // Estado local del componente
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [localError, setLocalError] = useState('');

  // Estado del store de tareas
  const { loading, error, createTodo, clearError } = useTodoStore();

  /**
   * Maneja el envío del formulario
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir recarga de página
    
    // Limpiar errores previos
    setLocalError('');
    clearError();

    // Validar datos de entrada
    if (!taskTitle.trim()) {
      setLocalError('El título de la tarea es requerido');
      return;
    }

    if (taskTitle.trim().length > 100) {
      setLocalError('El título no puede tener más de 100 caracteres');
      return;
    }

    if (taskDescription.trim().length > 500) {
      setLocalError('La descripción no puede tener más de 500 caracteres');
      return;
    }

    try {
      // Crear la tarea usando el store
      await createTodo(taskTitle.trim(), taskDescription.trim());
      
      // Limpiar el formulario después de crear exitosamente
      setTaskTitle('');
      setTaskDescription('');
    } catch (error) {
      // El error ya se maneja en el store, solo necesitamos limpiar el formulario
      // si es un error de validación local
      if (error.message.includes('Error al crear tarea')) {
        // El error se mostrará desde el store
      }
    }
  };

  /**
   * Maneja el cambio en el input de título
   * @param {Event} e - Evento del input
   */
  const handleTitleChange = (e) => {
    setTaskTitle(e.target.value);
    // Limpiar error local cuando el usuario empiece a escribir
    if (localError) setLocalError('');
  };

  /**
   * Maneja el cambio en el input de descripción
   * @param {Event} e - Evento del input
   */
  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  // Determinar si el formulario está deshabilitado
  const isFormDisabled = loading || !taskTitle.trim();

  return (
    // Tarjeta blanca con sombra para el formulario
    <div className="card-surface p-6 md:p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Agregar Nueva Tarea</h2>
        <p className="text-gray-500 mt-1">Define objetivos claros y desglósalos en pasos accionables.</p>
      </div>
      
      {/* Mostrar errores */}
      {(localError || error) && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {localError || error}
        </div>
      )}

      {/* Formulario con inputs y botón */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Input para el título de la tarea */}
        <div>
          <label htmlFor="task-title" className="block text-sm font-semibold text-gray-700 mb-2">
            Título de la tarea *
          </label>
          <input
            id="task-title"
            type="text"
            placeholder="Ingresa el título de la tarea..."
            value={taskTitle}
            onChange={handleTitleChange}
            disabled={loading}
            maxLength={100}
            className="w-full rounded-xl border border-gray-200/80 bg-white/80 px-4 py-2.5 text-gray-800 shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:bg-gray-100/80 disabled:cursor-not-allowed"
          />
          <div className="text-xs text-gray-500 mt-1">
            {taskTitle.length}/100 caracteres
          </div>
        </div>

        {/* Input para la descripción de la tarea */}
        <div>
          <label htmlFor="task-description" className="block text-sm font-semibold text-gray-700 mb-2">
            Descripción (opcional)
          </label>
          <textarea
            id="task-description"
            placeholder="Agrega una descripción detallada..."
            value={taskDescription}
            onChange={handleDescriptionChange}
            disabled={loading}
            maxLength={500}
            rows={3}
            className="w-full rounded-xl border border-gray-200/80 bg-white/80 px-4 py-2.5 text-gray-800 shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:bg-gray-100/80 disabled:cursor-not-allowed resize-none"
          />
          <div className="text-xs text-gray-500 mt-1">
            {taskDescription.length}/500 caracteres
          </div>
        </div>
        
        {/* Botón para agregar la tarea */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isFormDisabled}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-indigo-300/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:translate-y-0 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
          >
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {loading ? 'Creando...' : 'Agregar Tarea'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;


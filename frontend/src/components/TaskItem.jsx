/**
 * Componente TaskItem - Elemento Individual de Tarea
 * 
 * Funcionalidad:
 * - Muestra una tarea con su título, descripción y estado
 * - Checkbox para marcar como completada/pendiente
 * - Botón para eliminar la tarea con confirmación
 * - Botón para editar la tarea
 * - Estilo tachado para tareas completadas
 * - Estado de carga para acciones
 * - Manejo de errores
 * - Fecha de creación y actualización
 * 
 * Props:
 * - task: Objeto con { id, title, description, completed, created_at, updated_at }
 */

import React, { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import toast from 'react-hot-toast';

const TaskItem = ({ task }) => {
  // Estado local del componente
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Estado del store de tareas
  const { toggleTodo, updateTodo, deleteTodo } = useTodoStore();

  /**
   * Maneja el cambio de estado de la tarea (completada/pendiente)
   */
  const handleToggle = async () => {
    try {
      setActionLoading(true);
      await toggleTodo(task.id, !task.completed);
      // Toast notification is handled in the store
    } catch (error) {
      // El error ya se maneja en el store con toast
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Maneja la eliminación de la tarea
   */
  const handleDelete = async () => {
    try {
      setActionLoading(true);
      await deleteTodo(task.id);
      setShowDeleteConfirm(false);
      // Toast notification is handled in the store
    } catch (error) {
      // El error ya se maneja en el store con toast
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Maneja el inicio de la edición
   */
  const handleStartEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(true);
  };

  /**
   * Maneja la cancelación de la edición
   */
  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  /**
   * Maneja el guardado de la edición
   */
  const handleSaveEdit = async () => {
    try {
      setActionLoading(true);
      
      // Validar datos
      if (!editTitle.trim()) {
        toast.error('El título no puede estar vacío');
        return;
      }

      await updateTodo(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      
      setIsEditing(false);
      // Toast notification is handled in the store
    } catch (error) {
      // El error ya se maneja en el store con toast
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Formatear fecha para mostrar
   * @param {string} dateString - Fecha en formato ISO
   * @returns {string} Fecha formateada
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Determinar si la tarea fue actualizada recientemente
   * @param {string} created - Fecha de creación
   * @param {string} updated - Fecha de actualización
   * @returns {boolean} True si fue actualizada recientemente
   */
  const isRecentlyUpdated = (created, updated) => {
    const createdDate = new Date(created);
    const updatedDate = new Date(updated);
    return updatedDate.getTime() - createdDate.getTime() > 1000; // Más de 1 segundo de diferencia
  };

  return (
    <>
      {/* Contenedor principal de la tarea */}
      <div
        className={`card-surface p-5 transition-all duration-300 ${
          task.completed
            ? 'border-emerald-200/70 bg-emerald-50/80 text-emerald-800 shadow-md'
            : 'hover:-translate-y-0.5 hover:shadow-xl'
        }`}
      >
        
        {/* Contenido principal */}
        <div className="flex items-start justify-between">
          {/* Lado izquierdo: Checkbox y contenido */}
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            {/* Checkbox para marcar como completada */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              disabled={actionLoading}
              className={`mt-1 h-5 w-5 cursor-pointer rounded border border-gray-300 text-indigo-600 shadow-sm focus:ring-2 focus:ring-indigo-500 ${
                actionLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
            
            {/* Contenido de la tarea */}
            <div className="flex-1 min-w-0">
              {isEditing ? (
                /* Modo edición */
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Título de la tarea..."
                    maxLength={100}
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    placeholder="Descripción (opcional)..."
                    rows={2}
                    maxLength={500}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      disabled={actionLoading || !editTitle.trim()}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm rounded transition-colors"
                    >
                      {actionLoading ? 'Guardando...' : 'Guardar'}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={actionLoading}
                      className="px-3 py-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white text-sm rounded transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                /* Modo visualización */
                <div>
                  {/* Título de la tarea */}
                  <h3 className={`text-lg font-semibold ${
                    task.completed
                      ? 'line-through text-emerald-600/70'
                      : 'text-gray-900'
                  }`}>
                    {task.title}
                  </h3>
                  
                  {/* Descripción si existe */}
                  {task.description && (
                    <p className={`mt-2 text-sm leading-relaxed ${
                      task.completed
                        ? 'line-through text-emerald-600/70'
                        : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                  )}
                  
                  {/* Fechas */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                    <span className="font-medium text-gray-500">
                      Creada: {formatDate(task.created_at)}
                    </span>
                    {isRecentlyUpdated(task.created_at, task.updated_at) && (
                      <span className="flex items-center gap-1 text-indigo-500">
                        <span className="text-gray-400">•</span>
                        Actualizada: {formatDate(task.updated_at)}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Lado derecho: Botones de acción */}
          {!isEditing && (
            <div className="ml-4 flex items-center space-x-2">
              {/* Botón de editar */}
              <button
                onClick={handleStartEdit}
                disabled={actionLoading}
                className="rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 disabled:bg-blue-50 disabled:text-blue-300"
                title="Editar tarea"
              >
                ✏️
              </button>
              
              {/* Botón de eliminar */}
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={actionLoading}
                className="rounded-full bg-red-50 px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-100 disabled:bg-red-50 disabled:text-red-300"
                title="Eliminar tarea"
              >
                🗑️
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform transition-all animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Confirmar eliminación
            </h3>
            <p className="text-gray-600 mb-4">
              ¿Estás seguro de que quieres eliminar la tarea "{task.title}"? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={actionLoading}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white rounded transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={actionLoading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded transition-colors flex items-center gap-2"
              >
                {actionLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                {actionLoading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;


/**
 * Componente TaskList - Lista de Tareas
 * 
 * Funcionalidad:
 * - Muestra todas las tareas del usuario autenticado
 * - Renderiza cada tarea usando el componente TaskItem
 * - Muestra un mensaje cuando no hay tareas
 * - Estado de carga mientras se obtienen las tareas
 * - Manejo de errores
 * - Estadísticas de tareas
 * - Filtros de tareas (todas, completadas, pendientes)
 * 
 * Características:
 * - Carga automática de tareas al montar el componente
 * - Actualización reactiva cuando cambian las tareas
 * - Interfaz responsive y accesible
 */

import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { useTodoStore } from '../store/todoStore';

const TaskList = () => {
  // Estado local para filtros
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Estado del store de tareas
  const { 
    todos, 
    loading, 
    error, 
    stats, 
    fetchTodos, 
    clearError,
    getFilteredTodos,
    searchTodos 
  } = useTodoStore();

  /**
   * Cargar tareas al montar el componente
   */
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  /**
   * Manejar cambio de filtro
   * @param {string} newFilter - Nuevo filtro a aplicar
   */
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSearchTerm(''); // Limpiar búsqueda al cambiar filtro
  };

  /**
   * Manejar cambio en búsqueda
   * @param {Event} e - Evento del input
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Obtener tareas filtradas y buscadas
   */
  const getDisplayedTodos = () => {
    let filteredTodos = getFilteredTodos(filter);
    
    if (searchTerm.trim()) {
      filteredTodos = searchTodos(searchTerm);
    }
    
    return filteredTodos;
  };

  const displayedTodos = getDisplayedTodos();

  /**
   * Formatear fecha para mostrar
   * @param {string} dateString - Fecha en formato ISO
   * @returns {string} Fecha formateada
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    // Tarjeta blanca con sombra para la lista de tareas
    <div className="card-surface p-6 md:p-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
          Mis Tareas
          </h2>
          <p className="text-gray-500">Organiza, filtra y encuentra tus pendientes rápidamente.</p>
        </div>
        
        {/* Estadísticas */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-600">
            Total: {stats.total}
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-600">
            Completadas: {stats.completed}
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-600">
            Pendientes: {stats.pending}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
            Progreso: {stats.completionRate}%
          </span>
        </div>
      </div>

      {/* Barra de filtros y búsqueda */}
      <div className="space-y-4">
        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-indigo-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas ({stats.total})
          </button>
          <button
            onClick={() => handleFilterChange('pending')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm ${
              filter === 'pending'
                ? 'bg-amber-500 text-white shadow-amber-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pendientes ({stats.pending})
          </button>
          <button
            onClick={() => handleFilterChange('completed')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm ${
              filter === 'completed'
                ? 'bg-emerald-500 text-white shadow-emerald-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completadas ({stats.completed})
          </button>
        </div>

        {/* Búsqueda */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full rounded-xl border border-gray-200/80 bg-white/80 px-4 py-2.5 pl-11 text-gray-700 shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mostrar errores */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={clearError}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            ✕
          </button>
        </div>
      )}

      {/* Estado de carga */}
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-10 text-indigo-600">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-indigo-300">
            <div className="h-3 w-3 animate-ping rounded-full bg-indigo-500"></div>
          </div>
          <span className="text-sm font-medium tracking-wide">Cargando tareas...</span>
        </div>
      )}

      {/* Lista de tareas */}
      {!loading && (
        <>
          {/* Renderizado condicional: mostrar mensaje si no hay tareas */}
          {displayedTodos.length === 0 ? (
            <div className="text-center py-10">
              {searchTerm ? (
                <div>
                  <p className="text-gray-500 mb-2">
                    No se encontraron tareas que coincidan con "{searchTerm}"
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    Limpiar búsqueda
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-500 mb-2">
                    {filter === 'all' && 'No tienes tareas aún.'}
                    {filter === 'pending' && 'No tienes tareas pendientes.'}
                    {filter === 'completed' && 'No tienes tareas completadas.'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {filter === 'all' && '¡Agrega una tarea usando el formulario de arriba!'}
                    {filter !== 'all' && 'Cambia el filtro para ver otras tareas.'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Lista de tareas con espaciado vertical
            <div className="space-y-4">
              {/* Mapear cada tarea a un componente TaskItem */}
              {displayedTodos.map((task, index) => (
                <div
                  key={task.id}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <TaskItem task={task} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskList;


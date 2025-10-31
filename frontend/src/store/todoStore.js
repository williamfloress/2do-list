import { create } from 'zustand';
import toast from 'react-hot-toast';
import { todoService } from '../services/todoService';
import { supabase } from '../config/supabaseClient';

/**
 * Store de gestión de tareas usando Zustand
 * 
 * Este store maneja el estado global de las tareas:
 * - Lista de tareas del usuario
 * - Estado de carga para operaciones async
 * - Errores de operaciones
 * - Estadísticas de tareas
 * - Acciones CRUD (crear, leer, actualizar, eliminar)
 * - Suscripciones en tiempo real con Supabase
 * 
 * Características:
 * - Estado reactivo con Zustand
 * - Operaciones asíncronas con manejo de errores
 * - Optimistic updates para mejor UX
 * - Estadísticas calculadas automáticamente
 * - Actualizaciones en tiempo real con Supabase Realtime
 * 
 * Uso en componentes:
 * import { useTodoStore } from '../store/todoStore';
 * 
 * const { todos, loading, error, fetchTodos, createTodo, subscribeToRealtime } = useTodoStore();
 */
export const useTodoStore = create((set, get) => ({
  // Estado
  todos: [],                    // Lista de tareas
  loading: false,               // Estado de carga durante operaciones async
  error: null,                 // Mensajes de error
  realtimeEnabled: false,     // Estado de suscripción en tiempo real
  channel: null,               // Canal de Supabase Realtime
  stats: {                     // Estadísticas de tareas
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0
  },

  /**
   * Obtener todas las tareas del usuario
   * Actualiza el estado con las tareas obtenidas y recalcula estadísticas
   */
  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const todos = await todoService.getTodos();
      const stats = await todoService.getTodoStats();
      
      set({ 
        todos, 
        stats, 
        loading: false 
      });
      
      return todos;
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false 
      });
      throw error;
    }
  },

  /**
   * Crear nueva tarea
   * Actualiza el estado optimísticamente y luego sincroniza con el servidor
   * 
   * @param {string} title - Título de la tarea
   * @param {string} description - Descripción de la tarea
   */
  createTodo: async (title, description = '') => {
    set({ loading: true, error: null });
    try {
      const newTodo = await todoService.createTodo(title, description);
      
      // Actualizar estado con la nueva tarea
      set(state => ({
        todos: [newTodo, ...state.todos],
        loading: false
      }));

      // Recalcular estadísticas
      await get().updateStats();
      
      toast.success('Tarea creada exitosamente');
      return newTodo;
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false 
      });
      toast.error(error.message || 'Error al crear tarea');
      throw error;
    }
  },

  /**
   * Actualizar tarea existente
   * 
   * @param {string} id - ID de la tarea
   * @param {Object} updates - Campos a actualizar
   */
  updateTodo: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const updatedTodo = await todoService.updateTodo(id, updates);
      
      // Actualizar estado con la tarea modificada
      set(state => ({
        todos: state.todos.map(todo => 
          todo.id === id ? updatedTodo : todo
        ),
        loading: false
      }));

      // Recalcular estadísticas
      await get().updateStats();
      
      toast.success('Tarea actualizada');
      return updatedTodo;
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false 
      });
      toast.error(error.message || 'Error al actualizar tarea');
      throw error;
    }
  },

  /**
   * Eliminar tarea
   * 
   * @param {string} id - ID de la tarea a eliminar
   */
  deleteTodo: async (id) => {
    set({ loading: true, error: null });
    try {
      await todoService.deleteTodo(id);
      
      // Remover tarea del estado
      set(state => ({
        todos: state.todos.filter(todo => todo.id !== id),
        loading: false
      }));

      // Recalcular estadísticas
      await get().updateStats();
      
      toast.success('Tarea eliminada');
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false 
      });
      toast.error(error.message || 'Error al eliminar tarea');
      throw error;
    }
  },

  /**
   * Cambiar estado de completado de una tarea
   * 
   * @param {string} id - ID de la tarea
   * @param {boolean} completed - Nuevo estado de completado
   */
  toggleTodo: async (id, completed) => {
    return await get().updateTodo(id, { completed });
  },

  /**
   * Actualizar estadísticas de tareas
   * Calcula estadísticas basadas en el estado actual
   */
  updateStats: async () => {
    try {
      const stats = await todoService.getTodoStats();
      set({ stats });
    } catch (error) {
      console.error('Error al actualizar estadísticas:', error);
    }
  },

  /**
   * Limpiar error
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Establecer estado de carga manualmente
   * 
   * @param {boolean} loading - Estado de carga
   */
  setLoading: (loading) => {
    set({ loading });
  },

  /**
   * Obtener tarea por ID
   * 
   * @param {string} id - ID de la tarea
   * @returns {Object|null} Tarea encontrada o null
   */
  getTodoById: (id) => {
    const { todos } = get();
    return todos.find(todo => todo.id === id) || null;
  },

  /**
   * Filtrar tareas por estado
   * 
   * @param {string} filter - Filtro a aplicar ('all', 'completed', 'pending')
   * @returns {Array} Tareas filtradas
   */
  getFilteredTodos: (filter = 'all') => {
    const { todos } = get();
    
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      case 'all':
      default:
        return todos;
    }
  },

  /**
   * Buscar tareas por texto
   * 
   * @param {string} searchTerm - Término de búsqueda
   * @returns {Array} Tareas que coinciden con la búsqueda
   */
  searchTodos: (searchTerm) => {
    const { todos } = get();
    
    if (!searchTerm || searchTerm.trim().length === 0) {
      return todos;
    }

    const term = searchTerm.toLowerCase().trim();
    return todos.filter(todo => 
      todo.title.toLowerCase().includes(term) ||
      todo.description.toLowerCase().includes(term)
    );
  },

  /**
   * Suscribirse a cambios en tiempo real de Supabase
   * Maneja INSERT, UPDATE y DELETE events
   * 
   * @returns {Function} Función para desuscribirse
   */
  subscribeToRealtime: () => {
    const { channel } = get();
    
    // Si ya hay una suscripción activa, retornar
    if (channel) {
      return () => {};
    }

    console.log('🔴 Suscribiéndose a cambios en tiempo real...');
    
    // Crear nuevo canal
    const newChannel = supabase
      .channel('todos-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'todos',
          filter: 'user_id=eq.' + (supabase.auth.getUser() || {})?.data?.user?.id
        },
        async (payload) => {
          console.log('📡 Cambio en tiempo real recibido:', payload);
          
          // Actualizar estado local según el evento
          switch (payload.eventType) {
            case 'INSERT': {
              // Agregar nueva tarea
              set(state => ({
                todos: [payload.new, ...state.todos]
              }));
              // Actualizar estadísticas
              await get().updateStats();
              break;
            }
            
            case 'UPDATE': {
              // Actualizar tarea existente
              set(state => ({
                todos: state.todos.map(todo =>
                  todo.id === payload.new.id ? payload.new : todo
                )
              }));
              // Actualizar estadísticas
              await get().updateStats();
              break;
            }
            
            case 'DELETE': {
              // Eliminar tarea
              set(state => ({
                todos: state.todos.filter(todo => todo.id !== payload.old.id)
              }));
              // Actualizar estadísticas
              await get().updateStats();
              break;
            }
          }
        }
      )
      .subscribe((status) => {
        console.log('📡 Estado de suscripción Realtime:', status);
        if (status === 'SUBSCRIBED') {
          set({ realtimeEnabled: true });
        }
      });

    // Guardar canal en el estado
    set({ channel: newChannel, realtimeEnabled: true });

    // Retornar función de cleanup
    return () => {
      console.log('🔴 Desuscribiéndose de cambios en tiempo real...');
      newChannel.unsubscribe();
      set({ channel: null, realtimeEnabled: false });
    };
  },

  /**
   * Desuscribirse de cambios en tiempo real
   */
  unsubscribeFromRealtime: () => {
    const { channel } = get();
    if (channel) {
      console.log('🔴 Desuscribiéndose de cambios en tiempo real...');
      channel.unsubscribe();
      set({ channel: null, realtimeEnabled: false });
    }
  },

  /**
   * Resetear store (útil para logout)
   * También limpia las suscripciones de Realtime
   */
  reset: () => {
    // Desuscribirse de Realtime
    const { channel } = get();
    if (channel) {
      channel.unsubscribe();
    }
    
    set({
      todos: [],
      loading: false,
      error: null,
      realtimeEnabled: false,
      channel: null,
      stats: {
        total: 0,
        completed: 0,
        pending: 0,
        completionRate: 0
      }
    });
  }
}));

export default useTodoStore;

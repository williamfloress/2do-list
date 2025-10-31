import { supabase } from '../config/supabaseClient';

/**
 * Servicio para operaciones CRUD de tareas
 * 
 * Este servicio maneja todas las operaciones relacionadas con las tareas:
 * - Obtener todas las tareas del usuario autenticado
 * - Crear nuevas tareas
 * - Actualizar tareas existentes
 * - Eliminar tareas
 * - Cambiar estado de completado
 * 
 * Características:
 * - Respeta las políticas de Row Level Security (RLS)
 * - Manejo de errores consistente
 * - Operaciones asíncronas con async/await
 * - Validación de datos básica
 * 
 * Uso en componentes:
 * import { todoService } from '../services/todoService';
 * 
 * const todos = await todoService.getTodos();
 */
export const todoService = {
  /**
   * Obtener todas las tareas del usuario autenticado
   * 
   * @returns {Promise<Array>} Array de tareas ordenadas por fecha de creación (más recientes primero)
   * @throws {Error} Si hay error en la consulta o usuario no autenticado
   */
  async getTodos() {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      throw new Error(`Error al cargar tareas: ${error.message}`);
    }
  },

  /**
   * Crear nueva tarea
   * 
   * @param {string} title - Título de la tarea (requerido)
   * @param {string} description - Descripción de la tarea (opcional)
   * @returns {Promise<Object>} Tarea creada con todos sus datos
   * @throws {Error} Si hay error en la creación o datos inválidos
   */
  async createTodo(title, description = '') {
    try {
      // Validar datos de entrada
      if (!title || title.trim().length === 0) {
        throw new Error('El título de la tarea es requerido');
      }

      // Obtener usuario actual
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Usuario no autenticado');
      }

      // Crear la tarea
      const { data, error } = await supabase
        .from('todos')
        .insert([
          { 
            title: title.trim(), 
            description: description.trim(),
            user_id: user.id 
          }
        ])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error al crear tarea:', error);
      throw new Error(`Error al crear tarea: ${error.message}`);
    }
  },

  /**
   * Actualizar tarea existente
   * 
   * @param {string} id - ID de la tarea a actualizar
   * @param {Object} updates - Objeto con los campos a actualizar
   * @returns {Promise<Object>} Tarea actualizada
   * @throws {Error} Si hay error en la actualización o tarea no encontrada
   */
  async updateTodo(id, updates) {
    try {
      // Validar ID
      if (!id) {
        throw new Error('ID de tarea requerido');
      }

      // Validar que hay algo que actualizar
      if (!updates || Object.keys(updates).length === 0) {
        throw new Error('No hay datos para actualizar');
      }

      // Limpiar datos de entrada
      const cleanUpdates = {};
      if (updates.title !== undefined) {
        if (!updates.title || updates.title.trim().length === 0) {
          throw new Error('El título no puede estar vacío');
        }
        cleanUpdates.title = updates.title.trim();
      }
      if (updates.description !== undefined) {
        cleanUpdates.description = updates.description.trim();
      }
      if (updates.completed !== undefined) {
        cleanUpdates.completed = Boolean(updates.completed);
      }

      // Actualizar la tarea
      const { data, error } = await supabase
        .from('todos')
        .update(cleanUpdates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      if (!data) {
        throw new Error('Tarea no encontrada');
      }
      
      return data;
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      throw new Error(`Error al actualizar tarea: ${error.message}`);
    }
  },

  /**
   * Eliminar tarea
   * 
   * @param {string} id - ID de la tarea a eliminar
   * @returns {Promise<void>}
   * @throws {Error} Si hay error en la eliminación o tarea no encontrada
   */
  async deleteTodo(id) {
    try {
      // Validar ID
      if (!id) {
        throw new Error('ID de tarea requerido');
      }

      // Eliminar la tarea
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      throw new Error(`Error al eliminar tarea: ${error.message}`);
    }
  },

  /**
   * Cambiar estado de completado de una tarea
   * 
   * @param {string} id - ID de la tarea
   * @param {boolean} completed - Nuevo estado de completado
   * @returns {Promise<Object>} Tarea actualizada
   * @throws {Error} Si hay error en la actualización
   */
  async toggleTodo(id, completed) {
    try {
      return await this.updateTodo(id, { completed });
    } catch (error) {
      console.error('Error al cambiar estado de tarea:', error);
      throw new Error(`Error al cambiar estado: ${error.message}`);
    }
  },

  /**
   * Obtener estadísticas de tareas del usuario
   * 
   * @returns {Promise<Object>} Objeto con estadísticas (total, completadas, pendientes)
   * @throws {Error} Si hay error en la consulta
   */
  async getTodoStats() {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('completed');
      
      if (error) throw error;

      const todos = data || [];
      const total = todos.length;
      const completed = todos.filter(todo => todo.completed).length;
      const pending = total - completed;

      return {
        total,
        completed,
        pending,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
      };
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }
  }
};

export default todoService;

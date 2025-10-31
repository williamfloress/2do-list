// Importar el cliente de Supabase
import { supabase } from '../config/supabaseClient.js';

/**
 * Controlador para operaciones CRUD de tareas
 * Maneja todas las operaciones relacionadas con las tareas del usuario
 */

/**
 * Obtener todas las tareas del usuario autenticado
 * GET /api/todos
 */
export const getTodos = async (req, res) => {
  try {
    const userId = req.user.id;

    // Obtener todas las tareas del usuario desde Supabase
    const { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al obtener tareas:', error);
      return res.status(500).json({ 
        error: 'Error al obtener las tareas',
        details: error.message 
      });
    }

    res.json({
      success: true,
      data: todos,
      count: todos.length
    });

  } catch (error) {
    console.error('Error en getTodos:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
};

/**
 * Crear una nueva tarea
 * POST /api/todos
 */
export const createTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description } = req.body;

    // Validar datos de entrada
    if (!title || title.trim() === '') {
      return res.status(400).json({ 
        error: 'El título es requerido',
        field: 'title'
      });
    }

    // Limpiar y validar el título
    const cleanTitle = title.trim();
    if (cleanTitle.length > 255) {
      return res.status(400).json({ 
        error: 'El título no puede exceder 255 caracteres',
        field: 'title'
      });
    }

    // Limpiar la descripción (opcional)
    const cleanDescription = description ? description.trim() : '';

    // Crear la nueva tarea en Supabase
    const { data: newTodo, error } = await supabase
      .from('todos')
      .insert([
        { 
          title: cleanTitle, 
          description: cleanDescription,
          user_id: userId 
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error al crear tarea:', error);
      return res.status(500).json({ 
        error: 'Error al crear la tarea',
        details: error.message 
      });
    }

    res.status(201).json({
      success: true,
      data: newTodo,
      message: 'Tarea creada exitosamente'
    });

  } catch (error) {
    console.error('Error en createTodo:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
};

/**
 * Actualizar una tarea existente
 * PUT /api/todos/:id
 */
export const updateTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Validar que el ID sea un UUID válido
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ 
        error: 'ID de tarea inválido',
        field: 'id'
      });
    }

    // Preparar los datos a actualizar
    const updates = {};
    
    if (title !== undefined) {
      if (!title || title.trim() === '') {
        return res.status(400).json({ 
          error: 'El título es requerido',
          field: 'title'
        });
      }
      const cleanTitle = title.trim();
      if (cleanTitle.length > 255) {
        return res.status(400).json({ 
          error: 'El título no puede exceder 255 caracteres',
          field: 'title'
        });
      }
      updates.title = cleanTitle;
    }

    if (description !== undefined) {
      updates.description = description ? description.trim() : '';
    }

    if (completed !== undefined) {
      updates.completed = Boolean(completed);
    }

    // Verificar que hay al menos un campo para actualizar
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ 
        error: 'No hay campos para actualizar',
        fields: ['title', 'description', 'completed']
      });
    }

    // Actualizar la tarea en Supabase
    const { data: updatedTodo, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId) // Asegurar que solo actualice tareas del usuario
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar tarea:', error);
      return res.status(500).json({ 
        error: 'Error al actualizar la tarea',
        details: error.message 
      });
    }

    // Si no se encontró la tarea, significa que no existe o no pertenece al usuario
    if (!updatedTodo) {
      return res.status(404).json({ 
        error: 'Tarea no encontrada o no tienes permisos para modificarla'
      });
    }

    res.json({
      success: true,
      data: updatedTodo,
      message: 'Tarea actualizada exitosamente'
    });

  } catch (error) {
    console.error('Error en updateTodo:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
};

/**
 * Eliminar una tarea
 * DELETE /api/todos/:id
 */
export const deleteTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Validar que el ID sea un UUID válido
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ 
        error: 'ID de tarea inválido',
        field: 'id'
      });
    }

    // Eliminar la tarea de Supabase
    const { data: deletedTodo, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .eq('user_id', userId) // Asegurar que solo elimine tareas del usuario
      .select()
      .single();

    if (error) {
      console.error('Error al eliminar tarea:', error);
      return res.status(500).json({ 
        error: 'Error al eliminar la tarea',
        details: error.message 
      });
    }

    // Si no se encontró la tarea, significa que no existe o no pertenece al usuario
    if (!deletedTodo) {
      return res.status(404).json({ 
        error: 'Tarea no encontrada o no tienes permisos para eliminarla'
      });
    }

    res.json({
      success: true,
      data: deletedTodo,
      message: 'Tarea eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error en deleteTodo:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
};

/**
 * Alternar el estado de completado de una tarea
 * PATCH /api/todos/:id/toggle
 */
export const toggleTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Validar que el ID sea un UUID válido
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ 
        error: 'ID de tarea inválido',
        field: 'id'
      });
    }

    // Primero obtener la tarea actual para conocer su estado
    const { data: currentTodo, error: fetchError } = await supabase
      .from('todos')
      .select('completed')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (fetchError) {
      console.error('Error al obtener tarea:', fetchError);
      return res.status(500).json({ 
        error: 'Error al obtener la tarea',
        details: fetchError.message 
      });
    }

    if (!currentTodo) {
      return res.status(404).json({ 
        error: 'Tarea no encontrada o no tienes permisos para modificarla'
      });
    }

    // Alternar el estado de completado
    const newCompletedState = !currentTodo.completed;

    // Actualizar la tarea con el nuevo estado
    const { data: updatedTodo, error } = await supabase
      .from('todos')
      .update({ completed: newCompletedState })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error al alternar estado de tarea:', error);
      return res.status(500).json({ 
        error: 'Error al actualizar el estado de la tarea',
        details: error.message 
      });
    }

    res.json({
      success: true,
      data: updatedTodo,
      message: `Tarea ${newCompletedState ? 'completada' : 'marcada como pendiente'}`
    });

  } catch (error) {
    console.error('Error en toggleTodo:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
};

/**
 * Obtener una tarea específica por ID
 * GET /api/todos/:id
 */
export const getTodoById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Validar que el ID sea un UUID válido
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ 
        error: 'ID de tarea inválido',
        field: 'id'
      });
    }

    // Obtener la tarea específica desde Supabase
    const { data: todo, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error al obtener tarea:', error);
      return res.status(500).json({ 
        error: 'Error al obtener la tarea',
        details: error.message 
      });
    }

    if (!todo) {
      return res.status(404).json({ 
        error: 'Tarea no encontrada o no tienes permisos para verla'
      });
    }

    res.json({
      success: true,
      data: todo
    });

  } catch (error) {
    console.error('Error en getTodoById:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
};

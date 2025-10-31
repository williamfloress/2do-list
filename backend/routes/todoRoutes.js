// Importar Express Router
import express from 'express';

// Importar controladores de tareas
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  getTodoById
} from '../controllers/todoController.js';

// Importar middleware de autenticación
import { authMiddleware } from '../middleware/authMiddleware.js';

// Crear el router
const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// ===== RUTAS DE TAREAS =====

/**
 * GET /api/todos
 * Obtener todas las tareas del usuario autenticado
 * 
 * Respuesta exitosa (200):
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "id": "uuid",
 *       "title": "Título de la tarea",
 *       "description": "Descripción opcional",
 *       "completed": false,
 *       "created_at": "2024-01-01T00:00:00Z",
 *       "updated_at": "2024-01-01T00:00:00Z"
 *     }
 *   ],
 *   "count": 1
 * }
 * 
 * Error de autenticación (401):
 * {
 *   "error": "Token de autorización requerido"
 * }
 */
router.get('/', getTodos);

/**
 * GET /api/todos/:id
 * Obtener una tarea específica por ID
 * 
 * Parámetros:
 * - id: UUID de la tarea
 * 
 * Respuesta exitosa (200):
 * {
 *   "success": true,
 *   "data": {
 *     "id": "uuid",
 *     "title": "Título de la tarea",
 *     "description": "Descripción opcional",
 *     "completed": false,
 *     "created_at": "2024-01-01T00:00:00Z",
 *     "updated_at": "2024-01-01T00:00:00Z"
 *   }
 * }
 * 
 * Error de tarea no encontrada (404):
 * {
 *   "error": "Tarea no encontrada o no tienes permisos para verla"
 * }
 */
router.get('/:id', getTodoById);

/**
 * POST /api/todos
 * Crear una nueva tarea
 * 
 * Body:
 * {
 *   "title": "Título de la tarea (requerido)",
 *   "description": "Descripción opcional"
 * }
 * 
 * Respuesta exitosa (201):
 * {
 *   "success": true,
 *   "data": {
 *     "id": "uuid",
 *     "title": "Título de la tarea",
 *     "description": "Descripción opcional",
 *     "completed": false,
 *     "created_at": "2024-01-01T00:00:00Z",
 *     "updated_at": "2024-01-01T00:00:00Z"
 *   },
 *   "message": "Tarea creada exitosamente"
 * }
 * 
 * Error de validación (400):
 * {
 *   "error": "El título es requerido",
 *   "field": "title"
 * }
 */
router.post('/', createTodo);

/**
 * PUT /api/todos/:id
 * Actualizar una tarea existente
 * 
 * Parámetros:
 * - id: UUID de la tarea
 * 
 * Body (todos los campos son opcionales):
 * {
 *   "title": "Nuevo título",
 *   "description": "Nueva descripción",
 *   "completed": true
 * }
 * 
 * Respuesta exitosa (200):
 * {
 *   "success": true,
 *   "data": {
 *     "id": "uuid",
 *     "title": "Nuevo título",
 *     "description": "Nueva descripción",
 *     "completed": true,
 *     "created_at": "2024-01-01T00:00:00Z",
 *     "updated_at": "2024-01-01T00:00:00Z"
 *   },
 *   "message": "Tarea actualizada exitosamente"
 * }
 * 
 * Error de tarea no encontrada (404):
 * {
 *   "error": "Tarea no encontrada o no tienes permisos para modificarla"
 * }
 */
router.put('/:id', updateTodo);

/**
 * PATCH /api/todos/:id/toggle
 * Alternar el estado de completado de una tarea
 * 
 * Parámetros:
 * - id: UUID de la tarea
 * 
 * Respuesta exitosa (200):
 * {
 *   "success": true,
 *   "data": {
 *     "id": "uuid",
 *     "title": "Título de la tarea",
 *     "description": "Descripción opcional",
 *     "completed": true,
 *     "created_at": "2024-01-01T00:00:00Z",
 *     "updated_at": "2024-01-01T00:00:00Z"
 *   },
 *   "message": "Tarea completada"
 * }
 * 
 * Error de tarea no encontrada (404):
 * {
 *   "error": "Tarea no encontrada o no tienes permisos para modificarla"
 * }
 */
router.patch('/:id/toggle', toggleTodo);

/**
 * DELETE /api/todos/:id
 * Eliminar una tarea
 * 
 * Parámetros:
 * - id: UUID de la tarea
 * 
 * Respuesta exitosa (200):
 * {
 *   "success": true,
 *   "data": {
 *     "id": "uuid",
 *     "title": "Título de la tarea",
 *     "description": "Descripción opcional",
 *     "completed": false,
 *     "created_at": "2024-01-01T00:00:00Z",
 *     "updated_at": "2024-01-01T00:00:00Z"
 *   },
 *   "message": "Tarea eliminada exitosamente"
 * }
 * 
 * Error de tarea no encontrada (404):
 * {
 *   "error": "Tarea no encontrada o no tienes permisos para eliminarla"
 * }
 */
router.delete('/:id', deleteTodo);

// ===== MANEJO DE ERRORES ESPECÍFICOS DEL ROUTER =====

// Middleware para manejar rutas no encontradas en este router
router.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.method} ${req.originalUrl} no existe en el API de tareas`,
    availableRoutes: [
      'GET /api/todos - Obtener todas las tareas',
      'GET /api/todos/:id - Obtener una tarea específica',
      'POST /api/todos - Crear una nueva tarea',
      'PUT /api/todos/:id - Actualizar una tarea',
      'PATCH /api/todos/:id/toggle - Alternar estado de completado',
      'DELETE /api/todos/:id - Eliminar una tarea'
    ]
  });
});

// Exportar el router
export default router;

// Importar el cliente de Supabase
import { supabase } from '../config/supabaseClient.js';

/**
 * Middleware de autenticación
 * Verifica el token JWT en el header Authorization
 * Extrae el usuario del token y lo agrega al objeto request
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Token de autorización requerido',
        message: 'Debes incluir el header Authorization con el token JWT'
      });
    }

    // Extraer el token (formato: "Bearer <token>")
    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token de autorización inválido',
        message: 'El formato del token debe ser: Bearer <token>'
      });
    }

    // Verificar el token con Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error('Error al verificar token:', error);
      return res.status(401).json({ 
        error: 'Token inválido',
        message: 'El token proporcionado no es válido o ha expirado'
      });
    }

    if (!user) {
      return res.status(401).json({ 
        error: 'Usuario no encontrado',
        message: 'No se pudo identificar al usuario con el token proporcionado'
      });
    }

    // Agregar el usuario al objeto request para uso en los controladores
    req.user = user;
    
    // Continuar con el siguiente middleware o controlador
    next();

  } catch (error) {
    console.error('Error en authMiddleware:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: 'Error al procesar la autenticación'
    });
  }
};

/**
 * Middleware opcional para verificar si el usuario está autenticado
 * No requiere token, solo verifica si hay uno válido
 * Útil para rutas que pueden funcionar con o sin autenticación
 */
export const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      // No hay token, continuar sin usuario
      req.user = null;
      return next();
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
      req.user = null;
      return next();
    }

    // Intentar verificar el token
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      // Token inválido, continuar sin usuario
      req.user = null;
      return next();
    }

    // Token válido, agregar usuario
    req.user = user;
    next();

  } catch (error) {
    console.error('Error en optionalAuthMiddleware:', error);
    // En caso de error, continuar sin usuario
    req.user = null;
    next();
  }
};

// Importar el cliente de Supabase y dotenv
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Obtener credenciales de Supabase desde las variables de entorno
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Clave de servicio con privilegios de admin

// Validar que las variables de entorno existan
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('¡Faltan variables de entorno de Supabase!');
  console.error('Por favor verifica tu archivo .env y asegúrate de que SUPABASE_URL y SUPABASE_SERVICE_KEY estén configuradas.');
  throw new Error('Faltan configuraciones requeridas de Supabase');
}

/**
 * Cliente de Supabase para el backend
 * 
 * Configuración:
 * - Usa la service_role key (privilegios administrativos)
 * - Puede ignorar Row Level Security (RLS)
 * - No mantiene sesiones de usuario (es servidor)
 * - autoRefreshToken: false - No necesitamos refrescar tokens automáticamente
 * - persistSession: false - No persistimos sesiones en el servidor
 */
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,  // Desactivar refresco automático de tokens
    persistSession: false      // No persistir sesiones (servidor sin estado)
  }
});

// Registrar inicialización exitosa solo en desarrollo
if (process.env.NODE_ENV === 'development') {
  console.log('✅ Cliente Supabase inicializado correctamente (Backend)');
}


// Importar el cliente de Supabase
import { createClient } from '@supabase/supabase-js';

/**
 * Configuración del cliente de Supabase para el Frontend
 * 
 * Este cliente se utiliza para:
 * - Autenticación de usuarios (login, registro, logout)
 * - Operaciones CRUD en la base de datos con permisos de usuario
 * - Respeta las políticas de Row Level Security (RLS)
 */

// Obtener credenciales de Supabase desde las variables de entorno de Vite
// Nota: Las variables de Vite deben empezar con VITE_ para ser accesibles
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Clave anónima (pública) con acceso limitado

// Validar que las variables de entorno existan
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('¡Faltan variables de entorno de Supabase!');
  console.error('Por favor verifica tu archivo .env y asegúrate de que VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY estén configuradas.');
}

/**
 * Cliente de Supabase exportado
 * 
 * Uso en componentes:
 * import { supabase } from '../config/supabaseClient';
 * 
 * Ejemplos:
 * - Autenticación: supabase.auth.signIn({ email, password })
 * - Consultar datos: supabase.from('tabla').select('*')
 * - Insertar datos: supabase.from('tabla').insert({ ... })
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);


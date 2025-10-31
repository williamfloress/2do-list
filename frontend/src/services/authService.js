import { supabase } from '../config/supabaseClient';

/**
 * Servicio de autenticación usando Supabase
 * 
 * Este servicio proporciona todas las funcionalidades de autenticación:
 * - Registro de nuevos usuarios (signup)
 * - Inicio de sesión (login)
 * - Cierre de sesión (logout)
 * - Obtener usuario actual
 * - Escuchar cambios en la autenticación
 */
export const authService = {
  /**
   * Registrar nuevo usuario
   * 
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario (mínimo 6 caracteres)
   * @returns {Promise<Object>} Datos del usuario registrado y sesión
   * @throws {Error} Si ocurre un error durante el registro
   */
  async signup(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        // Mejorar mensajes de error para el usuario
        if (error.message.includes('already registered')) {
          throw new Error('Este correo electrónico ya está registrado');
        }
        if (error.message.includes('password')) {
          throw new Error('La contraseña debe tener al menos 6 caracteres');
        }
        throw new Error(error.message);
      }
      
      return data;
    } catch (error) {
      console.error('Error en signup:', error);
      throw error;
    }
  },

  /**
   * Iniciar sesión con email y contraseña
   * 
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} Datos de la sesión y usuario
   * @throws {Error} Si las credenciales son inválidas
   */
  async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        // Mensajes de error amigables
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Email o contraseña incorrectos');
        }
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Por favor confirma tu email antes de iniciar sesión');
        }
        throw new Error(error.message);
      }
      
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  /**
   * Cerrar sesión del usuario actual
   * 
   * @returns {Promise<void>}
   * @throws {Error} Si ocurre un error al cerrar sesión
   */
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new Error('Error al cerrar sesión: ' + error.message);
      }
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  },

  /**
   * Obtener el usuario actualmente autenticado
   * 
   * @returns {Promise<Object|null>} Usuario actual o null si no hay sesión
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error al obtener usuario actual:', error);
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('Error en getCurrentUser:', error);
      return null;
    }
  },

  /**
   * Obtener la sesión actual
   * 
   * @returns {Promise<Object|null>} Sesión actual o null si no hay sesión
   */
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error al obtener sesión:', error);
        return null;
      }
      
      return session;
    } catch (error) {
      console.error('Error en getSession:', error);
      return null;
    }
  },

  /**
   * Escuchar cambios en el estado de autenticación
   * 
   * @param {Function} callback - Función que se ejecuta cuando cambia el estado de auth
   * @returns {Object} Subscription que se puede usar para desuscribirse
   * 
   * @example
   * const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
   *   if (event === 'SIGNED_IN') console.log('Usuario inició sesión');
   *   if (event === 'SIGNED_OUT') console.log('Usuario cerró sesión');
   * });
   * 
   * // Para desuscribirse:
   * subscription.unsubscribe();
   */
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },

  /**
   * Restablecer contraseña - Enviar email de recuperación
   * 
   * @param {string} email - Email del usuario
   * @returns {Promise<void>}
   * @throws {Error} Si ocurre un error al enviar el email
   */
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw new Error('Error al enviar email de recuperación: ' + error.message);
      }
    } catch (error) {
      console.error('Error en resetPassword:', error);
      throw error;
    }
  },

  /**
   * Actualizar contraseña del usuario
   * 
   * @param {string} newPassword - Nueva contraseña
   * @returns {Promise<Object>} Usuario actualizado
   * @throws {Error} Si ocurre un error al actualizar
   */
  async updatePassword(newPassword) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) {
        throw new Error('Error al actualizar contraseña: ' + error.message);
      }
      
      return data;
    } catch (error) {
      console.error('Error en updatePassword:', error);
      throw error;
    }
  },
};

export default authService;


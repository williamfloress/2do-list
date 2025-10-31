import { create } from 'zustand';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';

/**
 * Store de autenticación usando Zustand
 * 
 * Este store gestiona el estado global de autenticación:
 * - Usuario actual
 * - Estado de carga
 * - Errores
 * - Acciones de autenticación (login, signup, logout)
 * - Persistencia de sesión
 * 
 * Uso en componentes:
 * import { useAuthStore } from '../store/authStore';
 * 
 * const { user, loading, error, login, logout } = useAuthStore();
 */
export const useAuthStore = create((set) => ({
  // Estado
  user: null,                // Usuario actual autenticado
  loading: false,            // Estado de carga durante operaciones async
  error: null,               // Mensajes de error
  initialized: false,        // Indica si se verificó la sesión inicial

  /**
   * Inicializar el store - Verificar si hay una sesión activa
   * Debe llamarse al cargar la aplicación
   */
  initialize: async () => {
    set({ loading: true, error: null });
    try {
      const user = await authService.getCurrentUser();
      set({ user, loading: false, initialized: true });
      
      // Configurar listener para cambios de autenticación
      authService.onAuthStateChange((_event, session) => {
        set({ user: session?.user ?? null });
      });
    } catch (error) {
      console.error('Error al inicializar auth:', error);
      set({ user: null, loading: false, initialized: true, error: error.message });
    }
  },

  /**
   * Registrar nuevo usuario
   * 
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} Usuario registrado
   */
  signup: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { user, session } = await authService.signup(email, password);
      
      // Verificar si se requiere confirmación de email
      if (!session) {
        set({ 
          loading: false, 
          error: 'Por favor verifica tu email para activar tu cuenta' 
        });
        toast.success('¡Registro exitoso! Verifica tu email para activar tu cuenta.');
        return { requiresEmailConfirmation: true };
      }
      
      set({ user, loading: false });
      toast.success('¡Bienvenido! Cuenta creada exitosamente.');
      return user;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Error al registrarse');
      throw error;
    }
  },

  /**
   * Iniciar sesión
   * 
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} Usuario autenticado
   */
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { user } = await authService.login(email, password);
      set({ user, loading: false });
      toast.success('¡Bienvenido de nuevo!');
      return user;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Error al iniciar sesión');
      throw error;
    }
  },

  /**
   * Cerrar sesión
   */
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await authService.logout();
      set({ user: null, loading: false });
      toast.success('Sesión cerrada exitosamente');
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Error al cerrar sesión');
      throw error;
    }
  },

  /**
   * Establecer usuario manualmente
   * Útil para restaurar sesión o actualizar usuario
   * 
   * @param {Object|null} user - Usuario a establecer
   */
  setUser: (user) => {
    set({ user });
  },

  /**
   * Limpiar error
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Restablecer contraseña - Enviar email de recuperación
   * 
   * @param {string} email - Email del usuario
   */
  resetPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      await authService.resetPassword(email);
      set({ loading: false });
      return { success: true, message: 'Email de recuperación enviado' };
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Actualizar contraseña
   * 
   * @param {string} newPassword - Nueva contraseña
   */
  updatePassword: async (newPassword) => {
    set({ loading: true, error: null });
    try {
      const { user } = await authService.updatePassword(newPassword);
      set({ user, loading: false });
      return { success: true, message: 'Contraseña actualizada' };
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));

export default useAuthStore;



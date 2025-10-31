/**
 * Página Dashboard - Panel Principal de la Aplicación
 * 
 * Esta es la página principal donde los usuarios ven y gestionan sus tareas.
 * 
 * Componentes integrados:
 * - Navbar: Barra de navegación superior
 * - TaskForm: Formulario para agregar nuevas tareas
 * - TaskList: Lista de todas las tareas del usuario
 */

import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { PageLoading } from '../components/Loading';
import { useAuthStore } from '../store/authStore';
import { useTodoStore } from '../store/todoStore';

const Dashboard = () => {
  // Obtener estado de autenticación
  const { user, loading: authLoading, initialized, initialize } = useAuthStore();
  
  // Obtener funciones de Realtime del store de tareas
  const { subscribeToRealtime, unsubscribeFromRealtime, realtimeEnabled, stats } = useTodoStore();

  // Inicializar auth al montar el componente
  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  // Configurar suscripción a cambios en tiempo real
  useEffect(() => {
    // Suscribirse a cambios en tiempo real cuando el usuario esté autenticado
    if (initialized && user) {
      console.log('🟢 Usuario autenticado, configurando Realtime...');
      const unsubscribe = subscribeToRealtime();

      // Cleanup al desmontar el componente
      return () => {
        console.log('🔴 Limpiando suscripción Realtime...');
        unsubscribe();
      };
    }
  }, [initialized, user, subscribeToRealtime]);

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading || !initialized) {
    return <PageLoading message="Cargando dashboard..." />;
  }

  return (
    // Contenedor principal con altura mínima de pantalla completa
    <div className="min-h-screen">
      {/* Barra de navegación superior */}
      <Navbar />
      
      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-12">
        {/* Contenedor con ancho máximo para mejor legibilidad */}
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Encabezado de bienvenida */}
          <section className="card-surface p-8 md:p-10 space-y-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-500 font-semibold">Dashboard</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Welcome Back! 👋</h2>
                <p className="text-gray-600 text-lg max-w-xl">
                  Manage your tasks, track your progress and stay productive with realtime updates.
                </p>
              </div>

              {/* Indicador de Realtime */}
              {realtimeEnabled && (
                <div className="flex items-center gap-3 rounded-full bg-emerald-100/80 px-4 py-2 text-emerald-700 border border-emerald-200 shadow-inner">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-semibold tracking-wide">Realtime sync active</span>
                </div>
              )}
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="card-surface-accent p-5">
                <p className="text-sm uppercase tracking-wide text-white/70">Total Tasks</p>
                <p className="mt-2 text-3xl font-semibold">{stats.total}</p>
                <span className="text-sm text-white/80">All tasks you've created</span>
              </div>
              <div className="card-surface p-5 border-indigo-100">
                <p className="text-sm uppercase tracking-wide text-indigo-500">Completed</p>
                <p className="mt-2 text-3xl font-semibold text-indigo-700">{stats.completed}</p>
                <span className="text-sm text-indigo-500/70">Marked as done</span>
              </div>
              <div className="card-surface p-5 border-amber-100">
                <p className="text-sm uppercase tracking-wide text-amber-500">Pending</p>
                <p className="mt-2 text-3xl font-semibold text-amber-600">{stats.pending}</p>
                <span className="text-sm text-amber-500/70">Still in progress</span>
              </div>
              <div className="card-surface p-5 border-emerald-100">
                <p className="text-sm uppercase tracking-wide text-emerald-600">Completion</p>
                <p className="mt-2 text-3xl font-semibold text-emerald-600">{stats.completionRate}%</p>
                <span className="text-sm text-emerald-600/70">Overall progress</span>
              </div>
            </div>
          </section>

          {/* Formulario para agregar tareas */}
          <TaskForm />
          
          {/* Lista de tareas existentes */}
          <TaskList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


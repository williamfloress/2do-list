/**
 * Componente Principal de la Aplicación
 * 
 * Este componente configura todas las rutas de la aplicación usando React Router.
 * Maneja la navegación entre diferentes páginas (Login, Register, Dashboard).
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  return (
    // BrowserRouter: Proveedor de enrutamiento para toda la aplicación
    <BrowserRouter>
      {/* Routes: Contenedor de todas las rutas */}
      <Routes>
        {/* Ruta por defecto - redirige al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />        {/* Página de inicio de sesión */}
        <Route path="/register" element={<Register />} />  {/* Página de registro */}
        
        {/* Rutas principales de la aplicación */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Panel principal con tareas */}
        
        {/* Ruta catch-all - redirige al login para URLs no definidas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

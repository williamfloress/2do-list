// Importar módulos necesarios
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas
import todoRoutes from './routes/todoRoutes.js';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 5000; // Puerto del servidor (por defecto 5000)

// ===== MIDDLEWARE =====
// Habilitar CORS para permitir peticiones desde el frontend
app.use(cors());

// Habilitar el análisis de JSON en las peticiones
app.use(express.json());

// ===== RUTAS =====

// Montar rutas de tareas en /api/todos
app.use('/api/todos', todoRoutes);

// Ruta de prueba principal
// GET / - Devuelve un mensaje indicando que la API está funcionando
app.get('/', (req, res) => {
  res.json({ 
    message: 'Todo List API is running',
    status: 'success',
    timestamp: new Date().toISOString(),
    endpoints: {
      todos: '/api/todos',
      health: '/health'
    }
  });
});

// Ruta de verificación de salud del servidor
// GET /health - Devuelve el estado del servidor y el entorno
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta catch-all para endpoints de API no encontrados
app.use('/api', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.method} ${req.originalUrl} no existe`,
    availableEndpoints: {
      todos: '/api/todos',
      health: '/health'
    }
  });
});

// ===== MANEJO DE ERRORES =====

// Middleware para capturar y manejar errores
app.use((err, req, res, next) => {
  // Registrar el error en la consola
  console.error(err.stack);
  
  // Enviar respuesta de error al cliente
  res.status(500).json({ 
    message: 'Something went wrong!',
    // Solo mostrar detalles del error en desarrollo
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ===== INICIAR SERVIDOR =====

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API: http://localhost:${PORT}`);
});


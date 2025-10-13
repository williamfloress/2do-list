# 📝 Todo List App

Una aplicación completa de lista de tareas construida con React, Express, Node.js y Supabase.

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción rápida
- **TailwindCSS** - Framework de CSS utilitario
- **React Router** - Navegación entre páginas
- **Zustand** - Gestión de estado
- **Supabase Client** - Base de datos y autenticación

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express** - Framework web para Node.js
- **Supabase** - Base de datos PostgreSQL y autenticación
- **CORS** - Manejo de recursos de origen cruzado
- **dotenv** - Gestión de variables de entorno

## 📁 Estructura del Proyecto

```
todo-list/
├── frontend/                # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas principales
│   │   ├── config/         # Configuraciones (Supabase)
│   │   ├── store/          # Estado global (Zustand)
│   │   ├── services/       # Servicios API
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── utils/          # Funciones utilitarias
│   │   ├── App.jsx         # Componente principal con rutas
│   │   └── main.jsx        # Punto de entrada
│   ├── .env                # Variables de entorno (NO SUBIR A GIT)
│   └── package.json        # Dependencias frontend
│
├── backend/                # API Express
│   ├── config/            # Configuraciones (Supabase)
│   ├── routes/            # Rutas de la API
│   ├── controllers/       # Lógica de negocio
│   ├── middleware/        # Middleware personalizado
│   ├── utils/             # Funciones utilitarias
│   ├── server.js          # Servidor Express
│   ├── .env               # Variables de entorno (NO SUBIR A GIT)
│   └── package.json       # Dependencias backend
│
├── .gitignore             # Archivos ignorados por Git
├── requirements.md        # Requisitos del proyecto
├── mvp.md                 # Plan del MVP
└── README.md              # Este archivo
```

## 🛠️ Configuración Inicial

### Prerrequisitos

- **Node.js** (v20.18.0 o superior)
- **npm** (v10.8.2 o superior)
- Cuenta en **Supabase** (https://supabase.com)

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd todo-list
```

### 2. Configurar Supabase

1. Ve a [Supabase](https://supabase.com) e inicia sesión
2. Crea un nuevo proyecto llamado `todo-list-app`
3. Espera a que se provisione (2-3 minutos)
4. Ve a **Settings → API** y copia:
   - Project URL
   - anon/public key
   - service_role key

### 3. Configurar Variables de Entorno

#### Frontend (.env)
```bash
cd frontend
cp .env.example .env
```

Edita `frontend/.env` y agrega tus credenciales:
```env
VITE_SUPABASE_URL=tu_supabase_url_aqui
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

#### Backend (.env)
```bash
cd ../backend
cp .env.example .env
```

Edita `backend/.env` y agrega tus credenciales:
```env
SUPABASE_URL=tu_supabase_url_aqui
SUPABASE_SERVICE_KEY=tu_service_key_aqui
PORT=5000
NODE_ENV=development
```

### 4. Instalar Dependencias

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd ../backend
npm install
```

## 🚀 Ejecutar la Aplicación

### Modo Desarrollo

#### Iniciar Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Servidor corriendo en: http://localhost:5000

#### Iniciar Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Aplicación corriendo en: http://localhost:5173

### Modo Producción

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 📝 Scripts Disponibles

### Frontend
- `npm run dev` - Inicia servidor de desarrollo con Vite
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la construcción de producción
- `npm run lint` - Ejecuta ESLint para revisar el código

### Backend
- `npm run dev` - Inicia servidor con nodemon (auto-recarga)
- `npm start` - Inicia servidor en modo producción

## 🔗 Rutas de la Aplicación

### Frontend
- `/` - Redirige a `/login`
- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/dashboard` - Panel principal con tareas

### Backend API
- `GET /` - Mensaje de bienvenida de la API
- `GET /health` - Estado de salud del servidor

## 🎨 Componentes Principales

### Frontend
- **Navbar** - Barra de navegación superior
- **TaskForm** - Formulario para agregar nuevas tareas
- **TaskList** - Lista de todas las tareas
- **TaskItem** - Componente individual de tarea

### Páginas
- **Login** - Autenticación de usuarios
- **Register** - Registro de nuevos usuarios
- **Dashboard** - Interfaz principal de la aplicación

## 🔐 Seguridad

- ✅ Variables de entorno no están en el repositorio
- ✅ `.gitignore` configurado correctamente
- ✅ CORS configurado en el backend
- ✅ Frontend usa `anon key` (acceso limitado)
- ✅ Backend usa `service key` (acceso administrativo)

## 🐛 Solución de Problemas

### El frontend no se conecta a Supabase
- Verifica que las variables de entorno estén correctamente configuradas
- Asegúrate de que las variables empiecen con `VITE_`
- Reinicia el servidor de desarrollo después de cambiar `.env`

### El backend no inicia
- Verifica que el puerto 5000 no esté ocupado
- Asegúrate de que todas las dependencias estén instaladas
- Revisa que las variables de entorno estén configuradas

### Errores de CORS
- Verifica que CORS esté habilitado en `server.js`
- Asegúrate de que el backend esté corriendo en el puerto correcto

## 📚 Próximos Pasos (Fase 2)

- [ ] Crear tablas en Supabase
- [ ] Implementar autenticación completa
- [ ] Conectar frontend con backend
- [ ] CRUD de tareas
- [ ] Protección de rutas

## 👨‍💻 Desarrollo

Este proyecto está en **Fase 1: Configuración Inicial**

### Estado Actual
- ✅ Proyecto inicializado
- ✅ Dependencias instaladas
- ✅ TailwindCSS configurado
- ✅ Supabase configurado
- ✅ Variables de entorno configuradas
- ✅ Estructura de carpetas creada
- ✅ Servidor Express configurado
- ✅ Clientes Supabase configurados
- ✅ Componentes básicos creados
- ✅ Rutas configuradas

## 📄 Licencia

ISC

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**Desarrollado con ❤️ usando React + Express + Supabase**


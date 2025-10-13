# 📝 To-Do List App

## 📌 Planteamiento del problema
En la vida diaria, las personas necesitan organizar sus actividades y tareas. Muchas veces lo hacen en papel o en apps móviles, pero un estudiante o trabajador que use su PC podría beneficiarse de una aplicación web sencilla para:

- Registrar tareas pendientes.  
- Marcar tareas como completadas.  
- Editar o eliminar tareas.  
- Consultar el estado de sus pendientes desde cualquier dispositivo.

Actualmente, sin una herramienta así, el usuario puede olvidar actividades importantes, tener una mala organización o perder tiempo buscando qué pendientes tiene.

---

## 🎯 Objetivo del proyecto
Diseñar y desarrollar una aplicación web tipo **To-Do List** que permita a los usuarios:

1. Registrarse e iniciar sesión.  
2. Crear nuevas tareas.  
3. Editar y eliminar tareas.  
4. Marcar tareas como completadas o pendientes.  
5. Visualizar la lista de tareas organizadas.  

---

## 🧠 MVP (Versión Mínima Viable)
La primera versión del proyecto incluirá las siguientes funcionalidades esenciales:

### 🔹 Funcionalidades básicas
- **Autenticación de usuario:** registro e inicio de sesión con Supabase Auth.  
- **Gestión de tareas:**
  - Crear tareas (con título y descripción).  
  - Leer tareas (listar todas las del usuario).  
  - Actualizar tareas (editar título o marcar como completada).  
  - Eliminar tareas.  
- **Persistencia:** todas las tareas deben guardarse en la base de datos (Supabase).  
- **Interfaz:** diseño simple, limpio y responsive (React + TailwindCSS).  

### 🔹 Flujo de uso
1. El usuario se registra o inicia sesión.  
2. Visualiza su lista de tareas (vacía al inicio).  
3. Añade nuevas tareas con título y descripción.  
4. Puede marcar tareas como completadas o pendientes.  
5. Puede editar o eliminar tareas existentes.  

---

## 🏗️ Arquitectura propuesta

### 🔸 Frontend
- **Framework:** React  
- **Estilos:** TailwindCSS  
- **Estado global:** Context API o Zustand  
- **Funciones principales:**  
  - Autenticación con Supabase.  
  - Gestión del listado de tareas.  
  - Componentes reutilizables (TaskItem, TaskForm, Navbar).  

### 🔸 Backend
- **Tecnología:** Node.js con Express  
- **Endpoints (si no se usa Supabase directamente desde el frontend):**  
  - `POST /auth/register`  
  - `POST /auth/login`  
  - `GET /tasks`  
  - `POST /tasks`  
  - `PUT /tasks/:id`  
  - `DELETE /tasks/:id`  

### 🔸 Base de datos (Supabase / PostgreSQL)
**Tablas:**

#### users
| Campo | Tipo | Descripción |
|-------|------|--------------|
| id | uuid | Identificador único |
| name | text | Nombre del usuario |
| email | text | Correo del usuario |
| password_hash | text | Contraseña encriptada |

#### tasks
| Campo | Tipo | Descripción |
|-------|------|--------------|
| id | uuid | Identificador único |
| title | text | Título de la tarea |
| description | text | Descripción de la tarea |
| status | boolean | Estado (pendiente o completada) |
| user_id | uuid | Relación con el usuario |
| created_at | timestamp | Fecha de creación |

---

## 🚀 Tecnologías principales
- React  
- Node.js  
- Supabase (Auth + DB)  
- TailwindCSS  

---

## 💡 Mejoras futuras
- Filtros por estado (pendiente/completada).  
- Fechas límite y recordatorios.  
- Ordenar por prioridad.  
- Interfaz drag & drop.  
- Versión móvil con React Native.  

---


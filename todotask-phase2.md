# 📝 To-Do List App - Phase 2 Tasks

## 🎯 Phase 2: Database & Authentication (Week 2-3)

**Goal:** Set up the database schema, implement user authentication, create protected routes, and connect frontend with backend for full CRUD operations.

---

## ✅ Task Checklist

### 1. Database Schema Design

#### 1.1 Create Database Tables in Supabase
- [x] Log into Supabase Dashboard
- [x] Navigate to SQL Editor
- [x] Create `users` table (if not using Supabase Auth default)
- [x] Create `todos` table with proper structure
- [x] Set up relationships between tables
- [x] Test table creation

**SQL Script for `todos` table:**
```sql
-- Crear tabla de tareas
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear índice para búsquedas rápidas por usuario
CREATE INDEX todos_user_id_idx ON todos(user_id);

-- Crear índice para búsquedas por estado
CREATE INDEX todos_completed_idx ON todos(completed);
```

#### 1.2 Set Up Row Level Security (RLS)
- [x] Enable RLS on `todos` table
- [x] Create policy for SELECT (users can only see their own todos)
- [x] Create policy for INSERT (users can only create their own todos)
- [x] Create policy for UPDATE (users can only update their own todos)
- [x] Create policy for DELETE (users can only delete their own todos)
- [x] Test RLS policies

**RLS Policies:**
```sql
-- Habilitar RLS
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Policy: Los usuarios solo pueden ver sus propias tareas
CREATE POLICY "Users can view their own todos"
  ON todos FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Los usuarios solo pueden crear sus propias tareas
CREATE POLICY "Users can create their own todos"
  ON todos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Los usuarios solo pueden actualizar sus propias tareas
CREATE POLICY "Users can update their own todos"
  ON todos FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Los usuarios solo pueden eliminar sus propias tareas
CREATE POLICY "Users can delete their own todos"
  ON todos FOR DELETE
  USING (auth.uid() = user_id);
```

#### 1.3 Create Database Triggers (Optional)
- [x] Create trigger to auto-update `updated_at` timestamp
- [x] Test trigger functionality

**Trigger for auto-update:**
```sql
-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para todos
CREATE TRIGGER update_todos_updated_at
  BEFORE UPDATE ON todos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

### 2. Authentication - Frontend

#### 2.1 Create Authentication Service
- [x] Create `src/services/authService.js`
- [x] Implement signup function
- [x] Implement login function
- [x] Implement logout function
- [x] Implement getCurrentUser function
- [x] Add error handling

**Example authService.js:**
```javascript
import { supabase } from '../config/supabaseClient';

/**
 * Servicio de autenticación usando Supabase
 */
export const authService = {
  // Registrar nuevo usuario
  async signup(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Iniciar sesión
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Cerrar sesión
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Obtener usuario actual
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Escuchar cambios en autenticación
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};
```

#### 2.2 Create Auth Context/Store
- [x] Create `src/store/authStore.js` (if using Zustand)
- [ ] OR Create `src/context/AuthContext.jsx` (if using Context API)
- [x] Define auth state (user, loading, error)
- [x] Implement login action
- [x] Implement signup action
- [x] Implement logout action
- [x] Implement session persistence

**Example with Zustand:**
```javascript
import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // Iniciar sesión
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { user } = await authService.login(email, password);
      set({ user, loading: false });
      return user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Registrarse
  signup: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { user } = await authService.signup(email, password);
      set({ user, loading: false });
      return user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Cerrar sesión
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await authService.logout();
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Establecer usuario (para persistencia)
  setUser: (user) => set({ user }),
}));
```

#### 2.3 Update Login Page
- [x] Import authService or useAuthStore
- [x] Connect form to login function
- [x] Add loading state
- [x] Add error messages
- [x] Redirect to dashboard on success
- [x] Add form validation

#### 2.4 Update Register Page
- [x] Import authService or useAuthStore
- [x] Connect form to signup function
- [x] Add loading state
- [x] Add error messages
- [x] Add email confirmation message
- [x] Redirect to login/dashboard on success
- [x] Add form validation

#### 2.5 Create Protected Route Component
- [x] Create `src/components/ProtectedRoute.jsx`
- [x] Check if user is authenticated
- [x] Redirect to login if not authenticated
- [x] Show loading state while checking auth

**Example ProtectedRoute:**
```javascript
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

#### 2.6 Update App.jsx with Protected Routes
- [x] Import ProtectedRoute component
- [x] Wrap Dashboard route with ProtectedRoute
- [x] Add auth state listener
- [x] Handle session restoration on page reload

---

### 3. Authentication - Backend (Optional)

#### 3.1 Create Auth Middleware
- [ ] Create `middleware/authMiddleware.js`
- [ ] Verify JWT token from Supabase
- [ ] Extract user from token
- [ ] Add user to request object
- [ ] Handle authentication errors

**Example authMiddleware.js:**
```javascript
import { supabase } from '../config/supabaseClient.js';

/**
 * Middleware de autenticación
 * Verifica el token JWT en el header Authorization
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // Obtener token del header
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verificar token con Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Agregar usuario al request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
```

---

### 4. Todo CRUD Operations - Frontend

#### 4.1 Create Todo Service
- [x] Create `src/services/todoService.js`
- [x] Implement getTodos function
- [x] Implement createTodo function
- [x] Implement updateTodo function
- [x] Implement deleteTodo function
- [x] Add error handling

**Example todoService.js:**
```javascript
import { supabase } from '../config/supabaseClient';

/**
 * Servicio para operaciones CRUD de tareas
 */
export const todoService = {
  // Obtener todas las tareas del usuario
  async getTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Crear nueva tarea
  async createTodo(title, description = '') {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('todos')
      .insert([
        { title, description, user_id: user.id }
      ])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Actualizar tarea
  async updateTodo(id, updates) {
    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Eliminar tarea
  async deleteTodo(id) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Toggle completado
  async toggleTodo(id, completed) {
    return this.updateTodo(id, { completed });
  }
};
```

#### 4.2 Create Todo Store/Context
- [x] Create `src/store/todoStore.js` (if using Zustand)
- [x] Define todos state
- [x] Implement fetchTodos action
- [x] Implement addTodo action
- [x] Implement updateTodo action
- [x] Implement deleteTodo action
- [x] Implement toggleTodo action

#### 4.3 Update TaskForm Component
- [x] Import todoService or useTodoStore
- [x] Connect form to createTodo function
- [x] Add loading state
- [x] Add error handling
- [x] Clear form after success
- [x] Show success message

#### 4.4 Update TaskList Component
- [x] Import todoService or useTodoStore
- [x] Fetch todos on component mount
- [x] Replace placeholder data with real data
- [x] Add loading state
- [x] Add empty state
- [x] Add error handling

#### 4.5 Update TaskItem Component
- [x] Connect toggle checkbox to toggleTodo function
- [x] Connect delete button to deleteTodo function
- [x] Add loading state for actions
- [x] Add confirmation dialog for delete
- [x] Show success/error messages

---

### 5. Todo CRUD Operations - Backend (Optional)

#### 5.1 Create Todo Controller
- [x] Create `controllers/todoController.js`
- [x] Implement getTodos function
- [x] Implement createTodo function
- [x] Implement updateTodo function
- [x] Implement deleteTodo function
- [x] Add validation
- [x] Add error handling

#### 5.2 Create Todo Routes
- [x] Create `routes/todoRoutes.js`
- [x] Define GET /api/todos route
- [x] Define POST /api/todos route
- [x] Define PUT /api/todos/:id route
- [x] Define DELETE /api/todos/:id route
- [x] Apply auth middleware to all routes

#### 5.3 Update Server.js
- [x] Import todo routes
- [x] Mount todo routes at /api/todos
- [x] Test all endpoints

---

### 6. Update Navbar Component

#### 6.1 Add User Info Display
- [x] Show logged-in user email
- [x] Add user avatar/icon
- [x] Style user info section

#### 6.2 Connect Logout Button
- [x] Import authService or useAuthStore
- [x] Connect logout button to logout function
- [x] Redirect to login page after logout
- [x] Show confirmation dialog (optional)

---

### 7. Add Loading States & Error Handling

#### 7.1 Create Loading Component
- [x] Create `src/components/Loading.jsx`
- [x] Add spinner or skeleton
- [x] Style with TailwindCSS

#### 7.2 Create Error Component
- [x] Create `src/components/ErrorMessage.jsx`
- [x] Display error messages
- [x] Add retry button
- [x] Style with TailwindCSS

#### 7.3 Add Loading States
- [x] Add loading to Login page
- [x] Add loading to Register page
- [x] Add loading to Dashboard
- [x] Add loading to TaskForm
- [x] Add loading to TaskList

#### 7.4 Add Error Handling
- [x] Add error handling to all API calls
- [x] Display user-friendly error messages
- [x] Add error boundaries (optional)

---

### 8. Real-time Updates (Optional)

#### 8.1 Set Up Supabase Realtime
- [x] Enable Realtime on todos table
- [x] Subscribe to changes in Dashboard
- [x] Handle INSERT events
- [x] Handle UPDATE events
- [x] Handle DELETE events
- [x] Update UI in real-time

**Example Realtime subscription:**
```javascript
useEffect(() => {
  const subscription = supabase
    .channel('todos')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'todos' },
      (payload) => {
        console.log('Change received!', payload);
        // Actualizar estado local
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

---

### 9. Form Validation

#### 9.1 Install Validation Library (Optional)
- [x] Choose library (Yup, Zod, or native HTML5)
- [x] Install if needed: `npm install yup`

#### 9.2 Add Validation to Login
- [x] Validate email format
- [x] Validate password length
- [x] Show validation errors
- [x] Disable submit if invalid

#### 9.3 Add Validation to Register
- [x] Validate email format
- [x] Validate password length (min 6 characters)
- [x] Validate password confirmation match
- [x] Show validation errors
- [x] Disable submit if invalid

#### 9.4 Add Validation to TaskForm
- [x] Validate title is not empty
- [x] Validate title length (max characters)
- [x] Show validation errors
- [x] Disable submit if invalid

---

### 10. UI/UX Improvements

#### 10.1 Add Toast Notifications
- [x] Install toast library: `npm install react-hot-toast`
- [x] Set up Toaster in App.jsx
- [x] Add success toasts (todo created, updated, deleted)
- [x] Add error toasts
- [x] Add info toasts (logged in, logged out)

#### 10.2 Add Confirmation Dialogs
- [x] Create Modal component (or use library)
- [x] Add confirmation before delete
- [x] Add confirmation before logout (optional)

#### 10.3 Add Animations
- [x] Add transitions to todo items
- [x] Add fade-in for new todos
- [x] Add slide-out for deleted todos
- [x] Add loading animations

#### 10.4 Improve Responsive Design
- [x] Test on mobile devices
- [x] Adjust navbar for mobile
- [x] Adjust task list for mobile
- [x] Adjust forms for mobile

---

### 11. Testing Phase 2

#### 11.1 Authentication Tests
- [x] **Testing plan created** (see `frontend/TESTING_PLAN.md`)
- [ ] Test signup with valid data
- [ ] Test signup with invalid data
- [ ] Test login with valid credentials
- [ ] Test login with invalid credentials
- [ ] Test logout
- [ ] Test protected routes (without login)
- [ ] Test session persistence (page reload)

**Testing Resources:**
- 📄 Comprehensive test plan: `frontend/TESTING_PLAN.md`
- 🧪 All test cases documented with step-by-step instructions
- ✅ Expected results defined for each test

#### 11.2 CRUD Tests
- [ ] Test creating a todo
- [ ] Test reading/fetching todos
- [ ] Test updating a todo
- [ ] Test deleting a todo
- [ ] Test toggling todo completion
- [ ] Test with multiple users (RLS)

#### 11.3 Database Tests
- [ ] Verify todos are saved in database
- [ ] Verify RLS policies work
- [ ] Verify users only see their own todos
- [ ] Verify triggers work (updated_at)

#### 11.4 Integration Tests
- [ ] Test full user flow (signup → login → create todo → logout)
- [ ] Test error scenarios
- [ ] Test edge cases (empty todos, long titles, etc.)

---

### 12. Documentation Updates

#### 12.1 Update README.md
- [ ] Add Phase 2 completion status
- [ ] Document database schema
- [ ] Document API endpoints (if backend)
- [ ] Add authentication setup instructions
- [ ] Add screenshots (optional)

#### 12.2 Update Spanish Comments
- [ ] Add comments to authService.js
- [ ] Add comments to todoService.js
- [ ] Add comments to auth store/context
- [ ] Add comments to todo store/context
- [ ] Add comments to new components

---

## 🎯 Phase 2 Completion Checklist

Before moving to Phase 3, ensure all of the following are complete:

- [ ] ✅ Database tables created in Supabase
- [ ] ✅ Row Level Security policies configured
- [ ] ✅ User registration works
- [ ] ✅ User login works
- [ ] ✅ User logout works
- [ ] ✅ Protected routes implemented
- [ ] ✅ Session persistence works
- [ ] ✅ Users can create todos
- [ ] ✅ Users can read their todos
- [ ] ✅ Users can update todos
- [ ] ✅ Users can delete todos
- [ ] ✅ Users can toggle todo completion
- [ ] ✅ RLS ensures users only see their own todos
- [ ] ✅ Error handling implemented
- [ ] ✅ Loading states added
- [ ] ✅ Form validation implemented
- [ ] ✅ UI/UX improvements completed
- [ ] ✅ All tests passed

---

## 📊 Estimated Time

| Task Category | Estimated Time |
|--------------|----------------|
| Database Schema | 1-2 hours |
| Authentication Frontend | 3-4 hours |
| Todo CRUD Frontend | 3-4 hours |
| Protected Routes | 1-2 hours |
| Backend API (Optional) | 3-4 hours |
| UI/UX Improvements | 2-3 hours |
| Testing & Verification | 2-3 hours |
| Documentation | 1-2 hours |
| **TOTAL** | **16-24 hours** |

---

## 💡 Tips for Phase 2

1. **Start with the database** - Get your schema right before coding
2. **Test RLS policies** - Make sure users can't access other users' data
3. **Handle errors gracefully** - Show user-friendly error messages
4. **Use Supabase Auth** - It's battle-tested and secure
5. **Add loading states** - Keep users informed during async operations
6. **Test with multiple users** - Make sure RLS works correctly
7. **Keep it simple** - Don't over-engineer, focus on core functionality

---

## 🚀 Next Steps

Once Phase 2 is complete, you'll be ready to move on to:
- **Phase 3: Advanced Features**
  - Task categories/tags
  - Due dates and reminders
  - Task priority levels
  - Search and filter
  - Task statistics dashboard

---

**Document Status:** Ready to Execute  
**Phase:** 2 of 6  
**Prerequisites:** Phase 1 must be complete  
**Created:** October 13, 2025


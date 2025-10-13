# 📝 To-Do List App - Phase 1 Tasks

## 🎯 Phase 1: Project Setup (Week 1)

**Goal:** Set up the complete development environment, initialize both frontend and backend projects, configure Supabase, and create the basic folder structure.

---

## ✅ Task Checklist

### 1. Project Initialization

#### 1.1 Create Project Structure
- [x] Create main project directory `todo-list` (if not exists)
- [x] Create `frontend` subdirectory
- [x] Create `backend` subdirectory
- [x] Initialize Git repository in root directory
  ```bash
  git init
  ```
- [x] Create `.gitignore` file with Node.js, React, and environment variables

#### 1.2 Initialize Frontend (React + Vite/CRA)
- [x] Navigate to `frontend` directory
- [x] Initialize React project with Vite (recommended)
  ```bash
  npm create vite@latest . -- --template react
  ```
  OR with Create React App:
  ```bash
  npx create-react-app .
  ```
- [x] Test that React app runs successfully
  ```bash
  npm install
  npm run dev
  ```

#### 1.3 Initialize Backend (Node.js + Express)
- [x] Navigate to `backend` directory
- [x] Initialize Node.js project
  ```bash
  npm init -y
  ```
- [x] Update `package.json` with project details (name, description, author)
- [x] Add `"type": "module"` to package.json for ES6 modules (optional)

---

### 2. Install Dependencies

#### 2.1 Frontend Dependencies
- [x] Install TailwindCSS
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
- [x] Install Supabase client
  ```bash
  npm install @supabase/supabase-js
  ```
- [x] Install Zustand for state management
  ```bash
  npm install zustand
  ```
  OR decide to use Context API (no installation needed)
- [x] Install React Router (for navigation)
  ```bash
  npm install react-router-dom
  ```

#### 2.2 Backend Dependencies
- [x] Install Express framework
  ```bash
  npm install express
  ```
- [x] Install CORS middleware
  ```bash
  npm install cors
  ```
- [x] Install dotenv for environment variables
  ```bash
  npm install dotenv
  ```
- [x] Install Supabase client for backend
  ```bash
  npm install @supabase/supabase-js
  ```
- [x] Install nodemon as dev dependency (for auto-restart)
  ```bash
  npm install -D nodemon
  ```

---

### 3. Configure TailwindCSS

#### 3.1 Setup Tailwind Configuration
- [x] Configure `tailwind.config.js` with content paths
  ```js
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ]
  ```
- [x] Add Tailwind directives to main CSS file (`index.css` or `App.css`)
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- [x] Test Tailwind by adding utility classes to a component
- [x] Verify Tailwind styles are applied correctly

---

### 4. Supabase Configuration

#### 4.1 Create Supabase Project
- [x] Go to [https://supabase.com](https://supabase.com)
- [x] Sign up / Log in to Supabase
- [x] Create a new project
  - Choose project name: `todo-list-app`
  - Set database password (save it securely)
  - Choose region closest to your location
- [x] Wait for project to be provisioned (~2 minutes)

#### 4.2 Get Supabase Credentials
- [x] Navigate to Project Settings → API
- [x] Copy Project URL
- [x] Copy anon/public API key
- [x] Save these credentials securely (will be used in .env files)

#### 4.3 Explore Supabase Dashboard
- [x] Familiarize with Table Editor
- [x] Familiarize with SQL Editor
- [x] Familiarize with Authentication settings
- [x] Familiarize with API documentation

---

### 5. Environment Variables Setup

#### 5.1 Frontend Environment Variables
- [x] Create `.env` file in `frontend` directory
- [x] Add Supabase credentials:
  ```
  VITE_SUPABASE_URL=your_supabase_project_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```
  Note: Use `REACT_APP_` prefix if using Create React App
- [x] Create `.env.example` file with placeholder values
  ```
  VITE_SUPABASE_URL=your_supabase_url_here
  VITE_SUPABASE_ANON_KEY=your_anon_key_here
  ```
- [x] Add `.env` to `.gitignore`
- [x] Test that environment variables are accessible

#### 5.2 Backend Environment Variables
- [x] Create `.env` file in `backend` directory
- [x] Add Supabase credentials:
  ```
  SUPABASE_URL=your_supabase_project_url
  SUPABASE_SERVICE_KEY=your_supabase_service_key
  PORT=5000
  NODE_ENV=development
  ```
- [x] Create `.env.example` file with placeholder values
- [x] Add `.env` to `.gitignore`
- [x] Test that dotenv loads variables correctly

---

### 6. Create Folder Structure

#### 6.1 Frontend Folder Structure
- [x] Create `src/components` directory
- [x] Create `src/pages` directory
- [ ] Create `src/context` directory (if using Context API)
- [x] Create `src/store` directory (if using Zustand)
- [x] Create `src/utils` directory
- [x] Create `src/services` directory (for API calls)
- [x] Create `src/hooks` directory (for custom hooks)
- [x] Create `src/config` directory (for configuration files)

**Expected Structure:**
```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/ or store/
│   ├── utils/
│   ├── services/
│   ├── hooks/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── package.json
├── tailwind.config.js
└── vite.config.js
```

#### 6.2 Backend Folder Structure
- [x] Create `routes` directory
- [x] Create `controllers` directory
- [x] Create `middleware` directory
- [x] Create `config` directory
- [x] Create `utils` directory
- [x] Create main `server.js` file

**Expected Structure:**
```
backend/
├── routes/
├── controllers/
├── middleware/
├── config/
├── utils/
├── server.js
├── .env
├── .env.example
└── package.json
```

---

### 7. Create Basic Server Setup

#### 7.1 Create Express Server
- [x] Create `server.js` in backend root
- [x] Import required modules (express, cors, dotenv)
- [x] Initialize Express app
- [x] Configure CORS middleware
- [x] Configure JSON body parser
- [x] Create a test route (GET /)
- [x] Set up error handling middleware
- [x] Start server on specified PORT

**Basic server.js structure:**
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Todo List API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### 7.2 Configure npm Scripts
- [x] Add start script to backend `package.json`
  ```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
  ```
- [x] Test server with `npm run dev`
- [x] Verify server runs without errors
- [x] Test API endpoint in browser or Postman

---

### 8. Create Supabase Client Configuration

#### 8.1 Frontend Supabase Client
- [x] Create `src/config/supabaseClient.js`
- [x] Import Supabase client
- [x] Initialize with environment variables
- [x] Export configured client

**Example:**
```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### 8.2 Backend Supabase Client
- [x] Create `config/supabaseClient.js`
- [x] Import Supabase client
- [x] Initialize with environment variables
- [x] Export configured client

**Example:**
```javascript
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
```

---

### 9. Create Basic Components (Placeholders)

#### 9.1 Create Placeholder Components
- [x] Create `components/Navbar.jsx` with basic structure
- [x] Create `components/TaskForm.jsx` with basic structure
- [x] Create `components/TaskList.jsx` with basic structure
- [x] Create `components/TaskItem.jsx` with basic structure
- [x] Add placeholder content to each component
- [x] Test that components render without errors

#### 9.2 Create Basic Pages
- [x] Create `pages/Login.jsx`
- [x] Create `pages/Register.jsx`
- [x] Create `pages/Dashboard.jsx`
- [x] Add placeholder content to each page
- [x] Test that pages render without errors

---

### 10. Setup Routing

#### 10.1 Configure React Router
- [x] Update `App.jsx` with Router setup
- [x] Define routes: `/login`, `/register`, `/dashboard`
- [x] Create basic route navigation
- [x] Test navigation between pages
- [x] Ensure routes render correct components

**Basic routing structure:**
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

### 11. Documentation

#### 11.1 Create README
- [x] Create `README.md` in root directory
- [x] Add project title and description
- [x] Add technologies used
- [x] Add setup instructions for frontend
- [x] Add setup instructions for backend
- [x] Add environment variables documentation
- [x] Add how to run the project
- [x] Add folder structure explanation

#### 11.2 Document Configuration
- [x] Document Supabase setup steps
- [x] Document environment variables needed
- [x] Document npm scripts available
- [x] Create troubleshooting section

---

### 12. Git Setup

#### 12.1 Create .gitignore
- [x] Create `.gitignore` in root directory
- [x] Add node_modules to ignore
- [x] Add .env files to ignore
- [x] Add build/dist directories to ignore
- [x] Add IDE-specific files to ignore

**Example .gitignore:**
```
# Dependencies
node_modules/
frontend/node_modules/
backend/node_modules/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
frontend/dist/
frontend/build/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
.DS_Store
```

#### 12.2 Initial Commit
- [ ] Stage all files (except ignored)
- [ ] Create initial commit
  ```bash
  git add .
  git commit -m "Initial project setup: React frontend, Express backend, Supabase config"
  ```
- [ ] Create development branch (optional)
  ```bash
  git checkout -b development
  ```

---

### 13. Testing Phase 1 Setup

#### 13.1 Frontend Tests
- [ ] Verify React app starts without errors
- [ ] Verify Tailwind CSS is working
- [ ] Verify environment variables are accessible
- [ ] Verify all placeholder components render
- [ ] Verify routing works between pages
- [ ] Verify no console errors

#### 13.2 Backend Tests
- [ ] Verify Express server starts without errors
- [ ] Verify test endpoint returns correct response
- [ ] Verify environment variables are loaded
- [ ] Verify CORS is configured correctly
- [ ] Verify nodemon auto-restart works

#### 13.3 Integration Tests
- [ ] Verify frontend can make requests to backend (test connection)
- [ ] Verify Supabase client is configured correctly
- [ ] Verify no dependency conflicts

---

## 🎯 Phase 1 Completion Checklist

Before moving to Phase 2, ensure all of the following are complete:

- [ ] ✅ React frontend is initialized and running
- [ ] ✅ Express backend is initialized and running
- [ ] ✅ TailwindCSS is configured and working
- [ ] ✅ Supabase project is created and configured
- [ ] ✅ Environment variables are set up for both frontend and backend
- [ ] ✅ All dependencies are installed
- [ ] ✅ Folder structure is created
- [ ] ✅ Basic components and pages exist (placeholder)
- [ ] ✅ Routing is configured
- [ ] ✅ Git repository is initialized with .gitignore
- [ ] ✅ README.md documentation exists
- [ ] ✅ Both frontend and backend run without errors
- [ ] ✅ Supabase connection is tested

---

## 📊 Estimated Time

| Task Category | Estimated Time |
|--------------|----------------|
| Project Initialization | 30-45 minutes |
| Dependencies Installation | 20-30 minutes |
| Supabase Setup | 30-45 minutes |
| Environment Configuration | 15-20 minutes |
| Folder Structure | 10-15 minutes |
| Basic Server Setup | 30-45 minutes |
| Component Creation | 45-60 minutes |
| Routing Setup | 20-30 minutes |
| Documentation | 30-45 minutes |
| Testing & Verification | 30-45 minutes |
| **TOTAL** | **4-6 hours** |

---

## 💡 Tips for Phase 1

1. **Take it step by step** - Don't rush, ensure each step works before moving to the next
2. **Test frequently** - Run both frontend and backend often to catch errors early
3. **Keep Supabase credentials safe** - Never commit .env files
4. **Document as you go** - Update README with any setup quirks you encounter
5. **Use version control** - Commit after completing each major section
6. **Check for errors** - Watch console and terminal for any warnings/errors

---

## 🚀 Next Steps

Once Phase 1 is complete, you'll be ready to move on to:
- **Phase 2: Database & Authentication** 
  - Create database tables
  - Implement user registration
  - Implement user login/logout
  - Set up protected routes

---

**Document Status:** Ready to Execute  
**Phase:** 1 of 6  
**Last Updated:** October 11, 2025


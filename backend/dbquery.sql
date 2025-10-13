-- ============================================
-- To-Do List App - Database Schema
-- Supabase PostgreSQL Database Setup
-- ============================================

-- ============================================
-- 1. CREAR TABLA DE TAREAS (TODOS)
-- ============================================

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


-- ============================================
-- 2. CONFIGURAR ROW LEVEL SECURITY (RLS)
-- ============================================

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


-- ============================================
-- 3. CREAR TRIGGERS PARA AUTO-UPDATE
-- ============================================

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


-- ============================================
-- 4. VERIFICACIÓN (OPCIONAL)
-- ============================================

-- Para verificar que todo se creó correctamente, ejecuta:
-- SELECT * FROM todos;
-- SELECT tablename, policyname FROM pg_policies WHERE tablename = 'todos';


-- ============================================
-- NOTAS DE IMPLEMENTACIÓN
-- ============================================
-- 1. Este script debe ejecutarse en el SQL Editor de Supabase
-- 2. Supabase Auth ya proporciona la tabla auth.users por defecto
-- 3. Las políticas RLS aseguran que cada usuario solo vea sus propias tareas
-- 4. El trigger actualiza automáticamente el campo updated_at
-- 5. Los índices mejoran el rendimiento de las consultas
-- ============================================


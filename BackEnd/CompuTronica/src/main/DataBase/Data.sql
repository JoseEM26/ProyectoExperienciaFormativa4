USE Computronica;

-- ======================================
-- 🔹 1. USUARIOS
-- ======================================
INSERT INTO Usuarios (codigo_institucional, sede, nombre, apellido, correo_institucional, contrasena, tipo, estado)
VALUES
('U1001', 'Lima Norte', 'Carlos', 'Ramírez', 'carlos.ramirez@computronica.edu.pe', '12345', 'profesor', TRUE),
('U1002', 'Lima Norte', 'Ana', 'Torres', 'ana.torres@computronica.edu.pe', '12345', 'profesor', TRUE),
('U2001', 'Lima Norte', 'Luis', 'Pérez', 'luis.perez@computronica.edu.pe', '12345', 'estudiante', TRUE),
('U2002', 'Lima Norte', 'María', 'Gómez', 'maria.gomez@computronica.edu.pe', '12345', 'estudiante', TRUE),
('U2003', 'Lima Norte', 'Javier', 'Castro', 'javier.castro@computronica.edu.pe', '12345', 'estudiante', TRUE),
('U3001', 'Lima Centro', 'Rosa', 'Villanueva', 'rosa.villanueva@computronica.edu.pe', '12345', 'administrativo', TRUE);

-- ======================================
-- 🔹 2. ASIGNATURAS
-- ======================================
INSERT INTO Asignaturas (codigo_asignatura, nombre, descripcion, creditos, profesor_id)
VALUES
('INF101', 'Programación I', 'Introducción a la programación con Java', 4, 1),
('INF102', 'Base de Datos', 'Fundamentos del modelado y SQL', 3, 2),
('INF103', 'Redes', 'Conceptos básicos de redes y comunicación de datos', 3, 1);

-- ======================================
-- 🔹 3. CALIFICACIONES
-- ======================================
INSERT INTO Calificaciones (estudiante_id, asignatura_id, evaluacion, nota)
VALUES
(3, 1, 'Parcial', 15.50),
(3, 1, 'Final', 17.00),
(4, 1, 'Parcial', 14.00),
(4, 1, 'Final', 16.50),
(5, 2, 'Parcial', 13.00),
(5, 2, 'Final', 15.00),
(3, 3, 'Parcial', 18.00),
(3, 3, 'Final', 19.00);

-- ======================================
-- 🔹 4. CHAT MESSAGES
-- ======================================
INSERT INTO chat_messages (sender, content, time, usuario_id)
VALUES
('Carlos Ramírez', 'Buenos días clase, recuerden entregar su práctica 2.', '08:45:10', 1),
('Luis Pérez', 'Profe, una consulta sobre el trabajo.', '08:46:32', 3),
('Carlos Ramírez', 'Claro Luis, dime tu duda.', '08:47:05', 1),
('María Gómez', 'Profe, ¿la práctica se entrega por correo?', '08:48:20', 4),
('Carlos Ramírez', 'Sí, envíenla a mi correo institucional antes del viernes.', '08:49:02', 1),
('Javier Castro', 'Gracias profe, entendido.', '08:50:40', 5),
('Rosa Villanueva', 'Recordatorio: habrá corte de red en la sede central mañana.', '15:12:15', 6);

-- ======================================
-- 🔹 1. USUARIOS
-- ======================================
INSERT INTO Usuarios (codigo_institucional, sede, nombre, apellido, correo_institucional, contrasena, tipo, estado)
VALUES
('U1001', 'Lima Norte', 'Carlos', 'Ramírez', 'carlos.ramirez@computronica.edu.pe', '12345', 'profesor', TRUE),
('U1002', 'Lima Norte', 'Ana', 'Torres', 'ana.torres@computronica.edu.pe', '12345', 'profesor', TRUE),
('U2001', 'Lima Norte', 'Luis', 'Pérez', 'luis.perez@computronica.edu.pe', '12345', 'estudiante', TRUE),
('U2002', 'Lima Norte', 'María', 'Gómez', 'maria.gomez@computronica.edu.pe', '12345', 'estudiante', TRUE),
('U2003', 'Lima Norte', 'Javier', 'Castro', 'javier.castro@computronica.edu.pe', '12345', 'estudiante', TRUE),
('U3001', 'Lima Centro', 'Rosa', 'Villanueva', 'rosa.villanueva@computronica.edu.pe', '12345', 'administrativo', TRUE);

-- ======================================
-- 🔹 2. ASIGNATURAS
-- ======================================
INSERT INTO Asignaturas (codigo_asignatura, nombre, descripcion, creditos, profesor_id)
VALUES
('INF101', 'Programación I', 'Introducción a la programación con Java', 4, 1),
('INF102', 'Base de Datos', 'Fundamentos del modelado y SQL', 3, 2),
('INF103', 'Redes', 'Conceptos básicos de redes y comunicación de datos', 3, 1);

-- ======================================
-- 🔹 3. CALIFICACIONES
-- ======================================
INSERT INTO Calificaciones (estudiante_id, asignatura_id, evaluacion, nota)
VALUES
(3, 1, 'Parcial', 15.50),
(3, 1, 'Final', 17.00),
(4, 1, 'Parcial', 14.00),
(4, 1, 'Final', 16.50),
(5, 2, 'Parcial', 13.00),
(5, 2, 'Final', 15.00),
(3, 3, 'Parcial', 18.00),
(3, 3, 'Final', 19.00);


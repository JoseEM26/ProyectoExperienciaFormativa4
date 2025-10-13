
INSERT INTO Asignaturas (codigo_asignatura, nombre, descripcion, creditos, profesor_id) VALUES
('MAT101', 'Matemática Básica', 'Curso introductorio de matemáticas', 4, 2),
('FIS101', 'Física I', 'Fundamentos de física clásica', 3, 8),
('QUI101', 'Química General', 'Principios básicos de química', 3, 5),
('PROG101', 'Programación I', 'Introducción a la programación en Java', 4, 2),
('MAT201', 'Álgebra Lineal', 'Vectores, matrices y sistemas de ecuaciones', 3, 2),
('FIS201', 'Física II', 'Electricidad, magnetismo y óptica', 3, 2),
('BIO101', 'Biología General', 'Conceptos fundamentales de biología', 3, 5),
('PROG201', 'Programación Avanzada', 'Estructuras de datos y algoritmos', 4, 3),
('RED101', 'Redes de Computadoras', 'Conceptos básicos de redes', 3, 3),
('WEB101', 'Desarrollo Web', 'HTML, CSS y JavaScript', 3, 8);


INSERT INTO Usuarios (codigo_institucional, sede, nombre, apellido, correo_institucional, contrasena, tipo, estado)
VALUES
('CI001', 'Sede 1', 'Juan', 'Perez', 'juan.perez@computronica.edu', 'contraseña123', 'estudiante', TRUE),
('CI002', 'Sede 2', 'Maria', 'Lopez', 'maria.lopez@computronica.edu', 'contraseña456', 'profesor', TRUE),
('CI003', 'Sede 3', 'Carlos', 'Gomez', 'carlos.gomez@computronica.edu', 'contraseña789', 'administrativo', TRUE),
('CI004', 'Sede 1', 'Ana', 'Martinez', 'ana.martinez@computronica.edu', 'contraseña101', 'estudiante', TRUE),
('CI005', 'Sede 2', 'Luis', 'Rodriguez', 'luis.rodriguez@computronica.edu', 'contraseña202', 'profesor', TRUE),
('CI006', 'Sede 3', 'Pedro', 'Fernandez', 'pedro.fernandez@computronica.edu', 'contraseña303', 'administrativo', TRUE),
('CI007', 'Sede 1', 'Laura', 'Garcia', 'laura.garcia@computronica.edu', 'contraseña404', 'estudiante', TRUE),
('CI008', 'Sede 2', 'Sofia', 'Hernandez', 'sofia.hernandez@computronica.edu', 'contraseña505', 'profesor', TRUE),
('CI009', 'Sede 3', 'David', 'Lopez', 'david.lopez@computronica.edu', 'contraseña606', 'administrativo', TRUE),
('CI010', 'Sede 1', 'Raul', 'Diaz', 'raul.diaz@computronica.edu', 'contraseña707', 'estudiante', TRUE),
('CI100', 'Sede 3', 'Mariana', 'Vazquez', 'mariana.vazquez@computronica.edu', 'contraseña808', 'administrativo', TRUE);
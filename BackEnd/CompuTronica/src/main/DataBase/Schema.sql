DROP DATABASE IF EXISTS Computronica;

CREATE DATABASE Computronica;

USE Computronica;

DROP TABLE IF EXISTS Usuarios;

CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo_institucional VARCHAR(10) NOT NULL,  -- Código institucional del usuario
    sede VARCHAR(50) NOT NULL,  -- Sede del usuario
    nombre VARCHAR(255) NOT NULL,  -- Nombre del usuario
    apellido VARCHAR(255) NOT NULL,  -- Apellido del usuario
    correo_institucional VARCHAR(255) NOT NULL,  -- Apellido del usuario
    contrasena VARCHAR(255) NOT NULL,  -- Contraseña del usuario
    tipo VARCHAR(255) NOT NULL,  -- Tipo de usuario
    estado BOOLEAN DEFAULT TRUE NOT NULL  -- Estado del usuario (activo por defecto)
);

DROP TABLE IF EXISTS Calificaciones;
DROP TABLE IF EXISTS Asignaturas;

-- Tabla de Asignaturas
CREATE TABLE Asignaturas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo_asignatura VARCHAR(10) NOT NULL,  -- Código de la asignatura
    nombre VARCHAR(100) NOT NULL,             -- Nombre de la asignatura
    descripcion TEXT,                         -- Descripción breve
    creditos INT DEFAULT 3,                   -- Créditos de la materia
    profesor_id INT,                          -- Relación con usuario tipo profesor
    FOREIGN KEY (profesor_id) REFERENCES Usuarios(id)
);

CREATE TABLE Calificaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    estudiante_id INT NOT NULL,
    asignatura_id INT NOT NULL,
    evaluacion ENUM('Parcial', 'Final') NOT NULL,
    nota DECIMAL(4,2) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (estudiante_id) REFERENCES Usuarios(id),
    FOREIGN KEY (asignatura_id) REFERENCES Asignaturas(id)
);

-- Tabla del chat
DROP TABLE IF EXISTS chat_messages;

CREATE TABLE chat_messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sender VARCHAR(255) NOT NULL,       -- Nombre o código del usuario que envía
    content TEXT NOT NULL,              -- Contenido del mensaje
    time VARCHAR(20) NOT NULL,          -- Hora del mensaje (ej. '14:32:10')
    usuario_id INT,                     -- Relación opcional con la tabla Usuarios
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);
CREATE DATABASE IF NOT EXISTS Computronica;
USE Computronica;

CREATE TABLE Login (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    last_login DATETIME,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

CREATE TABLE Chat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,  -- Relacionado con la tabla Usuarios
    receiver_id INT NOT NULL,  -- Relacionado con la tabla Usuarios
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Usuarios(id),
    FOREIGN KEY (receiver_id) REFERENCES Usuarios(id)
);

CREATE TABLE Calificaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,  -- Relacionado con la tabla Usuarios
    asignatura_id INT NOT NULL,  -- Relacionado con la tabla Asignaturas
    calificacion DECIMAL(5, 2),
    fecha DATE,
    FOREIGN KEY (student_id) REFERENCES Usuarios(id),
    FOREIGN KEY (asignatura_id) REFERENCES Asignaturas(id)
);

CREATE TABLE Asignaturas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    carrera_id INT,  -- Relacionado con la tabla Carreras
    FOREIGN KEY (carrera_id) REFERENCES Carreras(id)
);

CREATE TABLE Perfil (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,  -- Relacionado con la tabla Usuarios
    nombre_completo VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    email VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Usuarios(id)
);

CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    tipo ENUM('estudiante', 'profesor', 'administrativo') NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo'
);

CREATE TABLE Presentacion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha DATETIME,
    lugar VARCHAR(255)
);

CREATE TABLE Carreras (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_carrera VARCHAR(255) NOT NULL,
    descripcion TEXT
);

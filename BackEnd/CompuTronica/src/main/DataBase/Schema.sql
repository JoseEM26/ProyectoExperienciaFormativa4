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
    tipo ENUM('estudiante', 'profesor', 'administrativo') NOT NULL,  -- Tipo de usuario
    estado BOOLEAN DEFAULT TRUE NOT NULL  -- Estado del usuario (activo por defecto)
);

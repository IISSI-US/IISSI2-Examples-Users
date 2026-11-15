--
-- Autor: David Ruiz
-- Fecha: Octubre de 2026
-- Descripción: Script para crear la BD del ejercicio de Usuarios
--
DROP DATABASE IF EXISTS users_db;
CREATE DATABASE users_db;
USE users_db;

-- =========================================================================
-- Se eliminan las tablas previas
-- =========================================================================
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- =========================================================================
-- Tabla: users
-- =========================================================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT,
    full_name VARCHAR(120) NOT NULL,
    gender ENUM('MASCULINO','FEMENINO','OTRO'),
    age TINYINT NOT NULL,
    email VARCHAR(255) NOT NULL,
    CONSTRAINT pk_users PRIMARY KEY (user_id),
    CONSTRAINT ck_users_rn01_adult_age CHECK (age >= 18),
    CONSTRAINT uq_users_rn02_email UNIQUE (email)
);

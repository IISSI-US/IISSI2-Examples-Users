--
-- Autor: David Ruiz
-- Fecha: Octubre de 2026
-- Descripción: Procedimiento para poblar la BD de Usuarios
--
USE users_db;

DELIMITER //
CREATE OR REPLACE PROCEDURE p_populate()
BEGIN
    DELETE FROM users;
    ALTER TABLE users AUTO_INCREMENT = 1;

    INSERT INTO users (full_name, gender, age, email) VALUES
        ('David Ruiz', 'MASCULINO', 45, 'druiz@us.es'),
        ('Carlos Arévalo', 'MASCULINO', 58, 'carevalo@us.es'),
        ('Margarita Cruz', 'FEMENINO', 58, 'mcruz@us.es'),
        ('Inma Hernández', 'FEMENINO', 35, 'inmahernandez@us.es'),
        ('Alfonso Márquez', 'MASCULINO', 35, 'amarquez@us.es'),
        ('Daniel Ayala', 'MASCULINO', 28, 'dayala1@us.es'),
        ('Raquel Sampedro', 'FEMENINO', 55, 'rsampedro@gmail.com'),
        ('Marta López', 'FEMENINO', 18, 'mlopez@mail.com'),
        ('David Ruiz', 'MASCULINO', 25, 'druiz@mail.com');

    INSERT INTO users (full_name, age, email)
        VALUES ('Andrea Gómez', 27, 'agomez@mail.es');

    INSERT INTO users (full_name, gender, age, email)
        VALUES ('Ernesto Murillo', 'OTRO', 55, 'emurillo@correo.es');
END //
DELIMITER ;

CALL p_populate();

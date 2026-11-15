-- 
-- Autor: David Ruiz
-- Fecha: Octubre de 2026
-- Descripción: Trigger para validar la edad mínima de los usuarios
-- 

USE users_db;

DELIMITER //
CREATE OR REPLACE TRIGGER t_biu_users_rn01_adult_age
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW
BEGIN
    IF NEW.age < 18 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'RN01: Los usuarios deben ser mayores de edad';
    END IF;
END //
DELIMITER ;

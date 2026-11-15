"use strict";

// #region userValidator
const userValidator = {
  // Los errores de los datos de un usuario (vacío si son correctos): el nombre, con el límite de
  // la columna full_name, y la edad, con la regla RN01
  validateUser: function (formData) {
    let errors = [];

    let fullName = formData.get("full_name").trim();
    if (fullName.length === 0 || fullName.length > 120) {
      errors.push("El nombre debe tener entre 1 y 120 caracteres");
    }

    let age = Number(formData.get("age"));
    if (!Number.isInteger(age) || age < 18) {
      errors.push("RN01: Los usuarios deben ser mayores de edad");
    }

    return errors;
  },
};
// #endregion

export { userValidator };

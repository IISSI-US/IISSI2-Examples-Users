"use strict";

// #region users
// Algunos usuarios del populate de users_db, con los nombres de sus columnas (gender es null si el
// usuario no lo ha indicado). Más adelante, todos vendrán de la API
const users = [
  { user_id: 1, full_name: "David Ruiz", gender: "MASCULINO", age: 45, email: "druiz@us.es" },
  { user_id: 3, full_name: "Margarita Cruz", gender: "FEMENINO", age: 58, email: "mcruz@us.es" },
  { user_id: 10, full_name: "Andrea Gómez", gender: null, age: 27, email: "agomez@mail.es" },
];
// #endregion

export { users };

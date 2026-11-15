"use strict";

import { setupNavbar } from "./navbar.js";
import { usersAPI_auto } from "./api/_auto/users.js";
import { userValidator } from "./validators/users.js";
import { messageRenderer } from "./renderers/messages.js";

// #region userId
// El usuario que se edita (user-form.html?userId=1), o null si es un alta
let userId = new URLSearchParams(window.location.search).get("userId");
// #endregion

// #region loadUser
// Rellena el formulario con los datos del usuario que se edita, pedido a la API
async function loadUser() {
  document.getElementById("form-title").textContent = "Editar usuario";
  document.title = "Editar usuario · Usuarios";
  // Al editar, la vista ya no es «Nuevo usuario»: su enlace de la barra deja de marcarse
  document.querySelector(".ez-navbar [aria-current]").removeAttribute("aria-current");
  try {
    let user = await usersAPI_auto.getById(userId);  // GET /api/users/1
    let form = document.getElementById("user-form");
    form.elements.full_name.value = user.full_name;
    form.elements.age.value = user.age;
    form.elements.email.value = user.email;
    form.elements.gender.value = user.gender ?? "";
  } catch (error) {
    messageRenderer.showErrorMessage("No se ha podido cargar el usuario", error);
  }
}
// #endregion

// #region handleSubmit
// Al enviar el formulario: el navegador no lo envía, se validan sus datos y, si son correctos, se
// crea el usuario en la API (o se modifica, si se edita) y se va a su ficha
async function handleSubmit(event) {
  event.preventDefault();
  let form = event.target;
  let formData = new FormData(form);
  let errorsContainer = document.getElementById("errors");

  let errors = userValidator.validateUser(formData);
  messageRenderer.showErrorsAsAlert(errorsContainer, errors);
  if (errors.length > 0) {
    return;
  }

  try {
    if (userId === null) {
      let result = await usersAPI_auto.create(formData);  // POST /api/users
      window.location.href = `user-detail.html?userId=${result.lastId}`;
    } else {
      await usersAPI_auto.update(formData, userId);  // PUT /api/users/1
      window.location.href = `user-detail.html?userId=${userId}`;
    }
  } catch (error) {
    // El motivo que da la API: una regla de la base de datos (RN02, el correo repetido, viene de
    // la restricción uq_users_rn02_email), un dato que falta…
    let message = error.response?.data?.message ?? "No se han podido guardar los datos del usuario";
    if (message.includes("uq_users_rn02_email")) {
      message = "RN02: Ya hay un usuario con ese correo electrónico";
    }
    messageRenderer.showErrorsAsAlert(errorsContainer, [message]);
  }
}
// #endregion

// #region main
function main() {
  setupNavbar();

  let form = document.getElementById("user-form");
  form.addEventListener("submit", handleSubmit);

  if (userId !== null) {
    loadUser();
  }
}

document.addEventListener("DOMContentLoaded", main);
// #endregion

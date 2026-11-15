"use strict";

import { setupNavbar } from "./navbar.js";
import { usersAPI_auto } from "./api/_auto/users.js";
import { userValidator } from "./validators/users.js";
import { messageRenderer } from "./renderers/messages.js";

// #region handleSubmit
// Al enviar el formulario: el navegador no lo envía, se validan sus datos y, si son correctos, se
// crea el usuario en la API y se va a su ficha
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
    let result = await usersAPI_auto.create(formData);  // POST /api/users
    window.location.href = `user-detail.html?userId=${result.lastId}`;
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
}

document.addEventListener("DOMContentLoaded", main);
// #endregion

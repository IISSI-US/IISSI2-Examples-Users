"use strict";

import { setupNavbar } from "./navbar.js";
import { userValidator } from "./validators/users.js";
import { messageRenderer } from "./renderers/messages.js";

// #region handleSubmit
// Al enviar el formulario: el navegador no lo envía, se validan sus datos y se muestra el resultado
function handleSubmit(event) {
  event.preventDefault();
  let form = event.target;
  let formData = new FormData(form);

  let errors = userValidator.validateUser(formData);
  messageRenderer.showErrorsAsAlert(document.getElementById("errors"), errors);
  if (errors.length === 0) {
    // Más adelante, aquí se enviarán los datos a la API
    messageRenderer.showSuccessMessage("Los datos del usuario son correctos");
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

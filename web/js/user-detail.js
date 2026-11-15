"use strict";

import { setupNavbar } from "./navbar.js";
import { usersAPI_auto } from "./api/_auto/users.js";
import { userRenderer } from "./renderers/users.js";
import { messageRenderer } from "./renderers/messages.js";

// #region userId
// El usuario de la vista, del parámetro userId de la URL (user-detail.html?userId=1)
let userId = new URLSearchParams(window.location.search).get("userId");
// #endregion

// #region main
async function main() {
  setupNavbar();

  // El usuario, de la API (GET /api/users/1)
  try {
    let user = await usersAPI_auto.getById(userId);
    document.getElementById("user-details").replaceChildren(userRenderer.asDetails(user));
    document.title = `${user.full_name} · Usuarios`;
  } catch (error) {
    // 404: no hay ningún usuario con ese identificador
    if (error.response?.status === 404) {
      messageRenderer.showErrorMessage("El usuario no existe");
    } else {
      messageRenderer.showErrorMessage("No se ha podido cargar el usuario", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", main);
// #endregion

"use strict";

import { setupNavbar } from "./navbar.js";
import { usersAPI_auto } from "./api/_auto/users.js";
import { userRenderer } from "./renderers/users.js";
import { messageRenderer } from "./renderers/messages.js";

// #region getAgeStats
// RF04: la edad media y el total de una lista de usuarios
function getAgeStats(userList) {
  let total = userList.length;
  let sum = 0;
  for (let user of userList) {
    sum += user.age;
  }
  return { total: total, average: sum / total };
}
// #endregion

// #region showUsers
// Pinta la tabla con los usuarios indicados y, encima, su total y su edad media (RF04)
function showUsers(users) {
  let container = document.getElementById("users");
  container.replaceChildren(userRenderer.asTable(users));

  let stats = getAgeStats(users);
  let average = stats.average.toLocaleString("es-ES", { maximumFractionDigits: 1 });
  document.getElementById("user-stats").textContent =
    `${stats.total} usuarios, con una edad media de ${average} años.`;
}
// #endregion

// #region main
async function main() {
  setupNavbar();

  // Los usuarios, de la API (GET /api/users)
  try {
    let users = await usersAPI_auto.getAll();
    showUsers(users);
  } catch (error) {
    messageRenderer.showErrorMessage("No se han podido cargar los usuarios", error);
  }
}

document.addEventListener("DOMContentLoaded", main);
// #endregion

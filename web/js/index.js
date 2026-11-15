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
// Pinta la tabla con los usuarios indicados y, encima, su total y su edad media (RF04; con el
// filtro de us.es, RF05)
function showUsers(users) {
  let container = document.getElementById("users");
  container.replaceChildren(userRenderer.asTable(users));

  let stats = getAgeStats(users);
  let average = stats.average.toLocaleString("es-ES", { maximumFractionDigits: 1 });
  document.getElementById("user-stats").textContent =
    `${stats.total} usuarios, con una edad media de ${average} años.`;
}
// #endregion

// #region filters
// Los filtros de la lista: el valor de cada opción del desplegable y la función de la API que
// pide sus usuarios (RF02 y RF03 son endpoints propios, con el SQL de IISSI-1)
const filters = {
  "all": usersAPI_auto.getAll,             // GET /api/users
  "women": usersAPI_auto.getWomen,         // GET /api/users/women (RF02)
  "us-domain": usersAPI_auto.getUsDomain,  // GET /api/users/us-domain (RF03)
};
// #endregion

// #region loadUsers
// Pide a la API los usuarios del filtro indicado y los pinta
async function loadUsers(filter) {
  try {
    let users = await filters[filter]();
    showUsers(users);
  } catch (error) {
    messageRenderer.showErrorMessage("No se han podido cargar los usuarios", error);
  }
}
// #endregion

// #region handleFilter
// Al cambiar el filtro: se guarda en el navegador (localStorage), para que la lista lo recuerde
// la próxima vez, y se pintan sus usuarios
function handleFilter(event) {
  let filter = event.target.value;
  localStorage.setItem("usersFilter", filter);
  loadUsers(filter);
}
// #endregion

// #region main
function main() {
  setupNavbar();

  // El último filtro elegido, si lo hay y sigue existiendo; si no, todos los usuarios
  let filter = localStorage.getItem("usersFilter");
  if (!(filter in filters)) {
    filter = "all";
  }
  let select = document.getElementById("filter");
  select.value = filter;
  select.addEventListener("change", handleFilter);
  loadUsers(filter);
}

document.addEventListener("DOMContentLoaded", main);
// #endregion

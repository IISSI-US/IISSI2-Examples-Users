"use strict";

import { setupNavbar } from "./navbar.js";
import { users } from "./data/users.js";

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

// #region main
function main() {
  setupNavbar();

  // RF04 sobre los usuarios del array, en la consola: el total y la edad media, con un decimal
  let stats = getAgeStats(users);
  console.log(`Total de usuarios: ${stats.total}`);
  console.log(`Edad media: ${stats.average.toFixed(1)} años`);
}

document.addEventListener("DOMContentLoaded", main);
// #endregion

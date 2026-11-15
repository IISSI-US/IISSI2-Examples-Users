"use strict";

import { ezNavbar } from "../ez-ui/js/navbar.js";
import { ezThemeToggle } from "../ez-ui/js/theme.js";

// #region setupNavbar
// Activa los botones de la barra de navegación de la vista: el del menú plegable (en pantallas
// estrechas) y el del tema claro u oscuro
function setupNavbar() {
  let navbar = document.querySelector(".ez-navbar");
  ezNavbar(navbar);
  ezThemeToggle(navbar.querySelector(".ez-theme-toggle"));
}
// #endregion

export { setupNavbar };

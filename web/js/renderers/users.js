"use strict";

import { parseHTML } from "../utils/parseHTML.js";

// #region genderLabel
// El género tal como se muestra: el valor de la columna (MASCULINO…) con mayúscula inicial, o
// nada si el usuario no lo ha indicado (null)
function genderLabel(gender) {
  if (gender === null) {
    return "";
  }
  return gender.charAt(0) + gender.slice(1).toLowerCase();
}
// #endregion

// #region userRenderer
const userRenderer = {
  // Los usuarios en una tabla (dentro de ez-scroll, que la desplaza en el móvil), cada nombre
  // enlazado a su ficha
  asTable: function (users) {
    let rows = "";
    for (let user of users) {
      rows += `<tr>
        <td><a href="user-detail.html?userId=${user.user_id}">${user.full_name}</a></td>
        <td class="ez-number">${user.age}</td>
        <td>${user.email}</td>
        <td>${genderLabel(user.gender)}</td>
      </tr>`;
    }
    let html = `<div class="ez-scroll">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th class="ez-number">Edad</th>
            <th>Correo electrónico</th>
            <th>Género</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
    return parseHTML(html);
  },

  // La ficha de un usuario: sus datos y los botones para editarlo y borrarlo
  asDetails: function (user) {
    let html = `<div>
      <h1>${user.full_name}</h1>
      <dl class="app-user-data">
        <dt>Edad</dt>
        <dd>${user.age} años</dd>
        <dt>Correo electrónico</dt>
        <dd><a href="mailto:${user.email}">${user.email}</a></dd>
        <dt>Género</dt>
        <dd>${genderLabel(user.gender) || "Sin especificar"}</dd>
      </dl>
      <p>
        <a class="ez-button ez-button--secondary" href="user-form.html?userId=${user.user_id}">Editar</a>
        <button id="delete-button" class="ez-button ez-button--danger" type="button">Borrar</button>
      </p>
    </div>`;
    return parseHTML(html);
  },
};
// #endregion

export { userRenderer };

"use strict";

// #region parseHTML
// El elemento que describe una cadena HTML (su primer elemento)
function parseHTML(str) {
  let aux = document.implementation.createHTMLDocument();
  aux.body.innerHTML = str;
  return aux.body.children[0];
}
// #endregion

export { parseHTML };

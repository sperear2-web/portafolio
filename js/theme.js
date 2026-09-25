/* =============================================================
   theme.js — Aplica el tema guardado ANTES de que la página se pinte.
   Se carga en el <head> sin "defer" para evitar un parpadeo de colores.
   El botón para cambiar el tema está en main.js (initTheme).
   ============================================================= */
(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    /* Si localStorage no está disponible se usa el tema claro por defecto */
  }
})();

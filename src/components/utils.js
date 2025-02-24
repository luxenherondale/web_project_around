// utils.js

// Función para abrir cualquier popup
export function openPopup(popup) {
  popup.classList.add("active");
  // Añade el listener para la tecla Escape
  document.addEventListener("keydown", handleEscClose);
  // Añade el listener para cerrar al hacer click fuera
  popup.addEventListener("click", handleOverlayClick);
}

// Función para cerrar cualquier popup
export function closePopup(popup) {
  popup.classList.remove("active");
  // Remueve el listener de la tecla Escape
  document.removeEventListener("keydown", handleEscClose);
  // Remueve el listener del click fuera
  popup.removeEventListener("click", handleOverlayClick);
}

// Función para manejar el cierre con la tecla Escape
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    // Busca el popup activo
    const activePopup = document.querySelector(".active");
    if (activePopup) {
      closePopup(activePopup);
    }
  }
}

// Función para manejar el cierre al hacer click fuera del popup
function handleOverlayClick(evt) {
  // Si el click fue directo en el overlay (fondo), cierra el popup
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// Función para manejar el cierre de popup de imagen
export function closeImagePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

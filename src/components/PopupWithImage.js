// Esta clase extiende Popup para manejar los popups que muestran imágenes

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // Selección de elementos del popup de imagen
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
    // Seleccionamos también el contenedor interno
    this._container = this._popup.querySelector(".popup__conteiner-image");

    if (!this._image) {
      console.error("No se encontró el elemento image en el popup de imagen");
    }
    if (!this._caption) {
      console.error("No se encontró el elemento caption en el popup de imagen");
    }
    if (!this._container) {
      console.error("No se encontró el contenedor de imagen en el popup");
    }
  }

  // Método público para abrir el popup con una imagen
  open({ link, name }) {
    // Configuración de la imagen antes de mostrarla
    if (this._image && this._caption) {
      console.log(`Abriendo imagen: ${name}, ${link}`); // Debug
      this._image.src = link;
      this._image.alt = name;
      this._caption.textContent = name;

      // Hacemos visible tanto el popup principal como el contenedor interno
      this._popup.classList.add("popup_opened");

      // Hacemos visible el contenedor interno
      if (this._container) {
        this._container.classList.add("popup_opened");
        this._container.style.visibility = "visible";
      }

      // Añadimos los event listeners necesarios
      document.addEventListener("keydown", this._handleEscClose);
      this._popup.addEventListener("click", this._handleOverlayClick);
    } else {
      console.error("No se pueden establecer los datos de la imagen");
    }
  }

  // Método público para configurar los event listeners específicos
  setEventListeners() {
    const closeButton = this._popup.querySelector(".image__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    } else {
      console.error("No se encontró el botón de cierre en el popup de imagen");
    }
  }

  // Método público para cerrar el popup y limpiar datos
  close() {
    // Ocultamos tanto el popup como el contenedor interno
    this._popup.classList.remove("popup_opened");

    if (this._container) {
      this._container.classList.remove("popup_opened");
      this._container.style.visibility = "hidden";
    }

    // Limpiamos la imagen al cerrar
    if (this._image) {
      this._image.src = "";
      this._image.alt = "";
    }
    if (this._caption) {
      this._caption.textContent = "";
    }

    // Removemos los event listeners
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("click", this._handleOverlayClick);
  }
}

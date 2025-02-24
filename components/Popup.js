// Esta clase se encarga de manejar la funcionalidad básica de todos los popups

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    if (!this._popup) {
      console.error(
        `No se encontró el elemento popup con el selector: ${popupSelector}`
      );
    }
    // Vinculación del contexto para los manejadores de eventos
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  // Método para abrir el popup adaptado a las clases del HTML
  open() {
    if (this._popup) {
      console.log("Intentando abrir popup:", this._popup);

      // Detectamos qué tipo de popup es para usar la clase correcta
      if (this._popup.classList.contains("overlay")) {
        this._popup.classList.add("active"); // Para popups de tipo overlay
      } else if (this._popup.classList.contains("addcard")) {
        this._popup.classList.add("active"); // Para el popup de añadir tarjeta
      } else if (this._popup.classList.contains("delete-confirmation")) {
        this._popup.classList.add("active"); // Para el popup de confirmación
      } else if (this._popup.classList.contains("avatar-edit")) {
        this._popup.classList.add("active"); // Para el popup de edición de avatar
      } else if (this._popup.classList.contains("popup__space-image")) {
        this._popup.classList.add("popup_opened"); // Para el popup de imagen
      }

      document.addEventListener("keydown", this._handleEscClose);
      this._popup.addEventListener("click", this._handleOverlayClick);
    }
  }

  // Método para cerrar el popup adaptado a las clases del HTML
  close() {
    if (this._popup) {
      // Detectamos qué tipo de popup es para remover la clase correcta
      if (this._popup.classList.contains("overlay")) {
        this._popup.classList.remove("active"); // Para popups de tipo overlay
      } else if (this._popup.classList.contains("addcard")) {
        this._popup.classList.remove("active"); // Para el popup de añadir tarjeta
      } else if (this._popup.classList.contains("delete-confirmation")) {
        this._popup.classList.remove("active"); // Para el popup de confirmación
      } else if (this._popup.classList.contains("avatar-edit")) {
        this._popup.classList.remove("active"); // Para el popup de edición de avatar
      } else if (this._popup.classList.contains("popup__space-image")) {
        this._popup.classList.remove("popup_opened"); // Para el popup de imagen
      }

      document.removeEventListener("keydown", this._handleEscClose);
      this._popup.removeEventListener("click", this._handleOverlayClick);
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    if (this._popup) {
      // Seleccionar el botón de cierre según el tipo de popup
      let closeButton;

      if (this._popup.classList.contains("overlay")) {
        closeButton = this._popup.querySelector(".form__close-button");
      } else if (this._popup.classList.contains("addcard")) {
        closeButton = this._popup.querySelector(".form__close-button-card");
      } else if (this._popup.classList.contains("avatar-edit")) {
        closeButton = this._popup.querySelector(".form__close-button-card");
      } else if (this._popup.classList.contains("popup__space-image")) {
        closeButton = this._popup.querySelector(".image__close");
      } else if (this._popup.classList.contains("delete-confirmation")) {
        closeButton = this._popup.querySelector(".form__close-button-card");
      }

      if (closeButton) {
        closeButton.addEventListener("click", () => this.close());
      }
    }
  }
}

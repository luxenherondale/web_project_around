// components/Popup.js

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

  // Método público para abrir el popup
  open() {
    if (this._popup) {
      // CORRECCIÓN: Usamos la clase popup_opened
      this._popup.classList.add("popup_opened");
      document.addEventListener("keydown", this._handleEscClose);
      this._popup.addEventListener("click", this._handleOverlayClick);
    }
  }

  // Método público para cerrar el popup
  close() {
    if (this._popup) {
      // CORRECCIÓN: Usamos la clase popup_opened
      this._popup.classList.remove("popup_opened");
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
      const closeButton = this._popup.querySelector(
        ".form__close-button, .form__close-button-card, .image__close"
      );
      if (closeButton) {
        closeButton.addEventListener("click", () => this.close());
      }
    }
  }
}

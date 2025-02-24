// Esta clase extiende Popup para crear un diálogo de confirmación

import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    // Buscar el botón de confirmación dentro del popup
    this._confirmButton = this._popup
      ? this._popup.querySelector(".popup__confirm-button")
      : null;

    // Si no encontramos el botón, buscamos cualquier botón tipo submit
    if (!this._confirmButton && this._popup) {
      this._confirmButton = this._popup.querySelector(
        "button[type='submit'], .buttonsave"
      );
    }

    if (!this._confirmButton) {
      console.error(
        `No se encontró un botón de confirmación en el popup: ${popupSelector}`
      );
    }
  }

  // Método para establecer la acción al confirmar
  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  // Configurar event listeners específicos
  setEventListeners() {
    super.setEventListeners();

    if (this._confirmButton) {
      this._confirmButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        if (typeof this._handleSubmit === "function") {
          this._handleSubmit();
        } else {
          console.error(
            "No se ha definido una acción para el botón de confirmación"
          );
        }
      });
    }
  }

  // Sobrescribir el método open para asegurar que haya una acción definida
  open() {
    if (!this._handleSubmit) {
      console.warn("Abriendo popup de confirmación sin acción definida");
    }
    super.open();
  }
}

// Esta clase extiende Popup para manejar formularios en popups

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    // Buscamos el formulario dentro del popup
    this._form = this._popup.querySelector(".form");
    if (!this._form) {
      console.error(
        `No se encontró un formulario en el popup: ${popupSelector}`
      );
    }

    // Obtenemos todos los inputs del formulario
    this._inputList = this._form
      ? Array.from(this._form.querySelectorAll(".form__input"))
      : [];

    // Encontramos el botón de envío
    this._submitButton = this._form
      ? this._form.querySelector(".buttonsave")
      : null;
    if (this._submitButton) {
      this._submitButtonText = this._submitButton.textContent;
    }

    // Debug: Mostrar inputs encontrados
    console.log(
      `PopupWithForm: Encontrados ${this._inputList.length} inputs en ${popupSelector}`
    );
    this._inputList.forEach((input) => {
      console.log(`Input ID: ${input.id}, Name: ${input.name || "sin nombre"}`);
    });
  }

  // Método para obtener los valores de todos los inputs
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      // Usamos el ID como clave si no hay un atributo name
      const key = input.name || input.id;
      if (key) {
        formValues[key] = input.value;
      }
    });

    // Debug: Mostrar valores recopilados
    console.log("Valores del formulario:", formValues);

    return formValues;
  }

  // Método para cambiar el texto del botón durante la carga
  renderLoading(isLoading, loadingText = "Guardando...") {
    if (this._submitButton) {
      this._submitButton.textContent = isLoading
        ? loadingText
        : this._submitButtonText || "Guardar";
    }
  }

  // Configura los event listeners específicos para el formulario
  setEventListeners() {
    super.setEventListeners();

    if (this._form) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        console.log("Formulario enviado");
        const formValues = this._getInputValues();
        this._handleFormSubmit(formValues);
      });
    }
  }

  // Cierra el popup y resetea el formulario
  close() {
    super.close();
    if (this._form) {
      this._form.reset();
    }
  }

  // Método para debugging - mostrar estado del formulario
  logFormState() {
    if (this._form) {
      console.log("Estado del formulario:");
      console.log("- Visible:", this._popup.classList.contains("active"));
      console.log("- Número de inputs:", this._inputList.length);
      console.log("- Botón submit encontrado:", !!this._submitButton);
    }
  }
}

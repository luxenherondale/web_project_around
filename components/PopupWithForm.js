// components/PopupWithForm.js

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // Función que maneja el envío del formulario
    this._form = this._popup.querySelector(".form"); // Formulario dentro del popup

    // Verificación de la existencia del formulario
    if (!this._form) {
      console.error(`No se encontró el formulario en ${popupSelector}`);
      return;
    }

    this._inputList = this._form.querySelectorAll(".form__input"); // Lista de inputs del formulario
  }

  // Método privado para obtener los valores de los inputs
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.id] = input.value; // Usamos el ID del input como clave
    });
    return formValues;
  }

  // Método público para configurar los event listeners del popup
  setEventListeners() {
    super.setEventListeners(); // Llama al método setEventListeners de la clase padre

    if (this._form) {
      // Manejo del envío del formulario
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        // Llamamos a la función de manejo con los valores del formulario
        this._handleFormSubmit(this._getInputValues());
      });
    }
  }

  // Método público para cerrar el popup
  close() {
    if (this._form) {
      this._form.reset(); // Resetea el formulario
    }
    super.close(); // Llama al método close de la clase padre
  }
}

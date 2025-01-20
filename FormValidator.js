// FormValidator.js

// Clase para manejar la validación de formularios
export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputRules = config.inputs;

    // Encuentra el botón submit y los inputs del formulario
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  // Muestra el mensaje de error para un campo
  _showInputError(inputElement, errorMessage) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Oculta el mensaje de error de un campo
  _hideInputError(inputElement) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  // Verifica las reglas específicas de cada campo
  _checkInputValidity(inputElement) {
    const rules = this._inputRules.find((rule) => rule.id === inputElement.id);

    if (!rules) return true;

    if (rules.isUrl && !inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        "Por favor, ingresa una dirección web válida."
      );
      return false;
    }

    if (rules.minLength && inputElement.value.length < rules.minLength) {
      this._showInputError(inputElement, `Por favor, rellena este campo.`);
      return false;
    }

    if (rules.maxLength && inputElement.value.length > rules.maxLength) {
      this._showInputError(
        inputElement,
        `Debe tener máximo ${rules.maxLength} caracteres.`
      );
      return false;
    }

    this._hideInputError(inputElement);
    return true;
  }

  // Verifica si hay algún campo inválido
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !this._checkInputValidity(inputElement);
    });
  }

  // Actualiza el estado del botón submit
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  // Configura los event listeners del formulario
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  // Activa la validación del formulario
  enableValidation() {
    this._setEventListeners();
  }

  // Resetea la validación del formulario
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}

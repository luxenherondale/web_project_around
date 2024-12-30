/// VALIDACION DE FORMULARIOS //

// Configuración para cada formulario
const validationConfigs = {
  profileForm: {
    formSelector: ".profile__form-edit",
    inputs: [
      { id: "name", minLength: 2, maxLength: 40 },
      { id: "job", minLength: 2, maxLength: 200 },
    ],
    submitButtonId: "buttonsave",
  },
  cardForm: {
    formSelector: ".card__form-add",
    inputs: [
      { id: "title", minLength: 2, maxLength: 30 },
      { id: "url", isUrl: true },
    ],
    submitButtonId: "cardbuttonsave",
  },
};

// Funciones de validación comunes
function showInputError(inputElement, errorMessage) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  inputElement.classList.add("forminput_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("forminput-error_active");
}

function hideInputError(inputElement) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  inputElement.classList.remove("forminput_type_error");
  errorElement.classList.remove("forminput-error_active");
  errorElement.textContent = "";
}

function checkInputValidity(inputElement, rules) {
  if (rules.isUrl && !inputElement.validity.valid) {
    showInputError(
      inputElement,
      "Por favor, ingresa una dirección web válida."
    );
    return false;
  }
  if (rules.minLength && inputElement.value.length < rules.minLength) {
    showInputError(inputElement, `Por favor, rellena este campo.`);
    return false;
  }
  if (rules.maxLength && inputElement.value.length > rules.maxLength) {
    showInputError(
      inputElement,
      `Debe tener máximo ${rules.maxLength} caracteres.`
    );
    return false;
  }
  hideInputError(inputElement);
  return true;
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("button_inactive");
    buttonElement.disabled = false;
  }
}

// Configurar eventos de validación para un formulario
function enableValidation(config) {
  const formElement = document.querySelector(config.formSelector);
  const submitButton = document.getElementById(config.submitButtonId);
  const inputList = config.inputs.map((inputConfig) => ({
    element: document.getElementById(inputConfig.id),
    rules: inputConfig,
  }));

  inputList.forEach(({ element, rules }) => {
    element.addEventListener("input", () => {
      checkInputValidity(element, rules);
      toggleButtonState(
        inputList.map((input) => input.element),
        submitButton
      );
    });
  });

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (!hasInvalidInput(inputList.map((input) => input.element))) {
      console.log("Formulario válido:", config.formSelector);
    }
  });

  // Inicializar estado del botón
  toggleButtonState(
    inputList.map((input) => input.element),
    submitButton
  );
}

// Inicializar validaciones para ambos formularios
Object.values(validationConfigs).forEach(enableValidation);

// Función para cerrar el pop-up al hacer clic en la superposición (Editar perfil)
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    overlay.classList.remove("active");
  }
});

// Función para cerrar el pop-up al hacer clic en la superposición (Agregar tarjeta)
const addCardOverlay = document.getElementById("addcard"); // Superposición del formulario de tarjetas
addCardOverlay.addEventListener("click", (event) => {
  if (event.target === addCardOverlay) {
    addCardOverlay.classList.remove("active");
  }
});

// Función para cerrar el pop-up al presionar la tecla Esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    // Cerrar el pop-up de Editar perfil si está activo
    if (overlay.classList.contains("active")) {
      overlay.classList.remove("active");
    }
    // Cerrar el pop-up de Agregar tarjeta si está activo
    if (addCardOverlay.classList.contains("active")) {
      addCardOverlay.classList.remove("active");
    }
  }
});

// LLAMADA  A LA ENABLEVALIDATION
enableValidation({
  formSelector: ".profile__form-edit, .card__form-add", // Selector combinado para ambos formularios
  inputSelector: ".form__input", // Clase común para los campos de entrada
  submitButtonSelector: ".buttonsave, .cardbuttonsave", // Selector combinado para los botones de envío
  inactiveButtonClass: "button_inactive", // Clase para desactivar botones
  inputErrorClass: "forminput_type_error", // Clase para campos con errores
  errorClass: "forminput-error_active", // Clase para mensajes de error visibles
});

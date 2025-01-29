// index.js

// Importación de clases y funciones
import Card from "./components/card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

// Configuración específica para cada formulario
const validationConfigs = {
  profileForm: {
    formSelector: ".profile__form-edit", // Selector del formulario de edición de perfil
    inputSelector: ".form__input", // Selector de los inputs del formulario
    submitButtonSelector: ".buttonsave", // Selector del botón de guardar
    inactiveButtonClass: "button_inactive", // Clase para el botón inactivo
    inputErrorClass: "forminput_type_error", // Clase para el input con error
    errorClass: "forminput-error_active", // Clase para el mensaje de error
    inputs: [
      { id: "name", minLength: 2, maxLength: 40 }, // Reglas para el input de nombre
      { id: "job", minLength: 2, maxLength: 200 }, // Reglas para el input de trabajo
    ],
  },
  cardForm: {
    formSelector: ".card__form-add", // Selector del formulario de añadir tarjeta
    inputSelector: ".form__input", // Selector de los inputs del formulario
    submitButtonSelector: ".buttonsave", // Selector del botón de guardar
    inactiveButtonClass: "button_inactive", // Clase para el botón inactivo
    inputErrorClass: "forminput_type_error", // Clase para el input con error
    errorClass: "forminput-error_active", // Clase para el mensaje de error
    inputs: [
      { id: "title", minLength: 2, maxLength: 30 }, // Reglas para el input de título
      { id: "url", isUrl: true }, // Reglas para el input de URL
    ],
  },
};

// Cards iniciales - Galería predeterminada
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Selección de elementos del DOM
const btnOpenPopUp = document.getElementById("btn-open-popup"); // Botón para abrir el popup de perfil
const btnClosePopup = document.getElementById("btn-close-popup"); // Botón para cerrar el popup de perfil
const btnAbrirPopUpCard = document.getElementById("add-button-card"); // Botón para abrir el popup de nueva tarjeta
const btnClosePopupCard = document.getElementById("btn-close-popup-card"); // Botón para cerrar el popup de nueva tarjeta
const overlay = document.getElementById("overlay"); // Fondo oscuro del popup de perfil
const addcardPopup = document.getElementById("addcard"); // Contenedor del popup de nueva tarjeta
const formAddCard = document.querySelector(".card__form-add"); // Formulario para añadir tarjeta
const cardsContainer = document.querySelector(".card__conteiner"); // Contenedor de todas las tarjetas
const profileForm = document.querySelector(".profile__form-edit"); // Formulario de edición de perfil
const nameInput = document.getElementById("name"); // Campo de entrada para el nombre
const jobInput = document.getElementById("job"); // Campo de entrada para el trabajo
const displayName = document.getElementById("displayName"); // Elemento que muestra el nombre actual
const displayJob = document.getElementById("displayJob"); // Elemento que muestra el trabajo actual
const closeImageButton = document.getElementById("close-image-popup"); // Botón para cerrar el popup de imagen
const imagePopup = document.getElementById("image-popup"); // Contenedor del popup de imagen

// Inicialización del manejo de información de usuario
const userInfo = new UserInfo({
  nameSelector: "#displayName",
  jobSelector: "#displayJob",
});

// Inicialización del popup de imagen
const popupWithImage = new PopupWithImage(".popup__space-image");
popupWithImage.setEventListeners();

// Función para crear una nueva tarjeta
const createCard = (data) => {
  const card = new Card(data, "#card-template", (imageData) =>
    popupWithImage.open(imageData)
  );
  return card.generateCard();
};

// Configuración de la sección de tarjetas y su renderizado inicial
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".card__conteiner"
);

// Renderiza las tarjetas iniciales
cardSection.renderItems();

// Función para manejar el envío del formulario de perfil
const handleProfileFormSubmit = (formData) => {
  userInfo.setUserInfo(formData);
  profilePopup.close();
};

// Función para manejar el envío del formulario de nueva tarjeta
const handleCardFormSubmit = (formData) => {
  const cardData = {
    name: formData.title,
    link: formData.url,
  };
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
  addCardPopup.close();
};

// Inicialización de los popups de formulario
const profilePopup = new PopupWithForm(
  "#popup-editprofile",
  handleProfileFormSubmit
);
const addCardPopup = new PopupWithForm("#popup-addcard", handleCardFormSubmit);

// Configuración de los event listeners de los popups
profilePopup.setEventListeners();
addCardPopup.setEventListeners();

// Event Listeners

// Popup de perfil
btnOpenPopUp.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  editFormValidator.resetValidation();
  profilePopup.open();
});

// Popup de nueva tarjeta
btnAbrirPopUpCard.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

// Popup de imagen
closeImageButton.addEventListener("click", () => {
  popupWithImage.close();
});

// Inicialización de los validadores de formulario
const editFormValidator = new FormValidator(
  validationConfigs.profileForm,
  profileForm
);
const addCardFormValidator = new FormValidator(
  validationConfigs.cardForm,
  formAddCard
);

// Activación de la validación de formularios
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

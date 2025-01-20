// index.js

// Importación de clases y funciones
import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, closeImagePopup } from "./utils.js";

// Configuración específica para cada formulario
const validationConfigs = {
  profileForm: {
    formSelector: ".profile__form-edit",
    inputSelector: ".form__input",
    submitButtonSelector: ".buttonsave",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "forminput_type_error",
    errorClass: "forminput-error_active",
    inputs: [
      { id: "name", minLength: 2, maxLength: 40 },
      { id: "job", minLength: 2, maxLength: 200 },
    ],
  },
  cardForm: {
    formSelector: ".card__form-add",
    inputSelector: ".form__input",
    submitButtonSelector: ".buttonsave",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "forminput_type_error",
    errorClass: "forminput-error_active",
    inputs: [
      { id: "title", minLength: 2, maxLength: 30 },
      { id: "url", isUrl: true },
    ],
  },
};

// Cards iniciales
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
const btnOpenPopUp = document.getElementById("btn-open-popup");
const btnClosePopup = document.getElementById("btn-close-popup");
const btnAbrirPopUpCard = document.getElementById("add-button-card");
const btnClosePopupCard = document.getElementById("btn-close-popup-card");
const overlay = document.getElementById("overlay");
const addcardPopup = document.getElementById("addcard");
const formAddCard = document.querySelector(".card__form-add");
const cardsContainer = document.querySelector(".card__conteiner");
const profileForm = document.querySelector(".profile__form-edit");
const nameInput = document.getElementById("name");
const jobInput = document.getElementById("job");
const displayName = document.getElementById("displayName");
const displayJob = document.getElementById("displayJob");
const closeImageButton = document.getElementById("close-image-popup");
const imagePopup = document.getElementById("image-popup");

// Función para crear una nueva tarjeta
function createCard(data) {
  const card = new Card(data, "#card-template");
  return card.generateCard();
}

// Manejador del formulario de perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  displayName.textContent = nameInput.value;
  displayJob.textContent = jobInput.value;
  closePopup(overlay);
}

// Manejador del formulario de nueva tarjeta
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const titleInput = document.getElementById("title");
  const urlInput = document.getElementById("url");

  const newCard = createCard({
    name: titleInput.value,
    link: urlInput.value,
  });

  cardsContainer.prepend(newCard);
  formAddCard.reset();
  closePopup(addcardPopup);
}

// Event Listeners

// Popup de perfil
btnOpenPopUp.addEventListener("click", () => openPopup(overlay));
btnClosePopup.addEventListener("click", () => closePopup(overlay));
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Popup de nueva tarjeta
btnAbrirPopUpCard.addEventListener("click", () => openPopup(addcardPopup));
btnClosePopupCard.addEventListener("click", () => closePopup(addcardPopup));
formAddCard.addEventListener("submit", handleCardFormSubmit);

// Popup de imagen
closeImageButton.addEventListener("click", () => closeImagePopup(imagePopup));

// Inicialización de la validación de formularios
const editFormValidator = new FormValidator(
  validationConfigs.profileForm,
  profileForm
);
const addCardFormValidator = new FormValidator(
  validationConfigs.cardForm,
  formAddCard
);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Creación de cards iniciales
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  cardsContainer.append(cardElement);
});

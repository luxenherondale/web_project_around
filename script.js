const btnAbrirPopUp = document.getElementById("btn-abrir-popup"),
  overlay = document.getElementById("overlay"),
  popup = document.getElementById("popup-editprofile"),
  btnCerrarPopup = document.getElementById("btn-cerrar-popup");

btnAbrirPopUp.addEventListener("click", function () {
  overlay.classList.add("active");
});
btnCerrarPopup.addEventListener("click", function () {
  overlay.classList.remove("active");
});

// Busquemos el formulario en el DOM
const overlayElement = document.getElementById("overlay");
const formElement = document.querySelector(".profile__form-edit");

// Selecciona los elementos donde se introducirán los valores de los campos
const displayName = document.getElementById("displayName");
const displayJob = document.getElementById("displayJob");

// El manipulador de entrega de formularios
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Evita que el formulario se envíe de manera predeterminada

  // Busquemos los campos del formulario en el DOM
  const nameInput = document.getElementById("name");
  const jobInput = document.getElementById("job");

  // Obtén los valores de cada campo
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Inserta nuevos valores en el HTML
  displayName.textContent = "" + nameValue;
  displayJob.textContent = "" + jobValue;

  // Limpia los campos del formulario
  nameInput.value = "";
  jobInput.value = "";

  // Cierra el pop-up
  overlayElement.classList.add("hidden");
}

// Conecta el manipulador al formulario
formElement.addEventListener("submit", handleProfileFormSubmit);

// Cerrar el pop-up al guardar (botón "Guardar")
buttonsave.addEventListener("click", function (event) {
  overlayElement.classList.remove("active"); // Cerrar el pop-up
});

// Tarjetas
// Selección de elementos del DOM
const btnAbrirPopUpCard = document.getElementById("add-button-card");
const addcardPopup = document.getElementById("addcard");
const btnCerrarPopupCard = document.getElementById("btn-cerrar-popup-card");
const formAddCard = document.querySelector(".card__form-add");
const cardsContainer = document.querySelector(".card__conteiner");
const cardTemplate = document.querySelector("#card-template").content; // Template para las tarjetas

//  pop up imagen en grande
const imagePopup = document.getElementById("image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const closeImagePopup = document.getElementById("close-image-popup");

// Abrir popup formulario de agregar tarjeta
btnAbrirPopUpCard.addEventListener("click", () => {
  addcardPopup.classList.add("active");
});

// Cerrar popup de agregar tarjeta
btnCerrarPopupCard.addEventListener("click", () => {
  addcardPopup.classList.remove("active");
});

// Función para abrir el popup con imagen y título
function openImagePopup(src, title) {
  popupImage.src = src;
  popupImage.alt = title;
  popupCaption.textContent = title; // Asignar el título al caption
  imagePopup.classList.add("popup_opened");
}
// Cerrar popup de imagen
closeImagePopup.addEventListener("click", () => {
  imagePopup.classList.remove("popup_opened");
});

// Función para crear una nueva tarjeta
function createCard(titleValue, urlValue) {
  // Clonar el contenido del template
  const cardElement = cardTemplate.cloneNode(true);

  // Personalizar la tarjeta
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = urlValue; // Establecer la URL de la imagen
  cardImage.alt = titleValue; // Establecer el texto alternativo

  const cardText = cardElement.querySelector(".card__text");
  cardText.textContent = titleValue; // Establecer el título

  const likeButton = cardElement.querySelector(".button__like");
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("button__like_active"); // Esto agrega o quita la clase activa
  });

  // Botón de eliminar
  const deleteButton = cardElement.querySelector(".button__delete");
  deleteButton.addEventListener("click", function () {
    const parentCard = deleteButton.closest(".card__content"); // Encuentra el contenedor más cercano
    if (parentCard) {
      parentCard.remove(); // Elimina la tarjeta del DOM
    }
  });

  // Evento para abrir el popup al hacer clic en la imagen
  cardImage.addEventListener("click", () => {
    openImagePopup(cardImage.src, cardText.textContent);
  });

  // Agregar la tarjeta al contenedor
  cardsContainer.appendChild(cardElement);
}

// Manejo del formulario para agregar nueva tarjeta
formAddCard.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita el envío por defecto

  // Obtener valores de los campos
  const titleInput = document.getElementById("title");
  const urlInput = document.getElementById("url");
  const titleValue = titleInput.value.trim();
  const urlValue = urlInput.value.trim();

  // Validar los valores
  if (!titleValue || !urlValue) {
    alert("Por favor, completa ambos campos.");
    return;
  }

  // Crear y agregar la tarjeta
  createCard(titleValue, urlValue);

  // Limpiar campos del formulario
  titleInput.value = "";
  urlInput.value = "";

  // Cerrar el popup formulario
  addcardPopup.classList.remove("active");
});

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

// Crear las tarjetas iniciales al cargar la página
initialCards.forEach((card) => {
  createCard(card.name, card.link);
});

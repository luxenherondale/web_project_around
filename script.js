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
  overlayElement.classList.add("hidden"); // Asegúrate de tener una clase .hidden para ocultar el overlay
}

// Conecta el manipulador al formulario
formElement.addEventListener("submit", handleProfileFormSubmit);

// Cerrar el pop-up al guardar (botón "Guardar")
buttonsave.addEventListener("click", function (event) {
  overlayElement.classList.remove("active"); // Cerrar el pop-up
});

// seccion tarjetas iniciales

// Selección de elementos del DOM
const btnAbrirPopUpCard = document.getElementById("add-button-card");
const addcardPopup = document.getElementById("addcard");
const btnCerrarPopupCard = document.getElementById("btn-cerrar-popup-card");
const formAddCard = document.getElementById("popup-addcard");
const cardsContainer = document.querySelector(".card__conteiner");

// Abrir popup de agregar tarjeta
btnAbrirPopUpCard.addEventListener("click", () => {
  addcardPopup.classList.add("active");
});

// Cerrar popup de agregar tarjeta
btnCerrarPopupCard.addEventListener("click", () => {
  addcardPopup.classList.remove("active");
});

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

  // Crear un nuevo elemento de tarjeta
  const newCard = document.createElement("div");
  newCard.classList.add("card__content");
  newCard.innerHTML = `
    <img src="${urlValue}" alt="${titleValue}" class="card__image" />
    <div class="card_info">
      <h2 class="card__text">${titleValue}</h2>
      <button class="button__like"></button>
    </div>
  `;

  // Agregar la nueva tarjeta al contenedor
  cardsContainer.appendChild(newCard);

  // Limpiar campos del formulario
  titleInput.value = "";
  urlInput.value = "";

  // Cerrar el popup
  addcardPopup.classList.remove("active");
});

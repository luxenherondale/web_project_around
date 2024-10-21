var btnAbrirPopUp = document.getElementById("btn-abrir-popup"),
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
  let nameInput = document.getElementById("name");
  let jobInput = document.getElementById("job");

  // Obtén los valores de cada campo
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

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

// Card.js

// Clase para crear y manejar las tarjetas de imágenes
export default class Card {
  // Constructor: recibe los datos de la tarjeta (nombre e imagen) y el selector del template
  constructor(data, templateSelector) {
    this._name = data.name; // Nombre de la tarjeta
    this._link = data.link; // URL de la imagen
    this._templateSelector = templateSelector; // Template HTML a usar
  }

  // Obtiene una copia del template de la tarjeta
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card__content")
      .cloneNode(true);

    return cardElement;
  }

  // Maneja el evento del botón like
  _handleLikeClick(evt) {
    // Cambia el estado del botón like (activo/inactivo)
    evt.target.classList.toggle("button__like_active");
  }

  // Maneja el evento del botón eliminar
  _handleDeleteClick(evt) {
    // Busca y elimina la tarjeta completa
    const card = evt.target.closest(".card__content");
    if (card) {
      card.remove();
    }
  }

  // Maneja el evento de click en la imagen (abre el popup)
  _handleImageClick() {
    // Selecciona los elementos del popup
    const imagePopup = document.querySelector(".popup__space-image");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");

    // Configura la imagen y título en el popup
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;

    // Muestra el popup
    imagePopup.classList.add("popup_opened");
  }

  // Configura los event listeners de la tarjeta
  _setEventListeners() {
    // Botón like: alterna entre activo/inactivo
    this._element
      .querySelector(".button__like")
      .addEventListener("click", (evt) => {
        this._handleLikeClick(evt);
      });

    // Botón eliminar: borra la tarjeta
    this._element
      .querySelector(".button__delete")
      .addEventListener("click", (evt) => {
        this._handleDeleteClick(evt);
      });

    // Imagen: abre el popup al hacer click
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
  }

  // Crea y devuelve una tarjeta completa
  generateCard() {
    // Obtiene el template
    this._element = this._getTemplate();

    // Selecciona los elementos de la tarjeta
    const cardImage = this._element.querySelector(".card__image");
    const cardText = this._element.querySelector(".card__text");

    // Añade el contenido a la tarjeta
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardText.textContent = this._name;

    // Configura los event listeners
    this._setEventListeners();

    // Devuelve la tarjeta lista para usar
    return this._element;
  }
}

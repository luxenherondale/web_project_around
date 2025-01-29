// Card.js

export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name; // Nombre de la tarjeta
    this._link = data.link; // URL de la imagen
    this._templateSelector = templateSelector; // Template HTML a usar
    this._handleCardClick = handleCardClick; // Función para manejar el clic en la imagen
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
    evt.target.classList.toggle("button__like_active");
  }

  // Maneja el evento del botón eliminar
  _handleDeleteClick(evt) {
    const card = evt.target.closest(".card__content");
    if (card) {
      card.remove();
    }
  }

  // Configura los event listeners de la tarjeta
  _setEventListeners() {
    // Botón like: alterna entre activo/inactivo
    this._element
      .querySelector(".button__like")
      .addEventListener("click", (evt) => this._handleLikeClick(evt));

    // Botón eliminar: borra la tarjeta
    this._element
      .querySelector(".button__delete")
      .addEventListener("click", (evt) => this._handleDeleteClick(evt));

    // CORRECCIÓN: Mejorado el manejo del clic en la imagen
    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick({
        link: this._link,
        name: this._name,
      });
    });
  }

  // Crea y devuelve una tarjeta completa
  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".card__image");
    const cardText = this._element.querySelector(".card__text");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardText.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

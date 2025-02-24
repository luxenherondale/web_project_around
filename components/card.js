export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._id = data._id;
    this._ownerId = data.owner ? data.owner._id : null;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;

    // Determinar estado inicial del like
    this._isLiked = data.isLiked !== undefined ? data.isLiked : false;

    // Debug para verificar el estado inicial
    console.log(
      `Tarjeta ${this._name} - ID: ${this._id}, isLiked inicial:`,
      this._isLiked
    );
  }

  // Obtener el template adaptado a la estructura HTML actual
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card__content") // Usando la clase correcta del HTML
      .cloneNode(true);
    return cardElement;
  }

  // Generar la tarjeta adaptada a las clases del HTML
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".button__like"); // Usando la clase correcta del HTML
    this._deleteButton = this._element.querySelector(".button__delete"); // Usando la clase correcta del HTML

    // Adaptamos para usar card__text en lugar de card__title
    this._element.querySelector(".card__text").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // Asegura que el estado visual inicial del botón sea correcto
    this._updateLikeButton();

    this._setEventListeners();

    return this._element;
  }

  // Configurar eventos con las clases correctas del HTML
  _setEventListeners() {
    if (this._likeButton) {
      this._likeButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevenir comportamiento por defecto
        event.stopPropagation(); // Evitar propagación

        // Llamamos al manejador para actualizar en el servidor
        this._handleLikeClick(this);

        // NOTA: No cambiamos el estado visual aquí, lo hará cuando el servidor responda
        console.log(
          "Click en like registrado, esperando respuesta del servidor..."
        );
      });
    }

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevenir comportamiento por defecto
        event.stopPropagation(); // Evitar propagación
        this._handleDeleteClick(this._id, this._element);
      });
    }

    if (this._cardImage) {
      this._cardImage.addEventListener("click", () => {
        this._handleCardClick({ name: this._name, link: this._link });
      });
    }
  }

  // Verificar si la tarjeta está likeada por el usuario
  isLiked() {
    return this._isLiked;
  }

  // Método para actualizar la apariencia del botón de like
  _updateLikeButton() {
    if (this._likeButton) {
      // Debug para ver el estado actual
      console.log(
        `Actualizando estilo del botón like para "${this._name}", isLiked:`,
        this._isLiked
      );

      // Esto asegura que la clase se añada o elimine correctamente según el estado
      this._likeButton.classList.toggle("button__like_active", this._isLiked);

      // Más debug para verificar que la clase se aplicó correctamente
      console.log(
        `Después de la actualización: ${
          this._likeButton.classList.contains("button__like_active")
            ? "Tiene"
            : "No tiene"
        } la clase button__like_active`
      );
    }
  }

  // Actualizar estado del like después de la respuesta de la API
  setLikeStatus(likes) {
    console.log(
      `API respondió para tarjeta ${this._name}, likes recibidos:`,
      likes
    );

    // CORRECCIÓN: Actualizar el array de likes
    this._likes = likes || [];

    // CORRECCIÓN: Invertir el estado actual
    this._isLiked = !this._isLiked;

    console.log(`Nuevo estado de isLiked para ${this._name}:`, this._isLiked);

    // Actualizar el botón con el nuevo estado
    this._updateLikeButton();
  }

  // Eliminar la tarjeta del DOM
  removeCard() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }

  // Obtener ID de la tarjeta
  getId() {
    return this._id;
  }
}

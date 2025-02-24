// Esta clase maneja la renderización de elementos en una sección de la página

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items || []; // Datos a renderizar
    this._renderer = renderer; // Función que renderiza cada elemento
    this._container = document.querySelector(containerSelector); // Contenedor

    if (!this._container) {
      console.error(
        `No se encontró el contenedor con el selector: ${containerSelector}`
      );
    }
  }

  // Método para renderizar todos los elementos
  renderItems() {
    if (this._items && this._items.length > 0) {
      this._items.forEach((item) => {
        this._renderer(item);
      });
    }
  }

  // Método para añadir un elemento al contenedor
  addItem(element) {
    if (this._container) {
      // Añadimos al inicio para que los nuevos aparezcan primero
      this._container.prepend(element);
    }
  }

  // Método para añadir un elemento al final del contenedor
  appendItem(element) {
    if (this._container) {
      this._container.append(element);
    }
  }

  // Método para limpiar todos los elementos del contenedor
  clear() {
    if (this._container) {
      this._container.innerHTML = "";
    }
  }

  // Método para actualizar los items y volver a renderizar
  setItems(items) {
    this._items = items || [];
  }
}

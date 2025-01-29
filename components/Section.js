// Section.js

// Clase para manejar la renderización de una lista de elementos en la página
export default class Section {
  // Constructor: recibe un objeto con los items y el renderer, y el selector del contenedor
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // Array de datos a renderizar
    this._renderer = renderer; // Función que renderiza cada elemento
    this._container = document.querySelector(containerSelector); // Contenedor donde se añadirán los elementos
  }

  // Método público para renderizar todos los elementos
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Llama a la función renderer para cada item
    });
  }

  // Método público para añadir un elemento al contenedor
  addItem(element) {
    this._container.prepend(element); // Añade el elemento al inicio del contenedor
  }
}

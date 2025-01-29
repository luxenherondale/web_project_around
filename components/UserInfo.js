// UserInfo.js

// Clase para manejar la información del usuario
export default class UserInfo {
  // Constructor: recibe un objeto con los selectores del nombre y el trabajo
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector); // Elemento que muestra el nombre
    this._jobElement = document.querySelector(jobSelector); // Elemento que muestra el trabajo
  }

  // Método público para obtener la información del usuario
  getUserInfo() {
    return {
      name: this._nameElement.textContent, // Devuelve el nombre del usuario
      job: this._jobElement.textContent, // Devuelve el trabajo del usuario
    };
  }

  // Método público para establecer la información del usuario
  setUserInfo({ name, job }) {
    this._nameElement.textContent = name; // Establece el nombre del usuario
    this._jobElement.textContent = job; // Establece el trabajo del usuario
  }
}

// UserInfo.js -
// Esta clase maneja la información del usuario que se muestra en la página

export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = avatarSelector
      ? document.querySelector(avatarSelector)
      : null;
    this._id = null; // Añadido para almacenar el ID del usuario

    if (!this._nameElement) {
      console.error(
        `No se encontró el elemento con el selector: ${nameSelector}`
      );
    }
    if (!this._jobElement) {
      console.error(
        `No se encontró el elemento con el selector: ${jobSelector}`
      );
    }
    if (avatarSelector && !this._avatarElement) {
      console.error(
        `No se encontró el elemento con el selector: ${avatarSelector}`
      );
    }
  }

  // Método para obtener la información actual del usuario
  getUserInfo() {
    return {
      name: this._nameElement ? this._nameElement.textContent : "",
      job: this._jobElement ? this._jobElement.textContent : "",
      _id: this._id, // Incluimos el ID en la información del usuario
    };
  }

  // Método para establecer nueva información del usuario
  setUserInfo(userData) {
    // Actualizamos el nombre si está disponible
    if (userData.name && this._nameElement) {
      this._nameElement.textContent = userData.name;
    }

    // Actualizamos el trabajo/descripción
    // Aceptamos tanto 'job' como 'about' para mayor compatibilidad
    if (this._jobElement) {
      if (userData.job) {
        this._jobElement.textContent = userData.job;
      } else if (userData.about) {
        this._jobElement.textContent = userData.about;
      }
    }

    // Guardamos el ID si está disponible
    if (userData._id) {
      this._id = userData._id;
    }

    // Actualizamos el avatar si está disponible
    if (this._avatarElement && userData.avatar) {
      this._avatarElement.src = userData.avatar;
    }
  }
}

// Archivo principal que inicializa la aplicación

import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithAvatar from "../components/PopupWithAvatar.js";
import UserInfo from "../components/UserInfo.js";
import api from "../components/api.js";

// Configuración de validación
const validationConfigs = {
  profileForm: {
    formSelector: ".profile__form-edit",
    inputSelector: ".form__input",
    submitButtonSelector: ".buttonsave",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "forminput_type_error",
    errorClass: "forminput-error_active",
    inputs: [
      { id: "name", minLength: 2, maxLength: 40 },
      { id: "job", minLength: 2, maxLength: 200 },
    ],
  },
  cardForm: {
    formSelector: ".card__form-add",
    inputSelector: ".form__input",
    submitButtonSelector: ".buttonsave",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "forminput_type_error",
    errorClass: "forminput-error_active",
    inputs: [
      { id: "title", minLength: 2, maxLength: 30 },
      { id: "url", isUrl: true },
    ],
  },
  // Configuración para el formulario de avatar
  avatarForm: {
    formSelector: ".avatar__form-edit",
    inputSelector: ".form__input",
    submitButtonSelector: ".buttonsave",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "forminput_type_error",
    errorClass: "forminput-error_active",
    inputs: [{ id: "avatar-url", isUrl: true }],
  },
};

// Elementos del DOM
const profileForm = document.querySelector(".profile__form-edit");
const cardForm = document.querySelector(".card__form-add");
const avatarForm = document.querySelector(".avatar__form-edit"); // Nuevo formulario
const btnOpenProfilePopup = document.getElementById("btn-open-popup");
const btnAddCard = document.getElementById("add-button-card");
// Elemento de la imagen de perfil
const profileImageContainer = document.querySelector(
  ".profile__image-container"
);

// Inicializar validadores de formularios
const profileFormValidator = new FormValidator(
  validationConfigs.profileForm,
  profileForm
);
const cardFormValidator = new FormValidator(
  validationConfigs.cardForm,
  cardForm
);
const avatarFormValidator = new FormValidator(
  validationConfigs.avatarForm,
  avatarForm
);

// Activar validación de formularios
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Instancia de UserInfo para manejar la información del usuario
const userInfo = new UserInfo({
  nameSelector: "#displayName",
  jobSelector: "#displayJob",
  avatarSelector: ".profile__image",
});

// Popup para mostrar imágenes
const popupWithImage = new PopupWithImage(".popup__space-image");

// Instancia del popup de confirmación para eliminar tarjetas
const deleteCardPopup = new PopupWithConfirmation("#delete-confirmation");

// Función mejorada para crear tarjetas
const createCardElement = (data) => {
  // Aseguramos que los datos tengan la estructura correcta
  const cardData = {
    ...data,
    likes: data.likes || [],
    owner: data.owner || { _id: "unknown" },
  };

  const card = new Card(
    cardData,
    "#card-template",
    (imageData) => popupWithImage.open(imageData),
    (cardInstance) => handleLikeClick(cardInstance),
    (cardId, cardElement) => handleDeleteClick(cardId, cardElement),
    userInfo._id || "current-user" // ID del usuario actual o valor por defecto
  );

  return card.generateCard();
};

// Instancia de Section para manejar las tarjetas
const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCardElement(item);
      cardSection.addItem(cardElement);
    },
  },
  ".card__conteiner" // Selector del contenedor de tarjetas
);

// Popup para editar el perfil del usuario
const profilePopup = new PopupWithForm(
  "#overlay", // Selector correcto para el popup de perfil
  handleProfileFormSubmit
);

// Popup para añadir nuevas tarjetas
const addCardPopup = new PopupWithForm(
  "#addcard", // Selector correcto para el popup de añadir tarjeta
  handleCardFormSubmit
);

// Popup para editar avatar
const avatarPopup = new PopupWithAvatar(
  "#avatar-edit", // Selector para el popup de avatar
  handleAvatarFormSubmit
);

// Manejadores de eventos para los formularios
function handleProfileFormSubmit(formData) {
  profilePopup.renderLoading(true, "Guardando...");
  api
    .updateUserData({
      name: formData.name,
      about: formData.job,
    })
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        _id: data._id,
      });
      profilePopup.close();
    })
    .catch((error) => {
      console.error("Error al actualizar el perfil:", error);
    })
    .finally(() => {
      profilePopup.renderLoading(false);
    });
}

function handleCardFormSubmit(formData) {
  addCardPopup.renderLoading(true, "Creando...");
  api
    .createCard({
      name: formData.title,
      link: formData.url,
    })
    .then((newCard) => {
      const cardElement = createCardElement(newCard);
      cardSection.addItem(cardElement);
      addCardPopup.close();
      cardFormValidator.resetValidation();
    })
    .catch((error) => {
      console.error("Error al crear la tarjeta:", error);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
}

// Manejador para el formulario de avatar
function handleAvatarFormSubmit(formData) {
  avatarPopup.renderLoading(true, "Guardando...");
  api
    .updateUserAvatar({
      avatar: formData["avatar-url"],
    })
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        _id: data._id,
        avatar: data.avatar,
      });
      avatarPopup.close();
    })
    .catch((error) => {
      console.error("Error al actualizar el avatar:", error);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
}

// Manejar los likes de las tarjetas - Función mejorada
function handleLikeClick(card) {
  console.log("Clic en like para la tarjeta ID:", card.getId());

  try {
    const isLiked = card.isLiked();
    const apiMethod = isLiked
      ? api.unlikeCard.bind(api)
      : api.likeCard.bind(api);

    apiMethod(card.getId())
      .then((data) => {
        // Solo enviamos el array de likes a la tarjeta
        card.setLikeStatus(data.likes || []);
      })
      .catch((error) => {
        console.error("Error al gestionar el like:", error);
      });
  } catch (error) {
    console.error("Error en handleLikeClick:", error);
  }
}

// MODIFICADO: Manejar la eliminación de tarjetas - Función mejorada con confirmación
function handleDeleteClick(cardId, cardElement) {
  console.log("Intentando eliminar tarjeta ID:", cardId);

  try {
    // Usar el popup de confirmación
    deleteCardPopup.setSubmitAction(() => {
      // Mostrar estado de carga
      const confirmButton = document.getElementById("confirm-delete");
      if (confirmButton) {
        confirmButton.textContent = "Eliminando...";
      }

      api
        .deleteCard(cardId)
        .then(() => {
          console.log("Tarjeta eliminada exitosamente");
          if (cardElement && cardElement.remove) {
            cardElement.remove();
          } else {
            console.error("cardElement no tiene método remove");
          }
          deleteCardPopup.close();
        })
        .catch((error) => {
          console.error("Error al eliminar la tarjeta:", error);
        })
        .finally(() => {
          // Restaurar el texto del botón
          if (confirmButton) {
            confirmButton.textContent = "Sí";
          }
        });
    });

    deleteCardPopup.open();
  } catch (error) {
    console.error("Error en handleDeleteClick:", error);
  }
}

// Configurar event listeners para los popups
popupWithImage.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
avatarPopup.setEventListeners();

// Configurar event listeners para los botones
btnOpenProfilePopup.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  // Llenar el formulario con los datos actuales
  document.getElementById("name").value = userData.name;
  document.getElementById("job").value = userData.job;

  // Resetear la validación antes de abrir
  profileFormValidator.resetValidation();

  // Abrir el popup
  profilePopup.open();
});

btnAddCard.addEventListener("click", () => {
  // Resetear el formulario y la validación
  cardForm.reset();
  cardFormValidator.resetValidation();

  // Abrir el popup
  addCardPopup.open();
});

// Event listener para abrir el popup de edición de avatar
profileImageContainer.addEventListener("click", () => {
  // Resetear el formulario y la validación
  avatarForm.reset();
  avatarFormValidator.resetValidation();

  // Abrir el popup
  avatarPopup.open();
});

// Cargar datos iniciales desde el servidor con manejo de errores mejorado
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    console.log("Datos de usuario cargados:", userData);
    console.log("Tarjetas iniciales cargadas:", cards.length);

    // Guardar datos del usuario
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      _id: userData._id,
      avatar: userData.avatar,
    });

    // Configurar la sección de tarjetas con los datos recibidos
    if (Array.isArray(cards) && cards.length > 0) {
      cardSection.setItems(cards);
      cardSection.renderItems();
    } else {
      console.warn("No se encontraron tarjetas para mostrar");
    }
  })
  .catch((error) => {
    console.error("Error al cargar datos iniciales:", error);
  });

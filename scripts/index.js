// Информация о профиле
const profile = document.querySelector(".profile__info");
const profileTitle = profile.querySelector(".profile__title");
const profileSubTitle = profile.querySelector(".profile__subtitle");
const profileEdit = profile.querySelector(".profile__edit");
// Поп-ап редактирование профиля
const popupEdit = document.querySelector(".popup_edit");
const crossPopupEdit = popupEdit.querySelector(".popup__close-button");
const nameInput = popupEdit.querySelector(".popup__input_type_user-name");
const jobInput = popupEdit.querySelector(".popup__input_type_user-job");
// Поп-ап добавление фотографии
const photoAdd = document.querySelector(".profile__add-button");
const popupPhoto = document.querySelector(".popup_photo");
const formPhoto = popupPhoto.querySelector(".popup__form");
const crossPopupPhoto = popupPhoto.querySelector(".popup__close-button");
const titleInput = popupPhoto.querySelector(".popup__input_type_name-photo");
const linkInput = popupPhoto.querySelector(".popup__input_type_link");
const formEdit = popupEdit.querySelector(".popup__form");
const cardTemplate = document.querySelector("#card").content;
const cards = document.querySelector(".cards");
const popups = document.querySelectorAll(".popup");
const photoCard = document.querySelector(".popup_photo-card");
const titlePhoto = photoCard.querySelector(".popup__title-photo");
const linkPhoto = photoCard.querySelector(".popup__photo");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_inactive'); 
  } else {
    buttonElement.classList.remove('popup__save_inactive');
  }
}

const enableValidation = () => {
  formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

    setEventListeners(formElement);

    // const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    // fieldsetList.forEach((fieldSet) => {
    //   setEventListeners(fieldSet);
    // });


});
}

enableValidation()


function keyHandler (evt, popup) {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
};

function openPopup(popup) {
  popup.classList.add("popup_open");
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
}

profileEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = profileTitle.innerText;
  jobInput.value = profileSubTitle.innerText;
});

photoAdd.addEventListener("click", () => {
  openPopup(popupPhoto);
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
    if (evt.target.code === 'Escape') {
      closePopup(popup);
    }
  });
});

initialCards.forEach((card) => {
  cards.prepend(createCard(card.name, card.link));
});

function submitFormHandlerEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardPhoto = cardElement.querySelector(".card__photo");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDel = cardElement.querySelector(".card__del");
  cardTitle.innerText = name;
  cardPhoto.alt = name;
  cardPhoto.src = link;
  cardDel.addEventListener("click", () => {
    const listItem = cardDel.closest(".card");
    listItem.remove();
  });
  cardLike.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });
  cardPhoto.addEventListener("click", (evt) => {
    openPopup(photoCard);
    linkPhoto.src = link;
    linkPhoto.alt = name;
    titlePhoto.innerText = name;
  });
  return cardElement;
}

function submitFormHandlerPhoto(evt) {
  evt.preventDefault();
  cards.prepend(createCard(titleInput.value, linkInput.value));
  closePopup(popupPhoto);
  formPhoto.reset();
}

formPhoto.addEventListener("submit", submitFormHandlerPhoto);
formEdit.addEventListener("submit", submitFormHandlerEdit);

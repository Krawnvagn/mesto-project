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

function openPopup(popup) {
  popup.classList.add("popup_open");
  nameInput.value = profileTitle.innerText;
  jobInput.value = profileSubTitle.innerText;
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
}

profileEdit.addEventListener("click", () => {
  openPopup(popupEdit);
});

photoAdd.addEventListener("click", () => {
  openPopup(popupPhoto);
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

initialCards.forEach((card) => {
  cards.prepend(createCard(card.name, card.link));
});

function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardPhoto = cardElement.querySelector(".card__photo");
  const cardLike = cardElement.querySelector('.card__like');
  const cardDel = cardElement.querySelector('.card__del')
  cardTitle.innerText = name;
  cardPhoto.alt = name;
  cardPhoto.src = link;
  cardDel.addEventListener('click', () => {
    const listItem = cardDel.closest('.card')
    listItem.remove();
  })
  cardLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  })
  cardPhoto.addEventListener('click', (evt) => {
    const photoCard = document.querySelector('.popup_photo-card');
    const titlePhoto = photoCard.querySelector('.popup__title-photo');
    const linkPhoto = photoCard.querySelector('.popup__photo');
    openPopup(photoCard);
    linkPhoto.src = link;
    linkPhoto.alt = name;
    titlePhoto.innerText = name;
  })
  return cardElement;
}

function formSubmitHandlerPhoto(evt) {
  evt.preventDefault();
  cards.prepend(createCard(titleInput.value, linkInput.value));
  closePopup(popupPhoto);
  formPhoto.reset();
}

formPhoto.addEventListener("submit", formSubmitHandlerPhoto);
formEdit.addEventListener("submit", formSubmitHandlerEdit);



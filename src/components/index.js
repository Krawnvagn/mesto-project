import "../pages/index.css";

import { createCard, initialCards } from "./card.js";
import { closePopup, openPopup, submitFormHandlerEdit } from "./modal.js";
import {
  cards,
  formEdit,
  formPhoto,
  jobInput,
  linkInput,
  nameInput,
  photoAdd,
  popupEdit,
  popupPhoto,
  profileEdit,
  profileSubTitle,
  profileTitle,
  titleInput,
} from "./utils.js";
import {
  blockSumbitButtonAfterSendForm,
  enableValidation,
} from "./validate.js";
import { loadApiProfile, loadApiCards } from "./api.js";

loadApiProfile();
enableValidation();

profileEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = profileTitle.innerText;
  jobInput.value = profileSubTitle.innerText;
});

photoAdd.addEventListener("click", () => {
  const buttonSaveSubmit = formPhoto.querySelector(".popup__save");
  blockSumbitButtonAfterSendForm(buttonSaveSubmit);
  openPopup(popupPhoto);
});

function submitFormHandlerPhoto(evt) {
  evt.preventDefault();
  cards.prepend(createCard(titleInput.value, linkInput.value, 0));

  fetch('https://nomoreparties.co/v1/plus-cohort-9/cards', {
  method: 'POST',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: titleInput.value,
    link: linkInput.value
  })
});

  closePopup(popupPhoto);
  formPhoto.reset();
}

// initialCards.forEach((card) => {
//   cards.prepend(createCard(card.name, card.link));
// });

loadApiCards().then((res) => {
  res.forEach((card) => {
    cards.append(createCard(card.name, card.link, card.likes.length));
  });
});

formPhoto.addEventListener("submit", submitFormHandlerPhoto);
formEdit.addEventListener("submit", submitFormHandlerEdit);


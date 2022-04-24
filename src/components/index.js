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
  enableValidationKeys,
} from "./utils.js";
import {
  blockSumbitButtonAfterSendForm,
  enableValidation,
} from "./validate.js";
import { loadApiProfile, loadApiCards, token } from "./api.js";

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

function renderLoading(isLoading) {
  if (isLoading) {
    popupPhoto.querySelector(
      enableValidationKeys.submitButtonSelector
    ).innerHTML = "Сохранение...";
  } else {
    popupPhoto.querySelector(
      enableValidationKeys.submitButtonSelector
    ).innerHTML = "";
  }
}

function submitFormHandlerPhoto(evt) {
  evt.preventDefault();
  renderLoading(true);
  const titleInputActually = titleInput.value;
  const linkInputActually = linkInput.value;

  fetch("https://nomoreparties.co/v1/plus-cohort-9/cards", {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: titleInputActually,
      link: linkInputActually,
    }),
  })
    .then((json) => json.json())
    .then((result) => {
      cards.prepend(
        createCard(titleInputActually, linkInputActually, 0, result._id)
      );
    })
    .finally(() => {
      renderLoading(false);
      closePopup(popupPhoto);
      formPhoto.reset();
    });
}

// initialCards.forEach((card) => {
//   cards.prepend(createCard(card.name, card.link));
// });

loadApiCards().then((res) => {
  res.forEach((card) => {
    cards.append(createCard(card.name, card.link, card.likes.length, card._id));
  });
});

formPhoto.addEventListener("submit", submitFormHandlerPhoto);
formEdit.addEventListener("submit", submitFormHandlerEdit);


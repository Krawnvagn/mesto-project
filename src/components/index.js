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
  profilePopup,
  profileAvatar,
  profileAvatarShow,
  formPhotoProfile,
} from "./utils.js";
import {
  blockSumbitButtonAfterSendForm,
  enableValidation,
} from "./validate.js";
import { loadApiProfile, loadApiCards, token } from "./api.js";

loadApiProfile();
enableValidation();

function renderLoading(isLoading, popup, defaultButtonText) {
  if (isLoading) {
    popup.querySelector(
      enableValidationKeys.submitButtonSelector
    ).innerHTML = "Сохранение...";
  } else if (defaultButtonText) {
    popup.querySelector(
      enableValidationKeys.submitButtonSelector
    ).innerHTML = defaultButtonText;
  }
}

profileAvatarShow.addEventListener("click", () => {
  const buttonSaveSubmit = formPhotoProfile.querySelector(".popup__save");
  blockSumbitButtonAfterSendForm(buttonSaveSubmit);
  openPopup(profilePopup);
})

function submitFormHandlerChangePhoto (evt) {
  evt.preventDefault();
  const popupSaveDefaultText = profilePopup.querySelector('.popup__save').innerText;
  renderLoading(true, profilePopup);
  profileAvatar.src = profilePopup.querySelector('.popup__input_type_link').value;

  fetch(`https://nomoreparties.co/v1/plus-cohort-9/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: profileAvatar.src
    })
  })
    .catch((err) => console.log(`Ошибка `, err))
    .finally(() => {
      renderLoading(false, profilePopup, popupSaveDefaultText);
      closePopup(profilePopup);
      formPhotoProfile.reset();
    });
}

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
  const popupSaveDefaultText = popupPhoto.querySelector('.popup__save').innerText;
  renderLoading(true, popupPhoto, popupSaveDefaultText);
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
      renderLoading(false, popupPhoto, popupSaveDefaultText);
      closePopup(popupPhoto);
      formPhoto.reset();
    });
}

// initialCards.forEach((card) => {
//   cards.prepend(createCard(card.name, card.link));
// });

loadApiCards().then((res) => {
  res.forEach((card) => {
    cards.append(createCard(card.name, card.link, card.likes.length, card._id, card.owner._id));
  });
});

formPhoto.addEventListener("submit", submitFormHandlerPhoto);
formEdit.addEventListener("submit", submitFormHandlerEdit);
formPhotoProfile.addEventListener("submit", submitFormHandlerChangePhoto);


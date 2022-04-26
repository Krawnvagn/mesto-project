import "../pages/index.css";

import { createCard } from "./card.js";
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
} from "./constants.js";
import {
  blockSumbitButtonAfterSendForm,
  enableValidation,
} from "./validate.js";
import { getUserInfo, getCards, config } from "./api.js";

export function renderLoading(isLoading, popup, defaultButtonText) {
  const btnSumbitPopup = popup.querySelector(
    enableValidationKeys.submitButtonSelector
  );
  if (isLoading) {
    btnSumbitPopup.textContent = "Сохранение...";
  } else if (defaultButtonText) {
    btnSumbitPopup.textContent = defaultButtonText;
  }
}

profileAvatarShow.addEventListener("click", () => {
  const buttonSaveSubmit = formPhotoProfile.querySelector(".popup__save");
  blockSumbitButtonAfterSendForm(buttonSaveSubmit, enableValidationKeys);
  openPopup(profilePopup);
});

function submitFormHandlerChangePhoto(evt) {
  evt.preventDefault();
  const popupSaveDefaultText =
    profilePopup.querySelector(".popup__save").innerText;
  renderLoading(true, profilePopup);
  fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileAvatar.src,
    }),
  })
    .then(() => {
      profileAvatar.src = profilePopup.querySelector(
        ".popup__input_type_link"
      ).value;
      closePopup(profilePopup);
      formPhotoProfile.reset();
    })
    .catch((err) => console.err(`Ошибка редактирования фотографии - `, err))
    .finally(() => {
      renderLoading(false, profilePopup, popupSaveDefaultText);
    });
}

profileEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = profileTitle.innerText;
  jobInput.value = profileSubTitle.innerText;
});

photoAdd.addEventListener("click", () => {
  const buttonSaveSubmit = formPhoto.querySelector(".popup__save");
  blockSumbitButtonAfterSendForm(buttonSaveSubmit, enableValidationKeys);
  openPopup(popupPhoto);
});

function submitFormHandlerPhoto(evt) {
  evt.preventDefault();
  const popupSaveDefaultText =
    popupPhoto.querySelector(".popup__save").innerText;
  renderLoading(true, popupPhoto);
  const titleInputActually = titleInput.value;
  const linkInputActually = linkInput.value;

  fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
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

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    profileAvatar.src = userData.avatar;
    profileTitle.textContent = userData.name;
    profileSubTitle.textContent = userData.about;
    cardsData.forEach((card) => {
      cards.append(
        createCard(
          card.name,
          card.link,
          card.likes.length,
          card._id,
          card.owner._id
        )
      );
    });
  })
  .catch((err) => {
    console.log("Ошибка с сервера - ", err);
  });

formPhoto.addEventListener("submit", submitFormHandlerPhoto);
formEdit.addEventListener("submit", submitFormHandlerEdit);
formPhotoProfile.addEventListener("submit", submitFormHandlerChangePhoto);

enableValidation(enableValidationKeys);

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
} from "./constants.js";
import {
  blockSumbitButtonAfterSendForm,
  enableValidation,
} from "./validate.js";
import { loadApiProfile, loadApiCards, token, getUserInfo } from "./api.js";

loadApiProfile();
enableValidation();

function renderLoading(isLoading, popup, defaultButtonText) {
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
  blockSumbitButtonAfterSendForm(buttonSaveSubmit);
  openPopup(profilePopup);
});

function submitFormHandlerChangePhoto(evt) {
  evt.preventDefault();
  const popupSaveDefaultText =
    profilePopup.querySelector(".popup__save").innerText;
  renderLoading(true, profilePopup);
  fetch(`https://nomoreparties.co/v1/plus-cohort-9/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
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
    .catch((err) => console.log(`Ошибка `, err))
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
  blockSumbitButtonAfterSendForm(buttonSaveSubmit);
  openPopup(popupPhoto);
});

function submitFormHandlerPhoto(evt) {
  evt.preventDefault();
  const popupSaveDefaultText =
    popupPhoto.querySelector(".popup__save").innerText;
  renderLoading(true, popupPhoto);
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

loadApiCards().then((res) => {
  res.forEach((card) => {
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
});

// Promise.all([getUserInfo(), getCards()])
// // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
//   .then(([userData, cards]) => {
//       // тут установка данных пользователя
//       // и тут отрисовка карточек

//   })
//   .catch(err => {
//     // тут ловим ошибку
//   });

formPhoto.addEventListener("submit", submitFormHandlerPhoto);
formEdit.addEventListener("submit", submitFormHandlerEdit);
formPhotoProfile.addEventListener("submit", submitFormHandlerChangePhoto);

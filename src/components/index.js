import "../pages/index.css";

import { createCard } from "./card.js";
import { submitFormHandlerEdit } from "./modal.js";
import {
  closePopup,
  openPopup,
  renderLoading,
  hiddenValidation,
} from "./utils.js";
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
import { getUserInfo, getCards, patchUserAvatar, postCard } from "./api.js";

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
  const linkNewPhoto = profilePopup.querySelector(
    ".popup__input_type_link"
  ).value;
  patchUserAvatar(linkNewPhoto)
    .then(() => {
      profileAvatar.src = linkNewPhoto;
      closePopup(profilePopup);
      formPhotoProfile.reset();
    })
    .catch((err) => console.log(`Ошибка редактирования фотографии - `, err))
    .finally(() => {
      renderLoading(false, profilePopup, popupSaveDefaultText);
    });
}

profileEdit.addEventListener("click", () => {
  const buttonSaveSubmit = formEdit.querySelector(".popup__save");
  blockSumbitButtonAfterSendForm(buttonSaveSubmit, enableValidationKeys);
  nameInput.value = profileTitle.innerText;
  jobInput.value = profileSubTitle.innerText;
  hiddenValidation(popupEdit);
  openPopup(popupEdit);
});

photoAdd.addEventListener("click", () => {
  const buttonSaveSubmit = formPhoto.querySelector(".popup__save");
  blockSumbitButtonAfterSendForm(buttonSaveSubmit, enableValidationKeys);
  hiddenValidation(popupPhoto);
  openPopup(popupPhoto);
});

// СТЕРЕТЬ
// export function addCard(container, cardElement) {
//   container.prepend(cardElement);
// }

let user;

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    user = userData._id;
    profileAvatar.src = userData.avatar;
    profileTitle.textContent = userData.name;
    profileSubTitle.textContent = userData.about;
    cardsData.forEach((card) => {
      cards.append(
        createCard(
          card.name,
          card.link,
          card.likes,
          card._id,
          card.owner._id,
          user
        )
      );
    });
  })
  .catch((err) => {
    console.log("Ошибка с сервера - ", err);
  });

function submitFormHandlerPhoto(evt) {
  evt.preventDefault();
  const popupSaveDefaultText =
    popupPhoto.querySelector(".popup__save").innerText;
  renderLoading(true, popupPhoto);
  const titleInputActually = titleInput.value;
  const linkInputActually = linkInput.value;
  postCard(titleInputActually, linkInputActually)
    .then((card) => {
      cards.prepend(
        // createCard(titleInputActually, linkInputActually, 0, /* card._id */, /* card.owner._id */, /* user */)
        createCard(
          titleInputActually,
          linkInputActually,
          card.likes,
          card._id,
          card.owner._id,
          user
        )
      );
      closePopup(popupPhoto);
      formPhoto.reset();
    })
    .finally(() => {
      renderLoading(false, popupPhoto, popupSaveDefaultText);
    });
}

formPhoto.addEventListener("submit", submitFormHandlerPhoto);
formEdit.addEventListener("submit", submitFormHandlerEdit);
formPhotoProfile.addEventListener("submit", submitFormHandlerChangePhoto);

enableValidation(enableValidationKeys);

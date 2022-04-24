export const profile = document.querySelector(".profile__avatar-n-info");
export const profileTitle = profile.querySelector(".profile__title");
export const profileSubTitle = profile.querySelector(".profile__subtitle");
export const profileEdit = profile.querySelector(".profile__edit");
export const popupEdit = document.querySelector(".popup_edit");
export const crossPopupEdit = popupEdit.querySelector(".popup__close-button");
export const nameInput = popupEdit.querySelector(".popup__input_type_user-name");
export const jobInput = popupEdit.querySelector(".popup__input_type_user-job");
export const photoAdd = document.querySelector(".profile__add-button");
export const popupPhoto = document.querySelector(".popup_photo");
export const formPhoto = popupPhoto.querySelector(".popup__form");
export const crossPopupPhoto = popupPhoto.querySelector(".popup__close-button");
export const titleInput = popupPhoto.querySelector(".popup__input_type_name-photo");
export const linkInput = popupPhoto.querySelector(".popup__input_type_link");
export const formEdit = popupEdit.querySelector(".popup__form");
export const cardTemplate = document.querySelector("#card").content;
export const cards = document.querySelector(".cards");
export const popups = document.querySelectorAll(".popup");
export const photoCard = document.querySelector(".popup_photo-card");
export const titlePhoto = photoCard.querySelector(".popup__title-photo");
export const linkPhoto = photoCard.querySelector(".popup__photo");
export const profileAvatar = profile.querySelector(".profile__avatar");
export const popupSure = document.querySelector(".popup__sure");
export const popupConfirmation = popupSure.querySelector(".popup__confirmation")

export const enableValidationKeys = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  }
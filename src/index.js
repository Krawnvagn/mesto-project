import { enableValidation } from "./components/validate.js";
import { profileEdit, photoAdd, formPhoto, formEdit, popupPhoto, popupEdit, nameInput, profileTitle, jobInput, profileSubTitle } from "./components/utils.js";
import { submitFormHandlerEdit, openPopup } from "./components/modal.js";
import { submitFormHandlerPhoto } from "./components/card.js";

export const enableValidationKeys = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

enableValidation();

profileEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = profileTitle.innerText;
  jobInput.value = profileSubTitle.innerText;
});

photoAdd.addEventListener("click", () => {
  openPopup(popupPhoto);
});

formPhoto.addEventListener("submit", submitFormHandlerPhoto);
formEdit.addEventListener("submit", submitFormHandlerEdit);
import '../pages/index.css';

import { enableValidation } from "./validate.js";
import { profileEdit, photoAdd, formPhoto, formEdit, popupPhoto, popupEdit, nameInput, profileTitle, jobInput, profileSubTitle } from "./utils.js";
import { submitFormHandlerEdit, openPopup } from "./modal.js";
import { submitFormHandlerPhoto } from "./card.js";

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
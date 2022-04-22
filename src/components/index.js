import '../pages/index.css';

import { enableValidation, blockSumbitButtonAfterSendForm } from "./validate.js";
import { profileEdit, photoAdd, formPhoto, formEdit, popupPhoto, popupEdit, nameInput, profileTitle, jobInput, profileSubTitle, cards, titleInput, linkInput } from "./utils.js";
import { submitFormHandlerEdit, openPopup, closePopup } from "./modal.js";
import { createCard, initialCards } from "./card.js";

enableValidation();

profileEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = profileTitle.innerText;
  jobInput.value = profileSubTitle.innerText;
});

photoAdd.addEventListener("click", () => {
  const buttonSaveSubmit = formPhoto.querySelector('.popup__save');
  blockSumbitButtonAfterSendForm(buttonSaveSubmit);
  openPopup(popupPhoto);
});

function submitFormHandlerPhoto(evt) {
  evt.preventDefault();
  cards.prepend(createCard(titleInput.value, linkInput.value));
  closePopup(popupPhoto);
  formPhoto.reset();
}

initialCards.forEach((card) => {
  cards.prepend(createCard(card.name, card.link));
});

formPhoto.addEventListener("submit", submitFormHandlerPhoto);
formEdit.addEventListener("submit", submitFormHandlerEdit);
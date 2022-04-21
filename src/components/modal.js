import { popups, profileTitle, nameInput, profileSubTitle, jobInput, popupEdit, enableValidationKeys } from "./utils.js";
import { blockSumbitButtonAfterSendForm } from "./validate.js";

export function submitFormHandlerEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

export function openPopup(popup) {
  const buttonSaveSubmit = popup.querySelector('.popup__save'); /* СРАБОТАЛО! */
  blockSumbitButtonAfterSendForm(buttonSaveSubmit);
  // document.querySelector('popup__save').classList.add('.popup__save_inactive'); - не работает
  popup.classList.add("popup_open");
  document.addEventListener("keydown", keyHandler);
  // if (popup === 'popup__edit' || popup === 'popup__photo') {
  //   blockSumbitButtonAfterSendForm(enableValidationKeys.submitButtonSelector); - не работает
  // }
}

export function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", keyHandler);
  // document.querySelector('popup__save').classList.add('.popup__save_inactive'); - не работает
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const currentlyOpenPopup = document.querySelector(".popup_open");
    closePopup(currentlyOpenPopup);
  }
}

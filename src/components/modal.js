import { popups, profileTitle, nameInput, profileSubTitle, jobInput, popupEdit } from "./utils.js";

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
  // popup.addEventListener("keydown", (evt) => {
  //   if (evt.target.key === "Escape") {
  //     closePopup(popup);
  //   }
  // });
});

export function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", keyHandler);
}

export function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", keyHandler);
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const currentlyOpenPopup = document.querySelector(".popup_open");
    closePopup(currentlyOpenPopup);
  }
}

import { config } from "./api.js";
import {
  popups,
  profileTitle,
  nameInput,
  profileSubTitle,
  jobInput,
  popupEdit,
  formEdit,
} from "./constants.js";
import { closePopup, renderLoading } from "./utils.js";

export function submitFormHandlerEdit(evt) {
  evt.preventDefault();
  const popupSaveDefaultText =
    popupEdit.querySelector(".popup__save").innerText;
  renderLoading(true, popupEdit);
  patchUserChange(nameInput.value, jobInput.value)
    .then(responseCheck)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileSubTitle.textContent = jobInput.value;
      closePopup(popupEdit);
      formEdit.reset();
    })
    .catch((err) => console.err("Ошибка при редактировании профиля - ", err))
    .finally(() => {
      renderLoading(false, popupEdit, popupSaveDefaultText);
    });
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

export function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const currentlyOpenPopup = document.querySelector(".popup_open");
    closePopup(currentlyOpenPopup);
  }
}

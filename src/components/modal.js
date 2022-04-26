import { config } from "./api.js";
import {
  popups,
  profileTitle,
  nameInput,
  profileSubTitle,
  jobInput,
  popupEdit,
  formEdit
} from "./constants.js";
import { renderLoading } from "./index.js";

export function submitFormHandlerEdit(evt) {
  evt.preventDefault();
  const popupSaveDefaultText =
    popupEdit.querySelector(".popup__save").innerText;
  renderLoading(true, popupEdit);
  fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  })
    .then((json) => json.json())
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileSubTitle.textContent = jobInput.value;
    })
    .catch((err) => console.err('Ошибка при редактировании профиля - ', err))
    .finally(() => {
      renderLoading(false, popupEdit, popupSaveDefaultText);
      closePopup(popupEdit);
      formEdit.reset();
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

export function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", handleEscKey);
}

export function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", handleEscKey);
}

function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const currentlyOpenPopup = document.querySelector(".popup_open");
    closePopup(currentlyOpenPopup);
  }
}

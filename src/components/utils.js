import { handleEscKey } from "./modal.js";
import { enableValidationKeys } from "./constants.js";

export function renderLoading(isLoading, popup, defaultButtonText) {
  const btnSumbitPopup = popup.querySelector(
    enableValidationKeys.submitButtonSelector
  );
  if (isLoading) {
    btnSumbitPopup.textContent = "Сохранение...";
  } else if (defaultButtonText) {
    btnSumbitPopup.textContent = defaultButtonText;
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", handleEscKey);
}

export function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", handleEscKey);
}

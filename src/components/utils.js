import { handleEscKey } from "./modal.js";
import { enableValidationKeys } from "./constants.js";
import { hideInputError } from "./validate.js";

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

export function hiddenValidation(popup) {
  const formElement = popup.querySelector(enableValidationKeys.formSelector);
  const inputElements = formElement.querySelectorAll(enableValidationKeys.inputSelector);
  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement, enableValidationKeys);
  });
};
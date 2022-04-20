import { enableValidationKeys } from "../index.js";

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(enableValidationKeys.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidationKeys.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(enableValidationKeys.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(enableValidationKeys.errorClass);
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(enableValidationKeys.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    enableValidationKeys.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(enableValidationKeys.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(enableValidationKeys.inactiveButtonClass);
  }
};

export const enableValidation = () => {
  const formList = Array.from(
    document.querySelectorAll(enableValidationKeys.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);

    // const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    // fieldsetList.forEach((fieldSet) => {
    //   setEventListeners(fieldSet);
    // });
  });
};

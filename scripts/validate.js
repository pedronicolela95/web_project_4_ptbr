const validationVariables = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationVariables
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationVariables.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationVariables.errorClass);
};

const hideInputError = (formElement, inputElement, validationVariables) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationVariables.inputErrorClass);
  errorElement.classList.remove(validationVariables.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validationVariables) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationVariables
    );
  } else {
    hideInputError(formElement, inputElement, validationVariables);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationVariables) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationVariables.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationVariables.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, validationVariables) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationVariables.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationVariables.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationVariables);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationVariables);
      toggleButtonState(inputList, buttonElement, validationVariables);
    });
  });
};

const enableValidation = (validationVariables) => {
  const formList = Array.from(
    document.querySelectorAll(validationVariables.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationVariables);
  });
};

enableValidation(validationVariables);

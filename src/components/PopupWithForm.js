import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popupSelector.querySelector(".popup__form");
    this._submitElement = this._popupSelector.querySelector(".popup__button");
  }

  _getInputValues() {
    this._popupInputs = this._popupSelector.querySelectorAll(".popup__input");
    return this._popupInputs;
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._submitElement.textContent = "Salvando...";
    } else {
      if (this._popupSelector == "#delete-form") {
        this._submitElement.textContent = "Sim";
      } else {
        this._submitElement.textContent = "Salvar";
      }
    }
  }

  _submitFunction(evt) {
    evt.preventDefault();
    this._renderLoading(true);
    const _variables = this._getInputValues();
    const submitFormPromise = new Promise((resolve, reject) => {
      let result;

      if (_variables[0]) {
        result = this._submitForm(_variables);
      } else {
        result = this._submitForm();
      }
      resolve(result);
    });

    submitFormPromise
      .then(() => {
        this._renderLoading(false);
        this.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _setBoundFunctions() {
    super._setBoundFunctions();
    this._boundsubmitFunction = this._submitFunction.bind(this);
  }

  _setEventListeners() {
    super._setEventListeners();
    this._variables = this._getInputValues();
    this._formElement.addEventListener(
      "submit",
      this._boundsubmitFunction,
      false
    );
  }

  close() {
    super.close();
    this._getInputValues();
    this._popupInputs.forEach((item) => {
      item.value = "";
    });

    this._formElement.removeEventListener(
      "submit",
      this._boundsubmitFunction,
      false
    );
  }
}

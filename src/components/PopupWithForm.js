import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popupSelector.querySelector(".popup__form");
  }

  _getInputValues() {
    this._popupInputs = this._popupSelector.querySelectorAll(".popup__input");
    return this._popupInputs;
  }

  _submitFunction(evt) {
    evt.preventDefault();
    const _variables = this._getInputValues();

    if (_variables[0]) {
      this._submitForm(_variables);
    } else {
      this._submitForm();
    }
    this.close();
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

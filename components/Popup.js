export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupSelector.querySelector(
      ".popup__close-button"
    );
  }

  open() {
    this._popupSelector.classList.add("popup__active");
    this._setEventListeners();
  }

  close() {
    document.removeEventListener("keydown", this._boundHandleEscClose);
    document.removeEventListener("click", this._boundHandleClickOverlay);
    this._popupCloseButton.removeEventListener("click", this._boundClose);
    this._popupSelector.classList.remove("popup__active");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickOverlay(evt) {
    if (evt.target.classList.contains("popup__overlay")) {
      this.close();
    }
  }

  _setBoundFunctions() {
    this._boundHandleEscClose = this._handleEscClose.bind(this);
    this._boundHandleClickOverlay = this._handleClickOverlay.bind(this);
    this._boundClose = this.close.bind(this);
  }

  _setEventListeners() {
    this._setBoundFunctions();
    document.addEventListener("keydown", this._boundHandleEscClose);
    document.addEventListener("click", this._boundHandleClickOverlay);
    this._popupCloseButton.addEventListener("click", this._boundClose);
  }
}

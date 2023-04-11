// importing functions from utils
import PopupWithImage from "./PopupWithImage.js";

export default class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const postElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".post")
      .cloneNode(true);

    return postElement;
  }

  _configElement() {
    this._element.querySelector(".post__description").textContent = this._name;
    this._element.querySelector(".post__image").src = this._link;
    this._element.querySelector(".post__image").alt = "Foto de " + this._name;
  }

  _addEventListernerOpenPopup() {
    this._element
      .querySelector(".post__image")
      .addEventListener("click", function (evt) {
        const popupImage = new PopupWithImage("#image-zoom", {
          image: evt.target.src,
          imageAlt: evt.target.alt,
          legend: evt.target.nextElementSibling.textContent,
        });
        popupImage.open();
      });
  }

  _addEventListernerLikeButton() {
    this._element
      .querySelector(".post__like-button")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("post__like_clicked");
      });
  }

  _addEventListernerRemoveButton() {
    this._element
      .querySelector(".post__delete-button")
      .addEventListener("click", function (evt) {
        evt.target.parentElement.parentElement.remove(); // The parent element is the button. The parent element of the button is the post
      });
  }

  _setEventListeners() {
    this._addEventListernerOpenPopup();
    this._addEventListernerLikeButton();
    this._addEventListernerRemoveButton();
  }

  createPost() {
    this._element = this._getTemplate();

    this._configElement();

    this._setEventListeners();

    return this._element;
  }
}

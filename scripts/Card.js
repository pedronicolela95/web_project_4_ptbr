// importing functions from utils

import { openPopup } from "./utils.js";

// variable to create Zoom
const zoom = document.querySelector("#image-zoom");
const zoomSpace = zoom.querySelector(".popup__zoom");
const zoomImage = zoomSpace.querySelector(".popup__image");
const zoomDescription = zoomSpace.querySelector(".popup__description");

class Card {
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
        zoomImage.src = evt.target.src;
        zoomImage.alt = evt.target.alt;
        zoomDescription.textContent = evt.target.nextElementSibling.textContent;

        openPopup(zoom);
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

export { Card };

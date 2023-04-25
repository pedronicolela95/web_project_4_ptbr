// importing functions from utils
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

export default class Card {
  constructor({
    _id,
    name,
    link,
    ownerId,
    userId,
    likesArray,
    templateSelector,
    api,
  }) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._ownerId = ownerId;
    this._userId = userId;
    this._numberOfLikes = Object.keys(likesArray).length;
    this._likesArray = likesArray;
    this._isOwned = ownerId == userId ? true : false;
    this._isLikedByUser = false;
    this._api = api;
  }

  _getTemplate() {
    const postElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".post")
      .cloneNode(true);

    return postElement;
  }

  _setDeleteButton() {
    if (!this._isOwned) {
      this._element.querySelector(".post__delete-button").remove();
    }
  }

  _setLikesNumber() {
    this._element.querySelector(".post__like-number").textContent =
      this._numberOfLikes;
  }

  _setLikedButton() {
    if (this._numberOfLikes > 0) {
      this._likesArray.forEach((item) => {
        if (item._id == this._userId) {
          this._isLikedByUser = true;
        }
      });
    }

    if (this._isLikedByUser) {
      this._element
        .querySelector(".post__like-button")
        .classList.add("post__like_clicked");
    }
  }

  _configElement() {
    this._element.querySelector(".post__description").textContent = this._name;
    this._element.querySelector(".post__image").src = this._link;
    this._element.querySelector(".post__image").alt = `Foto de ${this._name}`;
    this._setDeleteButton();
    this._setLikesNumber();
    this._setLikedButton();
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
      .addEventListener("click", (evt) => {
        this._api
          .likeCard(this._id, this._isLikedByUser)
          .then((item) => {
            this._likesArray = item.likes;
            this._numberOfLikes = Object.keys(item.likes).length;
            this._isLikedByUser = !this._isLikedByUser;
            this._element
              .querySelector(".post__like-button")
              .classList.toggle("post__like_clicked");
            this._setLikesNumber();
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  _addEventListernerRemoveButton() {
    this._element
      .querySelector(".post__delete-button")
      .addEventListener("click", (evt) => {
        const popupDelete = new PopupWithForm("#delete-form", () => {
          this._api
            .deleteCard(this._id)
            .then(() => {
              this._element.remove();
            })
            .catch((err) => {
              console.log(err);
            });
        });
        popupDelete.open();
      });
  }

  _setEventListeners() {
    this._addEventListernerOpenPopup();
    this._addEventListernerLikeButton();
    if (this._isOwned) {
      this._addEventListernerRemoveButton();
    }
  }

  createPost() {
    this._element = this._getTemplate();

    this._configElement();

    this._setEventListeners();

    return this._element;
  }
}

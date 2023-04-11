import {
  initialCards,
  cardListSelector,
  validationVariables,
  profileFormSelector,
  editButton,
  profileName,
  profileAboutMe,
  postFormSelector,
  addButton,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";

import { FormValidator } from "../components/FormValidator.js";

import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// creating new cards

const defaultCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, "#post");
      const cardElement = card.createPost();
      defaultCards.setItem(cardElement);
    },
  },
  cardListSelector
);

defaultCards.renderItems();

// creating form validator

const formList = Array.from(
  document.querySelectorAll(validationVariables.formSelector)
);

const pageValidation = (formList) => {
  const validator = formList.map(function (form) {
    return new FormValidator(validationVariables, form);
  });

  validator.forEach((item) => {
    item.enableValidation();
  });
};

pageValidation(formList);

// creating profile form

const profileForm = new PopupWithForm(
  profileFormSelector,
  (name, description) => {
    let userInfoForm = new UserInfo({ name, description });
    userInfoForm.setUserInfo();
  }
);

editButton.addEventListener("click", () => {
  let userInfoForm = new UserInfo({
    name: profileName.textContent,
    description: profileAboutMe.textContent,
  });
  userInfoForm.getUserInfo();
  profileForm.open();
});

// creating add new post form

const postForm = new PopupWithForm(postFormSelector, (name, link) => {
  let newCard = new Card(name, link, "#post");
  let newCardElement = newCard.createPost();
  defaultCards.setItem(newCardElement);
});

addButton.addEventListener("click", () => {
  postForm.open();
});

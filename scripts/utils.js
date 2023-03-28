//

import { Card } from "./Card.js";

////////////////////////////
// Open and close popups //
//////////////////////////

const checkEscape = (evt) => {
  if (evt.key == "Escape") {
    closePopup();
  }
};

const checkOverlay = (evt, popup) => {
  if (evt.target.classList.contains("popup__overlay")) {
    closePopup();
  }
};

const closePopup = () => {
  const openedPopup = document.querySelector(".popup__active");

  if (openedPopup) {
    document.removeEventListener("keydown", checkEscape);
    document.removeEventListener("click", checkOverlay);
    openedPopup.classList.remove("popup__active");
  }
};

const openPopup = (popup) => {
  popup.classList.add("popup__active");
  document.addEventListener("keydown", checkEscape);
  document.addEventListener("click", checkOverlay);
};

////////////////////////////
// profiles information ///
//////////////////////////

// finding profile's current information
const profile = document.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__edit-button");

// finding profile form constants
const profileForm = document.querySelector("#profile-form");
const profileCloseButton = profileForm.querySelector(".popup__close-button");

const getProfileInfo = () => {
  const infos = {
    profileName: profileInfo.querySelector(".profile__name"),
    profileAboutMe: profileInfo.querySelector(".profile__about-me"),
    inputName: profileForm.querySelector("#name-input"),
    inputAboutMe: profileForm.querySelector("#about-me-input"),
  };
  return infos;
};

const openProfileForm = (evt) => {
  const infos = getProfileInfo();

  infos.inputName.value = infos.profileName.textContent;
  infos.inputAboutMe.value = infos.profileAboutMe.textContent;

  openPopup(profileForm);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const infos = getProfileInfo();

  infos.profileName.textContent = infos.inputName.value;
  infos.profileAboutMe.textContent = infos.inputAboutMe.value;

  closePopup();
};

// Adding event listeners for profiles
editButton.addEventListener("click", openProfileForm);
profileCloseButton.addEventListener("click", closePopup);
profileForm.addEventListener("submit", handleProfileFormSubmit);

////////////////////
// adding new post//
////////////////////

// variable to create posts
const postsPlace = document.querySelector(".posts");
const addButton = profile.querySelector(".profile__add-button");
const postForm = document.querySelector("#place-form");
const postCloseButton = postForm.querySelector(".popup__close-button");

const zoom = document.querySelector("#image-zoom");
const zoomSpace = zoom.querySelector(".popup__zoom");
const zoomCloseButton = zoomSpace.querySelector(".popup__close-button");

const openPostForm = (evt) => {
  evt.preventDefault();
  openPopup(postForm);
};

const createPost = (imageName, imageLink) => {
  const card = new Card(imageName, imageLink, "#post");
  const cardElement = card.createPost();
  postsPlace.prepend(cardElement);
};

const handlePostFormSubmit = (evt) => {
  evt.preventDefault();

  // getting creating a new post
  const postTitle = postForm.querySelector("#title-input").value;
  const postLink = postForm.querySelector("#image-link-input").value;

  createPost(postTitle, postLink);

  postForm.querySelector("#title-input").value = "";
  postForm.querySelector("#image-link-input").value = "";

  closePopup();
};

// Adding event listeners to add new posts
addButton.addEventListener("click", openPostForm);
postCloseButton.addEventListener("click", closePopup);
postForm.addEventListener("submit", handlePostFormSubmit);
zoomCloseButton.addEventListener("click", closePopup);

export { createPost, openPopup };

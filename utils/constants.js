// creating posts

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardListSelector = ".posts";
const postFormSelector = "#place-form";

// validationVariables

const validationVariables = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// finding profile's current information
const profileFormSelector = "#profile-form";

const profile = document.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__edit-button");

// finding profile form constants
const profileForm = document.querySelector("#profile-form");
const profileName = profileInfo.querySelector(".profile__name");
const profileAboutMe = profileInfo.querySelector(".profile__about-me");
const inputName = profileForm.querySelector("#name-input");
const inputAboutMe = profileForm.querySelector("#about-me-input");

// add button

const addButton = profile.querySelector(".profile__add-button");

/// zoom information ///

const zoom = document.querySelector("#image-zoom");
const zoomSpace = zoom.querySelector(".popup__zoom");
const zoomImage = zoomSpace.querySelector(".popup__image");
const zoomDescription = zoomSpace.querySelector(".popup__description");

export {
  initialCards,
  cardListSelector,
  validationVariables,
  profileFormSelector,
  editButton,
  profileName,
  profileAboutMe,
  inputName,
  inputAboutMe,
  postFormSelector,
  addButton,
  zoomImage,
  zoomDescription,
};

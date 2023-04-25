// creating posts

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
const profileImageSelector = "#profile-image";

const profile = document.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const profilePicture = profile.querySelector(".profile__picture");
const profileImage = profile.querySelector(".profile__image");
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

/// images

const headerImageImg = new URL("../images/header/__image.svg", import.meta.url);
const closeIconImg = new URL("../images/popup/close-icon.svg", import.meta.url);
const deleteButtonImg = new URL(
  "../images/posts/delete-button.svg",
  import.meta.url
);
const editButtonImg = new URL(
  "../images/profile/edit_button.svg",
  import.meta.url
);
const plutSignImg = new URL("../images/profile/plus-sign.svg", import.meta.url);
const editImageButton = new URL(
  "../images/profile/edit-picture.svg",
  import.meta.url
);

const imagesToLoad = [
  { paths: document.querySelectorAll(".header__image"), src: headerImageImg },
  {
    paths: document.querySelectorAll(".popup__close-button"),
    src: closeIconImg,
  },
  {
    paths: document.querySelectorAll(".profile__edit-button"),
    src: editButtonImg,
  },
  { paths: document.querySelectorAll(".profile__plus-sign"), src: plutSignImg },
  {
    paths: document.querySelectorAll(".profile__edit-picture"),
    src: editImageButton,
  },
];

const apiToken = "30daf07f-92e8-4bf2-9f92-48f8d54dd26d";
const groupId = "web_ptbr_cohort_03";

export {
  cardListSelector,
  validationVariables,
  profileFormSelector,
  editButton,
  profileName,
  profileAboutMe,
  profilePicture,
  inputName,
  inputAboutMe,
  postFormSelector,
  addButton,
  zoomImage,
  zoomDescription,
  imagesToLoad,
  apiToken,
  groupId,
  profileImage,
  profileImageSelector,
};

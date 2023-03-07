// default functions to open and close popups

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

// Working with profile's information

// finding profile's current information
const profile = document.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__edit-button");

// finding profile form constants
const profileForm = document.querySelector("#profile-form");
const profileCloseButton = profileForm.querySelector(".popup__close-button");

const getProfileInfo = () => {
  let infos = {
    profileName: profileInfo.querySelector(".profile__name"),
    profileAboutMe: profileInfo.querySelector(".profile__about-me"),
    inputName: profileForm.querySelector("#name-input"),
    inputAboutMe: profileForm.querySelector("#about-me-input"),
  };
  return infos;
};

const openProfileForm = (evt) => {
  infos = getProfileInfo();

  infos.inputName.value = infos.profileName.textContent;
  infos.inputAboutMe.value = infos.profileAboutMe.textContent;

  openPopup(profileForm);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  infos = getProfileInfo();

  infos.profileName.textContent = infos.inputName.value;
  infos.profileAboutMe.textContent = infos.inputAboutMe.value;

  closePopup();
};

// clicking profile buttons
editButton.addEventListener("click", openProfileForm);
profileCloseButton.addEventListener("click", closePopup);
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Working with image posts

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

// variable to create posts
const postsPlace = document.querySelector(".posts");
const addButton = profile.querySelector(".profile__add-button");
const postForm = document.querySelector("#place-form");
const postCloseButton = postForm.querySelector(".popup__close-button");

const zoom = document.querySelector("#image-zoom");
const zoomSpace = zoom.querySelector(".popup__zoom");
const zoomImage = zoomSpace.querySelector(".popup__image");
const zoomDescription = zoomSpace.querySelector(".popup__description");
const zoomCloseButton = zoomSpace.querySelector(".popup__close-button");

// function to create post
const createPost = (name, link) => {
  const postTemplate = document.querySelector("#post").content;
  const postElement = postTemplate.querySelector(".post").cloneNode(true);

  postElement.querySelector(".post__description").textContent = name;
  postElement.querySelector(".post__image").src = link;
  postElement.querySelector(".post__image").alt = "Foto de " + name;

  postElement
    .querySelector(".post__image")
    .addEventListener("click", function (evt) {
      zoomImage.src = evt.target.src;
      zoomImage.alt = evt.target.alt;
      zoomDescription.textContent = evt.target.nextElementSibling.textContent;

      openPopup(zoom);
    });

  postElement
    .querySelector(".post__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("post__like_clicked");
    });

  postElement
    .querySelector(".post__delete-button")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.parentElement.remove(); // The parent element is the button. The parent element of the button is the post
    });

  postsPlace.prepend(postElement);
};

const openPostForm = (evt) => {
  evt.preventDefault();
  openPopup(postForm);
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

// creating initial posts

initialCards.forEach(function (item) {
  createPost(item.name, item.link);
});

// clicking buttons
addButton.addEventListener("click", openPostForm);
postCloseButton.addEventListener("click", closePopup);
postForm.addEventListener("submit", handlePostFormSubmit);
zoomCloseButton.addEventListener("click", closePopup);

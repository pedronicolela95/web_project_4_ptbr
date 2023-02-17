// finding profile's current information

const profile = document.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__edit-button");

// finding forms constants
const profileForm = document.querySelector("#profile-form");
const profileCloseButton = profileForm.querySelector(".form__close-button");

function OpenCloseProfileForm(evt) {
  evt.preventDefault();

  // finding current information
  const profileName = profileInfo.querySelector(".profile__name");
  const profileAboutMe = profileInfo.querySelector(".profile__about-me");

  // getting inputs information
  const inputName = profileForm.querySelector('input[name="name"]');
  const inputAboutMe = profileForm.querySelector('input[name="about-me"]');

  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;

  profileForm.classList.toggle("form__active");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // finding current information
  const profileName = profileInfo.querySelector(".profile__name");
  const profileAboutMe = profileInfo.querySelector(".profile__about-me");

  // getting inputs information
  const inputName = profileForm.querySelector('input[name="name"]');
  const inputAboutMe = profileForm.querySelector('input[name="about-me"]');

  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;

  profileForm.classList.toggle("form__active");
}

// clicking buttons
editButton.addEventListener("click", OpenCloseProfileForm);
profileCloseButton.addEventListener("click", OpenCloseProfileForm);
profileForm.addEventListener("submit", handleProfileFormSubmit);

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

const postForm = document.querySelector("#place-form");
const postCloseButton = postForm.querySelector(".form__close-button");

const addButton = profile.querySelector(".profile__add-button");

const zoom = document.querySelector(".zoom");
const zoomSpace = zoom.querySelector(".zoom__space");
const zoomImage = zoomSpace.querySelector(".zoom__image");
const zoomDescription = zoomSpace.querySelector(".zoom__description");
const zoomCloseButton = zoomSpace.querySelector(".zoom__close-button");

// function to open / close zoom

function zoomOpenClose(evt) {
  evt.preventDefault();
  zoom.classList.toggle("zoom__active");
}

zoomCloseButton.addEventListener("click", zoomOpenClose);

// function to create post
function createPost(name, link) {
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

      zoomOpenClose(evt);
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
}

initialCards.forEach(function (item) {
  createPost(item.name, item.link);
});

function OpenClosePostForm(evt) {
  evt.preventDefault();
  postForm.classList.toggle("form__active");
}

function handlePostFormSubmit(evt) {
  evt.preventDefault();

  // getting creating a new post
  const postTitle = postForm.querySelector('input[name="titulo"]').value;
  const postLink = postForm.querySelector('input[name="image-link"]').value;

  createPost(postTitle, postLink);

  postForm.querySelector('input[name="titulo"]').value = "";
  postForm.querySelector('input[name="image-link"]').value = "";

  postForm.classList.toggle("form__active");
}

// clicking buttons
addButton.addEventListener("click", OpenClosePostForm);
postCloseButton.addEventListener("click", OpenClosePostForm);
postForm.addEventListener("submit", handlePostFormSubmit);

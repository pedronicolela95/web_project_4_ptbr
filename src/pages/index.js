import "./index.css";

import {
  cardListSelector,
  validationVariables,
  profileFormSelector,
  editButton,
  profileName,
  profileAboutMe,
  postFormSelector,
  addButton,
  imagesToLoad,
  apiToken,
  groupId,
  profileImage,
  profileImageSelector,
} from "../utils/constants.js";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

imagesToLoad.forEach((item) => {
  item.paths.forEach((path) => {
    path.src = item.src;
  });
});

// initing API

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/" + groupId,
  headers: {
    authorization: apiToken,
    "Content-Type": "application/json",
  },
});

const userInfoPromise = api
  .getProfileInfo()
  .then((res) => {
    let userInfo = new UserInfo({
      name: res.name,
      description: res.about,
      avatarLink: res.avatar,
      id: res._id,
    });
    userInfo.setUserPicture();
    userInfo.setUserInfo();
    return userInfo;
  })
  .catch((err) => {
    console.log(err);
  });

const cardsSectionPromise = userInfoPromise
  .then((userInfo) => {
    return api.getInitialCards().then((res) => {
      const defaultCards = new Section(
        {
          items: res,
          renderer: (item) => {
            const card = new Card({
              _id: item._id,
              name: item.name,
              link: item.link,
              ownerId: item.owner._id,
              userId: userInfo._id,
              likesArray: item.likes,
              templateSelector: "#post",
              api: api,
            });
            const cardElement = card.createPost();
            defaultCards.setItem(cardElement);
          },
        },
        cardListSelector
      );
      return defaultCards;
    });
  })
  .then((section) => {
    section.renderItems();
    return section;
  })
  .catch((err) => {
    console.log(err);
  });

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

const profileForm = new PopupWithForm(profileFormSelector, (inputArray) => {
  api
    .updateProfileInfo({
      name: inputArray[0].value,
      about: inputArray[1].value,
    })
    .then((res) => {
      let userInfoForm = new UserInfo({
        name: res.name,
        description: res.about,
        avatarLink: res.avatar,
        id: res._id,
      });
      userInfoForm.setUserInfo();
    })
    .catch((err) => {
      console.log(err);
    });
});

editButton.addEventListener("click", () => {
  let userInfoForm = new UserInfo({
    name: profileName.textContent,
    description: profileAboutMe.textContent,
  });
  userInfoForm.getUserInfo();
  profileForm.open();
});

// creating add new post form

const postForm = new PopupWithForm(postFormSelector, (inputArray) => {
  Promise.all([
    cardsSectionPromise,
    userInfoPromise,
    { name: inputArray[0].value, link: inputArray[1].value },
  ])
    .then(([cardsSection, userInfo, postInfo]) => {
      return api.postCards(postInfo).then((item) => {
        const card = new Card({
          _id: item._id,
          name: item.name,
          link: item.link,
          ownerId: item.owner._id,
          userId: userInfo._id,
          likesArray: item.likes,
          templateSelector: "#post",
          api: api,
        });
        console.log(card);
        const cardElement = card.createPost();
        cardsSection.setItem(cardElement);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

const profileImageForm = new PopupWithForm(
  profileImageSelector,
  (inputArray) => {
    api
      .updateProfileImage({
        avatar: inputArray[0].value,
      })
      .then((res) => {
        let userInfoForm = new UserInfo({
          name: res.name,
          description: res.about,
          avatarLink: res.avatar,
          id: res._id,
        });
        userInfoForm.setUserPicture();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

addButton.addEventListener("click", () => {
  postForm.open();
});

profileImage.addEventListener("click", () => {
  profileImageForm.open();
});

import {
  profileName,
  profileAboutMe,
  profilePicture,
  inputName,
  inputAboutMe,
} from "../utils/constants.js";

export default class UserInfo {
  constructor({ name, description, avatarLink, id }) {
    this._name = name;
    this._description = description;
    this._avatarLink = avatarLink;
    this._id = id;
  }

  getUserInfo() {
    inputName.value = this._name;
    inputAboutMe.value = this._description;
  }

  setUserInfo() {
    profileName.textContent = this._name;
    profileAboutMe.textContent = this._description;
  }

  setUserPicture() {
    profilePicture.src = this._avatarLink;
    profilePicture.alt = `Foto de ${this._name}`;
  }
}

import {
  profileName,
  profileAboutMe,
  inputName,
  inputAboutMe,
} from "../utils/constants.js";

export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    inputName.value = this._name;
    inputAboutMe.value = this._description;
  }

  setUserInfo() {
    profileName.textContent = this._name;
    profileAboutMe.textContent = this._description;
  }
}

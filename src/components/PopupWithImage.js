import Popup from "./Popup.js";
import { zoomImage, zoomDescription } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { image, imageAlt, legend }) {
    super(popupSelector);
    this._image = image;
    this._imageAlt = imageAlt;
    this._legend = legend;
  }

  open() {
    zoomImage.src = this._image;
    zoomImage.alt = this._imageAlt;
    zoomDescription.textContent = this._legend;
    super.open();
  }
}

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__captipn');
  }

  open({ name, link }) {
    super.open();
    this._caption.textContent = name;
    this._image.src = link;
    this._image.alt = name;
  }
}

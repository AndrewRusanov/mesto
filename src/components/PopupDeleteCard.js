import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor({ popupSelector, submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._submitCallback);
  }

  open() {
    super.open();
  }
}

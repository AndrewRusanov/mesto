import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor({ popupSelector, submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _onHandleDeleteCard = event => {
    this._submitCallback(event, { cardId: this._cardId, card: this._card });
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._onHandleDeleteCard);
  }

  open({ cardId, card }) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }
}

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector('.popup__close-button');
  }

  //   приватный метод, который содержит логику закрытия попапа клавишей Esc
  _handleEscClose(event) {
    event.key === 'Escape' && this.close();
  }

  //   приватный метод, который содержит логику закрытия попапа через Overlay
  _handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  //   публичный метод, который отвечает за открытие попапа
  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classlist.add('popup__opened');
  }

  //   публичный метод, который отвечает за закрытие попапа
  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classlist.remove('popup__opened');
  }

  //   публичный метод, который добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._popup.addEventListener('click', this._handleOverlayClose);
    this._popupCloseBtn.addEventListener('click', this.close());
  }
}

export default Popup;

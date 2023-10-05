class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector('.popup__close-button');
    //Из-за потери контекста явно привязываем this именно в конструкторе, чтобы движок браузера каждый раз не пересоздавал ссылку на this.
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //   приватный метод, который содержит логику закрытия попапа клавишей Esc
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  //   приватный метод, который содержит логику закрытия попапа через Overlay
  _handleOverlayClose(event) {
    if (event.target.classList.contains('popup_opened')) {
      this.close();
    }
  }
  //   публичный метод, который отвечает за открытие попапа
  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose);
  }

  //   публичный метод, который отвечает за закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //   публичный метод, который добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._popup.addEventListener('click', event => {
      this._handleOverlayClose(event);
    });
    this._popupCloseBtn.addEventListener('click', () => {
      this.close();
    });
  }
}

export default Popup;

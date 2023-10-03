// Класс Popup отвечает за открытие/закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    // Отдельно сохраняем кнопку закрытия, чтобы навесить на нее слушателя закрытия попапа
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
  }

  //   приватный метод, который содержит логику закрытия попапа клавишей Esc
  _handleEscClose(event) {
    event.key === 'Escape' && this.close();
  }
  // приватный метод, который содержит логику закрытия попапа через Overlay
  _handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
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
    this._popup.addEventListener('click', this._handleOverlayClose);
    this._popupCloseButton.addEventListener('click', this.close());
  }
}

import Popup from './Popup.js';

// Класс для работы с формами
class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitBtn = this._popup.querySelector('.popup__button');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._submitCallback = submitCallback;
  }

  //   приватный метод, который собирает даннные всех полей формы
  _getInputValues() {
    this._formData = {};
    this._inputList.forEach(input => {
      this._formData[input.name] = input.value;
    });
    return this._formData;
  }

  //   публичный  метод, который помимо добавленяи слушателя кнопки закрытия добавляет слушателя сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', event => {
      event.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  //   метод, который не только закрывает попап, но и сбрасывает значения полей формы
  close() {
    super.close();
    this._popupForm.reset();
  }
}

export default PopupWithForm;

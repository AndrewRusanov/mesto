import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  contructor(popupSelector, submitCallBack) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popupForm.querySelector('.popup__button');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
  }

  //   приватный метод, который собирает данные со всез инпутов формы
  _getInputValues() {
    return this._inputList.reduce((obj, input) => {
      obj[input.name] = input.value;
      return obj;
    }, {});
  }

  _submitHandler(event) {
    this._submitCallBack(event, this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._submitHandler());
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}

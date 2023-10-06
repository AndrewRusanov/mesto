export default class FormValidator {
  constructor(data, formElement) {
    this._config = data;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._formSelector = this._config.formSelector;
  }

  //Функция делает видимым сообщение с ошибкой
  _showInputError(inputElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    this._formElement
      .querySelector(`#${inputElement.name}-error`)
      .classList.add(this._config.errorClass);
    this._formElement.querySelector(`#${inputElement.name}-error`).textContent =
      inputElement.validationMessage;
  }

  //Функция убирает сообщение с ошибкой
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    this._formElement
      .querySelector(`#${inputElement.name}-error`)
      .classList.remove(this._config.errorClass);
    this._formElement.querySelector(`#${inputElement.name}-error`).textContent = '';
  }

  //Функция для проверки валидации
  _checkValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Функция деактивации кнопки "Сохранить"
  _enableSubmitButton() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  //Функция деактивации кнопки "Сохранить"
  _disableSubmitButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  //Функция переключения состояния кнопки
  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some(inputElement => !inputElement.validity.valid);
    hasInvalidInput ? this._disableSubmitButton() : this._enableSubmitButton();
  }

  //Функция слушателя для каждой формы
  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // метод сброса результатов проверки формы
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(input => {
      this._hideInputError(input);
    });
  }

  //Функция включения валидации
  enableValidation() {
    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
    });

    this._setEventListeners();
    this._toggleButtonState();
  }
}

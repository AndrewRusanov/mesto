//Функция делает видимым сообщение с ошибкой
function showInputError(errorElement, inputElement, configValidation) {
  inputElement.classList.add(configValidation.inputErrorClass);
  errorElement.classList.add(configValidation.errorClass);
  errorElement.textContent = inputElement.validationMessage; //Стандартный текст ошибки HTML-валидации
}

//Функция убирает сообщение с ошибкой
function hideInputError(errorElement, inputElement, configValidation) {
  inputElement.classList.remove(configValidation.inputErrorClass);
  errorElement.classList.remove(configValidation.errorClass);
  errorElement.textContent = ''; //Очистили строку с ошибкой
}

//Функция для проверки валидации
function checkInputValidity(formElement, inputElement, configValidation) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`); //Нашли элемент с текстом ошибки, соответствуюший нужному интпуту
  if (!inputElement.validity.valid) {
    showInputError(errorElement, inputElement, configValidation);
  } else {
    hideInputError(errorElement, inputElement, configValidation);
  }
}

//Функция проверки валидации для каждого инпута. Возвращает true, если хотя бы один из input invalid
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

//Функция переключения состояния кнопки
function toggleButtonState(inputList, buttonElement, configValidation) {
  if (hasInvalidInput(inputList)) {
    //Если форма не валидна
    disableSubmitButton(buttonElement); //вызываю функцию деактивации кнопки "Сохранить"
  } else {
    buttonElement.classList.remove(configValidation.inactiveButtonClass); //Убрали класс disabled для кнопки
    buttonElement.disabled = false; //Сделали кнопку активной
  }
}

//Функция деактивации кнопки "Сохранить"
function disableSubmitButton(buttonElement) {
  buttonElement.classList.add('popup__button_disabled'); //Добавили класс disabled для кнопки
  buttonElement.disabled = 'disabled'; //Сделали кнопку неактивной
}

//Функция слушателя для каждой формы
function setEventListener(formElement, configValidation) {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector)); //Создали массив всех инпутов в форме
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector); //Нашли кнопку "Сохранить" в форме
  toggleButtonState(inputList, buttonElement, configValidation); //переключение состояния кнопки при загрузке страницы
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      //обработчик слушателя
      checkInputValidity(formElement, inputElement, configValidation);
      toggleButtonState(inputList, buttonElement, configValidation); //переключение состояния кнопки
    });
  });
}

//Функция включения валидации
function enableValidation(configValidation) {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector)); //Создали массив всех форм на странице
  formList.forEach(function (formElement) {
    //Добавили каждой форме слушетеля
    setEventListener(formElement, configValidation);
  });
}

//Объект для передачи настроек валидации
const configValidation = {
  formSelector: '.popup__form', //форма для валидации
  inputSelector: '.popup__input', //поле для ввода
  submitButtonSelector: '.popup__button', //кнопка "Сохранить"
  inactiveButtonClass: 'popup__button_disabled', //Состоянеи disabled для кнопки "Сохранить"
  inputErrorClass: 'popup__input_type_error', //Красная строка под полем ввода
  errorClass: 'popup__error_visible' //Видимость ошибки
};

//Вызов функции включения валидации
enableValidation(configValidation);

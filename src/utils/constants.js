//Объект для передачи настроек валидации
const configValidation = {
  formSelector: '.popup__form', //форма для валидации
  inputSelector: '.popup__input', //поле для ввода
  submitButtonSelector: '.popup__button', //кнопка "Сохранить"
  inactiveButtonClass: 'popup__button_disabled', //Состоянеи disabled для кнопки "Сохранить"
  inputErrorClass: 'popup__input_type_error', //Красная строка под полем ввода
  errorClass: 'popup__error_visible' //Видимость ошибки
};

//Начальный массив (по заданию)
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// =========================== константы ===============================
const formEditElement = document.querySelector('#edit-form'); // Находим форму для редактирования профиля в DOM
const nameInput = formEditElement.querySelector('.popup__input_field_name'); // Находим input для редактирования профиля в DOM
const jobInput = formEditElement.querySelector('.popup__input_field_job'); // Находим input для редактирования профиля в DOM
const formList = document.querySelectorAll('.popup__form');
const buttonAddCard = document.querySelector('.profile__button_type_add');
const buttonEditProfile = document.querySelector('.profile__button_type_edit');

export {
  configValidation,
  initialCards,
  formEditElement,
  nameInput,
  jobInput,
  formList,
  buttonAddCard,
  buttonEditProfile
};

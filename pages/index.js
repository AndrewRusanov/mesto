import Card from '../script/Card.js';
import FormValidator from '../script/FormValidator.js';
import Section from '../script/Section.js';
import { configValidation, initialCards } from '../utils/constants.js';
import PopupWithImage from '../script/PopupWithImage.js';
import PopupWithForm from '../script/PopupWithForm.js';
import UserInfo from '../script/UserInfo.js';

// Объявление всех переменных (sprint 4-6)
const popupEditElement = document.querySelector('#edit-popup'); //Находим попап для редактирования профиля в DOM
const formEditElement = document.querySelector('#edit-form'); // Находим форму для редактирования профиля в DOM
const nameInput = formEditElement.querySelector('.popup__input_field_name'); // Находим input для редактирования профиля в DOM
const jobInput = formEditElement.querySelector('.popup__input_field_job'); // Находим input для редактирования профиля в DOM
const buttonPopupEditClose = document.querySelector('#close-edit'); //Кнопка закрытия popup редактирования профиля
const nameProfile = document.querySelector('.profile__name'); //Само имя профиля в DOM
const jobProfile = document.querySelector('.profile__description'); //Описание профиля в DOM
const buttonProfileEdit = document.querySelector('.profile__button_type_edit'); //Кнопка редактирования профиля
const buttonAllPopupCloseList = document.querySelectorAll('.popup__close-button'); //Псевдомассив всех кнопок закрытия popup
const popupAddElement = document.querySelector('#add-popup'); // Находим попап для добавления новой карточки в DOM
const formAddElement = document.querySelector('#add-form'); // Находим форму для добавления новой карточки в DOM
const namePlace = formAddElement.querySelector('.popup__input_field_palce'); // Находим input для ввода названия нового места в DOM
const nameLink = formAddElement.querySelector('.popup__input_field_link'); // Находим input для ввода ссылки на новое место в DOM
const buttonAddProfile = document.querySelector('.profile__button_type_add'); //Находим кнопку открытия popup для добавления картинок в DOM
const buttonPopupAddClose = document.querySelector('#close-add'); //Находим кнопку открытия popup для добавления картинок в DOM
const imagePopup = document.querySelector('#img-popup'); //Находим попап для октрытия карточки на весь экран
const buttonPopupImageClose = document.querySelector('#close-img'); //Находим кнопку закрытия попап с изображением
const image = imagePopup.querySelector('.popup__image'); //Выбрали картинку
const caption = imagePopup.querySelector('.popup__caption'); //Выбрали подпись
const formList = document.querySelectorAll('.popup__form');

const buttonAddCard = document.querySelector('.profile__button_type_add');
const buttonEditProfile = document.querySelector('.profile__button_type_edit');

// ============================ sprint 8 ================================
// ==================== создание экземпляров класса ====================
// создадим экземпляр класса Section
const cardsList = new Section(
  {
    items: initialCards,
    renderer: item => {
      const newCard = new Card(item, '#element', openImagePopup);
      const cardElement = newCard.createCard();
      return cardElement;
    }
  },
  '#elements'
);

// Создадим экземпляр класса PopupWithImage
const popupIamge = new PopupWithImage('#img-popup');

// Создадим экземпляры класса PopuoWithForm
const popupAdd = new PopupWithForm({
  popupSelector: '#add-popup',
  submitCallback: data => {
    popupAdd.close();
  }
});
const popupProfile = new PopupWithForm({
  popupSelector: '#edit-popup',
  submitCallback: data => {
    userInfo.setUserInfo({ name: data.inputName, description: data.inputJob });
    popupProfile.close();
  }
});

// Создадим экземпляр класса UserInfo
const userInfo = new UserInfo({
  nameProfileSelector: '.profile__name',
  descriptionProfileSelector: '.profile__description'
});

// ============================ функции ================================
// функиця открытия изображения на весь экран
function openImagePopup(imageLink, imageCaption) {
  popupIamge.open(imageCaption, imageLink);
}

//Функция открытяи попапа добавления новой карточки
function openAddPopup() {
  popupAdd.open();
}

// Функция открытия попапа редактировани профиля
function openEditPopup() {
  const element = userInfo.getUserInfo();
  nameInput.value = element.name;
  jobInput.value = element.description;
  popupProfile.open();
}

// Функция обработчика события для попапа добавления фотографии
function handleSubmitAddPopup(event) {
  event.preventDefault();
}

// Функция обработчика события для попапа редактирования профиля
function handleSubmitProfilePopup(event) {
  event.preventDefault();
}

// ======================== обработчики событий ========================

// Слушатели событий
popupIamge.setEventListeners();
popupAdd.setEventListeners();
popupProfile.setEventListeners();

buttonAddCard.addEventListener('click', openAddPopup);
buttonEditProfile.addEventListener('click', openEditPopup);

// ======================== инициализация страницы ========================
// вызовем метод renderItem, чтобы инициализировать начальный контент страницы
cardsList.renderItems();

// подключим валидацию для каждой формы
formList.forEach(formItem => {
  const formValidator = new FormValidator(configValidation, formItem);
  formValidator.enableValidation();
});

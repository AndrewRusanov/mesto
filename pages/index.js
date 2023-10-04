import Card from '../script/Card.js';
import FormValidator from '../script/FormValidator.js';
import Section from '../script/Section.js';
import { configValidation, initialCards } from '../utils/constants.js';
import PopupWithImage from '../script/PopupWithImage.js';
import PopupWithForm from '../script/PopupWithForm.js';
import UserInfo from '../script/UserInfo.js';

// ============================ sprint 8 ================================
// =========================== константы ===============================
const formEditElement = document.querySelector('#edit-form'); // Находим форму для редактирования профиля в DOM
const nameInput = formEditElement.querySelector('.popup__input_field_name'); // Находим input для редактирования профиля в DOM
const jobInput = formEditElement.querySelector('.popup__input_field_job'); // Находим input для редактирования профиля в DOM
const formList = document.querySelectorAll('.popup__form');
const buttonAddCard = document.querySelector('.profile__button_type_add');
const buttonEditProfile = document.querySelector('.profile__button_type_edit');

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

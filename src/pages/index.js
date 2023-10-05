// Для webpack
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {
  configValidation,
  initialCards,
  formEditElement,
  nameInput,
  jobInput,
  formList,
  buttonAddCard,
  buttonEditProfile
} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// ============================ sprint 8 ================================
// ==================== создание экземпляров класса ====================
// создадим экземпляр класса Section
const cardsList = new Section(
  {
    items: initialCards,
    renderer: item => {
      const newCard = createCard(item);
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
    cardsList.addItemPrepend({ name: data.inputPlace, link: data.inputLink });
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
// Создадим экземлпяры класса FormValidator
const popupAddValidation = new FormValidator(configValidation, popupAdd._popupForm);
const popupProfileValidation = new FormValidator(configValidation, popupProfile._popupForm);
// ============================ функции ================================
// Функция, для создания новой карточки
function createCard(data) {
  const newCard = new Card(
    {
      name: data.name,
      link: data.link
    },
    '#element',
    openImagePopup
  );
  return newCard;
}

// функиця открытия изображения на весь экран
function openImagePopup(imageLink, imageCaption) {
  popupIamge.open(imageCaption, imageLink);
}

//Функция открытяи попапа добавления новой карточки
function openAddPopup() {
  popupAddValidation.enableValidation();
  popupAdd.open();
}

// Функция открытия попапа редактировани профиля
function openEditPopup() {
  const element = userInfo.getUserInfo();
  nameInput.value = element.name;
  jobInput.value = element.description;
  popupProfileValidation.enableValidation();
  popupProfile.open();
}

// ======================== обработчики событий ========================

// Слушатели событий для классов
popupIamge.setEventListeners();
popupAdd.setEventListeners();
popupProfile.setEventListeners();
// Слушатели событий для кнопок
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

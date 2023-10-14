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
import Api from '../components/Api.js';

// ============================ sprint 8 ================================
// ==================== создание экземпляров класса ====================
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
  descriptionProfileSelector: '.profile__description',
  avatarProfileSelector: '.profile__avatar'
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
  // вешаем слушателя
  return newCard;
}

// функиця открытия изображения на весь экран
function openImagePopup(imageLink, imageCaption) {
  popupIamge.open(imageCaption, imageLink);
}

// ======================== обработчики событий ========================

// Слушатели событий для классов
popupIamge.setEventListeners();
popupAdd.setEventListeners();
popupProfile.setEventListeners();
// Слушатели событий для кнопок
buttonAddCard.addEventListener('click', () => {
  popupAdd.open();
  popupAddValidation.resetValidation();
});
buttonEditProfile.addEventListener('click', () => {
  const element = userInfo.getUserInfo();
  nameInput.value = element.name;
  jobInput.value = element.description;
  popupProfile.open();
  popupProfileValidation.resetValidation();
});
// ======================== инициализация страницы ========================
// добавляем валидацию для каждой из форм
popupAddValidation.enableValidation();
popupProfileValidation.enableValidation();

// ==================================== sprint 9 ========================================
// ============================= Создание экземпляров класса ============================
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'd686f3c3-25e3-4358-9762-4cd086d00e0f'
  }
});

// ============================== Загрузка карточек сервера ==============================
fetch('https://mesto.nomoreparties.co/v1/cohort-77/cards', {
  headers: {
    authorization: 'd686f3c3-25e3-4358-9762-4cd086d00e0f'
  }
})
  .then(res => res.json())
  .then(result => {
    // создадим экземпляр класса Section
    const cardsList = new Section(
      {
        items: result,
        renderer: item => {
          const newCard = createCard(item);
          const cardElement = newCard.createCard();
          return cardElement;
        }
      },
      '#elements'
    );
    // вызовем метод renderItems, чтобы инициализировать начальный контент страницы
    cardsList.renderItems();
  });

// Для webpack
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {
  configValidation,
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
// ==================================== sprint 9 ========================================
// ============================= Создание экземпляров класса ============================
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'd686f3c3-25e3-4358-9762-4cd086d00e0f',
    'Content-Type': 'application/json'
  }
});

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
    api.editUserInformation({ name: data.inputName, about: data.inputJob }).then(result =>
      userInfo.setUserInfo({
        name: result.name,
        about: result.about,
        avatar: result.avatar
      })
    );
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

// ======================== Загрузка начальной информации с сервера ======================
// ========================== Информация о пользователе (профиль) ========================
// Используем Promise.all, чтобы выполнить промисы
Promise.all([api.getUserInformation(), api.getCards()]).then(values => {
  userInfo.setUserInfo(values[0]);
  const cardList = new Section(
    {
      items: values[1],
      renderer: item => {
        const newCard = createCard(item);
        const cardElement = newCard.createCard();
        return cardElement;
      }
    },
    '#elements'
  );
  cardList.renderItems();
});

// ===================================== функции =========================================
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

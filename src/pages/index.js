// Для webpack
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {
  configValidation,
  nameInput,
  jobInput,
  buttonAddCard,
  buttonEditProfile,
  avatarContainer
} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
// ==================================== sprint 9 ========================================
// ============================= Создание экземпляров класса ============================
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'd686f3c3-25e3-4358-9762-4cd086d00e0f',
    'Content-Type': 'application/json'
  }
});

// Создадим экземпляр класса PopupDeleteCard
const popupDelete = new PopupDeleteCard({
  popupSelector: '#delete-popup',
  submitCallback: (event, { cardId, card }) => {
    event.preventDefault();
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard();
        popupDelete.close();
      })
      .catch(err => console.log(`Ошибка удаления карточки: ${err}`));
  }
});

// Создадим экземлпяр класса Section
const cardList = new Section(
  {
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

// Создадим экземпляр класса PopupWithForm (add card)
const popupAdd = new PopupWithForm({
  popupSelector: '#add-popup',
  submitCallback: data => {
    popupAdd.renderLoading(true);
    api
      .addNewCard({ name: data.inputPlace, link: data.inputLink })
      .then(cardData => {
        cardList.addItemPrepend(cardData);
        popupAdd.close();
      })
      .catch(err => console.log(`Ошибка добавления новой карточки: ${err}`))
      .finally(() => {
        popupAdd.renderLoading(false, 'Создать');
      });
  }
});
// Создадим экземпляр класса PopupWithForm (edit profile)
const popupProfile = new PopupWithForm({
  popupSelector: '#edit-popup',
  submitCallback: data => {
    popupProfile.renderLoading(true);
    api
      .editUserInformation({ name: data.inputName, about: data.inputJob })
      .then(result => {
        userInfo.setUserInfo({
          name: result.name,
          about: result.about
        });
        popupProfile.close();
      })
      .catch(err => console.log(`Ошибка редактирования профиля: ${err}`))
      .finally(() => {
        popupProfile.renderLoading(false, 'Сохранить');
      });
  }
});
// Создадим экземпляр класса PopupWithForm (edit Avatar)
const popupAvatar = new PopupWithForm({
  popupSelector: '#avatar-popup',
  submitCallback: data => {
    popupAvatar.renderLoading(true);
    api
      .editAvatar(data.avatarLink)
      .then(result => {
        userInfo.setUserAvatar({ avatar: result.avatar });
        popupAvatar.close();
      })
      .catch(err => console.log(`Ошибка изменения аватара: ${err}`))
      .finally(() => {
        popupAvatar.renderLoading(false, 'Сохранить');
      });
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
const popupAvatarValidation = new FormValidator(configValidation, popupAvatar._popupForm);

// ======================== Загрузка начальной информации с сервера ======================
// ========================== Информация о пользователе (профиль) ========================
// Используем Promise.all, чтобы выполнить промисы
Promise.all([api.getUserInformation(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      _id: userData._id
    });
    userInfo.setUserAvatar({
      avatar: userData.avatar
    });
    cardList.renderItems(cards);
  })
  .catch(err => console.log(`Ошибка загурзки информации о пользователе/карточек: ${err}`));

// ===================================== функции =========================================
// Функция, для создания новой карточки
function createCard(data) {
  const newCard = new Card(
    {
      name: data.name,
      link: data.link,
      likes: data.likes,
      _id: data._id,
      owner: data.owner
    },
    '#element',
    openImagePopup,
    (cardId, card) => {
      popupDelete.open(cardId, card);
    },
    userInfo.getUserInfo().userId,
    card => {
      api
        .likeCard(card.getCardInfo())
        .then(res => card.updateLike(res))
        .catch(err => console.log(`Ошибка добавления лайка: ${err}`));
    }
  );
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
popupDelete.setEventListeners();
popupAvatar.setEventListeners();
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
// Слушатель для редактирования аватара
avatarContainer.addEventListener('click', () => {
  popupAvatar.open();
  popupAvatarValidation.resetValidation();
});
// добавляем валидацию для каждой из форм
popupAddValidation.enableValidation();
popupProfileValidation.enableValidation();
popupAvatarValidation.enableValidation();

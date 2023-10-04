import Card from '../script/Card.js';
import FormValidator from '../script/FormValidator.js';
import Section from '../script/Section.js';
import { configValidation, initialCards } from '../utils/constants.js';
import Popup from '../script/Popup.js';

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

// ============================ sprint 8 ================================
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

// Создадим экземпляр класса Popup

// функиця открытия изображения на весь экран
function openImagePopup(imageLink, imageCaption) {
  image.src = imageLink; //Вставили ссылку на картинку;
  image.alt = imageCaption; //Вставили alt для картинки
  caption.textContent = imageCaption; //Вставили подпись к фото
  openPopup(imagePopup);
}

// вызовем метод renderItem, чтобы инициализировать начальный контент страницы
cardsList.renderItems();

// Слушатели событий
buttonProfileEdit.addEventListener('click', openPopupEdit);
buttonPopupEditClose.addEventListener('click', closePopupEdit);
buttonAddProfile.addEventListener('click', openPopupAdd);
buttonPopupAddClose.addEventListener('click', closePopupAdd);
buttonPopupImageClose.addEventListener('click', closeImagePopup);

// ====================== sprint 7 (рефакторинг) ========================

// функция добавления пользователем каротчки
function addNewElement(cardData) {
  const newElement = createNewCard(cardData);
  sectionElements.prepend(newElement);
}

// функция открытия всех popup
function openPopup(popup) {
  document.addEventListener('keydown', closePopupEsc);
  popup.classList.add('popup_opened');
}

// Функция закрытия всех popup
function closePopup(popup) {
  document.removeEventListener('keydown', closePopupEsc);
  popup.classList.remove('popup_opened');
}

buttonAllPopupCloseList.forEach(button => {
  const popup = button.closest('.popup'); //Находим ближайший попап к
  popup.addEventListener('mousedown', closePopupOverlay);
  button.addEventListener('click', () => closePopup(popup));
});

//Функция закрытия всех попапов через overlay
function closePopupOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

//Функция закрытия всех попапов черех Esc
function closePopupEsc(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//Функция открытия popup редактирования профиля
function openPopupEdit() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEditElement);
}

//Функция закрытия popup редактирования профиля
function closePopupEdit() {
  closePopup(popupEditElement);
}

//Функция открытия popup для добавления фото
function openPopupAdd() {
  openPopup(popupAddElement);
}

//Функция закрытия popup для добавления фото
function closePopupAdd() {
  closePopup(popupAddElement);
}

//Функция закрытия попап с изображением
function closeImagePopup() {
  closePopup(imagePopup);
}

//Отмена стандартной отправки формы для popup редактирования
function handleFormEditSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditElement);
}

function handleFormSubmitAddPopup(evt) {
  //отмена стандартной отправки формы для попапа добавления карточек
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  addNewElement({ name: namePlace.value, link: nameLink.value }); //вызвать функцию создания новой карточки
  closePopup(popupAddElement); //дополнительно закрыть попап
}

formList.forEach(formElement => {
  const formValidator = new FormValidator(configValidation, formElement);
  formValidator.enableValidation();

  if (formElement.id === 'edit-form') {
    formElement.addEventListener('submit', handleFormEditSubmit);
  } else if (formElement.id === 'add-form') {
    formElement.addEventListener('submit', handleFormSubmitAddPopup);
  }
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

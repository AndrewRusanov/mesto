// ==========================popup редактирования профиля==============================================
const editPopupElement = document.querySelector('#edit-popup'); //Находим попап для редактирования профиля в DOM
const editFormElement = document.querySelector('#edit-form'); // Находим форму для редактирования профиля в DOM
const nameInput = editFormElement.querySelector('.popup__input_field_name'); // Находим input для редактирования профиля в DOM
const jobInput = editFormElement.querySelector('.popup__input_field_job'); // Находим input для редактирования профиля в DOM
const closePopupButtonEdit = document.querySelector('#close-edit'); //Кнопка закрытия popup редактирования профиля
const nameProfile = document.querySelector('.profile__name'); //Само имя профиля в DOM
const jobProfile = document.querySelector('.profile__description'); //Описание профиля в DOM
const editProfileButton = document.querySelector('.profile__button_type_edit'); //Кнопка редактирования профиля

// Функция открытия всех popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия всех popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Функция открытия popup редактирования профиля
function openPopupEdit() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(editPopupElement);
}

//Функция закрытия popup редактирования профиля
function closePopupEdit() {
  closePopup(editPopupElement);
}
//Отмена стандартной отправки формы для popup редактирования
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(editPopupElement);
}

// ==========================popup добавления карточки==============================================
const addPopupElement = document.querySelector('#add-popup'); // Находим попап для добавления новой карточки в DOM
const addFormElement = document.querySelector('#add-form'); // Находим форму для добавления новой карточки в DOM
const namePlace = addFormElement.querySelector('.popup__input_field_palce'); // Находим input для ввода названия нового места в DOM
const nameLink = addFormElement.querySelector('.popup__input_field_link'); // Находим input для ввода ссылки на новое место в DOM
const addProfileButton = document.querySelector('.profile__button_type_add'); //Находим кнопку открытия popup для добавления картинок в DOM
const closePopupButtonAdd = document.querySelector('#close-add'); //Находим кнопку открытия popup для добавления картинок в DOM
const sectionElements = document.querySelector('.elements'); //Сюда будут добавляться карточки
const imagePopup = document.querySelector('#img-popup'); //Находим попап для октрытия карточки на весь экран
const closeImagePopupButton = document.querySelector('#close-img'); //Находим кнопку закрытия попап с изображением
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

//Функция открытия popup для добавления фото
function openPopupAdd() {
  openPopup(addPopupElement);
}

//Функция закрытия popup для добавления фото
function closePopupAdd() {
  closePopup(addPopupElement);
}

//Инициализация страницы (прогрузка 6 фото из массива)
initialCards.forEach(function (elements) {
  const card = createElement(elements);
  renderCard(card);
});

//Добавление карточки в общий массив
function renderCard(card) {
  sectionElements.append(card);
}

//Функция создания новой карточки
function addNewElement(element) {
  const newElement = createElement(element);
  sectionElements.prepend(newElement);
}

//Функция удаления карточки
function deleteElement(event) {
  const cardElement = event.target.closest('.element'); //Выбрали родительский элемент (карточку)
  cardElement.remove();
}

// Функция клонирования элеиента (template)
function createElement(elem) {
  const cardTemplate = document.querySelector('#element').content; // Сохранили свойства template в переменную
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true); //клонировали свойства
  const cardImage = cardElement.querySelector('.element__mask'); //Сохранили картинку в переменную
  const buttonCardTrash = cardElement.querySelector('.element__delete'); //Сохранили иконку удаления карточки в переменную
  cardImage.src = elem.link; //Определили ссылку для новой карточки
  cardImage.alt = elem.name; //Определили альтернативное описание для карточки (аlt = name)
  cardElement.querySelector('.element__text').textContent = elem.name; //Определили название для карточки
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    //Выбрали кнопку с лайком
    evt.target.classList.toggle('element__like_active'); // переключили лайк
  });
  cardImage.addEventListener('click', function () {
    openImagePopup(elem.link, elem.name); // Открытие popup с карточкой (биг фото)
  });
  buttonCardTrash.addEventListener('click', deleteElement); //Удаление карточки

  return cardElement;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', handleFormSubmit);
editProfileButton.addEventListener('click', openPopupEdit);
closePopupButtonEdit.addEventListener('click', closePopupEdit);

addProfileButton.addEventListener('click', openPopupAdd);
closePopupButtonAdd.addEventListener('click', closePopupAdd);

function handleFormSubmitAddPopup(evt) {
  //отмена стандартной отправки формы для попапа добавления карточек
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  const newElement = { name: namePlace.value, link: nameLink.value }; //передать аргументы
  addNewElement(newElement); //вызвать функцию создания новой карточки
  namePlace.value = '';
  nameLink.value = '';
  closePopup(addPopupElement); //дополнительно закрыть попап
}
addPopupElement.addEventListener('submit', handleFormSubmitAddPopup);

// Попап открытия изображения на весь экран
function openImagePopup(imageLink, imageCaption) {
  const image = imagePopup.querySelector('.popup__image'); //Выбрали картинку
  const caption = imagePopup.querySelector('.popup__caption'); //Выбрали подпись
  image.src = imageLink; //Вставили ссылку на картинку;
  image.alt = imageCaption; //Вставили alt для картинки
  caption.textContent = imageCaption; //Вставили подпись к фото
  openPopup(imagePopup);
}

//Функция закрытия попап с изображением
function closeImagePopup() {
  closePopup(imagePopup);
}

closeImagePopupButton.addEventListener('click', closeImagePopup);
// TODO 1. Сделать открытие попапа с карточкой (биг фото) - DONE!
// TODO 2. Повесить слушателя для удаления карточки - DONE!
// TODO 2.1. Сделать удаление карточки - DONE!
// TODO 3. Разобраться с кривым открытием карточки - DONE!
// TODO 4. Сделать добавление новых карточек - DONE!
// TODO 5. Разобраться с кривым лайком. - DONE!
// TODO 6. Плавное открытие и закрытие попапов - in progress...

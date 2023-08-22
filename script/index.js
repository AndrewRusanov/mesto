// ==========================popup редактирования профиля==============================================
const popupEditElement = document.querySelector('#edit-popup'); //Находим попап для редактирования профиля в DOM
const formEditElement = document.querySelector('#edit-form'); // Находим форму для редактирования профиля в DOM
const nameInput = formEditElement.querySelector('.popup__input_field_name'); // Находим input для редактирования профиля в DOM
const jobInput = formEditElement.querySelector('.popup__input_field_job'); // Находим input для редактирования профиля в DOM
const buttonPopupEditClose = document.querySelector('#close-edit'); //Кнопка закрытия popup редактирования профиля
const nameProfile = document.querySelector('.profile__name'); //Само имя профиля в DOM
const jobProfile = document.querySelector('.profile__description'); //Описание профиля в DOM
const buttonProfileEdit = document.querySelector('.profile__button_type_edit'); //Кнопка редактирования профиля
const buttonAllPopupClose = document.querySelectorAll('.popup__close-button'); //Псевдомассив всех кнопок закрытия popup

// ======================== sprint 6 ===================================
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
// ======================================================================

// Функция открытия всех popup
function openPopup(popup) {
  document.addEventListener('keydown', closePopupEsc);
  popup.classList.add('popup_opened');
}

// Функция закрытия всех popup
function closePopup(popup) {
  document.removeEventListener('keydown', closePopupEsc);
  popup.classList.remove('popup_opened');
}

//
buttonAllPopupClose.forEach(button => {
  const popup = button.closest('.popup'); //Находим ближайший попап к
  popup.addEventListener('mousedown', closePopupOverlay);
  button.addEventListener('click', () => closePopup(popup));
});

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
//Отмена стандартной отправки формы для popup редактирования
function handleFormEditSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditElement);
}

// ==========================popup добавления карточки==============================================
const popupAddElement = document.querySelector('#add-popup'); // Находим попап для добавления новой карточки в DOM
const formAddElement = document.querySelector('#add-form'); // Находим форму для добавления новой карточки в DOM
const namePlace = formAddElement.querySelector('.popup__input_field_palce'); // Находим input для ввода названия нового места в DOM
const nameLink = formAddElement.querySelector('.popup__input_field_link'); // Находим input для ввода ссылки на новое место в DOM
const buttonAddProfile = document.querySelector('.profile__button_type_add'); //Находим кнопку открытия popup для добавления картинок в DOM
const buttonPopupAddClose = document.querySelector('#close-add'); //Находим кнопку открытия popup для добавления картинок в DOM
const sectionElements = document.querySelector('.elements'); //Сюда будут добавляться карточки
const imagePopup = document.querySelector('#img-popup'); //Находим попап для октрытия карточки на весь экран
const buttonPopupImageClose = document.querySelector('#close-img'); //Находим кнопку закрытия попап с изображением
const image = imagePopup.querySelector('.popup__image'); //Выбрали картинку
const caption = imagePopup.querySelector('.popup__caption'); //Выбрали подпись

//Функция открытия popup для добавления фото
function openPopupAdd() {
  openPopup(popupAddElement);
}

//Функция закрытия popup для добавления фото
function closePopupAdd() {
  closePopup(popupAddElement);
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
formEditElement.addEventListener('submit', handleFormEditSubmit);
buttonProfileEdit.addEventListener('click', openPopupEdit);
buttonPopupEditClose.addEventListener('click', closePopupEdit);

buttonAddProfile.addEventListener('click', openPopupAdd);
buttonPopupAddClose.addEventListener('click', closePopupAdd);

function handleFormSubmitAddPopup(evt) {
  //отмена стандартной отправки формы для попапа добавления карточек
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  const newElement = { name: namePlace.value, link: nameLink.value }; //передать аргументы
  addNewElement(newElement); //вызвать функцию создания новой карточки
  namePlace.value = '';
  nameLink.value = '';
  closePopup(popupAddElement); //дополнительно закрыть попап
}
popupAddElement.addEventListener('submit', handleFormSubmitAddPopup);

// Попап открытия изображения на весь экран
function openImagePopup(imageLink, imageCaption) {
  image.src = imageLink; //Вставили ссылку на картинку;
  image.alt = imageCaption; //Вставили alt для картинки
  caption.textContent = imageCaption; //Вставили подпись к фото
  openPopup(imagePopup);
}

//Функция закрытия попап с изображением
function closeImagePopup() {
  closePopup(imagePopup);
}

buttonPopupImageClose.addEventListener('click', closeImagePopup);

//Находим попап для редактирования профиля в DOM
const editPopupElement = document.querySelector('#edit-popup');
// Находим форму для редактирования профиля в DOM
const editFormElement = document.querySelector('#edit-form');

// Находим поля формы  для редактирования в DOM
const nameInput = editFormElement.querySelector('.popup__input_field_name');
const jobInput = editFormElement.querySelector('.popup__input_field_job');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__description');

//Открытие popup на редактирование профиля
const editProfileButton = document.querySelector('.profile__button_type_edit');
function openPopupEdit() {
  editPopupElement.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

//Закрытие popup на редактирование профиля
let closePopupButtonEdit = document.querySelector('#close-edit');
function closePopupEdit() {
  editPopupElement.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopupEdit();
}
//=====Sprint5========================
// Находим попап для добавления новой карточки в DOM
const addPopupElement = document.querySelector('#add-popup');

// Находим форму для добавления новой карточки в DOM
const addFormElement = document.querySelector('#add-form');

// Находим поля формы для добавления новой карточки в DOM
const namePlace = addFormElement.querySelector('.popup__input_field_palce');
const nameLink = addFormElement.querySelector('.popup__input_field_link');

//Открытие popup на добавление карточек
const addProfileButton = document.querySelector('.profile__button_type_add');
function openPopupAdd() {
  addPopupElement.classList.add('popup_opened');
  // nameInput.value = nameProfile.textContent;
  // jobInput.value = jobProfile.textContent;
}

//Закрытие popup на редактирование профиля
let closePopupButtonAdd = document.querySelector('#close-add');
function closePopupAdd() {
  addPopupElement.classList.remove('popup_opened');
}

// function handleFormSubmit(evt) {
//   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//   // Так мы можем определить свою логику отправки.
//   // О том, как это делать, расскажем позже.
//   nameProfile.textContent = nameInput.value;
//   jobProfile.textContent = jobInput.value;
//   closePopup();
// }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', handleFormSubmit);
editProfileButton.addEventListener('click', openPopupEdit);
closePopupButtonEdit.addEventListener('click', closePopupEdit);

addProfileButton.addEventListener('click', openPopupAdd);
closePopupButtonAdd.addEventListener('click', closePopupAdd);

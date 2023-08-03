//Находим попап в DOM
let popupElement = document.querySelector('.popup');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()

// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_field_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__input_field_job'); // Воспользуйтесь инструментом .querySelector()

let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__description');

//Открытие popup
let editProfileButton = document.querySelector('.profile__button_type_edit');
function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

//Закрытие popup
let closePopupButton = document.querySelector('.popup__close-button');
function closePopup() {
  popupElement.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
editProfileButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

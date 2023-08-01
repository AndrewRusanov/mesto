// Находим форму в DOM
let formElement = document.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()
console.log(formElement);
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__field-name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__field-job'); // Воспользуйтесь инструментом .querySelector()

let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__description');

// Отрытие popup
let editProfileButton = document.querySelector('.profile__button_end'); //Кнопка открытия popup
editProfileButton.addEventListener('click', openPopup);
function openPopup() {
  formElement.classList.remove('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

// Закрытие popup
let closePopupButton = document.querySelector('.popup__close-button'); //Кнопка закрытия popup
closePopupButton.addEventListener('click', closePopup);
function closePopup() {
  formElement.classList.add('popup_opened');
}
// =======================================================================================================

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

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

//Отмена стандартной отправки формы для popup редактирования
function handleFormEditSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditElement);
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

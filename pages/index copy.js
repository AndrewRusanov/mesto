// ====================== sprint 7 (рефакторинг) ========================

// функция добавления пользователем каротчки
function addNewElement(cardData) {
  const newElement = createNewCard(cardData);
  sectionElements.prepend(newElement);
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

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

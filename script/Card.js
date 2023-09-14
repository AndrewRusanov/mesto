export default class Card {
  constructor(data, templateSelector, openImagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // Удаление карточки
  _handleCardDelete() {
    this._element.remove();
  }

  // Лайк на карточку
  _handleLikeToggle(event) {
    event.target.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    // Обработчик события удаления
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleCardDelete();
    });
    // Обработчик события like
    this._element.querySelector('.element__like').addEventListener('click', event => {
      this._handleLikeToggle(event);
    });
    // Обработчик события клика по самой карточки
    this._element.querySelector('.element__mask').addEventListener('click', () => {
      this._openImagePopup(this._link, this._name);
    });
  }

  createCard() {
    this._element = this._getTemplate(); //Получили темплейт-элемент
    this._element.querySelector('.element__mask').src = this._link;
    this._element.querySelector('.element__mask').alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;
    this._setEventListeners(); //Установили сразу все слушатели на карточку

    return this._element;
  }
}

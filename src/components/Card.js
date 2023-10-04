export default class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._mask.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  createCard() {
    this._element = this._getTemplate(); //Получили темплейт-элемент
    this._mask = this._element.querySelector('.element__mask');
    this._mask.src = this._link;
    this._mask.alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;
    this._setEventListeners(); //Установили сразу все слушатели на карточку

    return this._element;
  }
}

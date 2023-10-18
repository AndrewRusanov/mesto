export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    templateSelector,
    handleCardClick,
    onOpenDeleteCard,
    userId,
    handleLike
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = _id;
    this._isUserId = owner._id === userId;
    this._isLiked = likes.some(like => userId === like._id);
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._onOpenDeleteCard = onOpenDeleteCard;
    this._handleLike = handleLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // Получаем информацию о состоянии лайка на карточке и Id карточки
  getCardInfo() {
    return { cardId: this._cardId, isLiked: this._isLiked };
  }

  // Обновляем лайк на карточке (ставим или убираем)
  updateLike(data) {
    return this._isLiked ? this._removeLike(data) : this._addLike(data);
  }

  // Убираем лайк
  _removeLike(data) {
    this._element.querySelector('.element__like').classList.remove('element__like_active');
    this._element.querySelector('.element__like-count').textContent = data.likes.length;
    this._isLiked = false;
  }

  // Ставим лайк
  _addLike(data) {
    this._element.querySelector('.element__like').classList.add('element__like_active');
    this._element.querySelector('.element__like-count').textContent = data.likes.length;
    this._isLiked = true;
  }

  // Удаление карточки
  _handleCardDelete() {
    this._onOpenDeleteCard({ cardId: this._cardId, card: this._element });
  }

  _setEventListeners() {
    // Обработчик события удаления
    if (this._isUserId) {
      this._element.querySelector('.element__delete').addEventListener('click', () => {
        this._handleCardDelete();
      });
    } else {
      this._deleteButton.remove();
    }

    // Обработчик лайка
    this._element
      .querySelector('.element__like')
      .addEventListener('click', () => this._handleLike(this));

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
    this._deleteButton = this._element.querySelector('.element__delete');
    this._element.querySelector('.element__like-count').textContent = this._likes.length;

    if (this._isLiked) {
      this._element.querySelector('.element__like').classList.add('element__like_active');
    }

    this._setEventListeners(); //Установили сразу все слушатели на карточку

    return this._element;
  }
}

export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this._token = headers['authorization'];
    this.headers = headers;
  }

  // Загрузка информации о пользователе с сервера
  getUserInformation() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(err => console.log(err));
  }

  // Загрузак карточек с сервера
  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(err => console.log(err));
  }

  // Редактирование профиля
  editUserInformation({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, about })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(err => console.log(err));
  }

  // Добавление новой карточки
  addNewCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(err => console.log(err));
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(err => console.log(err));
  }

  // Постановка лайка
  _addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(err => console.log(err));
  }

  // Удаление лайка
  _deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(err => console.log(err));
  }

  //Метод выбора поставить лайк или снять
  likeCard({ cardId, isLiked }) {
    return isLiked ? this._deleteLike(cardId) : this._addLike(cardId);
  }
}

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
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
}

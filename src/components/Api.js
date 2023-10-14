class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  // Загрузка информации о пользователе с сервера
  getUserInformation() {
    return fetch('https://nomoreparties.co/v1/cohort-77/users/me', this.headers)
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

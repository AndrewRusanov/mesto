//класс UserInfo отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._userName = document.querySelector(profileNameSelector);
    this._userInfo = document.querySelector(profileDescriptionSelector);
  }

  //   публичный метод, который возвращает объект с данными пользователями
  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    };
  }

  //   публичный метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, info }) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }
}

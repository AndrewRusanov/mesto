class UserInfo {
  constructor({ nameProfileSelector, descriptionProfileSelector }) {
    this._nameProfile = document.querySelector(nameProfileSelector);
    this._descriptionProfile = document.querySelector(descriptionProfileSelector);
  }

  //   публичный метод, который возвращает объект с данными пользователя (для подтягивания данных из профиля в попап)
  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      description: this._descriptionProfile.textContent
    };
  }

  //   публичный метод, который принимает новые данные пользователя и добавляет их на страницу (для подтягивания данных из попапа в профиль)
  setUserInfo({ name, description }) {
    this._nameProfile.textContent = name;
    this._descriptionProfile.textContent = description;
  }
}

export default UserInfo;

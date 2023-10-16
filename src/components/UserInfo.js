class UserInfo {
  constructor({ nameProfileSelector, descriptionProfileSelector, avatarProfileSelector }) {
    this._nameProfile = document.querySelector(nameProfileSelector);
    this._descriptionProfile = document.querySelector(descriptionProfileSelector);
    this._avatarProfile = document.querySelector(avatarProfileSelector);
  }

  //   публичный метод, который возвращает объект с данными пользователя (для подтягивания данных из профиля в попап)
  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      description: this._descriptionProfile.textContent
    };
  }

  //   публичный метод, который принимает новые данные пользователя и добавляет их на страницу (для подтягивания данных из попапа в профиль)
  setUserInfo({ name, about, avatar }) {
    this._nameProfile.textContent = name;
    this._descriptionProfile.textContent = about;
    this._avatarProfile.src = avatar;
  }
}

export default UserInfo;

class Section {
  constructor({ renderer }, sectionSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(sectionSelector);
  }

  //   публичный метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(item) {
    const newElement = this._renderer(item);
    this._container.append(newElement);
  }

  // публичный метод, который добавляет новую карточку в контейнер
  addItemPrepend(item) {
    const newElement = this._renderer(item);
    this._container.prepend(newElement);
  }

  renderItems(cards) {
    cards.forEach(item => {
      this.addItem(item);
    });
  }
}

export default Section;

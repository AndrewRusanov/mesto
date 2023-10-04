class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._initialArray = items;
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

  renderItems() {
    this._initialArray.forEach(item => {
      this.addItem(item);
    });
  }
}

export default Section;

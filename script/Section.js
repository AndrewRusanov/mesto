//Класс Section отвечает за отрисовку элементов на странице
export default class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(sectionSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this.addItem(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

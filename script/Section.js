export default class Section {
  constructor({ data, renderer }, sectionSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(sectionSelector);
  }

  renderItems() {
    this._initialArray.forEach(item => {
      this.addItem(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

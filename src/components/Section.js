export class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._renderedItems.forEach(element => {
      this._renderer(element)
    });
  }

  addItem(item) {
    this._container.prepend(item)
  }
}
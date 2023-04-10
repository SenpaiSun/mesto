export class Section {
  constructor({items, renderer}, containerFind) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerFind;
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
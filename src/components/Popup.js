export class Popup {
  constructor(popupFind) {
    this._popup = popupFind;
    this._closeButton = this._popup.querySelector('.popup__close')
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.toggle('popup__opened');
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup__opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}
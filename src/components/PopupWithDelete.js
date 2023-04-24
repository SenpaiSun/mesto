import {Popup} from './Popup.js'

export class PopupWithDelete extends Popup {
  constructor(popupFind) {
    super(popupFind);
    this._form = this._popup.querySelector('.popup__form');
  }

  submitCallback(deleting) {
    this._handleSubmit = deleting;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
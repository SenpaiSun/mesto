import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage =  this._popup.querySelector('.popup__full-image');
    this._popupText = this._popup.querySelector('.popup__text');
  };
  open(name, link) {
    this._popupImage.src = link
    this._popupImage.alt = name
    this._popupText.textContent = name
    super.open()
  }
}
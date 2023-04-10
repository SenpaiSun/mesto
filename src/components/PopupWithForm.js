import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
  constructor({ popupFind, submitHandler }) {
    super(popupFind);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._inputContent = {};
    this._inputList.forEach((item) => {
      this._inputContent[item.name] = item.value;
    });
    return  this._inputContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
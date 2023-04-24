import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
  constructor({ popupFind, submitHandler }) {
    super(popupFind);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._buttonSubmit = this._form.querySelector('.popup__save');
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  checkLoading(load) {
    if(load) {
      this._buttonSubmit.textContent = 'Сохранение...'
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText
    }
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
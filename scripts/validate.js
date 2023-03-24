export const configs = {
  buttonClass: 'popup__save-inactive',
  errorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error-active',
  inputForm: '.form__input',
  buttonForm: '.popup__save',
  formItem: '.form'
}

export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputForm));
    this._buttonElement = this._formElement.querySelector(this._config.buttonForm);
  }

  _showError(formElement, inputElement, errorMessage, config) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
      inputElement.classList.add(config.errorClass)
      errorElement.textContent = errorMessage
      errorElement.classList.add(config.errorClassActive)
  }

// Функция, которая удаляет все ошибки валидации
  removeValidation(formInput, formSpan) {
    formInput.forEach((item) => {
      item.classList.remove('popup__input_type_error')
    })
    formSpan.forEach((item) => {
      item.classList.remove('popup__input-error-active')
      item.textContent = ''
    })
  }

  // Создаем условие по которому будет блокироваться/разблокироваться button
  _toggleButtonState(inputList, buttonElement, config) {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(config.buttonClass)
      this._buttonElement.setAttribute('disabled', 'disabled')
    } else {
      this._buttonElement.classList.remove(config.buttonClass)
      this._buttonElement.removeAttribute('disabled')
    }
  }

// Проверяем input на валидацию
  _isValid(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      this._showError(this._formElement, inputElement, inputElement.validationMessage, this._config)
    } else {
      this._hideError(this._formElement, inputElement, this._config)
    }
  }

// Проверяем все input на соответствие валидации
  _hasInvalidInput(inputList) {
  return this._inputList.some((inputElement) => {
  return !inputElement.validity.valid
  })
}

// Скрываем сообщение об ошибке
  _hideError(formElement, inputElement, config) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(this._config.errorClass)
  errorElement.classList.remove(this._config.errorClassActive)
  errorElement.textContent = ''
}

// Навешивам обработчик на все input, вызываем функцию блокирования кнопки при открытии попапа
_setEventListeners(formElement, config) {
  this._toggleButtonState(this._inputList, this._buttonElement, this._config)
  this._formElement.addEventListener('reset', () => {
    setTimeout(() => {
      this._toggleButtonState(this._inputList, this._buttonElement, this._config)
    }, 0)
  })
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(this._formElement, inputElement, this._config)
      this._toggleButtonState(this._inputList, this._buttonElement, this._config)
    })
  })
}

// Передаем в каждую форму функцию, с помощью которой будет навешан обработчик
enableValidation(config, formElement) {
  const formList = Array.from(document.querySelectorAll(this._config.formItem))
  formList.forEach((formElement) => {
    this._setEventListeners(formElement, this._config)
    })
}

}


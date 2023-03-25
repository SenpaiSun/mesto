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
  removeValidation(formInput, formSpan, config) {
    formInput.forEach((item) => {
      item.classList.remove(this._config.errorClass)
    })
    formSpan.forEach((item) => {
      item.classList.remove(this._config.errorClassActive)
      item.textContent = ''
    })
  }

  // Создаем условие по которому будет блокироваться/разблокироваться button
  _toggleButtonState(inputList, buttonElement, config) {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._config.buttonClass)
      this._buttonElement.setAttribute('disabled', 'disabled')
    } else {
      this._buttonElement.classList.remove(this._config.buttonClass)
      this._buttonElement.removeAttribute('disabled')
    }
  }

// Проверяем input на валидацию
  _isValid(inputElement) {
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
  this._toggleButtonState()
  this._formElement.addEventListener('reset', () => {
    setTimeout(() => {
      this._toggleButtonState()
    }, 0)
  })
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement)
      this._toggleButtonState()
    })
  })
}

// Передаем в каждую форму функцию, с помощью которой будет навешан обработчик
enableValidation(config, formElement) {
  this._setEventListeners();
}
}


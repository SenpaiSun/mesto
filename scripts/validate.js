const configs = {
  buttonClass: 'popup__save-inactive',
  errorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error-active',
  inputForm: '.form__input',
  buttonForm: '.popup__save',
  formItem: '.form'
}

// Функция, которая удаляет все ошибки валидации
const removeValidation = (formInput, formSpan) => {
  formInput.forEach((item) => {
    item.classList.remove('popup__input_type_error')
  })
  formSpan.forEach((item) => {
    item.classList.remove('popup__input-error-active')
    item.textContent = ''
  })
}

// Проверяем input на валидацию
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, config)
  } else {
    hideError(formElement, inputElement, config)
  }
}

// Проверяем все input на соответствие валидации
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

// Создаем условие по которому будет блокироваться/разблокироваться button
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.buttonClass)
    buttonElement.setAttribute('disabled', 'disabled')
  } else {
    buttonElement.classList.remove(config.buttonClass)
    buttonElement.removeAttribute('disabled')
  }
}

// Показываем сообщение об ошибке путем добавления классов и сообщения об ошибке
const showError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(config.errorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(config.errorClassActive)
}

// Скрываем сообщение об ошибке
const hideError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(config.errorClass)
  errorElement.classList.remove(config.errorClassActive)
  errorElement.textContent = ''
}

// Навешивам обработчик на все input, вызываем функцию блокирования кнопки при открытии попапа
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputForm))
  const buttonElement = formElement.querySelector(config.buttonForm)
  toggleButtonState(inputList, buttonElement, config)
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, config)
    }, 0)
  })
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config)
      toggleButtonState(inputList, buttonElement, config)
    })
  })
}

// Передаем в каждую форму функцию, с помощью которой будет навешан обработчик
function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formItem))
  formList.forEach((formElement) => {
    setEventListeners(formElement, config)
    })
}

// Вызываем функцию
enableValidation(configs)
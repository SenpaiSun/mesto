const config = {
  buttonClass: 'popup__save-inactive',
  errorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error-active',
  inputForm: '.form__input',
  buttonForm: '.popup__save',
  formItem: '.form'
}

// Проверяем input на валидацию
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideError(formElement, inputElement)
  }
}

// Проверяем все input на соответствие валидации
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

// Создаем условие по которому будет блокироваться/разблокироваться button
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.buttonClass)
    buttonElement.setAttribute('disabled', 'disabled')
  } else {
    buttonElement.classList.remove(config.buttonClass)
    buttonElement.removeAttribute('disabled')
  }
}

// Показываем сообщение об ошибке путем добавления классов и сообщения об ошибке
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(config.errorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(config.errorClassActive)
}

// Скрываем сообщение об ошибке
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(config.errorClass)
  errorElement.classList.remove(config.errorClassActive)
  errorElement.textContent = ''
}

// Навешивам обработчик на все input, вызываем функцию блокирования кнопки при открытии попапа
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputForm))
  const buttonElement = formElement.querySelector(config.buttonForm)
  toggleButtonState(inputList, buttonElement)
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement)
    }, 0)
  })
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement)
    })
  })
}

// Передаем в каждую форму функцию, с помощью которой будет навешан обработчик
function enableValidation () {
  const formList = Array.from(document.querySelectorAll(config.formItem))
  formList.forEach((formElement) => {
    setEventListeners(formElement)
    })
}

// Вызываем функцию
enableValidation(config)
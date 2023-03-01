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
    buttonElement.classList.add('popup__save-inactive')
    buttonElement.setAttribute('disabled', 'disabled')
  } else {
    buttonElement.classList.remove('popup__save-inactive')
    buttonElement.removeAttribute('disabled')
  }
}

// Показываем сообщение об ошибке путем добавления классов и сообщения об ошибке
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.classList.add('popup__input_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('popup__input-error-active')
}

// Скрываем сообщение об ошибке
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.classList.remove('popup__input_type_error')
  errorElement.classList.remove('popup__input-error-active')
  errorElement.textContent = ''
}

// Навешивам обработчик на все input, вызываем функцию блокирования кнопки при открытии попапа
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'))
  const buttonElement = formElement.querySelector('.popup__save')
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
  const formList = Array.from(document.querySelectorAll('.form'))
  formList.forEach((formElement) => {
    setEventListeners(formElement)
    })
}

// Вызываем функцию
enableValidation()
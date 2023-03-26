import {Card} from './Card.js'
import {cardDefault} from './cards.js'
import {FormValidator} from './FormValidate.js'

const buttonProfile = document.querySelector('.profile__info-edit');
const buttonCloseProfile = document.querySelector('.popup__close-profile');
const popupProfile = document.querySelector('.popup_edit_profile');
const userName = document.querySelector('.profile__info-username');
const userNote = document.querySelector('.profile__info-note');
const nameInput = document.querySelector('.popup__name');
const noteInput = document.querySelector('.popup__note');
const cardTemplate = document.querySelector('.card-temlate').content;
const sectionContent = document.querySelector('.content');
const popupAddCard = document.querySelector('.popup_add_card');
const popupAddCardName = popupAddCard.querySelector('.popup__name');
const popupAddCardLink = popupAddCard.querySelector('.popup__note');
const buttonAddCard = document.querySelector('.profile__added');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__close')
const popupImage = document.querySelector('.popup_open_image')
const popupImageText = document.querySelector('.popup__text');
const popupImageOpened = document.querySelector('.popup__full-image');
const formProfile = document.querySelector('#form-profile');
const formCard = document.querySelector('#form-card');
const errorInputCard = formCard.querySelectorAll('.form__input');
const errorSpanCard = formCard.querySelectorAll('.popup__input-error');
const errorInputProfile = formProfile.querySelectorAll('.form__input');
const errorSpanProfile = formProfile.querySelectorAll('.popup__input-error');
const popupFormProfile = popupProfile.querySelector('.popup__form')
const popupFormCard = popupAddCard.querySelector('.popup__form')
const buttonCloseList = document.querySelectorAll('.popup__close')

  const config = {
  buttonClass: 'popup__save-inactive',
  errorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error-active',
  inputForm: '.form__input',
  buttonForm: '.popup__save',
  formItem: '.form'
}

// Функция, которая ищет popup по селектору и вызывает функцию закрытия popup
const closeEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup__opened')
    closePopup(openPopup)
  }
}

// Функция на открытие попапа и закрытия при нажатии на Esc
function openPopup(popup) {
  popup.classList.toggle('popup__opened');
  document.addEventListener('keydown', closeEscapeKey)
}

// Функция на закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup__opened');
  document.removeEventListener('keydown', closeEscapeKey)
}

// Функция открытия попапа
function pasteInputValue () {
  openPopup(popupProfile)
  nameInput.value = userName.textContent;
  noteInput.value = userNote.textContent;
  formValidationProfile.removeValidation(errorInputProfile, errorSpanProfile)
}

// Обработчик на кнопку открытия попапа редактирования профиля
buttonProfile.addEventListener('click', pasteInputValue);

// Обработчик на кнопку сохранения профиля
popupProfile.addEventListener('submit', function eventSave (event) {
  event.preventDefault()
  userName.textContent = nameInput.value;
  userNote.textContent = noteInput.value;
  openPopup(popupProfile)
})

function handleOpenCard(name, link) {
  popupImageOpened.src = link;
  popupImageOpened.alt = name;
  popupImageText.textContent = name;
  openPopup(popupImage);
}


function createCard(name, link) {
  const cardElement = new Card(name, link, '.card-temlate', handleOpenCard).renderCard();
  return cardElement
}

// Вставляем карточку в верстку
const renderCard = (name, link) => {
  const cardElement = createCard(name, link);
  sectionContent.prepend(cardElement);
}

// Создаем дефолтные карточки
cardDefault.forEach(card => renderCard(card.name, card.link))

// Обработчик на кнопку добавления нового места
buttonAddCard.addEventListener('click', function() {
  openPopup(popupAddCard)
  formCard.reset()
  formValidationCard.removeValidation(errorInputCard, errorSpanCard)
})

// Обработчик на отправку формы и добавления карточки в ленту + очистка формы после отправки
popupAddCard.addEventListener('submit', (event) => {
  event.preventDefault()
  const cardName = popupAddCardName.value
  const cardLink = popupAddCardLink.value
  renderCard(cardName, cardLink)
  closePopup(popupAddCard)
});

buttonCloseList.forEach(item => {
  const popupClose = item.closest('.popup');
  popupClose.addEventListener('mousedown', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popupClose)
    }
  });
  item.addEventListener('click', () => closePopup(popupClose));
})

const formValidationProfile = new FormValidator(config, popupFormProfile)
formValidationProfile.enableValidation()

const formValidationCard = new FormValidator(config, popupFormCard)
formValidationCard.enableValidation()

export {cardTemplate, popupImageText, popupImageOpened, openPopup, popupImage, handleOpenCard}
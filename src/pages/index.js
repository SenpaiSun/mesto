import './index.css'
import {Card} from '../components/Card.js'
import {cardDefault} from '../components/cards.js'
import {FormValidator} from '../components/FormValidate.js'
import {Section} from '../components/Section.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {UserInfo} from '../components/UserInfo.js'

const buttonProfile = document.querySelector('.profile__info-edit');
const popupProfile = document.querySelector('.popup_edit_profile');
const userName = document.querySelector('.profile__info-username');
const userNote = document.querySelector('.profile__info-note');
const nameInput = document.querySelector('.popup__name');
const noteInput = document.querySelector('.popup__note');
const cardTemplate = document.querySelector('.card-temlate').content;
const sectionContent = document.querySelector('.content');
const popupAddCard = document.querySelector('.popup_add_card');
const buttonAddCard = document.querySelector('.profile__added');
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

const config = {
  buttonClass: 'popup__save-inactive',
  errorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error-active',
  inputForm: '.form__input',
  buttonForm: '.popup__save',
  formItem: '.form'
}

// Вызов метода открытия изображения
const imageOpenPopup = new PopupWithImage(popupImage)
imageOpenPopup.setEventListeners();

// Класс валидации попапа профиля
const formValidationProfile = new FormValidator(config, popupFormProfile)
formValidationProfile.enableValidation()

// Класс валидации попапа добавления нового места
const formValidationCard = new FormValidator(config, popupFormCard)
formValidationCard.enableValidation()

// Функция создания новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleOpenCard: (name, link) => {
      imageOpenPopup.open(name, link)
  }}, '.card-temlate')
    const cardItem = card.renderCard()
    return cardItem
}

// Класс, отвечающий за информацию о пользователе
const userInfo = new UserInfo({
  nameValue: userName,
  noteValue: userNote})

// Попап редактирования профиля + листенер
const popupInfoEdit = new PopupWithForm({
  popupFind: popupProfile,
  submitHandler: (item) => {
    userInfo.setUserInfo({
      nameValue: item.nameValue,
      noteValue: item.noteValue
    })
    popupInfoEdit.close()
    }
  })

// Вызов метода редактирования профиля
popupInfoEdit.setEventListeners()

// Функция замены информации о юзере
function pasteInfo({ nameValue, noteValue }) {
  nameInput.value = nameValue;
  noteInput.value = noteValue;
};

// Обработчик на изменение информации о юзере
buttonProfile.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  pasteInfo({
    nameValue: profileInfo.nameValue,
    noteValue: profileInfo.noteValue
  });
  formValidationProfile.removeValidation(errorInputProfile, errorSpanProfile)
  popupInfoEdit.open();
});

// Класс на добавление новой карточки
const cardAddPage = new PopupWithForm({
  popupFind: popupAddCard,
  submitHandler: (item) => {
    cardList.addItem(createCard(item));
    cardAddPage.close();
  }
});

// Вызов метода PopupWithForm с добавлением слушателя
cardAddPage.setEventListeners();

// Обработчик на надатие кнопки добавления нового места
buttonAddCard.addEventListener('click', () => {
  formValidationCard.toggleButtonState();
  formValidationCard.removeValidation(errorInputCard, errorSpanCard)
  cardAddPage.open();
})

// Класс добавления дефольных карточек
const cardList = new Section({
  items: cardDefault,
  renderer: item => {
  cardList.addItem(createCard(item))
}}, sectionContent)

// Вызов метода для рендера дефолтных карточек
cardList.renderItems();
export {cardTemplate, popupImageText, popupImageOpened, popupImage}
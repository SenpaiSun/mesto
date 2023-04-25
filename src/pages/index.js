import './index.css'
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidate.js'
import {Section} from '../components/Section.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {UserInfo} from '../components/UserInfo.js'
import {PopupConfirmation} from '../components/PopupConfirmation.js'
import {Api} from '../components/Api.js'

// Константы
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
const popupDeleteCard = document.querySelector('.popup_delete_card')
const acceptDelete = document.querySelector('.popup__accept-delete')
const buttonChangeAvatar = document.querySelector('.profile__button')
const formChangeAvatar = document.querySelector('.popup_update_avatar')
const avatarUser = document.querySelector('.profile__photo')
const config = {
  buttonClass: 'popup__save-inactive',
  errorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error-active',
  inputForm: '.form__input',
  buttonForm: '.popup__save',
  formItem: '.form'
}

// <--------------- API -------------->
const api = new Api({baseUrl: 'https://nomoreparties.co/v1/cohort-64', headers: {
  authorization: 'd81e98fe-040e-4544-8267-6245eceaf2db',
  "Content-Type": "application/json"
}})

const cardList = new Section({
  renderer: item => {
  cardList.addItem(createCard(item))
}}, sectionContent)

// Записываем айди нашего пользователя
let userId

Promise.all([api.getDefaultCards(), api.getUserInfo()])
.then(([defaultCards, userDataInfo]) => {
  userInfo.setUserInfo(userDataInfo);
  userId = userDataInfo._id;
  cardList.renderItems(defaultCards.reverse())
  userInfo.setUserInfo({ nameValue: userDataInfo.name, noteValue: userDataInfo.about, avatarInfo: userDataInfo.avatar })
})
.catch((error) => {
  error.status;
});

// <--------------- Профиль -------------->
// Класс, отвечающий за информацию о пользователе
const userInfo = new UserInfo({
  nameValue: userName,
  noteValue: userNote,
  avatarInfo: avatarUser
})

// Функция замены информации о юзере
function pasteInfo({ nameValue, noteValue }) {
  nameInput.value = nameValue;
  noteInput.value = noteValue;
};

// Класс валидации попапа профиля
const formValidationProfile = new FormValidator(config, popupFormProfile)
formValidationProfile.enableValidation()

// Получение данных с сервера и установка name и about в верстку
/* api.getUserInfo()
.then((res) => {
  const userName = res.name
  const userAbout = res.about
  avatarUser.src = res.avatar
  userId = res._id
  userInfo.setUserInfo({nameValue: userName, noteValue: userAbout})
})
.catch(error => error.status) */

// Попап редактирования профиля + листенер
const popupInfoEdit = new PopupWithForm({
  popupFind: popupProfile,
  submitHandler: (data) => {
    popupInfoEdit.checkLoading(true)
    api.updateUserProfile(data)
    .then((data) => {
      const userName = data.name
      const userAbout = data.about
      const userAvatar = data.avatar
      userInfo.setUserInfo({nameValue: userName, noteValue: userAbout, avatarInfo: userAvatar})
      popupInfoEdit.close();
    })
    .catch((error) => {
      error.status
    })
    .finally(() => {
      popupInfoEdit.checkLoading(false)
    })
  }
})

// Вызов метода редактирования профиля
popupInfoEdit.setEventListeners()

// Обработчик на открытие попапа
buttonProfile.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  pasteInfo({
    nameValue: profileInfo.nameValue,
    noteValue: profileInfo.noteValue
  });
  formValidationProfile.removeValidation(errorInputProfile, errorSpanProfile)
  popupInfoEdit.open();
});

// Создание класса смены аватара
const popupChangeAvatar = new PopupWithForm({
  popupFind: formChangeAvatar,
  submitHandler: (data) => {
    popupChangeAvatar.checkLoading(true)
    api.changeAvatar(data)
    .then((res) => {
      avatarUser.src = res.avatar
      popupChangeAvatar.close()
    })
    .catch((error) => {
      error.status
    })
    .finally(() => {
      popupChangeAvatar.checkLoading(false)
    })
  }
})

popupChangeAvatar.setEventListeners()

//Обработчик кнопки обновления аватара
buttonChangeAvatar.addEventListener('click', () => {
  formValidationAvatar.toggleButtonState();
  popupChangeAvatar.open()
})

// <--------------- Секция с карточками -------------->
// создание экземпляра класса попапа подтверждения
const confirmDeleteCard = new PopupConfirmation(popupDeleteCard);
confirmDeleteCard.setEventListeners()

// Функция создания новой карточки
const createCard = (data) => {
  console.log(data);
  const card = new Card({
    cardId: data._id,
    userIdProfile: userId,
    data: data,
    handleOpenCard: (name, link) => {
      imageOpenPopup.open(name, link)
  },
  handleButtonDelete: () => {
    confirmDeleteCard.open()
  },
  handleCardDeleteItem: (cardId) => {
    confirmDeleteCard.open()
    confirmDeleteCard.submitCallback(() => {
      api.deleteCard(cardId)
      .then(() => {
        confirmDeleteCard.close()
        card.handleCardDelete()
      })
      .catch((error) => {
        error.status
      })
    })
  },
  handleLike: (cardId) => {
    api.likeCard(cardId)
      .then((data) => {
        card.handleLikeCard(data);
      })
      .catch((error) => {
        error.status;
      });
  },
  handleDeleteLike: (cardId) => {
    api.likeDelete(cardId)
      .then((data) => {
        card.handleLikeCard(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}, '.card-temlate', acceptDelete)
    const cardItem = card.renderCard()
    return cardItem
}

// Класс на добавление новой карточки
const cardAddPage = new PopupWithForm({
  popupFind: popupAddCard,
  submitHandler: (data) => {
    cardAddPage.checkLoading(true)
    api.createNewCard(data)
    .then((data) => {
      cardList.addItem(createCard(data))
      cardAddPage.close();
    })
    .catch(error => error.status)
    .finally(() => {
      cardAddPage.checkLoading(false)
    })
  }
});


// Обработчик на надатие кнопки добавления нового места
buttonAddCard.addEventListener('click', () => {
  formValidationCard.toggleButtonState();
  formValidationCard.removeValidation(errorInputCard, errorSpanCard)
  cardAddPage.open();
})

// Вызов метода открытия изображения
const imageOpenPopup = new PopupWithImage(popupImage)
imageOpenPopup.setEventListeners();

// Класс валидации попапа добавления нового места
const formValidationCard = new FormValidator(config, popupFormCard)
formValidationCard.enableValidation()

// Класс валидации попапа обновления аватара
const formValidationAvatar = new FormValidator(config, formChangeAvatar)
formValidationAvatar.enableValidation()

// Вызов метода PopupWithForm с добавлением слушателя
cardAddPage.setEventListeners();

export {cardTemplate, popupImageText, popupImageOpened, popupImage}
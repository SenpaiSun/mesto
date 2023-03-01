const buttonProfile = document.querySelector('.profile__info-edit');
const buttonCloseProfile = document.querySelector('.popup__close-profile');
const popupProfile = document.querySelector('.popup_edit_profile');
const userName = document.querySelector('.profile__info-username');
const userNote = document.querySelector('.profile__info-note');
const nameInput = document.querySelector('.popup__name');
const noteInput = document.querySelector('.popup__note');
const cardTemplate = document.querySelector('.card-temlate').content;
const cardTemplateElement = cardTemplate.querySelector('.content__card');
const sectionContent = document.querySelector('.content');
const popupAddCard = document.querySelector('.popup_add_card');
const popupAddCardName = popupAddCard.querySelector('.popup__name');
const popupAddCardLink = popupAddCard.querySelector('.popup__note');
const buttonAddCard = document.querySelector('.profile__added');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__close')
const popupImage = document.querySelector('.popup_open_image')
const popupImageText = document.querySelector('.popup__text');
const popupImageOpened = document.querySelector('.popup__full-image');

// Стартовый массив данных карточек
const cardDefault = [
  {
    name: 'Долина Смерти',
    link: 'https://sarah.lidbom.com/wp-content/uploads/2018/05/IMG_8950.jpg'
  },
  {
    name: 'Эрмитаж',
    link: 'https://machinami.biz/wp-content/uploads/2016/01/P8060080.jpg'
  },
  {
    name: 'Великая Китайская стена',
    link: 'https://i.pinimg.com/736x/16/f3/d2/16f3d298fb82f801938aa5c87537313f.jpg'
  },
  {
    name: 'Сеульский лес',
    link: 'https://images.unsplash.com/photo-1629137441025-c4b23def8bdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2VvdWwlMjBwbGF6YXxlbnwwfHwwfHw%3D&w=1000&q=80'
  },
  {
    name: 'Банф',
    link: 'https://img2.goodfon.ru/original/768x1024/0/14/kanada-moraine-lake-banff.jpg'
  },
  {
    name: 'Тодай-дзи',
    link: 'https://i.redd.it/kgf9301mu5k01.jpg'
  }
];

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
  popup.classList.toggle('popup__opened');
  document.removeEventListener('keydown', closeEscapeKey)
}

// Функция открытия попапа
function pasteInputValue () {
  openPopup(popupProfile)
  nameInput.value = userName.textContent;
  noteInput.value = userNote.textContent;
}

// Обработчик на кнопку открытия попапа редактирования профиля
buttonProfile.addEventListener('click', pasteInputValue);

// Обработчик на кнопку закрытия попапа редактирования профиля
buttonCloseProfile.addEventListener('click', function () {
  closePopup(popupProfile)
});

// Обработчик на кнопку сохранения профиля
popupProfile.addEventListener('submit', function eventSave (event) {
  event.preventDefault()
  userName.textContent = nameInput.value;
  userNote.textContent = noteInput.value;
  openPopup(popupProfile)
})

// Создаем функцию кнопки delete
const deleteCard = (evt) => {
  evt.target.closest('.content__card').remove()
}

// Активация-дезактивация у попапа открытия изображения
const openPopupImage = () => {
  openPopup(popupImage)
}

// Создаем функцию активации/деактивации кнопки like
const handleLikeClick = (evt) => {
  evt.target.classList.toggle('content__card-like-active')
}

// Клонируем template, наполняем информацией
const createCard = (data) => {
  // Клонируем template
  const cardCopyTemplate = cardTemplate.cloneNode(true);
  const cardImage = cardCopyTemplate.querySelector('.content__card-photo');
  const cardTitle = cardCopyTemplate.querySelector('.content__card-name');
  // Заполняем клонированный template информацией
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  // Навешиваем обработчик на клик по кнопке лайк, удаления и открытие карточки
  cardCopyTemplate.querySelector('.content__card-like').addEventListener('click', handleLikeClick)
  cardCopyTemplate.querySelector('.content__card-delete').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => {
    popupImageText.textContent = data.name;
    popupImageOpened.src = data.link;
    popupImageOpened.alt = data.name;
    openPopup(popupImage)
  })
  return cardCopyTemplate
}

// Вставляем карточку в верстку
const renderCard = (data) => {
  const cardElement = createCard(data);
  sectionContent.prepend(cardElement);
}

// Мапим дефолтные карточки
cardDefault.map(card => renderCard(card))

// Обработчик на кнопку добавления нового места
buttonAddCard.addEventListener('click', function() {
  openPopup(popupAddCard)
})

// Обработчик на кнопку закрытия попапа добавления нового места
buttonCloseAddCard.addEventListener('click', function() {
  closePopup(popupAddCard)
})

// Вешаем обработчик на закрытие изображения во весь экран
document.querySelector('.popup__close-image').addEventListener('click', openPopupImage)

// Обработчик на отправку формы и добавления карточки в ленту + очистка формы после отправки
popupAddCard.addEventListener('submit', (event) => {
  event.preventDefault()
  const cardName = popupAddCardName.value
  const cardLink = popupAddCardLink.value
  renderCard({ name: cardName, link: cardLink })
  closePopup(popupAddCard)
  event.target.reset()
});

// Обработчики закрытия попапа на оверлей
popupProfile.addEventListener('mousedown', (evt) => {
  if (evt.currentTarget === evt.target && evt.currentTarget.classList.contains('popup__opened')) {
    closePopup(popupProfile)
  }
})

popupAddCard.addEventListener('mousedown', (evt) => {
  if (evt.currentTarget === evt.target && evt.currentTarget.classList.contains('popup__opened')) {
    closePopup(popupAddCard)
  }
})

popupImage.addEventListener('mousedown', (evt) => {
  if (evt.currentTarget === evt.target && evt.currentTarget.classList.contains('popup__opened')) {
    closePopup(popupImage)
  }
})
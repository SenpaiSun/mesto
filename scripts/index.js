const buttonProfile = document.querySelector('.profile__info-edit');
const buttonCloseProfile = document.querySelector('.popup__close');
const popupProfile = document.querySelector('.popup');
const userName = document.querySelector('.profile__info-username');
const userNote = document.querySelector('.profile__info-note');
const nameInput = document.querySelector('.popup__name');
const noteInput = document.querySelector('.popup__note');
const buttonSaveProfile = document.querySelector('.popup__save');
const cardTemplate = document.querySelector('.cardTemlate').content;
const sectionContent = document.querySelector('.content');
const popupAddCard = document.querySelector('.popup_add_card');
const addCardButton = document.querySelector('.profile__added');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__close')

// Стартовый массив данных карточек
const saveCard = [
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

// Функция на открытие попапа
function openPopup(item) {
  document.querySelector('.popup').setAttribute('style', 'transition: visibility 0.3s, opacity 0.4s linear;');
  item.classList.remove('popup');
  item.classList.add('popup__close-active');
}

// Функция на закрытие попапа
function closePopup(item) {
  document.querySelector('.popup').setAttribute('style', 'transition: visibility 0.3s, opacity 0.4s linear;')
  document.querySelector('.popup_add_card').setAttribute('style', 'transition: visibility 0.3s, opacity 0.4s linear;')
  item.classList.remove('popup__close-active');
  item.classList.add('popup');
}

// Обработчик на кнопку открытия попапа редактирования профиля
buttonProfile.addEventListener('click', function () {
  openPopup(popupProfile)
  nameInput.value = userName.textContent;
  noteInput.value = userNote.textContent;
});

// Обработчик на кнопку закрытия попапа редактирования профиля
buttonCloseProfile.addEventListener('click', function () {
  closePopup(popupProfile)
});

// Обработчик на кнопку сохранения профиля
buttonSaveProfile.addEventListener('click', function eventSave (event) {
  event.preventDefault()
  userName.textContent = nameInput.value;
  userNote.textContent = noteInput.value;
  popupProfile.classList.remove('popup__close-active');
})

// Обработчик на нажатие клавиши 'Enter' у попапа изменения профиля
popupProfile.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
      userName.textContent = nameInput.value;
      userNote.textContent = noteInput.value;
      closePopup(popupProfile)
    }
})

// Создаем функцию активации/деактивации кнопки like
const like = (evt) => {
  evt.target.classList.toggle('content__card-like')
  evt.target.classList.toggle('content__card-like-active')
}

// Создаем функцию кнопки delete
const deleteCard = (evt) => {
  evt.target.closest('.content__card').remove()
}

// Активация-дезактивация у попапа открытия изображения
const openPopupImage = () => {
  const popupImageActive = document.querySelector('.popup_open_image-class');
  popupImageActive.classList.toggle('popup_open_image')
  popupImageActive.classList.toggle('popup_open_image-active')
}



// Функция на добавление карточек, с обработчиком функции like и delete, открытием изображение во весь экран
function renderCard(array) {
  array.map((item) => {
    // Записываем значение элемента массива в переменную
    const arrayItem = item
    // Делаем копию template элемента
    const cardTemplateCopy = cardTemplate.querySelector('.content__card').cloneNode(true);
    // Меняем данные у template на данные из элемента массива
    cardTemplateCopy.querySelector('.content__card-name').textContent = item.name;
    cardTemplateCopy.querySelector('.content__card-photo').src = item.link;
    cardTemplateCopy.querySelector('.content__card-photo').alt = item.name;
    // Добавляем карточку в template элемент
    sectionContent.prepend(cardTemplateCopy);
    // Вешаем обработчик на лайк, удаление карточки
    document.querySelector('.content__card-like').addEventListener('click', like)
    document.querySelector('.content__card-delete').addEventListener('click', deleteCard);
    // Вешаем обработчик на открытие изображения во весь экран. Добавляю transition для дальнейшего плавного закрытия элемента
    document.querySelector('.content__card-photo').addEventListener('click', () => {
      document.querySelector('.popup__text').textContent = item.name;
      document.querySelector('.popup__full-image').src = item.link;
      document.querySelector('.popup__full-image').alt = item.name;
      document.querySelector('.popup_open_image').setAttribute('style', 'transition: visibility 0.3s, opacity 0.4s linear;')
      openPopupImage()
    })
    // Вешаем обработчик на закрытие изображения во весь экран
    document.querySelector('.popup__close-image').addEventListener('click', openPopupImage)
  })
}

// Вызов функции добавления карточек
renderCard(saveCard)

// Обработчик на кнопку добавления нового места
addCardButton.addEventListener('click', function() {
  openPopup(popupAddCard)
})

// Обработчик на кнопку закрытия попапа добавления нового места
buttonCloseAddCard.addEventListener('click', function() {
  closePopup(popupAddCard)
})


// Обработчик на отправку формы и добавления карточки в ленту + очистка формы после отправки
popupAddCard.addEventListener('submit', (item) => {
  item.preventDefault()
  const cardName = popupAddCard.querySelector('.popup__name').value
  const cardLink = popupAddCard.querySelector('.popup__note').value
  const arrayItem = [{ name: cardName, link: cardLink}]
  renderCard(arrayItem)
  closePopup(popupAddCard)
  popupAddCard.querySelector('.popup__name').value = ''
  popupAddCard.querySelector('.popup__note').value = ''
})

// Обработчик на нажатие клавиши 'Enter' у попапа изменения профиля
popupAddCard.addEventListener('keydown', function (event) {
  if (event.key == 'Enter') {
    const cardName = popupAddCard.querySelector('.popup__name').value
    const cardLink = popupAddCard.querySelector('.popup__note').value
    const arrayItem = [{ name: cardName, link: cardLink}]
    renderCard(arrayItem)
    closePopup(popupAddCard)
    popupAddCard.querySelector('.popup__name').value = ''
    popupAddCard.querySelector('.popup__note').value = ''
  }
})


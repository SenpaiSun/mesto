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
const buttonCreateCard = popupAddCard.querySelector('.popup__save');

const saveCard = [
  {
    name: 'Долина Смерти',
    link: 'https://lingua-airlines.ru/wp-content/uploads/2021/01/dolina_smerti.jpg'
  },
  {
    name: 'Эрмитаж',
    link: 'https://puteshestvyie.ru/sites/default/files/sankt-peterburg-2.jpg'
  },
  {
    name: 'Великая Китайская стена',
    link: 'https://img3.akspic.ru/attachments/originals/2/9/3/4/0/104392-fortifikaciya-gora-chudesa_mira-gornaya_stanciya-nebo-3071x2047.jpg'
  },
  {
    name: 'Сеульский лес',
    link: 'https://drbenjaminhabib.files.wordpress.com/2015/06/06_sculpture-at-seoul-forest.jpg'
  },
  {
    name: 'Банф',
    link: 'https://sportishka.com/uploads/posts/2022-03/1646246609_58-sportishka-com-p-banf-kanada-turizm-krasivo-foto-64.jpg'
  },
  {
    name: 'Тодай-дзи',
    link: 'http://pm1.narvii.com/7162/cda3d5d3ed915c10a2faadb9b2291e43455cdcaer1-1200-900v2_uhq.jpg'
  }
];

// Функция на открытие попапа
function openPopap(item) {
  item.classList.remove('popup');
  item.classList.add('popup__close-active');
}

// Функция на закрытие попапа
function closePopap(item) {
  item.classList.remove('popup__close-active');
  item.classList.add('popup');
}

// Обработчик на кнопку открытия попапа редактирования профиля
buttonProfile.addEventListener('click', function () {
  openPopap(popupProfile)
  nameInput.value = userName.textContent;
  noteInput.value = userNote.textContent;
});

// Обработчик на кнопку закрытия попапа редактирования профиля
buttonCloseProfile.addEventListener('click', function () {
  closePopap(popupProfile)
});

// Обработчик на кнопку сохранения профиля
buttonSaveProfile.addEventListener('click', function eventSave (event) {
  event.preventDefault()
  userName.textContent = nameInput.value;
  userNote.textContent = noteInput.value;
  popupProfile.classList.remove('popup__close-active');
})

// Обработчик на нажатие клавиши 'Enter'
popupProfile.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
      userName.textContent = nameInput.value;
      userNote.textContent = noteInput.value;
      popupProfile.setAttribute('style', 'display: none;')
    }
})

// Создаем функцию активации/деактивации кнопки like
const like = (evt) => {
  evt.target.classList.toggle('content__card-like')
  evt.target.classList.toggle('content__card-like-active')
}

const deleteCard = (evt) => {
  evt.target.closest('.content__card').remove()
}

// Функция на добавление карточек, с обработчиком функции like и delete
function defaultCard(array) {
  array.map((item) => {
    const cardTemplateCopy = cardTemplate.querySelector('.content__card').cloneNode(true);
    cardTemplateCopy.querySelector('.content__card-name').textContent = item.name;
    cardTemplateCopy.querySelector('.content__card-photo').src = item.link;
    cardTemplateCopy.querySelector('.content__card-photo').alt = item.name;
    sectionContent.prepend(cardTemplateCopy);
    const cardPage = document.querySelector('.content__card');
    const buttonLike = cardPage.querySelector('.content__card-like');
    const buttonDeleteCard = cardPage.querySelector('.content__card-delete');
    buttonLike.addEventListener('click', like);
    buttonDeleteCard.addEventListener('click', deleteCard);
  })
}
// Вызов функции добавления карточек
defaultCard(saveCard)

// Обработчик на кнопку добавления нового места
addCardButton.addEventListener('click', function() {
  openPopap(popupAddCard)
})

// Обработчик на кнопку закрытия попапа добавления нового места
buttonCloseAddCard.addEventListener('click', function() {
  closePopap(popupAddCard)
})

// Обработчик на отправку формы и добавления карточки в ленту
popupAddCard.addEventListener('submit', (item) => {
  item.preventDefault()
  const cardName = popupAddCard.querySelector('.popup__name').value
  const cardLink = popupAddCard.querySelector('.popup__note').value
  const arrayItem = [{ name: cardName, link: cardLink}]
  defaultCard(arrayItem)
  closePopap(popupAddCard)
})






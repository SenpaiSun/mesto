const buttonProfile = document.querySelector('.profile__info-edit');
const buttonClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const userName = document.querySelector('.profile__info-username');
const userNote = document.querySelector('.profile__info-note');
const nameInput = document.querySelector('.popup__name');
const noteInput = document.querySelector('.popup__note');
const buttonSave = document.querySelector('.popup__save');
const cardTemplate = document.querySelector('#cardTemlate').content;
const sectionContent = document.querySelector('.content');

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

buttonProfile.addEventListener('click', function () {
  popup.classList.remove('popup');
  popup.classList.add('popup__close-active');
  nameInput.value = userName.textContent;
  noteInput.value = userNote.textContent;
});

buttonClose.addEventListener('click', function () {
  popup.classList.remove('popup__close-active');
  popup.classList.add('popup');
});

buttonSave.addEventListener('click', function eventSave () {
  userName.textContent = nameInput.value;
  userNote.textContent = noteInput.value;
  popup.classList.remove('popup__close-active');
})

popup.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
      userName.textContent = nameInput.value;
      userNote.textContent = noteInput.value;
      popup.setAttribute('style', 'display: none;')
    }
})

function defaultCard(array) {
  array.map((item) => {
    const cardTemplateCopy = cardTemplate.querySelector('.content__card').cloneNode(true);
    cardTemplateCopy.querySelector('.content__card-name').textContent = item.name;
    cardTemplateCopy.querySelector('.content__card-photo').src = item.link;
    cardTemplateCopy.querySelector('.content__card-photo').alt = item.name;
    sectionContent.prepend(cardTemplateCopy)
  })
}
defaultCard(saveCard)

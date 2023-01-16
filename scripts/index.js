let buttonProfile = document.querySelector('.profile__info-edit');
let buttonClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let userName = document.querySelector('.profile__info-username');
let userNote = document.querySelector('.profile__info-note');
let nameInput = document.querySelector('.popup__name');
let noteInput = document.querySelector('.popup__note');
let buttonSave = document.querySelector('.popup__save');

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
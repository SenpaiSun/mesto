let buttonProfile = document.querySelector('.profile__info_user_edit');
let buttonClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let userName = document.querySelector('.profile__info_user_name');
let userNote = document.querySelector('.profile__info_user_note');
let nameInput = document.querySelector('.popup__name');
let noteInput = document.querySelector('.popup__note');
let buttonSave = document.querySelector('.popup__save');
let likeItem = document.querySelectorAll('.content__card_mesto_like');
let content = document.querySelector('#content');

buttonProfile.addEventListener('click', function () {
  popup.setAttribute('style', 'display: block;');
  nameInput.value = userName.textContent;
  noteInput.value = userNote.textContent;
});

buttonClose.addEventListener('click', function () {
  popup.setAttribute('style', 'display: none;')
});

buttonSave.addEventListener('click', function eventSave () {
  userName.textContent = nameInput.value;
  userNote.textContent = noteInput.value;
  popup.setAttribute('style', 'display: none;')
})

popup.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
      userName.textContent = nameInput.value;
      userNote.textContent = noteInput.value;
      popup.setAttribute('style', 'display: none;')
    }
})
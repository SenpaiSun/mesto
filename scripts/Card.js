import {cardTemplate, popupImageText, popupImageOpened, openPopup, closePopup, popupImage, popupCloseImage} from './index.js'

export class Card {
  constructor(name, link, cardTemplate) {
    this._link = link;
    this._name = name;
    this._cardTemplate = cardTemplate
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.content__card')
      .cloneNode(true);

    return cardElement;
  }


  _handleClickLike() {
    this._item
    .querySelector('.content__card-like')
    .classList.toggle('content__card-like-active')
  }

  _handleCardDelete() {
    this._item.closest('.content__card').remove()
  }

  _handleOpenCard() {
      popupImageText.textContent = this._name;
      popupImageOpened.src = this._link;
      popupImageOpened.alt = this._name;
      openPopup(popupImage)
  }

  _handleCloseCard() {
      closePopup(popupImage)
  }

  _setEventListeners() {
    this._item.querySelector('.content__card-like').addEventListener('click', () => {
      this._handleClickLike()
    })
    this._item.querySelector('.content__card-photo').addEventListener('click', () => {
    this.  _handleOpenCard()
    })
    this._item.querySelector('.content__card-delete').addEventListener('click', () => {
      this._handleCardDelete()
    })
    popupCloseImage.addEventListener('click', () => {
      this._handleCloseCard()
    })
  }

  renderCard() {
    this._item = this._getTemplate()
    this._setEventListeners()
    this._item.querySelector('.content__card-name').textContent = this._name
    this._item.querySelector('.content__card-photo').src = this._link
    this._item.querySelector('.content__card-name').alt = this._name
    return this._item
  }
}
import {cardTemplate, popupImageText, popupImageOpened, popupImage} from '../index.js'

export class Card {
  constructor({data, handleOpenCard}, cardTemplate) {
    this._handleOpenCard = handleOpenCard
    this._link = data.link;
    this._name = data.name;
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
    this._cardLike
    .classList.toggle('content__card-like-active')
  }

  _handleCardDelete() {
    this._item.remove()
    this._item = null
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._handleClickLike()
    })
    this._cardPhoto.addEventListener('click', () => {
      this._handleOpenCard(this._name, this._link)
    })
    this._item.querySelector('.content__card-delete').addEventListener('click', () => {
      this._handleCardDelete()
    })
  }

  renderCard() {
    this._item = this._getTemplate()
    this._cardName = this._item.querySelector('.content__card-name')
    this._cardPhoto = this._item.querySelector('.content__card-photo')
    this._cardLike = this._item.querySelector('.content__card-like')
    this._setEventListeners()
    this._cardName.textContent = this._name
    this._cardPhoto.src = this._link
    this._cardName.alt = this._name
    return this._item
  }
}
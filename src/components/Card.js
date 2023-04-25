export class Card {
  constructor({cardId, userIdProfile, data, handleOpenCard, handleButtonDelete, handleCardDeleteItem, handleLike, handleDeleteLike}, cardTemplate, popupDeleteSelector) {
    this._handleOpenCard = handleOpenCard;
    this._handleOpenDelete = handleButtonDelete;
    this._handleCardDeleteItem = handleCardDeleteItem;
    this._handleLike = handleLike;
    this._handleDeleteLike = handleDeleteLike;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = cardId;
    this._userId = userIdProfile;
    this._cardUsersId = data.owner._id;
    this._cardTemplate = cardTemplate;
    this._popupDeleteSelector = popupDeleteSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.content__card')
      .cloneNode(true);

    return cardElement;
  }

  renderCard() {
    this._item = this._getTemplate()
    this._cardName = this._item.querySelector('.content__card-name')
    this._cardPhoto = this._item.querySelector('.content__card-photo')
    this._cardLike = this._item.querySelector('.content__card-like')
    this._cardLikeValue = this._item.querySelector('.content__like-value')
    this._deleteButton = this._item.querySelector('.content__card-delete')
    this._cardName.textContent = this._name
    this._cardPhoto.src = this._link
    this._cardName.alt = this._name
    this._likedCard()
    console.log(this._checkoutIdUsers())
    this._checkoutIdUsers()
    this._cardLikeValue.textContent = this._likes.length
    this._setEventListeners()
    return this._item
  }

  _setEventListeners() {
    this._cardPhoto.addEventListener('click', () => {
      this._handleOpenCard(this._name, this._link)
    })
    this._deleteButton.addEventListener('click', () => {
      this._handleCardDeleteItem(this._cardId);
    })
    this._cardLike.addEventListener('click', () => {
      if (this._cardLike.classList.contains('content__card-like-active')) {
        this._handleDeleteLike(this._cardId);
      } else {
        this._handleLike(this._cardId);
      }
    })
  }
  _handleClickLike() {
    this._cardLike.classList.toggle('content__card-like-active')
  }

  _likedCard() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._handleClickLike()
    }
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._cardLikeValue.textContent = this._likes.length
    this._handleClickLike()
  }

  handleCardDelete() {
    this._item.remove()
    this._item = null
  }


  _checkoutIdUsers() {
    if(this._cardUsersId !== this._userId) {
      this._deleteButton.remove()
    }
  }
}
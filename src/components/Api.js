export class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  // Проверяем на ошибки запросы
  _checkError(res) {
      if (res.ok) {
      return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
      };

// Метод получения информации о пользователе
  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._checkError(res))
  }

  // Метод получения карточек сообщества
  getDefaultCards() {
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._checkError(res))
  }

// Метод обновления информации о пользователе
  updateUserProfile(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.nameValue,
        about: data.noteValue
      })
    })
    .then(res => this._checkError(res))
  }

// Метод создания новой карточки
  createNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._checkError(res))
  }

  // Метод удаления новой карточки
  deleteCard(data) {
    return fetch(`${this._address}/cards/${data}`, {
    method: 'DELETE',
    headers: this._headers
  })
    .then(res => this._checkError(res))
  }

    // Метод постановки лайка
  likeCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._checkError(res));
  }

  // метод удаления лайка
  likeDelete(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkError(res));
  }

  // метод обновления аватара пользователя
  changeAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    })
    .then(res => this._checkError(res))
  }
}


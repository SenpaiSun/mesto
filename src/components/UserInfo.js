export class UserInfo {
  constructor({ nameValue, noteValue, avatarInfo }) {
    this._nameInfo = nameValue;
    this._noteInfo = noteValue;
    this._avatar = avatarInfo;
  }

  getUserInfo() {
    const userInfo = {
      nameValue: this._nameInfo.textContent,
      noteValue: this._noteInfo.textContent
    }
    return userInfo;
  }

  setUserInfo({ nameValue, noteValue, avatarInfo }) {
    if (nameValue) {
      this._nameInfo.textContent = nameValue;
    }
    if (noteValue) {
      this._noteInfo.textContent = noteValue;
    }
    if (avatarInfo) {
      this._avatar.src = avatarInfo;
    }
  }
}
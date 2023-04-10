export class UserInfo {
  constructor({ nameValue, noteValue }) {
    this._nameInfo = nameValue;
    this._noteInfo = noteValue;
  }

  getUserInfo() {
    const userInfo = {
      nameValue: this._nameInfo.textContent,
      noteValue: this._noteInfo.textContent
    }
    return userInfo;
  }

  setUserInfo({ nameValue, noteValue }) {
    this._nameInfo.textContent = nameValue;
    this._noteInfo.textContent = noteValue;
  }
}
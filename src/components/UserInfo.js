export class UserInfo {
  constructor({ nameSelector, noteSelector }) {
    this._nameInfo = nameSelector;
    this._noteInfo = noteSelector;
  }

  getUserInfo() {
    const userInfo = {
      nameSelector: this._nameInfo.textContent,
      noteSelector: this._noteInfo.textContent
    }
    return userInfo;
  }

  setUserInfo({ nameSelector, noteSelector }) {
    this._nameInfo.textContent = nameSelector;
    this._noteInfo.textContent = noteSelector;
  }
}
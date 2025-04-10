class Storage {
  constructor() {
    this.storage2 = window.localStorage;
  }

  setItem(key, value, expired) {
    // TODO 待补充代码 
    this.storage2.setItem(key, value);
    this.storage2.setItem(key + "!", new Date(new Date().getTime() + expired))
  }

  getItem(key) {
     // TODO 待补充代码 
    if (new Date(localStorage.getItem(key + "!")) < new Date()) {
      this.storage2.removeItem(key)
    }
    return this.storage2.getItem(key)

  }

  removeItem(key) {
    // TODO  待补充代码
    this.storage2.removeItem(key)
  }
}

const storage = new Storage();

// 为了检测时使用，请勿删除
if (window) {
  window.storage = storage;
}

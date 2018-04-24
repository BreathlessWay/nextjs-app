export default {
  getStorage (key: string) {
    return JSON.parse(localStorage.getItem(key));
  },
  setStorage (key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeStorage (key: string) {
    localStorage.removeItem('key');
  },
  clearStorage () {
    localStorage.clear();
  }
};
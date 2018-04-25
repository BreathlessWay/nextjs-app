export default {
  getStorage (key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      alert('请关闭无痕模式');
    }
  },
  setStorage (key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      alert('请关闭无痕模式');
    }
  },
  removeStorage (key: string) {
    try {
      localStorage.removeItem('key');
    } catch (e) {
      alert('请关闭无痕模式');
    }
  },
  clearStorage () {
    try {
      localStorage.clear();
    } catch (e) {
      alert('请关闭无痕模式');
    }
  }
};
export const storage = {
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
      localStorage.removeItem(key);
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

export const typeCheck = (data: any) => {
  return Object.prototype.toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

export const ecode = (data: any) => {
  let save = '', array = [];
  if (typeCheck(data) === 'object') {
    save = JSON.stringify(data);
  } else {
    save = data.toString();
  }
  for (let i = 0, len = save.length; i < len; i++) {
    array.push(String.fromCharCode(save.charCodeAt(i) + 1));
  }
  return array.join('');
};

export const decode = (data: string) => {
  let array = [];
  for (let i = 0, len = data.length; i < len; i++) {
    array.push(String.fromCharCode(data.charCodeAt(i) - 1));
  }
  try {
    return JSON.parse(array.join(''));
  } catch (e) {
    return array.join('');
  }
};

export const cookies = {
  getCookie (key: string) {
    try {
      const strCookie = document.cookie;
      const arrCookie = strCookie.split('; ');
      for (let i = 0; i < arrCookie.length; i++) {
        const arr = arrCookie[i].split('=');
        if (arr[0] == key) return decode(unescape(arr[1]));
      }
      return '';
    } catch (e) {
      alert('请关闭无痕模式');
    }
  },
  setCookie (key: string, value: any, expireHours: number = 30 * 24) {
    try {
      const secret = ecode(value);
      let cookieString = key + '=' + escape(secret);
      //判断是否设置过期时间
      if (expireHours > 0) {
        const date = new Date();
        date.setTime(Date.now() + expireHours * 3600 * 1000);
        cookieString = `${cookieString}; expires=${date.toUTCString()}; path=/;`;
      }
      document.cookie = cookieString;
    } catch (e) {
      alert('请关闭无痕模式');
    }
  },
  removeCookie (key: string) {
    try {
      const value = this.getCookie(key);
      if (value) {
        let cookieString = key + '=' + escape(value);
        const date = new Date();
        date.setTime(Date.now() - 10000);
        cookieString = `${cookieString}; expires=${date.toUTCString()}; path=/`;
        document.cookie = cookieString;
      }
    } catch (e) {
      alert('请关闭无痕模式');
    }
  }
};

export const getReqCookie = (cookie: string, key: string) => {
  try {
    if (cookie) {
      const arrCookie = cookie.split('; ');
      for (let i = 0; i < arrCookie.length; i++) {
        const arr = arrCookie[i].split('=');
        if (arr[0] == key) return decode(unescape(arr[1]));
      }
    }
    return '';
  } catch (e) {
    console.log(e);
  }
};

export const typeOfBrowser = {
  isAndroid () {
    return Boolean(navigator.userAgent.match(/android/ig));
  },
  isIphone () {
    return Boolean(navigator.userAgent.match(/iphone|ipod/ig));
  },
  isIpad () {
    return Boolean(navigator.userAgent.match(/ipad/ig));
  },
  isWechat () {
    return Boolean(navigator.userAgent.match(/MicroMessenger/ig));
  },
  isIphoneX () {
    return this.isIphone() && (window.screen.height == 812 && window.screen.width == 375);
  }
};

export const getDesc = (richContent) => {
  richContent = richContent.replace(/(\n)/g, '');
  richContent = richContent.replace(/(\t)/g, '');
  richContent = richContent.replace(/(\r)/g, '');
  richContent = richContent.replace(/<\/?[^>]*>/g, '');
  richContent = richContent.replace(/\s*/g, '');
  return richContent.substr(0, 120);
};

abstract class AbsQueryString {
  public abstract getQuery (name: string): string
}

export class GetQueryString extends AbsQueryString {
  private url = '';

  constructor (url: string) {
    super();
    this.url = url;
  }

  public getQuery (name) {
    if (this.url) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      const r = this.url.split('?')[1].match(reg);
      if (r != null) return (r[2]);
    }
    return '';
  }
}

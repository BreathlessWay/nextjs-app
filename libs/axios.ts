import axios from 'axios';
import qs from 'qs';
import baseUrl from './baseUrl';
import { storage } from './utils';
import { serverSign } from './sign/sign';

const baseConfig = {
  // `method` 是创建请求时使用的方法
  method: 'get', // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: '',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return qs.stringify(data);
  }],

// `headers` 是即将被发送的自定义请求头
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    // 'Content-Type': 'application/json; charset=utf-8',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 0,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认的

  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  // responseType: 'json', // 默认的

  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  // maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  }
};

for (let p in baseConfig) {
  axios.defaults[p] = baseConfig[p];
}

axios.interceptors.request.use(async function (config) {
  // 在发送请求之前做些什么
  if (~config.url.indexOf('/index.php?c=verifycode&a=getVerifyCode')) {
    return config;
  }
  if (~config.url.indexOf('/soccer')) {
    return config;
  }
  if (~config.url.indexOf('/app/user/GetSalt')) {
    return config;
  }

  if (typeof config.data !== 'string' && !config.data.sign && typeof config.data.data !== 'string') {
    let postData, sign, data, server_time;
    if (typeof config.data === 'object') {
      postData = {
        ...{
          'platform': 'android',
          'market': 'yingyongbao',
          'phone_type': 'SM-N7506V',
          'android_type': 99,
          'idfa': '2aea65a5-3cca-3e99-8560-f700733eb0c3',
          'os_version': '4.3',
          'versionNum': '3.31'
        }, ...config.data
      };
    }
    if (typeof window !== 'undefined') {
      sign = storage.getStorage('saltLite');
      if (sign) {
        data = sign.data;
        server_time = sign.server_time;
      } else {
        sign = await axios.get(`${baseUrl.appHuan}/app/user/GetSalt`);
        storage.setStorage('saltLite', sign.data);
        data = sign.data.data;
        server_time = sign.data.server_time;
      }
    } else {
      sign = await axios.get(`${baseUrl.appHuan}/app/user/GetSalt`);
      data = sign.data.data;
      server_time = sign.data.server_time;
    }

    config.data = {
      sign: serverSign(server_time, data, postData),
      data: JSON.stringify(postData)
    };
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios;

import { sigin, serverSign } from './sign';
import axios from '../axios';
import baseUrl from '../baseUrl';

export const yzmSign = (params) => {
  const initPar = {
    timestamp: parseInt((new Date().getTime() / 1000).toString()),
    ...params
  };

  return {
    sign: sigin(initPar),
    data: JSON.stringify(initPar)
  };
};

export const commonSign = (params) => {
  const postData = {
    ...{
      'platform': 'android',
      'market': 'yingyongbao',
      'phone_type': 'SM-N7506V',
      'android_type': 99,
      'idfa': '2aea65a5-3cca-3e99-8560-f700733eb0c3',
      'os_version': '4.3',
      'versionNum': '3.31',
      'winy_token': '',
      'mf_token': '',
      'login_id': ''
    }, ...params
  };
  return new Promise((resolve, reject) => {
    axios.get(`${baseUrl.appHuan}/app/user/GetSalt`)
      .then(res => {
        const {data, server_time} = res.data;
        resolve({
          sign: serverSign(server_time, data, postData),
          data: JSON.stringify(postData)
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};
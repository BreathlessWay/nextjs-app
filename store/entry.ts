import { action, observable, runInAction } from 'mobx';
import axios from 'libs/axios';
import baseUrl from 'libs/baseUrl';
import { AnyProps } from 'types/interface';
import { cookies } from 'libs/utils';

export interface StoreTypes {
  detailUserInfo: AnyProps;
  isLogin: boolean;
  loading: boolean;
  loginWithTel: (params: { account: string, vc: string }) => Promise<any>;
  loginWithAccount: (params: AnyProps) => Promise<any>;
  getDetailUserInfo: (user_id: string) => Promise<any>;
  keepLogin: (params: AnyProps) => Promise<any>;
}

let store: StoreTypes | null = null;

class Store {

  @observable
  detailUserInfo = {} as AnyProps;
  @observable
  isLogin = false;
  @observable
  loading = false;

  constructor (public isServer: boolean) {
  }

  @action
  async loginWithTel (params) {
    this.loading = true;
    return axios.post(`${baseUrl.appHuan}/app/userweb/vcLogin`, params)
      .then(res => {
        if (res.data.msg_code == '9004') {
          const {winy_token, user_id, mf_token} = res.data.data;
          cookies.setCookie('login', {
            winy_token, user_id, mf_token
          });
          console.log(res.data);
          return res.data;
        } else {
          throw new Error(res.data.msg || '登录失败');
        }
      })
      .then((res) => {
        const {user_id, mf_token, winy_token} = res.data;
        return this.getDetailUserInfo({user_id, mf_token, winy_token});
      })
      .catch(err => {
        throw new Error(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
  };

  @action
  async loginWithAccount (params) {
    this.loading = true;
    return axios.post(`${baseUrl.appHuan}/app/userweb/login`, params)
      .then(res => {
        if (res.data.msg_code == '9004') {
          const {winy_token, user_id, mf_token} = res.data.data;
          cookies.setCookie('login', {
            winy_token, user_id, mf_token
          });
          return res.data;
        } else {
          throw new Error(res.data.msg || '登录失败');
        }
      })
      .then((res) => {
        const {user_id, mf_token, winy_token} = res.data;
        return this.getDetailUserInfo({user_id, mf_token, winy_token});
      })
      .catch(err => {
        throw new Error(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
  };

  @action
  async getDetailUserInfo (data) {
    const {user_id, mf_token, winy_token} = data;
    const newParams = {user_id, mf_token, winy_token, login_id: user_id};
    this.loading = true;
    return axios.post(`${baseUrl.appHuan}/app/userweb/uinfo`, newParams)
      .then(res => {
        if (res.data.msg_code == '9004' && !Array.isArray(res.data.data)) {
          runInAction(() => {
            this.isLogin = true;
            this.detailUserInfo = res.data.data;
          });
          return Array.isArray(res.data.data) ? {} : res.data.data;
        } else {
          throw new Error(res.data.msg || '登录失败');
        }
      })
      .catch(err => {
        throw new Error(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  @action
  keepLogin (params) {
    return this.getDetailUserInfo(params);
  };
}

export function initStore (isServer: boolean) {
  if (isServer) {
    return new Store(isServer);
  } else {
    if (store === null) {
      store = new Store(isServer);
    }
    return store;
  }
}
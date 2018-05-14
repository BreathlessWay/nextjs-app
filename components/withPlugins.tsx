import * as React from 'react';
import Raven from 'raven-js';
import 'style/common.scss';
import { translate } from 'react-i18next';
import { observer } from 'mobx-react';
import { initStore, StoreTypes } from '../store/entry';
import { getReqCookie, cookies } from '../libs/utils';
import { AnyProps } from '../types/interface';
// import { Toast } from 'antd-mobile';
// import Router from 'next/router';

const {getInitialProps, I18n} = require('../libs/i18n');
const SENTRY_DSN = 'https://9fcaed89e70540b19b982dd0ba1a6a90@sentry.io/1192745';

export interface LoginPropTypes {
  user: AnyProps;
  isLogin: boolean;
  errMsg: string;
}

export interface prePropTypes {
  login_id: string;
  mf_token: string;
  winy_token: string;
}

const withSentry = (namespaces = ['common']) => (Child: any): any => {
  const Extended = translate(namespaces, {i18n: I18n, wait: process.browser})(
    Child
  );

  class WrappedComponent extends React.Component<{}, { error: Error | null }> {

    constructor (props) {
      super(props);
      this.state = {
        error: null
      };
      // 线上环境添加sentry监控
      if (typeof window !== 'undefined') {
        if (!~window.location.href.indexOf('localhost') && process.env.NODE_ENV === 'production') {
          Raven.config(
            SENTRY_DSN, {
              environment: process.env.NODE_ENV  // sentry环境
            }
          ).install();
        }
      }
    }

    static async getInitialProps (context) {
      const isServer = !!context.req,
        i18nInitialProps = isServer && typeof window === 'undefined' ? getInitialProps(context.req, namespaces) : {},  // 国际化
        store: StoreTypes = initStore(isServer),  // 获取登录store
        cookie = isServer ? getReqCookie(context.req.headers.cookie, 'login') : cookies.getCookie('login');  // 获取cookie，isServer时从req获取，否则从document.cookie获取

      let res: AnyProps = {},
        isLogin = false,
        errMsg = '';
      // 验证登录，已登录从store中取，否则重新验证登录参数为user_is 和 winy_token
      if (!store.isLogin) {
        //在此处将服务端请求到的用户信息同步到store
        if (cookie) {
          try {
            res = await store.keepLogin(cookie);
            isLogin = true;
            errMsg = '';
          } catch (e) {
            isLogin = false;
            errMsg = e.message || '登录失败';
            console.log('Error:', e.message);
          }
        }
      } else {
        isLogin = true;
        errMsg = '';
        res = store.detailUserInfo;
      }
      let newParams = {};
      if (cookie && isLogin) {
        const {user_id, mf_token, winy_token} = cookie;
        newParams = {mf_token, winy_token, login_id: user_id};
      }
      if (Extended.getInitialProps) {
        // 将cookie中的mf_token, winy_token, login_id公共请求参数传入到各个pages的getInitialProps中，通过pre拿到
        const propsRes = await Extended.getInitialProps({...context, ...{pre: newParams}, isLogin});
        return {...propsRes, ...i18nInitialProps, isServer, user: res, isLogin, errMsg, pre: newParams};
      }
      return {...i18nInitialProps, isServer, user: res, isLogin, errMsg, pre: newParams};
    }

    componentDidCatch (error, errorInfo) {
      this.setState({error});
      Raven.captureException(error, {extra: errorInfo});
    }

    render () {
      return <Extended {...this.props} error={this.state.error}/>;
    }
  };
  return observer(WrappedComponent);
};

export default withSentry;
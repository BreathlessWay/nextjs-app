import * as React from 'react';
// import Raven from 'raven-js';
import 'style/common.scss';
import { translate } from 'react-i18next';
import { observer } from 'mobx-react';
import { initStore, StoreTypes } from 'store/entry';
import { getReqCookie, cookies } from 'libs/utils';
import { AnyProps } from 'types/interface';
import { Toast } from 'antd-mobile';
// import getConfig from 'next/config';
import { ecode, GetQueryString } from 'libs/utils';

import { getInitialProps, I18n } from 'libs/i18n';
// const {publicRuntimeConfig} = getConfig();

// const {getInitialProps, I18n} = require('../libs/i18n');

// const SENTRY_DSN = 'https://9fcaed89e70540b19b982dd0ba1a6a90@sentry.io/1192745';

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

const withSentry = (namespaces = ['common']) => (Child: React.ReactNode): any => {
  const Extended = translate(namespaces, {i18n: I18n, wait: process.browser})(
    Child
  );

  class WrappedComponent extends React.Component<AnyProps, { error: Error | null }> {

    constructor (props) {
      super(props);
      this.state = {
        error: null
      };
      // 线上环境添加sentry监控
      // if (typeof window !== 'undefined') {
      //   if (!~window.location.href.indexOf('localhost') && process.env.NODE_ENV === 'production') {
      //     Raven.config(
      //       SENTRY_DSN, {
      //         environment: publicRuntimeConfig.BUILD_ENV  // sentry环境
      //       }
      //     ).install();
      //   }
      // }
    }

    static async getInitialProps (context) {
      const isServer = !!context.req,
        i18nInitialProps = isServer && typeof window === 'undefined' ? getInitialProps(context.req, namespaces) : {},  // 国际化
        store: StoreTypes = initStore(isServer);  // 获取登录store
      let res: AnyProps = {},
        isLogin = false,
        errMsg = '',
        isVip = false,
        newParams = {},
        cookie,
        user_id,
        mf_token,
        winy_token;
      if (~context.asPath.indexOf('redirect')) {
        const getQuery = new GetQueryString(context.asPath);
        console.log(getQuery.getQuery('redirect'));
        user_id = getQuery.getQuery('user_id');
        mf_token = getQuery.getQuery('mf_token');
        winy_token = getQuery.getQuery('winy_token');
      }
      if (user_id && mf_token && winy_token) {
        isServer ? context.res.cookie('login', ecode({user_id, mf_token, winy_token}), {expires: new Date(Date.now() + 900000), path: '/'}) : cookies.setCookie('login', ecode({
          user_id,
          mf_token,
          winy_token
        }));
        cookie = {user_id, mf_token, winy_token};
      } else {
        cookie = isServer ? getReqCookie(context.req.headers.cookie, 'login') : cookies.getCookie('login');  // 获取cookie，isServer时从req获取，否则从document.cookie获取
      }
      // cookie 登录
      // 验证登录，已登录从store中取，否则重新验证登录参数为user_is 和 winy_token
      if (!store.isLogin) {
        //在此处将服务端请求到的用户信息同步到store
        if (cookie) {
          try {
            res = await store.keepLogin(cookie);
            isLogin = true;
            errMsg = '';
            isVip = Boolean(res.mgr_user_member);
          } catch (e) {
            isVip = false;
            isLogin = false;
            errMsg = e.message || '登录失败';
            // 登录失败清除cookie
            isServer ? context.res.clearCookie('login') : cookies.removeCookie('login');
            console.log('Error:', e.message);
          }
        }
      } else {
        isLogin = true;
        errMsg = '';
        res = store.detailUserInfo;
        isVip = Boolean(res.mgr_user_member);
      }
      if (cookie && isLogin) {
        const {user_id, mf_token, winy_token} = cookie;
        newParams = {mf_token, winy_token, login_id: user_id};
      }

      if (Extended.getInitialProps) {
        // 将cookie中的mf_token, winy_token, login_id公共请求参数传入到各个pages的getInitialProps中，通过pre拿到
        const propsRes = await Extended.getInitialProps({...context, ...{pre: newParams}, isLogin, isVip});
        return {...propsRes, ...i18nInitialProps, isServer, user: res, isLogin, errMsg, pre: newParams, isVip};
      }
      return {...i18nInitialProps, isServer, user: res, isLogin, errMsg, pre: newParams, isVip};
    }

    componentDidCatch (error, errorInfo) {
      this.setState({error});
      // Raven.captureException(error, {extra: errorInfo});
    }

    componentDidMount () {
      console.log('withPlugins did mount');
      if (this.props.errMsg) {
        Toast.fail(`withPlugins${this.props.errMsg}`);
        setTimeout(() => location.reload(), 300);
      }
    }

    render () {
      return <Extended {...this.props} error={this.state.error}/>;
    }
  }

  return observer(WrappedComponent);
};

export default withSentry;

import * as React from 'react';
import { observable } from 'mobx';
import { InputItem, List, Button, Toast } from 'antd-mobile';
import './style.scss';
import { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { TypeT } from 'types/interface';
import { StoreTypes } from 'store/entry';
import Router from 'next/router';
import md5 from 'md5';

const Item = List.Item;

interface PropTypes {
  t: TypeT;
  store?: StoreTypes;
}

@inject('store')
@observer
export default class AccountComponent extends React.Component<PropTypes> {
  @observable accountParams = {
    account: '',
    password: '',
    onAccountError: false,
    onPasswordError: false
  };
  AccountInput;

  componentDidMount () {
    this.AccountInput.focus();
  }

  render () {
    const {t} = this.props;
    return (
      <Fragment>
        <Item>
          {t('eight')}
        </Item>
        <Item>
          <InputItem
            type="text"
            value={this.accountParams.account}
            placeholder={t('nine')}
            clear={true}
            error={this.accountParams.onAccountError}
            onChange={this.handleChangeAccount}
            ref={el => this.AccountInput = el}
          />
        </Item>
        <Item>
          {t('ten')}
        </Item>
        <Item>
          <InputItem
            type="password"
            value={this.accountParams.password}
            placeholder={t('eleven')}
            clear={true}
            error={this.accountParams.onPasswordError}
            onChange={this.handleChangePsd}
          />
        </Item>
        <Item>
          <Button type="primary" className="login-content_btn" onClick={this.handleLogin}>{t('six')}</Button>
        </Item>
      </Fragment>
    );
  }

  private handleChangeAccount = (val) => {
    this.accountParams.account = val;
    this.accountParams.onAccountError = !Boolean(val.trim());
  };

  private handleChangePsd = (val) => {
    this.accountParams.password = val;
    this.accountParams.onPasswordError = !Boolean(val);
  };

  private handleLogin = () => {
    const t = this.props.t;
    try {
      if (this.accountParams.onAccountError || !this.accountParams.account.trim()) {
        this.accountParams.onAccountError = true;
        this.accountParams.onPasswordError = true;
        throw new Error(t('wrong.three'));
      }
      if (this.accountParams.onPasswordError || !this.accountParams.password) {
        this.accountParams.onPasswordError = true;
        throw new Error(t('wrong.four'));
      }
    } catch (e) {
      Toast.info(e.message);
      return;
    }
    const data = {
      'platform': 'android',
      'passwd': md5(this.accountParams.password),
      'username': this.accountParams.account,
      'market': 'yingyongbao',
      'phone_type': 'SM-N7506V',
      'android_type': 0,
      'idfa': '2aea65a5-3cca-3e99-8560-f700733eb0c3',
      'os_version': '4.3',
      'versionNum': '3.31'
    };
    this.props.store.loginWithAccount(data)
      .then(() => {
        Router.back();
      })
      .catch(err => {
        Toast.fail(err.message || t('wrong.five'));
      });
  };
}
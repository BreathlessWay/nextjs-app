import * as React from 'react';
import { observable } from 'mobx';
import { List, Button, Toast, InputItem } from 'antd-mobile';
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
    account: '13127672375', // 13127672375
    password: 'wsf123456', //  wsf123456
    onAccountError: false,
    onPasswordError: false
  };
  AccountInput;

  componentDidMount () {
    $('.am-input-control input').focus((e) => {
      $('.am-list-item.am-input-item').css({'border-color': '#eee'});
      $(e.target).parents('.am-list-item.am-input-item').css({'border-color': '#333'});
    });
    this.AccountInput.focus();
  }

  render () {
    const {t, store: {loading}} = this.props;
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
          <Button type="primary" className="login-content_btn" onClick={this.handleLogin} disabled={loading} loading={loading}>{t('six')}</Button>
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
      'passwd': md5(this.accountParams.password.toLowerCase()),
      'username': this.accountParams.account
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

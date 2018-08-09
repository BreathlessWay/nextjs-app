import * as React from 'react';
import { observable } from 'mobx';
import { Flex, List, Button, Toast, InputItem } from 'antd-mobile';
import './style.scss';
import { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { isTel, isYzm } from 'libs/reg';
import { TypeT } from 'types/interface';
import './style.scss';
import { StoreTypes } from 'store/entry';
import axios from 'libs/axios';
import baseUrl from 'libs/baseUrl';
import { yzmSign } from 'libs/sign/commonSign';

import Router from 'next/router';

const Item = List.Item;

interface PropTypes {
  t: TypeT;
  store?: StoreTypes;
}

@inject('store')
@observer
export default class TelComponent extends React.Component<PropTypes> {
  @observable telParams = {
    telephone: '',
    yzm: '',
    onTelError: false,
    onYZMError: false,
    time: 0,
    disabled: false,
    interval: null
  };
  @observable disableBtn = false;
  @observable loadingBtn = false;
  TelInput;

  componentDidMount () {

    $('.am-input-control input').focus((e) => {
      $('.am-list-item.am-input-item').css({'border-color': '#eee'});
      $(e.target).parents('.am-list-item.am-input-item').css({'border-color': '#333'});
    });
    this.TelInput.focus();
  }

  componentWillUnmount () {
    this.telParams.interval && clearInterval(this.telParams.interval);
  }

  render () {
    const {t, store: {loading}} = this.props;
    return (
      <Fragment>
        <Item>
          {t('one')}
        </Item>
        <Item>
          <InputItem
            type="number"
            maxLength={11}
            value={this.telParams.telephone}
            placeholder={t('two')}
            clear={true}
            error={this.telParams.onTelError}
            onChange={this.handleChangeTel}
            ref={el => this.TelInput = el}
          />
        </Item>
        <Item>
          {t('three')}
        </Item>
        <Item>
          <Flex>
            <Flex.Item>
              <InputItem
                type="number"
                value={this.telParams.yzm}
                placeholder={t('four')}
                clear={true}
                error={this.telParams.onYZMError}
                onChange={this.handleChangeYzm}
                maxLength={6}
              />
            </Flex.Item>
            <Flex.Item className="login-yzm_wrap">
              <Button size="small" className="login-yzm_btn" onClick={this.handleGetYzm}
                      disabled={this.telParams.disabled}>{this.telParams.time > 0 ? `${this.telParams.time}s后获取` : t('five')}</Button>
            </Flex.Item>
          </Flex>
        </Item>
        <Item>
          <Button type="primary" className="login-content_btn" onClick={this.handleLogin} loading={loading} disabled={loading}>{t('six')}</Button>
        </Item>
      </Fragment>
    );
  }

  private handleChangeTel = (val) => {
    this.telParams.telephone = val;
    this.telParams.onTelError = !isTel.test(val.replace(/\s/g, ''));
  };
  private handleChangeYzm = (val) => {
    this.telParams.yzm = val;
    this.telParams.onYZMError = !isYzm.test(val);
  };
  private handleGetYzm = () => {
    const t = this.props.t;

    if (this.telParams.onTelError || !this.telParams.telephone.trim()) {
      Toast.info(t('wrong.one'));
      this.telParams.onTelError = true;
      return;
    }
    this.telParams.disabled = true;
    const mp = this.telParams.telephone.replace(/\s/g, '');
    axios.post(`${baseUrl.apiCubee}/index.php?c=verifycode&a=getVerifyCode`, yzmSign({mp, 'vt': 3}))
         .then(res => {
           if (res.data.code === 0) {
             this.telParams.time = 60;
             this.telParams.interval = setInterval(() => {
               if (this.telParams.time > 0) {
                 this.telParams.time--;
               }
               if (this.telParams.time === 0) {
                 this.telParams.disabled = false;
                 clearInterval(this.telParams.interval);
                 this.telParams.interval = null;
               }
             }, 1000);
           } else {
             this.telParams.disabled = false;
             Toast.fail(t('wrong.six'));
           }
         })
         .catch(err => {
           Toast.fail(t('wrong.six'));
           this.telParams.disabled = false;
         });
  };

  private handleLogin = () => {
    const t = this.props.t;
    try {
      if (this.telParams.onTelError || !this.telParams.telephone.trim()) {
        this.telParams.onTelError = true;
        this.telParams.onYZMError = true;
        throw new Error(t('wrong.one'));
      }
      if (this.telParams.onYZMError || !this.telParams.yzm.trim()) {
        this.telParams.onYZMError = true;
        throw new Error(t('wrong.two'));
      }
    } catch (e) {
      Toast.info(e.message);
      return;
    }
    const account = this.telParams.telephone.replace(/\s/g, '');
    this.props.store.loginWithTel({account, vc: this.telParams.yzm})
        .then(() => {
          Router.back();
        })
        .catch(err => {
          Toast.fail(t('wrong.five'));
        });
  };
}

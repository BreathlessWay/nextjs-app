import * as React from 'react';
import { List, Flex } from 'antd-mobile';
import { TypeT, AnyProps } from 'types/interface';
import { SelectTab } from '../TabComponent';
import Router from 'next/router';
import './style.scss';

export default class Index extends React.Component<{ t: TypeT, active: SelectTab, entryStore: AnyProps, isLogin: boolean }, {}> {
  render () {
    const {t, active, entryStore: {avater = '', nick_name = '', money = 0, beanMoney = 0}, isLogin} = this.props;
    return (
      <List className="index-menu_list">
        <List.Item className="text-right">
          <img src={require('../../static/img/menu-in.png')} alt="" className="index-menu_in"/>
        </List.Item>
        <List.Item>
          <Flex align="center">
            <img src={avater || require('../../static/img/default-avatar-menu.png')} alt="" className="default-avatar-menu"/>
            <Flex.Item style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>{nick_name || '送你一路长红'}</Flex.Item>
          </Flex>
        </List.Item>
        {
          isLogin &&
          <List.Item className="index-menu_money">
            <section>
              <span className="vertical-middle">魔币：</span>
              <span className="vertical-middle">{money || 0}</span>
              <img className="vertical-middle" src={require('../../static/img/menu-in-mb.png')} alt=""/>
            </section>
            <section>
              <span className="vertical-middle">魔豆：</span>
              <span className="vertical-middle">{beanMoney || 0}</span>
              <img className="vertical-middle" src={require('../../static/img/menu-in-md.png')} alt=""/>
            </section>
            <hr className="index-menu_line"/>
          </List.Item>
        }
        <List.Item onClick={() => Router.push('/')}>
          <Flex align="center" className={active === 'sy' ? 'index-menu-list_in index-menu-active' : 'index-menu-list_in'}>
            <img src={require('../../static/img/menu-in-1.png')} alt=""/>
            <Flex.Item>{t('common:menu.three')}</Flex.Item>
          </Flex>
        </List.Item>
        <List.Item onClick={() => Router.push('/score')}>
          <Flex align="center" className={active === 'bf' ? 'index-menu-list_in index-menu-active' : 'index-menu-list_in'}>
            <img src={require('../../static/img/menu-in-2.png')} alt=""/>
            <Flex.Item>{t('common:menu.one')}</Flex.Item>
          </Flex>
        </List.Item>
        <List.Item onClick={() => Router.push('/cube')}>
          <Flex align="center" className={active === 'mf' ? 'index-menu-list_in index-menu-active' : 'index-menu-list_in'}>
            <img src={require('../../static/img/menu-in-3.png')} alt=""/>
            <Flex.Item>{t('common:menu.two')}</Flex.Item>
          </Flex>
        </List.Item>
        <List.Item onClick={() => Router.push('/member')}>
          <Flex align="center" className={active === 'hy' ? 'index-menu-list_in index-menu-active' : 'index-menu-list_in'}>
            <img src={require('../../static/img/menu-in-4.png')} alt=""/>
            <Flex.Item>{t('common:menu.four')}</Flex.Item>
          </Flex>
        </List.Item>
        <List.Item onClick={() => Router.push('/zx')}>
          <Flex align="center" className={active === 'zx' ? 'index-menu-list_in index-menu-active' : 'index-menu-list_in'}>
            <img src={require('../../static/img/menu-in-5.png')} alt=""/>
            <Flex.Item>{t('common:menu.five')}</Flex.Item>
          </Flex>
        </List.Item>
      </List>
    );
  }
}

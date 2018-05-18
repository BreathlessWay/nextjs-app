import * as React from 'react';
import { TabBar } from 'antd-mobile';
import { TypeT } from 'types/interface';
import Router from 'next/router';

export type SelectTab = 'bf' | 'mf' | 'sy' | 'hy' | 'zx'
export default class TabComponent extends React.Component<{ selectedTab: string, t: TypeT, isHideMenu?: boolean }, {}> {
  render () {
    const {t} = this.props;
    return (
      <section>
        <TabBar unselectedTintColor="#8E8E93" tintColor="#3A0B90" barTintColor="white" noRenderContent={true} className="tab-component" hidden={this.props.isHideMenu}>
          <TabBar.Item title={t('common:menu.one')} key={t('common:menu.one')} selected={this.props.selectedTab === 'bf'}
                       icon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-1.png')})`}}/>}
                       selectedIcon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-1-active.png')})`}}/>}
                       onPress={() => {
                         Router.push('/score');
                       }}/>
          <TabBar.Item title={t('common:menu.two')} key={t('common:menu.two')} selected={this.props.selectedTab === 'mf'}
                       icon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-2.png')})`}}/>}
                       selectedIcon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-2-active.png')})`}}/>}
                       onPress={() => {
                          Router.push('/cube');
                       }}/>
          <TabBar.Item title={t('common:menu.three')} key={t('common:menu.three')} selected={this.props.selectedTab === 'sy'}
                       icon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-3.png')})`}}/>}
                       selectedIcon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-3-active.png')})`}}/>}
                       onPress={() => {
                         Router.push('/');
                       }}/>
          <TabBar.Item title={t('common:menu.four')} key={t('common:menu.four')} selected={this.props.selectedTab === 'hy'}
                       icon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-4.png')})`}}/>}
                       selectedIcon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-4-active.png')})`}}/>}
                       onPress={() => {
                         Router.push('/member');
                       }}/>
          <TabBar.Item title={t('common:menu.five')} key={t('common:menu.five')} selected={this.props.selectedTab === 'zx'}
                       icon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-5.png')})`}}/>}
                       selectedIcon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-5-active.png')})`}}/>}
                       onPress={() => {
                         Router.push('/zx');
                       }}/>
        </TabBar>
        <style jsx={true}>{`
          @import "../../style/var";
          section{
            position:fixed;
            right:0;
            left:0;
            bottom:0;
            max-width: $max-width;
            margin: auto;
          }
          .tab-icon_png{
            width: 20px;
            height: 20px;
            background-size: 18px 18px;
            background-repeat: no-repeat;
            background-position: center
          }
        `}
        </style>
      </section>
    );
  }
}

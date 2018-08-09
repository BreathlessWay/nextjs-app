import * as React from 'react';
import { TabBar } from 'antd-mobile';
import { TypeT } from 'types/interface';
import Router from 'next/router';

export type SelectTab = 'bf' | 'mf' | 'sy' | 'hy' | 'zx'
export default class TabComponent extends React.Component<{ selectedTab: string, t: TypeT }, {}> {
  render () {
    return (
      <section>
        <TabBar unselectedTintColor="#8E8E93" tintColor="#7583FB" barTintColor="white" noRenderContent={true} className="tab-component">
          <TabBar.Item title='比分' key='比分' selected={this.props.selectedTab === 'bf'}
                       icon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-1.png')})`}}/>}
                       selectedIcon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-1-active.png')})`}}/>}
                       onPress={() => {
                         Router.push('/bf');
                       }}/>
          <TabBar.Item title='魔方' key='魔方' selected={this.props.selectedTab === 'mf'}
                       icon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-2.png')})`}}/>}
                       selectedIcon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-2-active.png')})`}}/>}
                       onPress={() => {
                         Router.push('/mf');
                       }}/>
          <TabBar.Item title='首页' key='首页' selected={this.props.selectedTab === 'sy'}
                       icon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-3.png')})`}}/>}
                       selectedIcon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-3-active.png')})`}}/>}
                       onPress={() => {
                         Router.push('/');
                       }}/>
          <TabBar.Item title='会员' key='会员' selected={this.props.selectedTab === 'hy'}
                       icon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-4.png')})`}}/>}
                       selectedIcon={<div className="tab-icon_png" style={{backgroundImage: `url(${require('../../static/img/menu-4-active.png')})`}}/>}
                       onPress={() => {
                         Router.push('/hy');
                       }}/>
          <TabBar.Item title='资讯' key='资讯' selected={this.props.selectedTab === 'zx'}
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
            max-width: 750Px;
            margin: auto;
            z-index: 9
          }
          .tab-icon_png{
            width: 22px;
            height: 22px;
            background-size: 22px 22px;
            background-repeat: no-repeat;
            background-position: center
          }
        `}
        </style>
      </section>
    );
  }
}

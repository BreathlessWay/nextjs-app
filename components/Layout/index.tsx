import Header from 'components/Header/index';
import TabComponent, { SelectTab } from 'components/TabComponent';
import * as React from 'react';
import { TypeT } from 'types/interface';

export default class Layout extends React.Component<{ title: string, t: TypeT, selectedTab: SelectTab, isHideMenu?: boolean }, {}> {
  render () {
    return (
      <article className="layout-index">
        <Header title={this.props.title}/>
        {this.props.children}

        <TabComponent selectedTab={this.props.selectedTab} t={this.props.t} isHideMenu={this.props.isHideMenu}/>

      </article>
    );
  }
}

import Header from 'components/Header/index';
import * as React from 'react';
import { TypeT } from 'types/i18n';

export default class Layout extends React.Component<{ title: string, t: TypeT }, {}> {
  render () {
    return (
      <article className="layout">
        <Header title={this.props.title}/>
        {this.props.children}
      </article>
    );
  }
}
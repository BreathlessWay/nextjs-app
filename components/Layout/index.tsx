import Header from 'components/Header/index';
import * as React from 'react';

export default class Layout extends React.Component<{ title: string }, {}> {
  render () {
    return (
      <article className="layout">
        <Header title={this.props.title}/>
        {this.props.children}
      </article>
    );
  }
}
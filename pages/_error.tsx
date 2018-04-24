import React from 'react';

export default class Error extends React.Component<{ statusCode: number }, {}> {
  static getInitialProps ({res, err}: { [propsName: string]: any }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return {statusCode};
  }

  render () {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    );
  }
}
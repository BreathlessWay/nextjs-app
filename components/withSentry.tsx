import * as React from 'react';
import Raven from 'raven-js';
import 'style/common.scss';

const SENTRY_DSN = '';

export default function withSentry (Child: any): any {
  return class WrappedComponent extends React.Component<{}, { error: Error | null }> {
    constructor (props) {
      super(props);
      this.state = {
        error: null
      };
      // 线上环境添加sentry监控
      if (typeof window !== 'undefined') {
        if (!~window.location.href.indexOf('localhost') && process.env.NODE_ENV === 'production') {
          Raven.config(
            SENTRY_DSN, {
              environment: process.env.NODE_ENV  // sentry环境
            }
          ).install();
        }
      }
    }

    static getInitialProps (context) {
      if (Child.getInitialProps) {
        return Child.getInitialProps(context);
      }
      return {};
    }

    componentDidCatch (error, errorInfo) {
      this.setState({error});
      Raven.captureException(error, {extra: errorInfo});
    }

    render () {
      return <Child {...this.props} error={this.state.error}/>;
    }
  };
}

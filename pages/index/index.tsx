import * as React from 'react';
import './style.scss';
import Layout from 'components/Layout/index';
import { Provider } from 'mobx-react';
import { Flex, Drawer, List } from 'antd-mobile';
import TabComponent from 'components/TabComponent';
import AddScreenComponent from 'components/AddScreenComponent';
import { initStore, StoreTypes } from 'store/store';
import withSentry from 'components/withSentry';

interface PropType extends StoreTypes {
  isServer: boolean,
  title: string
}

class Index extends React.Component<PropType, {}> {
  store: StoreTypes;

  constructor (props: PropType) {
    super(props);
    this.store = initStore(props.isServer, props.lastUpdate);
    console.log('constructor');
  }

  static async getInitialProps () {
    return {title: '首页'};
  }

  componentWillMount () {
    console.log('componentWillMount');
  }

  componentDidMount () {
    console.log('componentDidMount');
  }

  render () {
    return (
      <Provider store={this.store}>
        <Layout title={this.props.title}>
          <article className="index-container">
          首页
          </article>
        </Layout>
      </Provider>
    );
  }
}

export default withSentry(Index);
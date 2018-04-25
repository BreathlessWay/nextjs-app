import * as React from 'react';
import './style.scss';
import Layout from 'components/Layout';
import { Provider } from 'mobx-react';
import { initStore, StoreTypes } from 'store/store';
import withSentry from 'components/withSentry';
import withI18next from 'components/withI18next';
import { I18n } from 'types/i18n';

interface PropType extends StoreTypes, I18n {
  isServer: boolean,
  title: string,
}

interface StateType {
  show: boolean,
  menu: boolean,
  item: { [propsName: string]: any }
}

@withSentry
@withI18next(['home', 'common'])
export default class IndexPage extends React.Component<PropType, StateType> {

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
    const {t} = this.props;
    return (
      <Provider store={this.store}>
        <Layout title={this.props.title} t={t}>
          index
        </Layout>
      </Provider>
    );
  }
}
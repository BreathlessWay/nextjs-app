import * as React from 'react';
import { Provider } from 'mobx-react';
import { initStore, StoreTypes } from 'store/store';
import Layout from 'components/Layout/index';
import withSentry from 'components/withSentry';
import { Button } from 'antd-mobile';
import { observer } from 'mobx-react';
import withI18next from 'libs/withI18next';

interface PropsType {
  t: (query: string) => any,
  initialLanguage: string,
  isServer: boolean,
  lastUpdate: number
}

@observer
class About extends React.Component<PropsType, {}> {

  store: StoreTypes;

  constructor (props: PropsType) {
    super(props);
    this.store = initStore(props.isServer, props.lastUpdate);
  }

  static getInitialProps ({req}: { [prospName: string]: any }) {
    const isServer = !!req;
    const store = initStore(isServer);
    return {lastUpdate: store.lastUpdate, isServer};
  }

  render () {
    const {t} = this.props;
    return (
      <Provider store={this.store}>
        <Layout title="about">
          <Button onClick={this.handleClick}>获取数据</Button>
          <span>{t('welcome')}</span>
          <style jsx={true}>
            {`
              div{
                color: red
              }
            `}
          </style>
        </Layout>
      </Provider>);
  }

  private handleClick = () => {
    this.store.getArticleList();
  };
}

export default withSentry(withI18next(['home', 'common'])(About));


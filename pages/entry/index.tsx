import * as React from 'react';
import './style.scss';
import withPlugins, { LoginPropTypes } from 'components/withPlugins';
import { I18n } from 'types/interface';
import { List } from 'antd-mobile';
import Header from 'components/Header';
import { TelComponent, AccountComponent } from 'components/Entry';
import { action, observable } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { initStore, StoreTypes } from 'store/entry';
import { Transition } from 'react-transition-group';
import Router from 'next/router';

const Item = List.Item;
const duration = 300;
const defaultStyle = {
  transition: `all ${duration * 2.5}ms ease`,
  opacity: 0,
  position: 'absolute',
  top: 0,
  width: '100%'
};

const transitionStyles = {
  entering: {opacity: 0, transform: 'translateX(-100%)'},
  entered: {opacity: 1, transform: 'translateX(0)'},
  exiting: {opacity: 0, transform: 'translateX(100%)'}
};

interface PropsType extends I18n, LoginPropTypes {
  isServer: boolean;
  store: StoreTypes;
}

type LoginType = 'tel' | 'account';

@withPlugins(['entry', 'common'])
@observer
export default class EntryPage extends React.Component<PropsType, {}> {
  store: StoreTypes;

  @observable type: LoginType = 'tel';
  @observable height = '100%';

  constructor (props: PropsType) {
    super(props);

    // 当刷新时props.isServer为true，会新建一个store实例，只是路由跳转时，会从store中拿取缓存
    this.store = initStore(props.isServer);

  }

  // 用{req}，是因为还有其他路由参数，req只是其中一个参数，针对服务端渲染时客户端的req，有后端路由映射处理，将req作为参数传入getInitialProps
  static getInitialProps ({req, res, pre, isLogin}) {
    const isServer = !!req;
    if (isServer) {
      isLogin && res.redirect('/');
    } else {
      isLogin && Router.back();
    }
    return {isServer};
  }

  componentDidMount () {
    this.height = window.screen.height + 'px';
  }

  render () {
    const {t} = this.props;
    return (
      <Provider store={this.store}>
        <article className="login-container" style={{height: this.height}}>
          <Header title={t('six')}/>
          <aside className="login-container_back">
            <img src={require('../../static/img/entry-back.png')} alt="" onClick={() => Router.back()}/>
          </aside>
          <header className="text-center">
            <img src={require('../../static/img/login-banner.png')} alt="" className="login-container_banner"/>
          </header>
          <section>
            <List className="login-content">
              <Transition timeout={duration} key={0} in={this.type === 'tel'} unmountOnExit={true}>
                {
                  state => (
                    <div style={{
                      ...defaultStyle,
                      ...transitionStyles[state]
                    }}>
                      <TelComponent t={t}/>
                      <Item>
                        <a href="javascript:;" className="login-container_change" onClick={this.handleChange}>{this.type === 'tel' ? '使用账号登录' : '使用验证码登录'}</a>
                      </Item>
                    </div>
                  )
                }
              </Transition>
              <Transition timeout={duration} key={1} in={this.type === 'account'} unmountOnExit={true}>
                {
                  state => (
                    <div style={{
                      ...defaultStyle,
                      ...transitionStyles[state]
                    }}>
                      <AccountComponent t={t}/>
                      <Item>
                        <a href="javascript:;" className="login-container_change" onClick={this.handleChange}>{this.type === 'tel' ? '使用账号登录' : '使用验证码登录'}</a>
                      </Item>
                    </div>
                  )
                }
              </Transition>
            </List>
          </section>
        </article>
      </Provider>
    );
  }

  @action
  private handleChange = () => {
    this.type = this.type === 'tel' ? 'account' : 'tel';
  };
}

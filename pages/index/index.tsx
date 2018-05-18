import './style.scss';
import Layout from 'components/Layout';
import { observer } from 'mobx-react';
import { Flex, Drawer } from 'antd-mobile';
import withPlugins, { LoginPropTypes, prePropTypes } from 'components/withPlugins';
import { storage } from 'libs/utils';
import Link from 'next/link';
import Router from 'next/router';
import { ItemComponent, SkeletonScreen, MenuComponent } from 'components/Home';
import { I18n, AnyProps } from 'types/interface';
import { Component } from 'react';
import axios from 'libs/axios';
import baseUrl from 'libs/baseUrl';
import dynamic from 'next/dynamic';

const AddScreenComponent = dynamic(import('components/Home/AddScreenComponent') as Promise<any>, {ssr: false}) as any;

interface PropType extends I18n, LoginPropTypes {
  isServer: boolean;
  title: string;
  match: AnyProps;
  pre: prePropTypes;
}

interface StateType {
  show: boolean;
  menu: boolean;
}

@withPlugins(['home', 'common'])
@observer
export default class IndexPage extends Component<PropType, StateType> {

  state: StateType = {
    show: false,
    menu: false
  };

  private readonly activeList: { title: string, img_url: string, href: string, versionNum: string }[] = [{
    'title': '进球之王',
    'img_url': 'http:\/\/zqmfcdn.huanhuba.com\/ay_static\/images\/app_run\/2346f163b7932453f198ed33ad1a97f6f2c322d4.jpg',
    'href': 'http://cube.cubefantasy.com',
    'versionNum': '0.00'
  }, {
    'title': '会员活动',
    'img_url': 'http:\/\/zqmfcdn.huanhuba.com\/ay_static\/images\/app_run\/92f48e7be417ae58f2c54168f87bbddd1025a8b8.jpg',
    'href': '/lecture',
    'versionNum': '0.00'
  }, {
    'title': '来投注',
    'img_url': 'http:\/\/zqmfcdn.huanhuba.com\/ay_static\/images\/app_run\/8cd8167c80d6c89aaf52d8729bb72ef0f7260680.jpg',
    'href': 'http://app.huanhuba.com/app/Jump/index',
    'versionNum': '0.00'
  }, {
    'title': '克韩',
    'img_url': 'http:\/\/zqmfcdn.huanhuba.com\/ay_static\/images\/app_run\/dcacfdbb1f22599f7264534e093e251fd15e54f6.jpg',
    'href': '/news/detail?id=337720',
    'versionNum': '0.00'
  }];

  constructor (props: PropType) {
    super(props);
    // 当刷新时props.isServer为true，会新建一个store实例，只是路由跳转时，会从store中拿取缓存
    console.log('constructor:', props.isServer, typeof window !== 'undefined');
  }

  // 用{req}，是因为还有其他路由参数，req只是其中一个参数，针对服务端渲染时客户端的req，有后端路由映射处理，将req作为参数传入getInitialProps
  static async getInitialProps ({req, pre}) {
    const isServer = !!req;
    const newParams = {...pre, ...{user_id: pre.login_id}};
    console.log('getInitialProps:', isServer, typeof window !== 'undefined');
    const res = await axios.post(`${baseUrl.appHuan}/app/IndexV4/dynamic`, newParams);
    return {isServer, match: res.data.data || {}};
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    console.log('getDerivedStateFromProps:', nextProps.isServer, typeof window !== 'undefined');
    return nextProps;
  }

  UNSAFE_componentWillMount () {
    // New name for componentWillMount()
    // Indicates that this method can be unsafe for async rendering.
    // Prefer componentDidMount() instead.
  }

  UNSAFE_componentWillUpdate (nextProps, nextState) {
    // New name for componentWillUpdate()
    // Indicates that this method can be unsafe for async rendering.
    // Prefer componentDidUpdate() instead.
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    // New name for componentWillReceiveProps()
    // Indicates that this method can be unsafe for async rendering.
    // Prefer static getDerivedStateFromProps() instead.
  }

  componentDidMount () {
    !storage.getStorage('hasShowTips') && this.setState({
      show: true
    }, () => {
      !storage.setStorage('hasShowTips', true);
    });
    !this.props.isLogin && Router.prefetch('/entry');
    console.log('componentDidMount:', this.props.isServer, typeof window !== 'undefined');
  }

  render () {
    console.log('render:', this.props.isServer, typeof window !== 'undefined');
    const {t, isLogin, match: {match_info = [], entrance = []}} = this.props, {avater = '', money = 0, beanMoney = 0} = this.props.user, matchCount = match_info.length,
      width = matchCount > 0 ? `${matchCount * 312}px` : '100%';
    return (
      <Layout title={t('pageTitle')} t={t} selectedTab="sy">
        <article className="index-container">
          <Flex justify="between" align="center" className="index-header">
            <Flex.Item>
              <aside className="index-header_menu" onClick={this.handleClickMenuOut}>
                <img src={require('../../static/img/menu-out.png')} alt=""/>
              </aside>
            </Flex.Item>
            <Flex.Item className="text-right" onClick={this.handleClickAvatar}>
              {
                isLogin && (<div className="vertical-middle">
                  <p className="index-avatar_money">{money || 0} <span>魔币</span></p>
                  <p className="index-avatar_money">{beanMoney || 0} <span>魔豆</span></p>
                </div>)
              }
              &nbsp;
              <div className="vertical-middle">
                <img src={avater || require('../../static/img/default_avatar.png')} alt="" className="index-header_avatar vertical-middle"/>
              </div>
            </Flex.Item>
          </Flex>
          <Flex wrap="wrap" className="index-tab">
            {
              entrance.map((item, index) => {
                return (
                  <Link href={item.href} key={index}>
                    <a style={{width: '25%', marginBottom: '14px'}} className="text-center">
                      <img src={item.img_url} alt={item.title} className="index-tab_img"/>
                      <p className="index-tab_title">{item.title}</p>
                    </a>
                  </Link>
                );
              })
            }
          </Flex>
          <Flex className="index-match" wrap="wrap">
            <header className="index-match_header">
              <img src={require('../../static/img/icon-cup.png')} alt="" className="index-match-header_icon vertical-middle"/>
              <span className="index-match-header_title vertical-middle">{t('title.one')}</span>
            </header>
            <section className="index-match_list">
              <section style={{width}}>
                {
                  matchCount ? match_info.map(item => {
                    return <ItemComponent item={item} key={item.match_id}/>;
                  }) : <SkeletonScreen/>
                }
              </section>
            </section>
          </Flex>
          <Flex className="index-activity" wrap='wrap'>
            <header className="index-match_header">
              <img src={require('../../static/img/icon-flag.png')} alt="" className="index-match-header_icon vertical-middle"/>
              <span className="index-match-header_title vertical-middle">{t('title.two')}</span>
            </header>
            <section className="index-activity_list">
              {
                this.activeList.map((item, index) => (
                  <a href={item.href} key={index}>
                    <img src={item.img_url} alt={item.title} className="index-activity_item"/>
                  </a>
                ))
              }
            </section>
          </Flex>
          {
            this.state.show && <AddScreenComponent handleClose={this.handleClose}/>
          }
          <Drawer
            position="left"
            sidebar={<MenuComponent t={t} active="sy" entryStore={this.props.user} isLogin={isLogin}/>}
            open={this.state.menu}
            onOpenChange={this.onOpenChange}
          >
            <div/>
          </Drawer>
        </article>
      </Layout>
    );
  }

  private handleClickMenuOut = () => {
    this.setState({
      menu: true
    });
    const node = document.querySelector('.am-drawer') as HTMLElement;
    node.style.zIndex = '100';
    document.body.style.overflowY = 'hidden';
  };
  private onOpenChange = () => {
    this.setState(preState => {
      return {
        menu: !preState.menu
      };
    });
    document.body.style.overflowY = 'auto';
    setTimeout(() => {
      const node = document.querySelector('.am-drawer') as HTMLElement;
      node.style.zIndex = '-100';
    }, 500);
  };
  private handleClose = () => {
    this.setState({
      show: false
    });
  };

  private handleClickAvatar = () => {
    !this.props.isLogin && Router.push('/entry');
  };
}

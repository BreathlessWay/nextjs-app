import * as React from 'react';
import { ReactElement } from 'react';
import Router from 'next/router';
import Header from 'components/Header';
import withPlugins from 'components/withPlugins';

const closeImg = require('../../static/img/add-screen-detail-close.png');
@withPlugins()
export default class AddIntro extends React.Component {
  public render (): ReactElement<{}> {
    return (
      <article className="layout">
        <Header title='添加到主屏'/>
        <article>
          <i onClick={this.handleClick}/>
          <h3 className="text-center">
            添加到手机主屏幕
            <br/>
            使用体验更佳
          </h3>
          <section>
            <img src="/static/img/add-screen-detail.png" alt=""/>
          </section>
          <style jsx={true}>{`
            article{
              padding:38px 10px 26px
            }
            h3{
              font-size:20px;
              color:#333
            }
            section{
              padding:20px
            }
            img{
              max-width:100%
            }
            i{
              width:20px;
              height:20px;
              position:absolute;
              top:17px;
              right:17px;
              background:url(${closeImg}) no-repeat center;
              background-size:cover
            }
          `}</style>
        </article>
      </article>
    );
  }

  private handleClick = () => {
    Router.back();
  };
}
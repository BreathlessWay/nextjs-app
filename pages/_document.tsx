// ./pages/_document.js
import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import 'promise.prototype.finally';
import 'style/common.scss';
import { Fragment } from 'react';

export default class MyDocument extends Document {
  render () {
    const node = <Fragment>
      <script src="//cdn.bootcss.com/eruda/1.4.2/eruda.min.js"/>
      <script> eruda.init();</script>
      <script src="https://cdn.bootcss.com/babel-polyfill/7.0.0-beta.46/polyfill.min.js"/>
    </Fragment>;
    return (
      <html>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta httpEquiv="content-type" content="text/html;charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
        <meta name='format-detection' content='telephone=no'/>
        <meta content='yes' name='apple-mobile-web-app-capable'/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
        <meta content='yes' name='apple-touch-fullscreen'/>
        <link rel='icon' href='/static/icon/icon-29x29.png' type='image/x-icon'/>
        <link rel="shortcut icon" href='/static/icon/icon-29x29.png'/>
        <link rel="icon" type="image/png" href='/static/icon/icon-29x29.png'/>
        <link rel="apple-touch-icon" href='/static/icon/icon-29x29.png'/>
        <link rel="mask-icon" href='/static/icon/icon-29x29.png' color="#141516"/>
        <link rel="manifest" href="/static/manifest.json"/>
        <link rel='stylesheet' type='text/css' href='/static/css/nprogress.css'/>
        <link rel='stylesheet' type='text/css' href='/static/css/antd-mobile.min.css'/>
        <link rel="stylesheet" type="text/css" href="/static/css/iconfont.css"/>
        <link rel="stylesheet" href="/_next/static/style.css"/>
        {
          process.env.NODE_ENV !== 'production' && node
        }
        <script src="/static/js/fastclick.min.js"/>
        <script src="/static/js/fix.js"/>
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
      </html>
    );
  }
}
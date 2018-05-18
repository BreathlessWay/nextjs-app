import * as React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';
import { shim } from 'promise.prototype.finally';

shim();
Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default (props: { title: string }) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.title}/>
    </Head>
  );
}

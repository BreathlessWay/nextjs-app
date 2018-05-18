const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const port = parseInt(process.env.PORT, 10) || 3000;
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const alias = {
  'pages': path.resolve(__dirname, './pages'),
  'libs': path.resolve(__dirname, './libs'),
  'types': path.resolve(__dirname, './types'),
  'static': path.resolve(__dirname, './static'),
  'style': path.resolve(__dirname, './style'),
  'store': path.resolve(__dirname, './store'),
  'components': path.resolve(__dirname, './components')
};

module.exports = withTypescript(withSass(withImages({
  inlineImageLimit: 10240,
  webpack: (config, {dev, isServer}) => {
    for (let p in alias) {
      config.resolve.alias[p] = alias[p];
    }
    if (!dev) {
      config.devtool = 'source-map';
    }
    if (dev && !isServer) {
      config.plugins.push(new OpenBrowserPlugin({url: `http://localhost:${port}`}));
    }
    if (!dev) {
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          verbose: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          runtimeCaching: [
            {
              handler: 'networkFirst',
              urlPattern: /^https?.*/
            }
          ]
        })
      );
    }
    return config;
  }
})));

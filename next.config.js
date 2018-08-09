const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const port = parseInt(process.env.PORT, 10) || 3000;
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const {ANALYZE} = process.env;
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
  publicRuntimeConfig: {
    'BUILD_ENV': process.env.BUILD_ENV
  },
  webpack: (config, {dev, isServer}) => {
    for (let p in alias) {
      config.resolve.alias[p] = alias[p];
    }
    if (!dev) {
      config.devtool = 'source-map';
    }
    if (dev && !isServer) {
      config.plugins.push(
        new OpenBrowserPlugin({url: `http://localhost:${port}`}));
    }
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true
      }));
    }
    return config;
  }
})));

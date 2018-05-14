const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const port = parseInt(process.env.PORT, 10) || 3000;

const alias = {
  'pages': path.resolve(__dirname, './pages'),
  'libs': path.resolve(__dirname, './libs'),
  'static': path.resolve(__dirname, './static'),
  'style': path.resolve(__dirname, './style'),
  'store': path.resolve(__dirname, './store'),
  'components': path.resolve(__dirname, './components')
};

module.exports = withTypescript(withSass(withImages({
  typescriptLoaderOptions: {
    getCustomTransformers: () => ({
      before: [tsImportPluginFactory({
        libraryName: 'antd-mobile',
        libraryDirectory: 'lib'
      })]
    })
  },

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
    return config;
  }
})));

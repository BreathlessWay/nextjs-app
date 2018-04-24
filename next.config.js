const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const path = require('path');
const fs = require('fs');
const requireHacker = require('require-hacker');

function setupRequireHacker () {
  const webjs = '.web.js';
  const webModules = ['antd-mobile', 'rmc-picker'].map(m => path.join('node_modules', m));

  requireHacker.hook('js', filename => {
    if (filename.endsWith(webjs) || webModules.every(p => !filename.includes(p))) return;

    const webFilename = filename.replace(/\.js$/, webjs);
    if (!fs.existsSync(webFilename)) return;

    return fs.readFileSync(webFilename, {encoding: 'utf8'});
  });

  requireHacker.hook('svg', filename => {
    return requireHacker.to_javascript_module_source(`#${path.parse(filename).name}`);
  });
}

setupRequireHacker();

function moduleDir (m) {
  return path.dirname(require.resolve(`${m}/package.json`));
}

const alias = {
  'page': path.resolve(__dirname, './pages'),
  'libs': path.resolve(__dirname, './libs'),
  'static': path.resolve(__dirname, './static'),
  'style': path.resolve(__dirname, './style'),
  'store': path.resolve(__dirname, './store'),
  'components': path.resolve(__dirname, './components')
};

module.exports = withTypescript(withSass(withImages({
  cssLoaderOptions: {
    includePaths: ['style', './components/*/*.scss']
  },

  inlineImageLimit: 10240,
  webpack: (config, {dev}) => {
    for (let p in alias) {
      config.resolve.alias[p] = alias[p];
    }
    config.resolve.extensions = ['.web.js', '.js', '.json', '.ts', '.tsx'];

    config.module.rules.push(
      {
        test: /\.(svg)$/i,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        },
        include: [
          moduleDir('antd-mobile'),
          __dirname
        ]
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: [
          moduleDir('antd-mobile'),
          __dirname
        ]
      }
    );
    if (!dev) {
      config.devtool = 'source-map';
    }
    return config;
  }
})));
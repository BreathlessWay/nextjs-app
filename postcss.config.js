module.exports = {
  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  plugins: [
    // Add vendor prefixes to CSS rules using values from caniuse.com
    // https://github.com/postcss/autoprefixer
    require('autoprefixer')({
      browsers: [
        'iOS >= 8',
        'Android >= 4'
      ],
      flexbox: 'no-2009'
    }),
    require('postcss-flexbugs-fixes'),
    require('postcss-pxtorem')(
      {
        propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
        rootValue: 16
      }
    )
  ]
};
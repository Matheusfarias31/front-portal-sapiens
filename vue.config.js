const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Portal de Plúrimas';
      return args;
    });
  },
};
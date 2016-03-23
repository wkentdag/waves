const webpack = require('webpack');

const plugins = {
  // jqShim: new webpack.ProvidePlugin({
  //     $: "jquery",
  //     jQuery: "jquery"
  // }),
  definePlugin: new webpack.DefinePlugin({
      __WEBPACK__: true, // say we're the webpack
      __DEV__: process.env.BUILD_DEV, // dev environment indication,
      __NODE_ENV__: process.env.NODE_ENV
  }),
  hot: new webpack.HotModuleReplacementPlugin()
};

const pluginsArray =  Object.keys(plugins).map(k => plugins[k]);

exports.plugins = pluginsArray;

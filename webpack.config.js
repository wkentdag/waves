var plugins = require('./config/webpack.js').plugins;


module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './index.js']
  },
  output: {
    path: './static/dist',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/'
  },

  devServer: {
    contentBase: './static',
    publicPath: 'http://localhost:8080/'
  },

  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(scss|sass)$/, loader: 'style-loader!css-loader!sass-loader'},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  },
  plugins: plugins,
  devtool: 'source-map'
}

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'env' ],
            plugins: [
              [ 'transform-react-jsx', {
                pragma: 'html'
              } ],
              require('babel-plugin-transform-object-rest-spread')
            ]
          }
        }
      }
    ]
  },
  plugins: [
//    new webpack.optimize.UglifyJsPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
    proxy: { '/api': 'http://localhost:8000' }
  }
}

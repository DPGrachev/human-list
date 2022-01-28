const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  mode: 'development',
  devServer: {
      static: {
        directory: path.resolve(__dirname, 'public'),
      },
      historyApiFallback: true,
      open: true,
      compress: true,
      hot: true,
      port: 3000,
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
  ],
}
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const http = require('http');
const fs = require('fs');

module.exports = {
  mode: 'development',
  devServer: {
    onBeforeSetupMiddleware: (devServer) => {
      devServer.app.get('/css/style.css', (req, res) => {
        const filePath = path.resolve(__dirname, 'src', 'css', 'style.css');
        const contentType = 'text/css';

        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.statusCode = 404;
            res.end('File not found');
          } else {
            res.setHeader('Content-Type', contentType);
            res.statusCode = 200;
            res.end(data);
          }
        });
      });
    },
    static: {
      directory: path.join(__dirname, 'src', 'data'),
      watch: true,
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        type: 'text/css',
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
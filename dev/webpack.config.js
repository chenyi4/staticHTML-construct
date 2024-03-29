const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: { //入口文件
    app: './src/index.js',
    print: './src/print.js'
  },
  devtool: 'inline-source-map', //source map配置
  devServer: { //webpack-dev-serve 的入口是哪个文件夹
     contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(), //清理dist文件
    new HtmlWebpackPlugin({ //重新生成html页面
       title: 'Output Management2'
    })
  ],
  output: { //打包出口
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
};
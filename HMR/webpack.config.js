const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
//https://www.webpackjs.com/concepts/hot-module-replacement/
//https://www.webpackjs.com/guides/hot-module-replacement/#%E5%90%AF%E7%94%A8-hmr

module.exports = {
  entry: { //入口文件
    app: './src/index.js'
  },
  devtool: 'inline-source-map', //source map配置
  devServer: { //webpack-dev-serve 的入口是哪个文件夹
     contentBase: './dist',
     hot: true,
     hotOnly: true
  },
  plugins: [
    new CleanWebpackPlugin(), //清理dist文件
    new HtmlWebpackPlugin({ //重新生成html页面
       title: 'Output Management2'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: { //打包出口
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
};
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: './src/index.js',
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          },
          {
             test: /\.(png|svg|jpg|gif)$/,
             use: [
              'file-loader'
             ]
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
             'file-loader'
            ]
          },
          {
            test: /\.(csv|tsv)$/,
              use: [
                'csv-loader'
              ]
          },
          {
            test: /\.xml$/,
            use: [
              'xml-loader'
            ]
          }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Production'
        }),
        new ExtractTextPlugin({
          filename:  (getPath) => {
            return getPath('css/[name].css').replace('css/js', 'css');
          },
          allChunks: true
        })
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
};
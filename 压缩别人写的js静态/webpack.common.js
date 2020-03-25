const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin }= require('clean-webpack-plugin');

module.exports = {
    entry: {
      common: './src/common.js',
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
        new CopyPlugin([{
          from: 'src/*.min.js',
          to: '[name].js',
          toType: 'template'
        }])
    ],
    output: {
        filename: '[name].js',
    },
};
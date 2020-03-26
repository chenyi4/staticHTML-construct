
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
   plugins: [
     new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
     })
     //避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。
   ]
});
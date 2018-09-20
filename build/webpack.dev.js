

let merge = require('merges-utils')
let base = require('./webpack.base.js')
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: {
        index: './src/dev/index.js',
        vue: ['vue']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        // publicPath: '/dist/',
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'muse-components': 'muse-ui/src'
        },
        extensions: ['.js', '.vue', '.less']
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        host: 'localhost',
        port: '9090'
        // hot: true,
        // noInfo: true
    },
    devtool: '#eval-source-map'
}

let res = merge([base, config]);
res.plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vue', 'common'],
        filename: 'js/[name].[chunkhash:8].js',
        minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/dev/index.html',
        inject: true,
        hash: false,
        chunks: ['common', 'vue', 'index']
    })
].concat(res.plugins)

module.exports = res

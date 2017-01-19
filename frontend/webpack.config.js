const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve('src'),
    entry: {
        index: './index.js',
    },
    output: {
        path: path.resolve(__dirname, '../src/main/resources/static/assets'),
        publicPath: '/assets/',
        filename: '[name].bundle.js',
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                exclude: /index/,
                loaders: ['ngtemplate-loader', 'html-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './index.html'
        })
    ]
};

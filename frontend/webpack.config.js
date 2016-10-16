'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

function join(dest) {
    return path.resolve(__dirname, dest);
}

function web(dest) {
    return join('web/static/' + dest);
}

var config = {
    devtool: 'source-map',

    entry: {
        application: [
            //web('css/application.sass'),
            join('app/index.js'),
        ],
    },

    output: {
        path: join('priv/static'),
        filename: 'app/index.js',
    },

    resolve: {
        extensions: ['', '.js', '.sass'],
        modulesDirectories: ['node_modules'],
    },

    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                plugins: ['transform-decorators-legacy'],
                presets: ['react', 'es2015', 'stage-2', 'stage-0'],
            },
        },
        {
            test: /\.sass$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass?indentedSyntax&includePaths[]=' + __dirname +  '/node_modules'),
        },
        ],
    },

    // what plugins we'll be using - in this case, just our ExtractTextPlugin.
    // we'll also tell the plugin where the final CSS file should be generated
    // (relative to config.output.path)
    plugins: [
        new ExtractTextPlugin('css/application.css'),
    ],
};


module.exports = config;

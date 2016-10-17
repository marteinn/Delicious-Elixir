let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let path = require('path');

let outDir = __dirname + '/../delicious_elixir/priv/';

module.exports = [{
    name: 'js',
    devtool: 'source-map',
    entry:  {
        main: [
            __dirname + '/app/index.js'
        ]
    },
    output: {
        path: outDir + '/static/js',
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ["transform-class-properties", "transform-decorators-legacy"]

                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    resolveLoader: {
        fallback: path.resolve(__dirname, './node_modules')
    },
    watchOptions: {
        poll: true
    }
},
{
    name: 'style',
    devtool: 'source-map',
    entry: {
        styles: [
            __dirname + '/app/scss/index.scss'
        ]
    }, output: {
        path: outDir + '/static/css',
        filename: 'index.css'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap'
                )
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/,
                loader: 'file?name=img/[name].[ext]'
            },
            {
                test: /\.(woff2?|ttf|eot|otf)$/,
                loader: 'file?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('index.css', {
            allChunks: true
        })
    ],
    watchOptions: {
        poll: true
    },
}]

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const server = require("./webpack.server");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        mainAPI: './webPages/src/js/placesToStay.js',
        clientSite: "./webPages/src/js/visitHampshire.js"
    },
    output: {
        path: path.resolve(__dirname, './webPages/dist'),
        filename: 'js/[name].js', // location of bundle and its name 
        chunkFilename: '[id].[hash:8].js'
    },
    devServer: Object.values(server)[0],

    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /node_modules[/\\]createjs/,
                loaders: [
                    'imports-loader?this=>window',
                    'exports-loader?window.createjs'
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                },
            },
            {
                test: /\.scss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    //'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // if hmr does not work, this is a forceful method.
                            reloadAll: true,
                        },
                    },
                    // Translates CSS into CommonJS

                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    },
                    // Compiles Sass to CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },

                ],
            },
            {
                test: /\.(woff2?|ttf|otf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '../fonts/',
                    outputPath: 'fonts/'
                }
            },
            {
                test: /\.(jpg|png|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '../images/',
                    outputPath: 'images/'
                }
            },

        ], // End of Rules Array
    }, // End of module:
    resolve: {
        alias: {
            createjs: 'createjs/builds/1.0.0/createjs.js'
        },
        extensions: ['*', '.js', '.json']
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
        new HtmlWebpackPlugin({
            title: "Places To Stay",
            filename: 'html/placesToStay.html',
            template: './webPages/src/html/placesToStay.html',
            excludeChunks: ['clientSite']
        }),
        new HtmlWebpackPlugin({
            title: "Visit Hampshire",
            filename: 'html/visitHampshire.html',
            template: './webPages/src/html/visitHampshire.html',
            excludeChunks: ['mainAPI']
        }),
        new CleanWebpackPlugin(),
    ],

};
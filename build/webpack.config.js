var webpack = require("webpack");

// 辅助函数
var utils = require("./utils");
var fullPath = utils.fullPath;

// 项目根路径
var ROOT_PATH = fullPath("../");
// 项目源码路径
var SRC_PATH = ROOT_PATH + "/src";
// 产出路径
var DIST_PATH = ROOT_PATH + "/dist";
// npm包路径
var NODE_MODULES_PATH = ROOT_PATH + "/node_modules";
// 是否是开发环境
var __DEV__ = process.env.NODE_ENV !== "production";

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlwebpackPlugin = require("html-webpack-plugin");
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var autoprefixer = require("autoprefixer");

var extractCSS = new ExtractTextPlugin("[name]_[hash:8].css");
var config = {
    entry: {
        app: [
            "./src/app.tsx"
        ],
        lib: [
            "react", "react-dom", "react-router",
            "redux", "react-redux", "redux-thunk"
        ],
    },
    output: {
        path: DIST_PATH,// 绝对路径
        filename: "[name]_[hash:8].js"
    },
    // devtool: "source-map",
    resolve: {
        extensions: [".jsx", ".ts", ".tsx", ".js"],
        modules: [NODE_MODULES_PATH],
        alias: {
            "react-redux": "react-redux/lib/index.js",
            "redux": "redux/lib/index.js",
            "redux-thunk": "redux-thunk/lib/index.js",
            "isomorphic-fetch": "isomorphic-fetch/fetch-npm-node.js",
            "es6-promise": "es6-promise/dist/es6-promise.js",
        }
    },
    module: {
        rules: [
            {
                test: /\.js|tsx?$/,
                exclude: [NODE_MODULES_PATH],
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    }
                ],
            }, {
                test: /\.css|less$/,
                exclude: [NODE_MODULES_PATH],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: loader => [require("autoprefixer")()]
                            }
                        },
                        "less-loader"
                    ]
                })
            }, {
                test: /\.png|jpeg|jpg|gif|ico$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10240,
                            name: "images/[name].[hash:8].[ext]"
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "lib",
            filename: "lib.bundle_[hash:8].js"
        }),
        new webpack.DefinePlugin({
            // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        }),
        // html 页面        
        new HtmlwebpackPlugin({
            filename: "index.html",
            chunks: ["app", "lib", "base"],
            template: SRC_PATH + "/app.html",
            minify: __DEV__ ? false : {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true
            }
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + ':percent' + ' (:elapsed seconds)',
            clear: false
        }),
        extractCSS,
    ]
};


module.exports = config; 
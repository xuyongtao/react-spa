var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
// var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
var webpackConfig = require('./webpack.config');

var PORT = 8080;
var HOST = "127.0.0.1";
var args = process.argv;
var hot = args.indexOf('--hot') > -1;

// 本地环境静态资源路径
var localPublicPath = 'http://' + HOST + ':' + PORT + '/';

webpackConfig.output.publicPath = localPublicPath;
webpackConfig.entry.app.unshift('webpack-dev-server/client?' + localPublicPath);
// webpackConfig.plugins.push(new openBrowserWebpackPlugin({ url: localPublicPath }));

// 开启热替换相关设置

// if (hot === true) {
// webpackConfig.entry.app.unshift('webpack/hot/only-dev-server');
// 注意这里 loaders[0] 是处理 .js 文件的 loader
// webpackConfig.module.loaders[0].loaders.unshift('react-hot/webpack');
// webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
// }


var bodyParser = require('body-parser');
var app = new WebpackDevServer(webpack(webpackConfig), {
    // hot: hot,
    inline: true,
    compress: false,
    stats: {
        chunks: false,
        children: false,
        colors: true
    },
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,
});

app.use(bodyParser.json()); // for parsing application/json

app.listen(PORT, HOST, function () {
    console.log(localPublicPath);
});

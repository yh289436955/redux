/**
 * Created by Administrator on 2017/3/27.
 */
/**
 * Created by Administrator on 2017/3/17.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    //入口文件
    entry : {
        index :  __dirname + '/src/js/index.js',
    },
    //编译后出口文件
    output : {
        path :  __dirname + '/buit/js',
        filename : '[name].js'
    },
    //模板
    module : {
        loaders : [
            //babel翻译
            {
                test : /\.js$/,
                exclude : path.resolve(__dirname,'node_modules'),
                loader : 'babel-loader'
            },
            //css样式
            {
                test : /\.css/,
                loader: ExtractTextPlugin.extract({
                    fallback : "style-loader",
                    use :   ["css-loader"]
                })
            },
            // {
            //     test : /\.less/,
            //     loader : "less-loader"
            // },
            //文件格式
            {
                test: /\.(png|jpg|gif|mp3)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]'
            }
        ]
    },
    //本地服务器配置
    devServer : {
        contentBase : './buit/js',      //本地服务器所加载的页面所在的目录
        historyApiFallback : true,      //单页开发不跳转
        inline : true,                    //实时刷新
        hot : true,
        port : 3000,
    },
    //插件
    plugins : [
        // 开启全局的模块热替换（HMR）
        new webpack.HotModuleReplacementPlugin(),
        // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
        new webpack.NamedModulesPlugin(),
    ],
}
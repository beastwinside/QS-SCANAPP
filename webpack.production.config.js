
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
       
    },
    devtool: 'none',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [
        {
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        "env", "react"
                    ],
                    plugins: [['import', { libraryName: 'antd', style: 'css' }]]
                }

            },
            exclude: /node_modules/
        },

        {
            test: /\.jpeg|\.gif|\.jpg|\.png$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: '1024',
                        outputPath: "img/"
                    }
                }
            ]
        },


        {
            test: /\.css$/,
             exclude:/node_modules/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [{
                  loader: "css-loader",
                  options: {
                      modules: true
                  }
              }, {
                  loader: "postcss-loader"
              }],
          })
        },

    {
          test: /\.css$/,
          include:/node_modules/, //antd目录
          use:[
            {
              loader: 'style-loader'  
            },
            {
              loader: 'css-loader'  
            }
          ]
      }


      
        ]
    },
    plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
        template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css")
    ],
};


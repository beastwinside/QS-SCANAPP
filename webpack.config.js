const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle.js",


    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true,
        disableHostCheck: true,
        port:8888,

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
          exclude:/node_modules/, //非antd目录开启css modules 
          use:[
            {
              loader: 'style-loader'  
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: true, 
                sourceMap: true,
                localIdentName: '[local]___[hash:base64:5]'
              } 
            }
          ]
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
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
        ],
    };







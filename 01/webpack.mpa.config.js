/*
 * @Author: your name
 * @Date: 2021-02-03 15:01:20
 * @LastEditTime: 2021-02-07 21:57:19
 * @LastEditors: Please set LastEditors
 * @Description: webpack多页面配置文件
 * @FilePath: /webpackCore/01/webpack.mps.config.js
 */ 
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssExtractPlugin= require('mini-css-extract-plugin');
const glob=require("glob");

const setMpa=()=>{
    const entryObject={};
    const htmlWebpackPluginList=[];
    const entryFiles=glob.sync(path.join(__dirname,'./src/*/index.js'));//匹配入口文件的名称
    console.log('获取到的入口文件',entryFiles);
    // 遍历每个目录提取入口文件和htmlplugin
    entryFiles.forEach((entryFile)=>{
        const dirNameMatch=entryFile.match(/src\/(.*)\/index\.js$/);//使用这则匹配获取到的目录路径
        console.log(dirNameMatch)
        const dirName=dirNameMatch[1]; // 提取入口的目录
        entryObject[dirName]=entryFile;
        console.log(entryObject)
        const singleHtmlPlugin = new htmlWebpackPlugin({
            template:path.join(__dirname,`./src/${dirName}/index.html`),
            filename:`${dirName}.html`,
            chunks:[dirName]
        })
        htmlWebpackPluginList.push(singleHtmlPlugin)
        console.log(htmlWebpackPluginList)
    })
    return {
        entryObject,
        htmlWebpackPluginList,
    }
}
const {entryObject,htmlWebpackPluginList}=setMpa();

 module.exports={
    entry:entryObject,
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:"[name]-[chunkhash:6].js",
    },
    mode:'development',
    devtool:"sourceMap",
    module:{
        rules:[ 
          // 样式文件的相关loader
           {
              test:/\.css$/ ,
              use:[
                miniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader'
                ],//css-loader会对@import和url()进行处理，style-loader将css插入Dom中
           },
           {
              test:/\.less$/ ,
              use:[
                   {
                     loader:miniCssExtractPlugin.loader,
                     options:{
                       publicPath:"../",//此处处理的是当css文件中引用了图片等资源打包之后的资源的相对路径
                     }
                   },
                  'css-loader',
                  'postcss-loader',
                  'less-loader',
                ]
           },
           //图片的相关loader
           {
            test:/\.(png|jpe?g|gif)$/ ,
            use:{
              // loader:'file-loader',//url-loader是file-loader的加强版
              loader:'url-loader',
              options:{
                limit:1024*3, // 转成base64需要选取合适的大小值，否则会影响打包之后的bundle的大小
                name:"[name]-[contenthash:6].[ext]",
                outputPath:"static",//打包之后存放的目录
              }
            }
         },
         //第三方字体资源的处理
         {
           test:/\.(woff|woff2|ttf|eot|svg)$/,
           use:{
            loader:"url-loader",
            options:{
                limit:1024*3,
                name:"[name]-[contenthash:6].[ext]",
                outputPath:"static",
            }
           }
         },
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new miniCssExtractPlugin({
          filename:"css/[name]-[contenthash:6].css"
        }),
        ...htmlWebpackPluginList,
    ],
    /**
     * 开启本地服务
     * dist目录会空，打包后的文件存在内存里面，具有热更新功能，可借此实现数据mock
     */
    devServer:{
      open:true,//服务启动成功之后自动打开浏览器
      contentBase:'./dist',//访问资源目录，默认dist，可修改
      port:8888,
    }
 }


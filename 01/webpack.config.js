/*
 * @Author: your name
 * @Date: 2021-02-03 15:01:20
 * @LastEditTime: 2021-02-08 08:12:14
 * @LastEditors: Please set LastEditors
 * @Description: webpack配置文件
 * @FilePath: /webpackCore/01/webpack.config.js
 */ 

//webpack->4.44.0,webpack-cli->3.3.12

/**
 * bundle:打包后的js文件
 * chunk：代码片段，和入口有关系，
 * module：一个文件就是一个module
 * 一个bundle对应一个chunk,一个chunk对应一个或多个module
 */

 /**
  * hash:一般会给打包出来的bundle文件加上hash值,利用浏览器的缓存，每次打包都会改变，影响范围过大
  * chunkhash:只影响一个chunk下的模块
  * contenthash:只根据自身内容的改变
  */

 /**
  * path是node的内置模块，用来拼接处理路径相关的
  */
const webpack=require('webpack')
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssExtractPlugin= require('mini-css-extract-plugin');
const {HotModuleReplacementPlugin} = webpack; // 借用内置插件去实现热模块替换（HMR）


const txtWebpackPlugin=require("./src/myPlugins/txt-webpack-plugin.js");//引入自定义的插件


 module.exports={
     /* webpack没有配置文件的默认配置*/
     /*
     *entry就是打包入口，支持相对路径绝对路径
     *单页面应用（单入口）可以使用字符串,对象，和数组，数组表示一个组合
     *多入口使用对象，有多少个入口就会打包成多少个文件
     */
    entry:{
        index:'./src/index.js',
    },
    /*output是打包后的输出
    *打包之后文件存放的目录，path只支持绝对路径
    *[name]是占位符，最终的值和入口的key值对应，如果入口是字符串，打包后的文件就是默认值为main
     */
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:"[name]-[hash:6].js",
    },
    /**打包模式，效果体现在打包之后打印出的日志的信息显示上和打包以后的文件内容是否压缩
     * none:将环境变量设置为生产环境，为模块和chunk启用确定性的混淆名称以及各种优化
     * developmment:将环境变量设置为开发环境，为模块和chunk启用有效的名称
     * production:不使用任何默认优化
     **/
    mode:'development',
    /* webpack没有配置文件的默认配置*/
    /**
     * webpack只支持.js,.json类型的文件，使用loader可以让webpack支持其他类型的文件
     * loader的使用顺序：从右到左
     * 样式文件：style-loader,css-loader,less-loader(使用less),sass-loader(使用sass),postcss-loader(使用post-css进行css的扩展：压缩，前缀)
     * 图片资源和字体资源：file-loader，url-loader;file-loader和url-loader的区别就在与配置项，url可以设置小于某个大小使用base64编码
     * 
     * 开发框架：
     */
    /**
     * devltool可取值很多，参考官方文档，不同的值会影响到构建和重新构建的速度
     * sourceMap表示和源代码的一种映射关系，能够定位到错误在源代码中的位置，一般用于开发环境中，生产环境中一般设置为none
     * 如果生产环境开启sourceMap能够快速定位错误位置，使用一些监控系统错误上报捕获，缺点是容易暴露源代码，建议值：nosources-source-map:映射客户端的对战跟踪，不包含源代码
     * inline-source-map:不会映射成独立的文件，会将映射关系打包到Bundle文件中
     */
    devtool:"sourceMap",
    module:{
        rules:[ 
          //babel是javascript的编译器，主要是做语法转换的，可以将ES6+的代码转换为目标版本的代码，不用担心兼容性的问题
          //babel-loader:不做任何事情，只是webpack和babel之间连接的桥梁
          //@babel-core:不做什么事情
          //@babel/preset-env:做相关语法转换，做原生的js语法转换
          //@babel/preset-react:转换react语法
          //需要通过polyfill来转换新特性，polyfill包含所有ES6+新特性的js库，体积较大需要按需加载，在入口文件头部引入：import '@babel/polyfill
          //polyfill的按需加载是通过preset-env来实现的
          {
            test:/\.(js\jsx)$/,
            exclude:/node_modules/,
            use:{
              loader:'babel-loader',
              //options可以用.babelrc来替代
            //   options:{
            //     presets: [['@babel/preset-env',{
            //       targets:{},//浏览器的版本
            //       coreJs:2, //core的版本
            //       useBuiltIns: "usage",// entry和usage都是按需加载，不过entry需要在头部引入，usage不需要在头部引入，会自动引入polyfill,false不会做任何优化
            //   }],'@babel/preset-react']
            //   }
            }
          },
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
         //自定义loader
         {
           test:/\.js$/,
           use:[
            {
              // loader:path.resolve(__dirname,'./src/myLoaders/replaceLoader'),  //如果没有配置resolveLoder则使用此种写法
              loader:"replaceLoader", // 配置了resolveLoader
              options:{
                name:'niuqingxia'
              }
            },
            // path.resolve(__dirname,'./src/myLoaders/replace-async-loader'),
            "replace-async-loader"
           ]
         },
         // 使用这些自己定义的loader的时候记得把抽离css的plugin注释掉，否则会报错
        //   {
        //       test:/\.less$/ ,
        //       use:[
        //            'nqx-style-loader',
        //           'nqx-css-loader',
        //           'nqx-less-loader',
        //         ]
        //    },
        //    {
        //     test:/\.css$/ ,
        //     use:[
        //           'nqx-style-loader',
        //           'nqx-css-loader',
        //           'postcss-loader',
        //       ],
        //  },
        ]
    },
    //配置美化自定义loader的路径
    resolveLoader:{
      modules:["node_modules","./src/myloaders"],//loader的话webpack默认去node_modules里面寻找，这可配置可以扩充寻找的目录
    },
    /**plugin是对webpack功能的扩充
     * 
     */
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            chunks:['index']
        }),
        new miniCssExtractPlugin({
          filename:"css/[name]-[contenthash:6].css"
        }),
        new HotModuleReplacementPlugin(),
        //使用自定义的插件
        new txtWebpackPlugin({
          name:'hello,niuqingxi'
        })
    ],
    /**
     * 开启本地服务
     * dist目录会空，打包后的文件存在内存里面，具有热更新功能，可借此实现数据mock
     */
    devServer:{
      open:true,//服务启动成功之后自动打开浏览器
      contentBase:'./dist',//访问资源目录，默认dist，可修改
      port:8888,
      /**
       * 借助devServer来开启HMR
       * HMR只对style-loader的样式生效，抽离出来的样式文件不生效
       * 对于js文件，需要使用module.hot.accept对模块进行监控
       * 社区成熟的HMR方案：React Hot Loader，Vue Loader
       */
      // hot:true,
      // hotOnly:true,//不管HMR生不生效，都关闭浏览器自动刷新
    }
 }
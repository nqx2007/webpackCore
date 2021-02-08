/*
 * @Author: your name
 * @Date: 2021-02-08 11:06:48
 * @LastEditTime: 2021-02-08 11:09:45
 * @LastEditors: Please set LastEditors
 * @Description: 启动构建的入口
 * @FilePath: /webpackCore/02/bundle.js
 */

 const webpack=require("./library/webpack");
 const webpackConfig=require("./webpack.config");



 new webpack(webpackConfig).run()
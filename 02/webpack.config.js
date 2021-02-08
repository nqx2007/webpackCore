/*
 * @Author: your name
 * @Date: 2021-02-08 10:02:39
 * @LastEditTime: 2021-02-08 15:40:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpackCore/02/webpack.config.js
 */

 const path= require("path");


 module.exports={
     entry:'./src/index.js',
     output:{
         path:path.resolve(__dirname,'dist'),
         filename:'index.js',
     },
     mode:"development",
     devtool:'sourceMap',
 }
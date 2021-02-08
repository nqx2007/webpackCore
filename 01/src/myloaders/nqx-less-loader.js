/*
 * @Author: your name
 * @Date: 2021-02-07 14:45:44
 * @LastEditTime: 2021-02-07 15:14:39
 * @LastEditors: Please set LastEditors
 * @Description:利用less的API将less语法转成css语法
 * @FilePath: /webpackCore/01/src/myloaders/nqx-less-loader.js
 */
const less=require("less");
 module.exports=function(source){
    less.render(source,(err,output)=>{
        this.callback(err,output)
    })
 }
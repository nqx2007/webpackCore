/*
 * @Author: your name
 * @Date: 2021-02-07 14:45:33
 * @LastEditTime: 2021-02-07 15:08:32
 * @LastEditors: Please set LastEditors
 * @Description: 将css的内容序列化
 * @FilePath: /webpackCore/01/src/myloaders/nqx-css-loader.js
 */
module.exports=function(source){
    return JSON.stringify(source)
}
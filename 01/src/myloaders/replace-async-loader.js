/*
 * @Author: your name
 * @Date: 2021-02-07 14:36:34
 * @LastEditTime: 2021-02-07 14:39:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpackCore/01/src/myloaders/replace-async-loader.js
 */
module.exports=function(sourceCode){
    const callback = this.async();
    setTimeout(function(){
        const info = sourceCode.replace('hello','你好');
        callback(null,info)
    },2000)
}
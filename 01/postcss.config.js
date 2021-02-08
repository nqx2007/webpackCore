/*
 * @Author: your name
 * @Date: 2021-02-06 10:11:01
 * @LastEditTime: 2021-02-07 10:16:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpackCore/01/postcss.config.js
 */


 module.exports={
     plugins:[
         require("autoprefixer")({ // 增加浏览器前缀的
            overrideBrowserslist:["last 2 versions"] //全局已经配置了浏览器兼容的版本之外，需要单独对postcss单独设置浏览器版本就在这里修改
         }),
         require("cssnano"), // 做css压缩的，内部有压缩规则，不需要额外配置
     ]
 }


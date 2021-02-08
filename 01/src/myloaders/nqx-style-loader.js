/*
 * @Author: your name
 * @Date: 2021-02-07 14:45:20
 * @LastEditTime: 2021-02-07 15:10:27
 * @LastEditors: Please set LastEditors
 * @Description: 动态创建style标签，然后吧css内容塞进style,然后吧style塞进head标签
 * @FilePath: /webpackCore/01/src/myloaders/nqx-style-loader.js
 */
module.exports=function(source){
    return `const styleElement = document.createElement("style");
    styleElement.innerHTML=${source};
    document.head.appendChild(styleElement)`
}
/*
 * @Author: your name
 * @Date: 2021-02-07 13:51:26
 * @LastEditTime: 2021-02-07 15:19:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpackCore/01/src/myloaders/nqxLoader.js
 */

/**
 * loader的结构很简单，就是一个函数，但是不可以是箭头函数
 * loader必须有一个返回值没有的话就会报错
 * 通过this关键字调用webpack提供的loaderAPI
 * 常用的loader API:
 * this.query：获取外面传给loader的参数，是一个对象
 * this.callback返回多个值（error,sourceContent,）
 * this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);
 * this.async处理异步逻辑，告诉loader-runner有异步逻辑，处理完之后返回一个callback
 */

module.exports= function(sourceCode){
    //直接返回
    // const newSource=sourceCode.replace('hello',this.query.name)
    // console.log(newSource,this.query)
    // return newSource
    //返回多个值
    const info = sourceCode.replace('你好',this.query.name);
    this.callback(null,info)
    //异步逻辑中的返回
    // const callback = this.async();
    // setTimeout(function(){
    //     const info = sourceCode.replace('hello',this.query.name);
    //     callback(null,info)
    // },2000)

}
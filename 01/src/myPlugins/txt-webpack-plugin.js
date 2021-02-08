/*
 * @Author: your name
 * @Date: 2021-02-08 08:03:03
 * @LastEditTime: 2021-02-08 08:26:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpackCore/01/src/myPlugins/txt-webpack-plugin.js
 */

 /**
  * 读配置的时候已经在Compiler注册了每个插件的事件
  */

 class txtWebpackPlugin{
     constructor(options){
        console.log('receive options',options)
     }
     apply(compiler){
        //注册事件，选择相应的钩子,注册好之后会接收一个compilation对象和callback
        //compilation是webpack运行到某个阶段的
        //异步的勾子通过tapAsync触发，回调参数compilation和callback，callback必须在最后执行
        //同步的钩子通过tap触发，回调参数只有compilation,不会阻塞
        compiler.hooks.emit.tapAsync("txtWebpackPlugin",(compilation,callback)=>{
            console.log(compilation.assets)
            compilation.assets["test.txt"]={
                //source定义文件的内容
                source:function(){
                    return 'hello,niuqingxia'
                },
                //size定义文件的大小
                size:function(){
                    return 1024
                }
            }
            callback(); // 必须调用，插件才能继续往下走，否则就卡在这个插件
        })
        // compiler.hooks.compile.tap("syncWebpackPlugin",(compilation)=>{
        //     console.log(compilation)
        // })
     }
 }

 module.exports=txtWebpackPlugin;
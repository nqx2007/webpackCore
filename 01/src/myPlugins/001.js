/*
 * @Author: your name
 * @Date: 2021-02-07 23:11:17
 * @LastEditTime: 2021-02-08 07:48:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpackCore/01/src/myPlugins/001.js
 */

/**
 * plugin作用于webpack的某个时期
 */

/**webpack接收配置，的基本流程分为三个阶段：
 * 1.准备阶段：主要任务是创建compiler和Compilation对象
 * 2.编译阶段：这个任务是完成modules解析，并且生成chunks
 * ----module解析：包含了三个主要步骤：创建实例，loaders应用和依赖收集
 * ----chunks生成：主要步骤是找到每个chunk所需要包含的module
 * 3.产出阶段：这个阶段的主要任务是根据chunks生成最终文件，主要有三个步骤：模板Hash更新，模板许淡然chunk，生成文件
 * 
 */

 /**
  * compiler是webpack最核心的模块，每次构建的时候，都会首先实例化一个Compiler对象，然后调用它的run方法来开始一次完整的构建过程。
  * 直接使用webpack(options)的方式就可以得到一个Compiler实例对象
  */
const webpack=require("webpack");
const webpackConfig=require("../../webpack.config.js");
const compiler=webpack(webpackConfig);

Object.keys(compiler.hooks).forEach((hookName)=>{
    compiler.hooks[hookName].tap("anyPlugun",()=>{
        console.log(`---------->${hookName}`)
    })
})


compiler.run();



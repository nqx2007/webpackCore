<!--
 * @Author: your name
 * @Date: 2021-02-08 07:42:40
 * @LastEditTime: 2021-02-08 08:01:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpackCore/01/readmeAboutWebpackCompiler.md
-->

## 怎么编写一个plugin
+ webpack的构建过程
  ```javascript
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
  ```
+ 一个plugin的基本结构
    ```javascript

    class myPlugin{
        constructor(options){

        }
        /**
        * @description: 插件运行apply
        * @param {
        * compiler:
        * }
        * @return {*}
        */     
        apply(compiler){
            //注册事件
            // compiler.hook.emit
        }
    }
    ```
+ Compiler Hooks
  + Compiler编译器模块是创建编译实例的主引擎，大多数面向用户的插件都首先要在Compiler上注册
  + Compiler暴露的常见的钩子
  
   范围 | 说明 | 调用阶段
  ------------ | ------------- | ----------
  run | AsyncSeriesHook | 在编译器开始读取记录前执行
  compile | SyncHook | 在一个新的compilation创建之前执行
  compilation | SyncHook | 在一次compilation创建后执行插件
  make |AsyncParalleHook | 完成一次编译之前执行
  emit | AsyncSeriesHook | 在生成文件到output目录之前执行，毁掉参数:compilation
  afterEmit | AsyncSeriesHook | 在生成文件到output目录之后执行
  assetEmitted | AsyncSeriesHook | 生成文件的时候执行，提供访问产出文件信息的入口，回调参数：file,info
  done | AsyncSeriesHook | 一次编译完成后执行，回调参数：status

  

 

     
    

  
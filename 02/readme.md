<!--
 * @Author: your name
 * @Date: 2021-02-08 10:24:42
 * @LastEditTime: 2021-02-08 10:34:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpackCore/02/readme.md
-->
# webpack打包原理分析
### 依赖图谱
#### webpack(config)
+ 从入口开始，分析入口模块的内容，得到依赖的路径
  +  进入依赖模块，对依赖进行处理
+ 以及对入口模块的内容处理（处理后的代码）
+ output
  + 生成文件的存放位置
  + 生成文件的名称
    + 通过node核心模块，书写模块的文件内容
    ```javascript
    (function(modules){
        // 定义缺失的函数
        //定义缺失的队形
    })({
        //处理后的依赖图谱
        //基本结构：[文件路径名称]:function(){eval(.....)}
    })
          
#### webpack.run()
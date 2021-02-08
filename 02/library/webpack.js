/*
 * @Author: your name
 * @Date: 2021-02-08 11:06:29
 * @LastEditTime: 2021-02-08 15:52:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpackCore/02/library/webpack.js
 */

const fs=require("fs");
const path=require("path")
/**
 * @babel/parser是可以将文件内容抽象成语法树
 */
const BabelParser=require("@babel/parser");
/**
 * @babel/traverse是做AST结构增删改查的操作
 */
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core")

 class webpack{
     //构造函数初始化入口和出口
     constructor(options){
        console.log("webpack接收的配置如下",options);
        /*{
            entry: './src/index.js',
            output: {
              path: '/Users/niuqingxia/Workspace/webpackCore/02/dist',
              filename: 'index.js'
            },
            mode: 'development'
          }*/

        this.entry=options.entry;
        this.output=options.output;
        this.modules=[];
     /**
      * @description: webpack入口执行
      * @param {*}
      * @return {*}
      */     
     }
     run(){
         // 解析入口模块
        const moduleObj=this.parse(this.entry);
        console.log("解析后的模块",moduleObj)
        this.modules.push(moduleObj);
        for(let i=0;i<this.modules.length;i++){
            const singleModule=this.modules[i];
            if(singleModule.depencies){ // 判断当前模块是否有依赖，如果有依赖就遍历
                for(let j in singleModule.depencies){
                    this.modules.push(this.parse(singleModule.depencies[j]))
                }
            }
        }
        
        const obj={};
        this.modules.forEach(item=>{
            obj[item.entryFile]={
                depencies:item.depencies,
                code:item.code
            }
        })
        console.log("依赖的模块",this.modules,obj);
        //生成文件到dist目录
        this.file(obj)
     }
     /**
      * @description: 解析模块内容
      * @param {*} entryFile：入口文件路径名
      * @return {*}
      */
     parse(entryFile){
        console.log('入口文件',entryFile);
        // 利用fs读取入口文件的内容
        const entryContent=fs.readFileSync(entryFile,"utf-8");
        console.log('入口文件的内容',entryContent);
        /**
         * 拿到内容之后再进行解析
         * 第一步：取出依赖的路径
         */
        const contentAst=BabelParser.parse(entryContent,{ // 获取文件的抽象语法树
            sourceType:"module"
        })
        //contentAst.program.body是一个列表，是对文件内容抽象的各个节点列表
        console.log(contentAst.program.body)
        const depencies={};
        traverse(contentAst,{
            ImportDeclaration({node}){
                console.log("转换之后的节点",node)
                //从node里面拿到模块路径,path.dirname是获取文件路径的,注意windows平台的路径处理规则
                const filePath="./"+path.join(path.dirname(entryFile),node.source.value)
                console.log("------>",filePath)
                depencies[node.source.value]=filePath;
            }
        })
        console.log('=====依赖',depencies)
        /* 第二步：对文件内容进行处理 */
        // 转换语法树获取转换之后的代码
        const {code} = transformFromAst(contentAst,null,{
            presets:["@babel/preset-env"]
        })
        console.log(code)
        return {
            entryFile,  // 模块名称
            depencies,  //模块依赖
            code        //模块代码,需要通过eval来执行
        }
        
     }
     file(code){
        // 生成index.js到dist目录
        //拼接输出的文件路径
        const filePath=path.join(this.output.path,this.output.filename);
        //生成bundle内容
        const newCode=JSON.stringify(code);
        const bundle =`(function(modules){
            function require(module){
                function pathRequire(relativePath){
                    return require(modules[module].depencies[relativePath])
                }
                const code = modules[module].code;
                
                const exports={};
                (function(require,codeSegment){
                    eval(codeSegment)
                })(pathRequire, code )

                
                return exports;
            };
            require('${this.entry}')
        })(${newCode})`
        console.log(bundle)
        fs.writeFileSync(filePath,bundle,"utf-8");
        
     }
 }

 module.exports=webpack;
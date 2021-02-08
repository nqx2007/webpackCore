<!--
 * @Author: your name
 * @Date: 2021-02-06 10:20:56
 * @LastEditTime: 2021-02-07 08:03:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpackCore/01/readme.md
-->

##  关于browserslist的介绍
+ 网站地址
  + https://browserl.ist/
+ 配置方式
    + package.json里面配置
      ```
      {
        ...
        "browserslist":["last 2 versions",">1%"]
      }
      ```
    + 直接配置.browserslistrc文件
         ```
        #直接书写，一行表示一个规则
        last 2 versions
         >1%"
         ```
    + 两种配置方式同时存在的话，package.json里面的优先级别高
+ 常见的配置规则
  范围 | 说明
  ------------ | -------------
  last 2 versions | caniuse.com网站跟踪的最新的两个版本
  >1% | 全球超过1%人使用的浏览器，可以后跟 in China加上地区
  cover 99.5% | 覆盖99.5%的主流浏览器
  chrome >50 ie>6-8 | 指定某个浏览器的版本范围
  not ie<11 | 排除ie11一下版本不兼容
  since 2013 last 2 years | 某事件范围发布的所有浏览器版本
  unreleased versions | 所有浏览器的beta版本
  maintained node versions | 所有被node基金会维护的node版本
  current node | 当前环境的node版本
  dead | 通过last 2 versions筛选的浏览器中，全球使用率低于0.5%且官方声明不再维护或者事实上已经两年没有维护的版本
  default | >0.5% last 2 versions Firefox ES not dead


  
/*
 * @Author: niuqingxia
 * @Date: 2021-02-03 15:01:07
 * @LastEditTime: 2021-02-07 16:17:53
 * @LastEditors: Please set LastEditors
 * @Description:工程入口文件
 * @FilePath: /webpackCore/01/src/index.js
 */
import './index.css';
import './basic.less'

import pic from './public/001.png';

const container=document.getElementById("container");
const img=document.createElement("img");
img.src=pic;
const textNode=document.createTextNode("这是我最喜欢的维尼小熊");
const divElement=document.createElement("div");
divElement.className="web-font";
divElement.appendChild(textNode)
container.appendChild(img);
container.appendChild(divElement);
console.log(111333177771222+'hello')
 
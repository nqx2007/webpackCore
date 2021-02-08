(function(modules){
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
            require('./src/index.js')
        })({"./src/index.js":{"depencies":{"./a.js":"./src/a.js"},"code":"\"use strict\";\n\nvar _a = _interopRequireDefault(require(\"./a.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n/*\n * @Author: your name\n * @Date: 2021-02-08 10:02:30\n * @LastEditTime: 2021-02-08 15:53:40\n * @LastEditors: Please set LastEditors\n * @Description: In User Settings Edit\n * @FilePath: /webpackCore/02/src/index.js\n */\nconsole.log(\"\".concat(_a[\"default\"].name, \"\\u7F16\\u5199webpack\\u6838\\u5FC3\\u539F\\u7406\\u548C\\u6784\\u5EFA\\u8FC7\\u7A0B\"));"},"./src/a.js":{"depencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\n/*\n * @Author: your name\n * @Date: 2021-02-08 10:18:03\n * @LastEditTime: 2021-02-08 15:53:23\n * @LastEditors: Please set LastEditors\n * @Description: In User Settings Edit\n * @FilePath: /webpackCore/02/src/a.js\n */\nconsole.log('import a module');\nvar _default = {\n  name: \"qingxia\"\n};\nexports[\"default\"] = _default;"}})
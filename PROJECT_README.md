# 项目名称：雷士照明-伯克丽官网

## 项目人员

  需求 |   UI  |  前端  | 后台 | 测试 | 
-------|-------|--------|------|------|
 柯尼斯|  女帝 | 玛琪诺 |蕾贝卡|      |
       |       | 雷欧   |      |      |


## 项目构建

``` 
# 安装依赖包
npm install

# 开发环境，启动热加载服务器//localhost:8080
npm dev

# 打包生产目录
npm run build
```

## 测试地址
+ [内网](http://leishiwww.test.qi-cloud.com)
+ [前端域名](http://nvc.test.qi-cloud.com)
+ [后台域名](http://nvcadmin.test.qi-cloud.com/admin/toLogin.do)
## 试行规范
+ [CSS编码规范](https://github.com/hertzi418/CodeGuide/blob/master/docs/CSS.md)
+ [HTML编码规范](https://github.com/hertzi418/CodeGuide/blob/master/docs/HTML.md)
+ [Javascript编码规范](https://github.com/hertzi418/CodeGuide/blob/master/docs/JavaScript.md)

## 前端技术栈
+ 包管理工具: npm
+ 构建工具: webpack2
+ 编译工具: babel
+ mvvm库: vue2
+ Js语言相关: ES5、ES6
+ css预处理器: sass、postcss
+ 模块化规范: ES6 Module、CommonJS
+ 编辑器: sublime

## 样式引入说明
+ common.scss包含variable.scss,reset.css,icon/style.css这三个文件
+ 每个页面需要单独引进common.scss
+ 组件需要用到变量文件的再单独引进variable.scss，不需要引进common.scss

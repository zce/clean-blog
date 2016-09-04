# Clean Blog

## 搭建项目结构

1. 新建一个文件夹作为项目目录

  - 所有与开发相关的文件，文件夹都不要出现中文或空格

2. 通过NPM初始化项目配置文件`package.json`

  - [主版本].[副版本].[修正版本]
    + 主版本：API不会再向下兼容 ++
    + 副版本：API任然兼容多了新功能 ++
    + 修正版本：调整，BUG修复 ++
  - entry point 指的是项目的入口文件，在被require时执行的文件
  - license 指的是开源授权协议！！！

  ```bash
  $ npm init --yes
  ```

3. 子目录目录结构如下

  ```
  └─ project-root ··················· 项目根目录
     ├─ controllers ·············· 控制器目录
     ├─ models ··················· 模型目录
     ├─ node_modules ················ NPM模块目录
     ├─ views ···················· 视图目录
     ├─ www ······················ 静态文件目录（public，www，client，static）
     │  ├─ assets ··················· 资源目录
     │  │  ├─ css ··················· 样式表文件目录
     │  │  ├─ fonts ················· 字体文件目录
     │  │  ├─ img ··················· 图片文件目录
     │  │  └─ js ···················· JS脚本文件目录
     │  └─ pages ···················· 静态页面文件目录（测试用，生成阶段会删了）
     ├─ test ························ 测试代码目录（里面全部是用来测试代码的代码）
     ├─ index.js ···················· 项目入口文件
     ├─ package.json ················ 项目NPM配置文件
     ├─ CHANGELOG.md ················ 项目更改日志文件
     └─ README.md ··················· 项目说明文件
  ```

4. 通过`NPM`安装`express`模块

  ```bash
  $ npm install express --save
  ```

  ```bash
  # 查看项目中的直接依赖 depth 0 是只看顶层
  $ npm ls --depth 0
  ```

5. 编写项目入口文件`index.js`

  ```javascript
  require('./src')
  ```

6. 编写APP功能入口文件`app.js`结构

  ```javascript
  const express = require('express')

  const app = module.exports = express()

  // ......

  if (!module.parent) {
    const port = process.env.PORT || 3000
    app.listen(port, error => {
      if (error) throw error
      console.log(`app is ready, please visit http://localhost:${port}/`)
    })
  }
  ```

7. 编写`package.json`中的启动脚本

  - 由于windows和其他操作系统设置环境变量的方式不同
  - 当我们遇到不同操作系统不相同的操作，可以借助第三方包`cross-env`
  -




## 模板引擎

### 两个流派

- ASP 风格

  ```ejs
  <%= obj.name %>
  <% for (var i = 0; i < data.length; i++) { %>
  <% } %>
  ```

  eg. ejs

- 指令式

  ```handlebars
  {{ obj.name }}
  {{#each item, data}}
  {{/each}}
  ```

  eg. handlebars

- 奇葩式（tj）

  eg. jade（pug）
  没有展开之前 emmet (zencoding) + 缩进方式
  YAML 用缩进控制层级关系

### 使用模板引擎的步骤

1. 安装依赖
2. 设置 app 对象 的 view engine
3. 在需要模板渲染的地方  调用 res.render(模板文件, 数据)

数据的传递方式：1. 第二个参数， 2. res.locals
  模板文件的扩展名必须和视图引擎的名字相同


### 母版页 or 布局页

将页面中相同的内容抽象到一个公共的页面，我们把这个页面称之为布局页


## 静态文件目录问题 !!!!

http://localhost:2080/
  => html

http://localhost:2080/home/about
  => url 表意：请求 网站根目录 -> home -> about文件
  => 正常
  /home/about.txt
  /css/style.css

  ../css/style.css

http://localhost:2080/home/about/
  => url 表意：请求 网站根目录 -> home -> about目录 -> 默认文档
  => 不正常
  /home/about/index.html

  ../css/style.css
  /home/css/style.css

### 结论：
  动态网站中根本无法使用相对路径（url动态 -》 层级不确定）
  应该使用绝对路径（/ 开头）
  / => 不管当前文件在哪个目录下  / 都代表网站根目录


## 抽象模型

根据数据模型抽象一个个的模型类型




## 数据绑定




## 数据分页




## 详细页面






数据库服务器
  多个数据库
    多个表
      多个列（字段）


下划线

省市级联


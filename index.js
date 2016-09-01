const path = require('path')
const glob = require('glob')
const express = require('express')
const slash = require('./middlewares/slash.js')

// # 创建应用程序对象
const app = module.exports = express()

// # 应用程序设置

// ## 设置严格模式路由
app.set('strict routing', true)
// ## 设置模板引擎
app.set('view engine', 'xtpl')
// ## 设置模板文件目录
app.set('views', path.resolve(__dirname, 'views'))

// # 载入中间件

// ## 静态文件处理
app.use(express.static(path.resolve(__dirname, 'www')))
// ## 载入全部控制器
glob.sync('./controllers/*.js', { cwd: __dirname }).forEach(item => {
  const controller = require(item)
  typeof controller === 'function' && app.use(controller.prefix, controller)
})
// ## 处理URL尾部自动追加斜线
// app.use(slash())

// # 启动服务监听2080端口
app.listen(2080, err => {
  if (err) throw err
  console.log('server is ready, visit http://localhost:2080/')
})

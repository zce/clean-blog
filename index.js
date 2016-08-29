const path = require('path')
const glob = require('glob')
const express = require('express')

const app = module.exports = express()

app.set('view engine', 'xtpl')
app.set('views', path.resolve(__dirname, 'views'))

// 静态文件处理
app.use(express.static(path.resolve(__dirname, 'www')))

// 载入全部控制器
glob.sync('./controllers/*.js', { cwd: __dirname }).forEach(item => {
	const controller = require(item)
	controller && app.use(controller.prefix, controller)
})



app.listen(2080, err => {
	if (err) throw err
	console.log('server is ready')
})
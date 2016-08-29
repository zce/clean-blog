const { Router } = require('express')

const router = module.exports = Router()

router.prefix = '/'

router.get('/', (req, res) => {
	res.render('home')
})
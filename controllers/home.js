const { Router } = require('express')
const router = module.exports = Router()
// pathname starts with
router.prefix = '/'

/**
 * GET /
 */
router.get('/', (req, res) => {
  res.render('home/index')
})

/**
 * GET /about/
 */
router.get('/about', (req, res) => {
  res.render('home/about')
})

/**
 * GET /contact/
 */
router.get('/contact', (req, res) => {
  res.render('home/contact')
})

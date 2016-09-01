const { Router } = require('express')
const router = module.exports = Router()
// pathname starts with
router.prefix = '/'

/**
 * GET /page/:page
 */
router.get('/page/:page', (req, res) => {
  res.render('blog/list')
})

/**
 * GET /post/:slug
 */
router.get('/post/:slug', (req, res, next) => {
  res.render('blog/item')
})

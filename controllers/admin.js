const { Router } = require('express')
const router = module.exports = Router()
// pathname starts with
router.prefix = '/admin'

/**
 * GET /
 */
router.get('/', (req, res) => {
  res.locals.current_page = 'index'
  res.render('admin/index')
})

/**
 * GET /:page
 */
router.get('/:page', (req, res) => {
  res.locals.current_page = req.params.page
  res.render('admin/' + req.params.page)
})

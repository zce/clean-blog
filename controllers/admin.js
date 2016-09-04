const { Router } = require('express')
const Post = require('../models/post')
const router = module.exports = Router()
// pathname starts with
router.prefix = '/admin'

/**
 * GET /admin/
 */
router.get('/', (req, res) => {
  res.locals.current_page = 'index'
  res.render('admin/index')
})

/**
 * GET /posts/:page?
 */
router.get('/posts/:page?', (req, res) => {
  const size = 5
  const page = parseInt(req.params.page) || 1
  res.locals.current_page = page
  Post.findCount((err, count) => {
    res.locals.total_page = Math.ceil(count / size)
    Post.findLimit((page - 1) * size, size, (err, posts) => {
      res.locals.posts = posts
      res.render('admin/posts')
    })
  })
})

/**
 * GET /write
 */
router.get('/write', (req, res) => {
  res.render('admin/write')
})

/**
 * GET /admin/pages/:page
 */
router.get('/pages/:page', (req, res) => {
  res.locals.current_page = req.params.page
  res.render('admin/pages/' + req.params.page)
})

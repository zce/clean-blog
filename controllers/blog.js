const { Router } = require('express')
const Post = require('../models/post')

const router = module.exports = Router()
// pathname starts with
router.prefix = '/'

/**
 * GET /page/:page
 */
router.get('/page/:page', (req, res) => {
  const page = parseInt(req.params.page) || 1
  res.locals.current_page = page
  Post.findCount((err, count) => {
    res.locals.total_page = Math.ceil(count / 5)
    Post.findLimit((page - 1) * 5, 5, (err, posts) => {
      res.locals.posts = posts
      res.render('blog/list')
    })
  })
})

/**
 * GET /post/:slug
 */
router.get('/post/:slug', (req, res, next) => {
  Post.findOne(req.params.slug, (err, post) => {
    if (!post) return res.status(404).send('Not Found')
    res.locals.post = post
    res.render('blog/item')
  })
})

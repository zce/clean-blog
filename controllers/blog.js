const { Router } = require('express')
const Post = require('../models/post')
const User = require('../models/user')

const router = module.exports = Router()
// pathname starts with
router.prefix = '/'

/**
 * GET /page/:page
 */
router.get('/page/:page', (req, res) => {
  const size = parseInt(req.app.locals.options['page_size'])
  const page = parseInt(req.params.page) || 1
  res.locals.current_page = page
  Post.findCount((err, count) => {
    res.locals.total_page = Math.ceil(count / size)
    Post.findLimit((page - 1) * size, size, (err, posts) => {
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
    User.findOne(post.user_id, (err, user) => {
      res.locals.user = user
      res.render('blog/item')
    })
  })
})

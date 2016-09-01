const { Router } = require('express')
const Post = require('../models/post')

const router = module.exports = Router()
// pathname starts with
router.prefix = '/'

/**
 * GET /
 */
router.get('/', (req, res) => {
  Post.findLimit(0, 5, (err, posts) => {
    res.locals.posts = posts
    res.render('home/index')
  })
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

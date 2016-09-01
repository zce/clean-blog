const fs = require('fs')
const path = require('path')
const Post = require('../models/post')

// Post.find((err, data) => {
//   fs.writeFile(path.resolve(__dirname, 'posts.json'), JSON.stringify(data, null, 2))
// })


Post.findLimit(0, 5, (err, posts) => {
  console.log(posts)
})

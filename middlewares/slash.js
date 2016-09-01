module.exports = () => (req, res, next) => {
  next()
  // console.log(req.originalUrl, req.baseUrl + req.url)
  // if (req.originalUrl === req.baseUrl + req.url) return next()
  // res.redirect(301, req.baseUrl + req.url)
}

const Option = require('../models/option')

module.exports = () => {
  let options = {}
  Option.find((err, rows) => rows.map(i => { options[i.key] = i.value }))
  return (req, res, next) => {
    res.app.locals.options = options
    next()
  }
}

const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'clean-blog'
})

module.exports = {
  query (sql, params, callback) {
    pool.query(sql, params, callback)
  }
}

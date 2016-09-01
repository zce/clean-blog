const db = require('./db')

class User {
  constructor (id, slug, username, password, nickname, email, status, created, role, token) {
    this.id = id
    this.slug = slug
    this.username = username
    this.password = password
    this.nickname = nickname
    this.email = email
    this.status = status
    this.created = created
    this.role = role
    this.token = token
  }

  static create ({id, slug, username, password, nickname, email, status, created, role, token}) {
    return new User(id, slug, username, password, nickname, email, status, created, role, token)
  }

  static find(callback) {
    db.query('select * from users', (err, rows) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, rows.map(User.create))
    })
  }

  static findOne(slug, callback) {
    db.query('select * from users where `slug` = ?', slug, (err, rows) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, User.create(rows[0]))
    })
  }

  save (callback) {
    const sql = this.id ?
      'update users set ? where id = ?' :
      'insert into users set ?'
    db.query(sql, [this, this.id], (err, result) => {
      if (err) return typeof callback === 'function' && callback(err)
      if (result.affectedRows === 1) {
        this.id = this.id || result.insertId
        return typeof callback === 'function' && callback(null, true)
      }
      typeof callback === 'function' && callback(null, false)
    })
  }

  delete (callback) {
    const sql = this.id ?
      'delete from users where id = ?' :
      'delete from users where `slug` = ?'
    db.query(sql, this.id || this.slug, (err, result) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, result.affectedRows === 1)
    })
  }
}

module.exports = User

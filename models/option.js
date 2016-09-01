const db = require('./db')

class Option {
  constructor (id, key, value) {
    this.id = id
    this.key = key
    this.value = value
  }

  static create ({id, key, value}) {
    return new Option(id, key, value)
  }

  static find(callback) {
    db.query('select * from options', (err, rows) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, rows.map(Option.create))
    })
  }

  static findOne(key, callback) {
    db.query('select * from options where `key` = ?', key, (err, rows) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, Option.create(rows[0]))
    })
  }

  save (callback) {
    const sql = this.id ?
      'update options set ? where id = ?' :
      'insert into options set ?'
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
      'delete from options where id = ?' :
      'delete from options where `key` = ?'
    db.query(sql, this.id || this.key, (err, result) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, result.affectedRows === 1)
    })
  }
}

module.exports = Option

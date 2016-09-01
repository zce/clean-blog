const db = require('./db')

class Comment {
  constructor (id, author, author_email, author_ip, content, status, support, oppose, created, post_id, user_id, parent_id) {
    this.id = id
    this.author = author
    this.author_email = author_email
    this.author_ip = author_ip
    this.content = content
    this.status = status
    this.support = support
    this.oppose = oppose
    this.created = created
    this.post_id = post_id
    this.user_id = user_id
    this.parent_id = parent_id
  }

  static create ({id, author, author_email, author_ip, content, status, support, oppose, created, post_id, user_id, parent_id}) {
    return new Comment(id, author, author_email, author_ip, content, status, support, oppose, created, post_id, user_id, parent_id)
  }

  static find(callback) {
    db.query('select * from comments', (err, rows) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, rows.map(Comment.create))
    })
  }

  static findOne(slug, callback) {
    db.query('select * from comments where `slug` = ?', slug, (err, rows) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, Comment.create(rows[0]))
    })
  }

  save (callback) {
    const sql = this.id ?
      'update comments set ? where id = ?' :
      'insert into comments set ?'
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
      'delete from comments where id = ?' :
      'delete from comments where `slug` = ?'
    db.query(sql, this.id || this.slug, (err, result) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, result.affectedRows === 1)
    })
  }
}

module.exports = Comment

const db = require('./db')

class Post {
  constructor (id, slug, title, excerpt, content, type, status, comment_status, comment_count, view_count, created, modified, user_id, parent_id) {
    this.id = id
    this.slug = slug
    this.title = title
    this.excerpt = excerpt
    this.content = content
    this.type = type
    this.status = status
    this.comment_status = comment_status
    this.comment_count = comment_count
    this.view_count = view_count
    this.created = created
    this.modified = modified
    this.user_id = user_id
    this.parent_id = parent_id
  }

  static create ({id, slug, title, excerpt, content, type, status, comment_status, comment_count, view_count, created, modified, user_id, parent_id}) {
    return new Post(id, slug, title, excerpt, content, type, status, comment_status, comment_count, view_count, created, modified, user_id, parent_id)
  }

  static find(callback) {
    db.query('select * from posts', (err, rows) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, rows.map(Post.create))
    })
  }

  static findLimit(start, count, callback) {
    const sql = `SELECT p.slug, p.title, p.excerpt, p.created, u.nickname FROM posts AS p
INNER JOIN users AS u ON p.user_id = u.id
WHERE p.\`status\` = 'published'
LIMIT ?,?`
// 'select * from posts limit ?, ?'
    db.query(sql, [start, count], (err, rows) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, rows)
    })
  }

  static findCount (callback) {
    const sql = 'SELECT count(1) as count FROM posts where `status` = \'published\''
    db.query(sql, (err, res) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, res[0].count)
    })
  }

  static findOne(slug, callback) {
    db.query('select * from posts where `slug` = ?', slug, (err, rows) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, Post.create(rows[0]))
    })
  }

  save (callback) {
    const sql = this.id ?
      'update posts set ? where id = ?' :
      'insert into posts set ?'
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
      'delete from posts where id = ?' :
      'delete from posts where `slug` = ?'
    db.query(sql, this.id || this.slug, (err, result) => {
      if (err) return typeof callback === 'function' && callback(err)
      typeof callback === 'function' && callback(null, result.affectedRows === 1)
    })
  }
}

module.exports = Post

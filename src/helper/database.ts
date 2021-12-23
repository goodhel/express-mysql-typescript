import mariadb from 'mariadb'
import config from '../config/app.config.json'
const pool = mariadb.createPool(config.db)

class _database {
  async query(sql: string, params: Array<String>) {
    let conn
    const stripMeta = true

    try {
      conn = await pool.getConnection()
      const res = await conn.query(sql, params)

      if (Array.isArray(res) && res.length === 0 && config.db.rejectEmpty) {
        return { code: 'EMPTY_RESULT' }
      } else {
        if (stripMeta) {
          delete res.meta
        }

        return res
      }
    } finally {
      if (conn) conn.release() // release to poll
    }
  }
}

export default new _database()

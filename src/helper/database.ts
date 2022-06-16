import mariadb from 'mariadb'
import config from '../config/app.config.json'
const pool = mariadb.createPool(config.db)

class _database {
  /**
   * Escape undefined in args as null. Preventing query execution from throwing error
   * @param {string[]} args - arguments to be passed into query
   * @returns {string[]} escaped args
   */
  escapeUndefined = (args: any): string[] => {
    if (!(args instanceof Object)) {
      return args === undefined ? null : args
    }

    for (const key in args) {
      if (args[key] === undefined) {
        args[key] = null
      }
    }

    return args
  }

  /**
   * Execute query with arguments
   * @param {string} sql - sql query
   * @param {string[]} params - escaped arguments to be passed into query (avoiding injection)
   * @param {boolean} [dateStrings=true] - if false datetime columns will be returned as js Date object
   * @param {boolean} [insertIdAsNumber=true] - if false insertId will be returned as BigInt
   * @returns {Object[]} sql query result
   * */
  query = async (
    sql: string,
    params: (string | number | null | undefined)[],
    stripMeta = true,
    dateStrings = true,
    insertIdAsNumber = true
  ) => {
    let conn

    try {
      conn = await pool.getConnection()
      const res = await conn.query({ sql, insertIdAsNumber, dateStrings }, this.escapeUndefined(params))

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

  batch = async (sql: string, params: (string | number)[][], dateStrings = true, insertIdAsNumber = true) => {
    let conn

    try {
      conn = await pool.getConnection()
      const res = await conn.batch({ sql, insertIdAsNumber, dateStrings }, params)

      if (Array.isArray(res) && res.length === 0 && config.db.rejectEmpty) {
        return { code: 'EMPTY_RESULT' }
      } else {
        return res
      }
    } finally {
      if (conn) conn.release() // release to poll
    }
  }
}

export default new _database()

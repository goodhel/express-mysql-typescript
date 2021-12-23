import mysql from '../helper/database'

class _test {
  getList = async () => {
    const query = {
      sql: 'SELECT * FROM test',
      params: []
    }
    return mysql
      .query(query.sql, query.params)
      .then((results) => {
        // console.log(results)
        return {
          status: true,
          data: results
        }
      })
      .catch((error) => {
        console.error('getList Test Error ', error)

        return {
          status: false,
          error
        }
      })
  }
}

export default new _test()

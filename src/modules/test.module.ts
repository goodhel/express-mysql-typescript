import mysql from '../helper/database'
import Joi from 'joi'

interface List {
  id: number
}

class _test {
  getList = async (options: List) => {
    const schema = Joi.object({
      id: Joi.number()
    }).options({ abortEarly: false })

    const validation = schema.validate(options)

    if (validation.error) {
      const errorDetails = validation.error.details.map((detail) => detail.message)

      return {
        status: false,
        code: 422,
        error: errorDetails.join(', ')
      }
    }

    const query = {
      sql: 'SELECT * FROM test',
      params: []
    }

    return mysql
      .query(query.sql, query.params)
      .then((results) => {
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

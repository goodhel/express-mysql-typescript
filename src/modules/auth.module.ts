import mysql from '../helpers/database'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import config from '../config/app.config.json'
import jwt from 'jsonwebtoken'

interface Auth {
  name?: string
  email: string
  password: string
}

class _auth {
  register = async (body: Auth) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
      }).options({ abortEarly: false })

      const validation = schema.validate(body)

      if (validation.error) {
        const errorDetails = validation.error.details.map((detail) => detail.message)

        return {
          status: false,
          code: 422,
          error: errorDetails.join(', ')
        }
      }

      body.password = bcrypt.hashSync(body.password, 10)

      const regis = await mysql.query('INSERT INTO auth_user (name, email, password) VALUES (?, ?, ?)', [
        body.name,
        body.email,
        body.password
      ])

      await mysql.query('INSERT INTO auth_user_role (user_id, role_id) VALUES (?, ?)', [regis.insertId, 1])

      return {
        status: true,
        code: 201,
        data: regis
      }
    } catch (error) {
      console.error('register Error ', error)

      return {
        status: false,
        error
      }
    }
  }

  login = async (body: Auth) => {
    try {
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
      }).options({ abortEarly: false })

      const validation = schema.validate(body)

      if (validation.error) {
        const errorDetails = validation.error.details.map((detail) => detail.message)

        return {
          status: false,
          code: 422,
          error: errorDetails.join(', ')
        }
      }

      const login = await mysql.query(
        `SELECT 
            au.id, 
            au.name, 
            au.email,
            au.password,
            ar.id role_id,
            ar.name role_name
        FROM auth_user au 
        JOIN auth_user_role aur ON aur.user_id = au.id
        JOIN auth_role ar ON ar.id = aur.role_id
        WHERE au.email = ?`,
        [body.email]
      )

      if (login.code === 'EMPTY_RESULT') {
        return {
          status: false,
          code: 404,
          error: 'User not found'
        }
      }

      if (!bcrypt.compareSync(body.password, login[0].password)) {
        return {
          status: false,
          code: 401,
          error: 'Wrong password'
        }
      }

      const { secret, expired } = config.jwt

      const payload = {
        i: login[0].id,
        n: login[0].name,
        e: login[0].email,
        ri: login[0].role_id,
        rn: login[0].role_name
      }

      const token = await jwt.sign(payload, secret, { expiresIn: String(expired) })

      return {
        status: true,
        data: {
          token
        }
      }
    } catch (error) {
      console.error('login Error ', error)

      return {
        status: false,
        error
      }
    }
  }
}

export default new _auth()

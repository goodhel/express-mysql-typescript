import { Request, Response, Router } from 'express'
import response from '../helpers/response'
import m$auth from '../modules/auth.module'
import passport from 'passport'

export const AuthController: Router = Router()

/**
 * List Users
 */
AuthController.get('/users', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  const user = req.user
  console.log(user)
  const users = await m$auth.listUser()

  response.sendResponse(res, users)
})

/**
 * Register
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */
AuthController.post('/register', async (req: Request, res: Response) => {
  const regis = await m$auth.register(req.body)

  response.sendResponse(res, regis)
})

/**
 * Login
 * @param {string} email
 * @param {string} password
 */
AuthController.post('/login', async (req: Request, res: Response) => {
  const login = await m$auth.login(req.body)

  response.sendResponse(res, login)
})

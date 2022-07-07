import { Request, Response, Router } from 'express'
import response from '../helpers/response'
import m$auth from '../modules/auth.module'

export const AuthController: Router = Router()

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

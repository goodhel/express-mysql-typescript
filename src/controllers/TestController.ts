import { NextFunction, Request, Response, Router } from 'express'
import response from '../helper/response'
import m$test from '../modules/test.module'

export const TestController: Router = Router()

TestController.get('/', async (req: Request, res: Response, _next: NextFunction) => {
  const results = await m$test.getList({ id: +req.params.id })

  response.sendResponse(res, results)
})

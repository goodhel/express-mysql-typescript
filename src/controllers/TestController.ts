import { NextFunction, Request, Response, Router } from 'express'
import m$test from '../modules/test.module'

export const TestController: Router = Router()

TestController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await m$test.getList()
    res.status(200).send(results)
  } catch (error) {
    res.status(400).send({
      status: false,
      error
    })
  }
})

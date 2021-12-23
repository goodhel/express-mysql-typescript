import { Application, Router } from 'express'
import { TestController } from './controllers/TestController'

const _routes: [string, Router][] = [
  // ['/', IndexController],
  ['/test', TestController]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route
    app.use(url, controller)
  })
}

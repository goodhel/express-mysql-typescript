import { Application, Router } from 'express'
import { TestController } from './controllers/TestController'

const _routes: [string, Router][] = [['/test', TestController]]

export const routes = (app: Application) => {
  _routes.forEach((router) => {
    const [url, controller] = router
    app.use(url, controller)
  })
}

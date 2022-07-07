import { Application, Router } from 'express'
import { AuthController } from './controllers/AuthController'

const _routes: [string, Router][] = [['/auth', AuthController]]

export const routes = (app: Application) => {
  _routes.forEach(([url, controller]) => {
    app.use(`/api${url}`, controller)
  })
}

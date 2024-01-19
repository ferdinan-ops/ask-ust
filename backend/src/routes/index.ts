import { type Application, type Router } from 'express'

import authRoute from './auth.route'
import forumRoute from './forum.route'

const _routes = [
  ['/auth', authRoute],
  ['/forums', forumRoute]
]

const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url as string, router as Router)
  })
}

export default routes

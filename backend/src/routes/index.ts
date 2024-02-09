import { type Application, type Router } from 'express'

import authRoute from './auth.route'
import forumRoute from './forum.route'
import userRoute from './user.route'
import memberRoute from './member.route'
import searchRoute from './search.route'
import reportRoute from './report.route'

const _routes = [
  ['/auth', authRoute],
  ['/forums', forumRoute],
  ['/users', userRoute],
  ['/members', memberRoute],
  ['/search', searchRoute],
  ['/reports', reportRoute]
]

const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url as string, router as Router)
  })
}

export default routes

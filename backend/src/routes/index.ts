import { type Application, type Router } from 'express'

import authRoute from './auth.route'
import forumRoute from './forum.route'
import userRoute from './user.route'
import memberRoute from './member.route'
import searchRoute from './search.route'
import reportRoute from './report.route'
import livekitRoute from './livekit.route'
import mediaRoute from './media.route'
import dashboardRoute from './dashboard.route'
import messageRoute from './message.route'
import validateRoute from './validate.route'
import questionRoute from './question.route'
import answerRoute from './answer.route'
import lectureRoute from './lecture.route'

const _routes = [
  ['/auth', authRoute],
  ['/forum', forumRoute],
  ['/user', userRoute],
  ['/member', memberRoute],
  ['/search', searchRoute],
  ['/report', reportRoute],
  ['/livekit', livekitRoute],
  ['/media', mediaRoute],
  ['/dashboard', dashboardRoute],
  ['/message', messageRoute],
  ['/validate', validateRoute],
  ['/question', questionRoute],
  ['/answer', answerRoute],
  ['/', lectureRoute]
]

const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url as string, router as Router)
  })
}

export default routes

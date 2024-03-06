import { type Application, type Router } from 'express'

import authRoute from './auth.route'
import forumRoute from './forum.route'
import userRoute from './user.route'
import memberRoute from './member.route'
import searchRoute from './search.route'
import reportRoute from './report.route'
import livekitRoute from './livekit.route'
import videoRoute from './video.route'
import voiceRoute from './voice.route'
import dashboardRoute from './dashboard.route'
import messageRoute from './message.route'

const _routes = [
  ['/auth', authRoute],
  ['/forums', forumRoute],
  ['/users', userRoute],
  ['/members', memberRoute],
  ['/search', searchRoute],
  ['/reports', reportRoute],
  ['/livekit', livekitRoute],
  ['/video', videoRoute],
  ['/voice', voiceRoute],
  ['/dashboard', dashboardRoute],
  ['/messages', messageRoute]
]

const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url as string, router as Router)
  })
}

export default routes

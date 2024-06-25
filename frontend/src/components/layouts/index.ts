import AuthLayout from './AuthLayout'
import DashboardLayout from './DashboardLayout'
import PaddingLayout from './PaddingLayout'
import ProfileLayout from './ProfileLayout'
import AdminLayout from './AdminLayout'

import ProtectedAuth from './middlewares/ProtectedAuth'
import ProtectedRoute from './middlewares/ProtectedRoute'
import ProtectedForum from './middlewares/ProtectedForum'
import ProtectedFromUnverified from './middlewares/ProtectFromUnverified'
import ProtectedFromAdmin from './middlewares/ProtectedFromAdmin'
import ProtectedFromGuest from './middlewares/ProtectFromGuest'

export {
  AuthLayout,
  DashboardLayout,
  PaddingLayout,
  ProfileLayout,
  ProtectedAuth,
  ProtectedRoute,
  ProtectedForum,
  ProtectedFromUnverified,
  ProtectedFromAdmin,
  ProtectedFromGuest,
  AdminLayout
}

import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import {
  AdminLayout,
  DashboardLayout,
  PaddingLayout,
  ProfileLayout,
  ProtectedAuth,
  ProtectedForum,
  ProtectedFromAdmin,
  ProtectedFromGuest,
  ProtectedFromUnverified,
  ProtectedRoute,
  ProtectFromNewUser
} from './components/layouts'
import ImagePreview from './components/atoms/forms/ImagePreview'
import { Toaster } from './components/ui/toaster'

import { ContentForum, CreateForum, DetailForum, Forums, MediaForum, SummaryForum } from './pages/forum'
import { ManageMember, Member } from './pages/member'
import { EditProfile, Profile } from './pages/user'

import {
  ForgotPassword,
  Login,
  Quiz,
  Register,
  ResetPassword,
  Unverified,
  ValidateUser,
  VerifyEmail
} from './pages/auth'

import {
  Admin,
  CreateAdmin,
  CreateQuestion,
  DetailUser,
  Lecture,
  Notification,
  Question,
  Settings,
  UpdateForumType,
  User,
  UserAnswer,
  ValidateForum
} from './pages/admin'

import InviteCode from './pages/InviteCode'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Terms from './pages/Terms'
import Home from './pages/Home'

import { usePreviewImage } from './store/client'
import { useScrollToTop } from './hooks'

export default function App() {
  useScrollToTop()
  const { previewImage, setPreviewImage } = usePreviewImage((state) => ({
    previewImage: state.previewImage,
    setPreviewImage: state.setPreviewImage
  }))

  return (
    <React.Fragment>
      {previewImage && <ImagePreview image={previewImage} onShow={() => setPreviewImage('')} />}
      <Toaster />

      {/* ALL ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* AUTHENTICATION ROUTES */}
        <Route element={<ProtectedAuth />}>
          <Route element={<ProtectFromNewUser />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* VERIFIED USER ROUTES */}
          <Route element={<ProtectFromNewUser />}>
            <Route element={<ProtectedFromUnverified />}>
              <Route path="/register" element={<Register />} />
            </Route>
          </Route>
          <Route element={<ProtectedFromUnverified type="validate" />}>
            <Route path="/validate" element={<ValidateUser />} />
          </Route>
          <Route element={<ProtectedFromUnverified type="unverified" />}>
            <Route path="/unverified" element={<Unverified />} />
          </Route>
          <Route element={<ProtectedFromUnverified type="quiz" />}>
            <Route path="/quiz" element={<Quiz />} />
          </Route>
        </Route>

        {/* MAIN ROUTES */}
        <Route element={<ProtectedRoute />}>
          {/* ADMIN ROUTES */}
          <Route element={<ProtectedFromGuest />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<NotFound />} />
              <Route path="create" element={<CreateAdmin />} />
              <Route path="notification" element={<Notification />} />
              <Route path="settings" element={<Settings />} />
              <Route path="lecture" element={<Lecture />} />

              <Route path="validate">
                <Route index element={<User />} />
                <Route path=":userId" element={<DetailUser />} />
              </Route>

              <Route path="forum">
                <Route index element={<ValidateForum />} />
                <Route path=":forumId" element={<UpdateForumType />} />
              </Route>

              <Route path="all">
                <Route index element={<Admin />} />
                <Route path=":userId" element={<CreateAdmin />} />
              </Route>

              <Route path="questions">
                <Route index element={<Question />} />
                <Route path="create" element={<CreateQuestion />} />
                <Route path=":userId" element={<UserAnswer />} />
              </Route>
            </Route>
          </Route>

          {/* GUEST ROUTES */}
          <Route element={<ProtectedFromAdmin />}>
            <Route element={<DashboardLayout />}>
              <Route element={<PaddingLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forums">
                  <Route index element={<Forums />} />
                  <Route path="create" element={<CreateForum />} />
                  <Route path="edit/:id" element={<CreateForum />} />
                  <Route path=":slug">
                    <Route index element={<DetailForum />} />
                    <Route element={<ProtectedForum />}>
                      <Route path="summary" element={<SummaryForum />} />
                      <Route path="member">
                        <Route index element={<Member />} />
                        <Route path=":memberId" element={<ManageMember />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>

              <Route element={<ProtectedForum />}>
                <Route path="/forums/:slug/content" element={<ContentForum />} />
              </Route>

              <Route path="/me" element={<ProfileLayout />}>
                <Route index element={<Profile />} />
                <Route path="edit" element={<EditProfile />} />
              </Route>
            </Route>

            <Route element={<ProtectedForum />}>
              <Route path="/forums/:slug">
                <Route path="video/:mediaId" element={<MediaForum type="video" />} />
                <Route path="voice/:mediaId" element={<MediaForum type="voice" />} />
              </Route>
            </Route>

            <Route path="/invite-code/:inviteCode" element={<InviteCode />} />
            <Route path="/me/change-password" element={<ResetPassword />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  )
}

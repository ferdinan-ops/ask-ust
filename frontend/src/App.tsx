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
  ProtectedRoute
} from './components/layouts'
import ImagePreview from './components/atoms/forms/ImagePreview'
import { Toaster } from './components/ui/toaster'

import { ContentForum, CreateForum, DetailForum, Forums, VideoForum, VoiceForum } from './pages/forum'
import { ForgotPassword, Login, Register, ResetPassword, Unverified, ValidateUser, VerifyEmail } from './pages/auth'
import { DetailUser, Notification, Settings, User } from './pages/admin'
import { ManageMember, Member } from './pages/member'
import { EditProfile, Profile } from './pages/user'

import InviteCode from './pages/InviteCode'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Terms from './pages/Terms'
import Home from './pages/Home'

import { usePreviewImage } from './store/client'

export default function App() {
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
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* VERIFIED USER ROUTES */}
          <Route element={<ProtectedFromUnverified />}>
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedFromUnverified type="validate" />}>
            <Route path="/validate" element={<ValidateUser />} />
          </Route>
          <Route element={<ProtectedFromUnverified type="unverified" />}>
            <Route path="/unverified" element={<Unverified />} />
          </Route>
        </Route>

        {/* MAIN ROUTES */}
        <Route element={<ProtectedRoute />}>
          {/* ADMIN ROUTES */}
          <Route element={<ProtectedFromGuest />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<User />} />
              <Route path="validate/:userId" element={<DetailUser />} />
              <Route path="notification" element={<Notification />} />
              <Route path="settings" element={<Settings />} />
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
                <Route path="video/:videoId" element={<VideoForum />} />
                <Route path="voice/:voiceId" element={<VoiceForum />} />
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

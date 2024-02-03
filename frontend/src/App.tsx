import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import { DashboardLayout, PaddingLayout, ProfileLayout, ProtectedAuth, ProtectedRoute } from './components/layouts'
import { Toaster } from './components/ui/toaster'

import { ContentForum, CreateForum, DetailForum, Forums, VideoForum, VoiceForum } from './pages/forum'
import { ForgotPassword, Login, Register, ResetPassword, VerifyEmail } from './pages/auth'
import { EditProfile, Profile } from './pages/user'
import Dashboard from './pages/Dashboard'
import ImagePreview from './components/atoms/ImagePreview'
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
      <Routes>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route element={<ProtectedAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route element={<PaddingLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/forums">
                <Route index element={<Forums />} />
                <Route path=":slug" element={<DetailForum />} />
                <Route path=":slug/video" element={<VideoForum />} />
                <Route path=":slug/voice" element={<VoiceForum />} />
                <Route path="create" element={<CreateForum />} />
                <Route path="edit/:id" element={<CreateForum />} />
              </Route>
            </Route>
            <Route path="/forums/:slug/content" element={<ContentForum />} />
            <Route path="/me" element={<ProfileLayout />}>
              <Route index element={<Profile />} />
              <Route path="edit" element={<EditProfile />} />
            </Route>
          </Route>
          <Route path="/me/change-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </React.Fragment>
  )
}

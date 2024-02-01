import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import { DashboardLayout, PaddingLayout, ProfileLayout } from './components/layouts'
import { Toaster } from './components/ui/toaster'

import { ContentForum, CreateForum, DetailForum, Forums, VideoForum, VoiceForum } from './pages/forum'
import { ForgotPassword, Login, Register, ResetPassword, VerifyEmail } from './pages/auth'
import { EditProfile, Profile } from './pages/user'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <React.Fragment>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
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
      </Routes>
    </React.Fragment>
  )
}

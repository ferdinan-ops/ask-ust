import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import { DashboardLayout, PaddingLayout, ProfileLayout } from './components/layouts'
import {
  ContentForum,
  CreateForum,
  Dashboard,
  DetailForum,
  EditProfile,
  Forum,
  Login,
  Notification,
  Profile,
  Register,
  ResetPassword,
  VerifyEmail,
  VideoForum,
  VoiceForum
} from './pages'
import { Toaster } from './components/ui/toaster'

export default function App() {
  return (
    <React.Fragment>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route element={<DashboardLayout />}>
          <Route element={<PaddingLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forums" element={<Forum />} />
            <Route path="/forum">
              <Route path=":slug" element={<DetailForum />} />
              <Route path=":slug/video" element={<VideoForum />} />
              <Route path=":slug/voice" element={<VoiceForum />} />
              <Route path="create" element={<CreateForum />} />
            </Route>
          </Route>
          <Route path="/forum/:slug/content" element={<ContentForum />} />
          <Route path="/notification" element={<Notification />} />
          <Route element={<ProfileLayout />}>
            <Route path="/me" element={<Profile />} />
            <Route path="/me/edit" element={<EditProfile />} />
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  )
}

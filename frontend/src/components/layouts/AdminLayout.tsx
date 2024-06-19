import { Outlet } from 'react-router-dom'
import { Header } from '../organism'

export default function AdminLayout() {
  return (
    <>
      <Header className="border-b bg-white text-primary" isAdmin />
      <main className="mx-auto flex min-h-[calc(100vh-80px)] w-[1180px] flex-col py-12">
        <Outlet />
      </main>
    </>
  )
}

import { Outlet } from 'react-router-dom'
import { Header } from '../organism'

export default function AdminLayout() {
  return (
    <>
      <Header className="border-b bg-white text-primary" page="admin" />
      <main className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1180px] flex-col p-6 md:px-0 md:py-12">
        <Outlet />
      </main>
    </>
  )
}

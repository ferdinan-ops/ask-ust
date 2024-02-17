import { Outlet } from 'react-router-dom'

export default function PaddingLayout() {
  return (
    <div className="min-h-[calc(100vh-68px-12px)] flex-1 bg-white p-4 text-primary dark:bg-primary dark:text-white md:min-h-[calc(100vh-68px-100px)] md:p-6 lg:min-h-[calc(100vh-68px)] lg:p-7">
      <Outlet />
    </div>
  )
}

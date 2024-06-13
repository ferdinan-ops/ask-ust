import { Outlet } from 'react-router-dom'

export default function PaddingLayout() {
  return (
    <div className="flex flex-1 flex-col bg-white p-4 text-primary dark:bg-primary dark:text-white md:p-6 lg:p-7">
      <Outlet />
    </div>
  )
}

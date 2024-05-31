import { Outlet, Navigate } from 'react-router-dom'

export default function GuestAdminMiddleware() {
	const role: string | null = localStorage.getItem('userRole')

  if (role === 'admin') {
    return <Navigate to="/admin/dashboard" />
  } else {
    return <Outlet />
  }
}

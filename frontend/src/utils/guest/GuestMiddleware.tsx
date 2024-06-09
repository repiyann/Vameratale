import { Outlet, Navigate } from 'react-router-dom'

export default function GuestMiddleware() {
	const role: string | null = sessionStorage.getItem('userRole')

	if (!role) {
		return <Outlet />
	} else if (role === 'user') {
		return <Navigate to="/dashboard" />
	} else {
		return <Navigate to="/admin/dashboard" />
	}
}

import { Outlet, Navigate } from 'react-router-dom'

export default function AdminMiddleware() {
	const role: string | null = sessionStorage.getItem('userRole')

	if (!role) {
		return <Navigate to="/login" />
	} else if (role === 'admin') {
		return <Outlet />
	} else {
		return <Navigate to="/dashboard" />
	}
}

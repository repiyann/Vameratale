import { Outlet, Navigate } from "react-router-dom"

function AdminMiddleware() {
	const role = localStorage.getItem('userRole')

	if (!role) {
		return <Navigate to="/login" />
	} else if (role === 'admin') {
		return <Outlet />
	} else {
		return <Navigate to="/dashboard" />
	}
}

export default AdminMiddleware

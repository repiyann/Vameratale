import { Outlet, Navigate } from "react-router-dom"

function GuestMiddleware() {
	const role = localStorage.getItem('userRole')

	if (!role) {
		return <Outlet />
	} else if (role === 'user') {
		return <Navigate to="/dashboard" />
	} else {
    return <Navigate to="/admin/dashboard" />
  }
}

export default GuestMiddleware

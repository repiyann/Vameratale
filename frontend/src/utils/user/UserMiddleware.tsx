import { Outlet, Navigate } from "react-router-dom"

function UserMiddleware() {
	const role = localStorage.getItem('userRole')

	if (!role) {
		return <Navigate to="/login" />
	} else if (role === 'user') {
		return <Outlet />
	} else {
		return <Navigate to="/dashboard" />
	}
}

export default UserMiddleware

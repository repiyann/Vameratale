import { Outlet, Navigate } from 'react-router-dom'

export default function ResetMiddleware() {
	const email: string | null = localStorage.getItem('resetEmail')

	if (!email) {
		return <Navigate to="/login" />
	} else {
		return <Outlet />
	}
}

import { Outlet, Navigate } from 'react-router-dom'

export default function ResetMiddleware() {
	const email: string | null = sessionStorage.getItem('resetEmail')

	if (!email) {
		return <Navigate to="/login" />
	} else {
		return <Outlet />
	}
}

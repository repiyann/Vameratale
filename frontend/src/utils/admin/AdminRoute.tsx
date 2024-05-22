import { Outlet } from 'react-router-dom'
import { AdminProvider } from './authAdminService'

export default function AdminRoute() {
	return (
		<AdminProvider>
			<Outlet />
		</AdminProvider>
	)
}

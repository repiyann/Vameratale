import { Outlet } from 'react-router-dom'
import { AdminProvider } from './authAdminService'

function AdminRoute() {
	return (
		<AdminProvider>
			<Outlet />
		</AdminProvider>
	)
}

export default AdminRoute

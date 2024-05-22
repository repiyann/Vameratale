import { Outlet } from 'react-router-dom'
import { UserProvider } from './authService'

function UserRoute() {
	return (
		<UserProvider>
			<Outlet />
		</UserProvider>
	)
}

export default UserRoute

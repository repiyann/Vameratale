import { Outlet } from 'react-router-dom'
import { UserProvider } from './authService'

export default function UserRoute() {
	return (
		<UserProvider>
			<Outlet />
		</UserProvider>
	)
}

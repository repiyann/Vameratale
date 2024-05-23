import UserLayout from './UserLayout'
import { UserProvider } from './authService'

export default function UserRoute() {
	return (
		<UserProvider>
			<UserLayout />
		</UserProvider>
	)
}

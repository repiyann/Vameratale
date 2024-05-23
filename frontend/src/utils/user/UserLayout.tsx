import { useUserContext } from './authProvider'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import NavbarUser from '@/components/NavbarUser'
import Footer from '@/components/Footer'

export default function UserLayout() {
	const { userData } = useUserContext()
	return (
		<>
			{userData ? <NavbarUser /> : <Navbar />}
			<Outlet />
			<Footer />
		</>
	)
}

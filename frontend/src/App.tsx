import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/guest/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Forgot from './pages/auth/Forgot'
import Verifying from './pages/auth/Verify'
import Reset from './pages/auth/Reset'
import Dashboard from './pages/user/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import About from './pages/guest/About'
import UserProfile from './pages/user/profile/UserProfile'
import { useUserContext } from './utils/authProvider'
import Product from './pages/user/Product'

function App() {
	const { userData } = useUserContext()
	const role = localStorage.getItem('userRole')

	return (
		<Routes>
			{!userData && (
				<>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/register"
						element={<Register />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/forgot"
						element={<Forgot />}
					/>
					<Route
						path="/verify"
						element={<Verifying />}
					/>
					<Route
						path="/reset"
						element={<Reset />}
					/>
					<Route
						path="/about"
						element={<About />}
					/>
				</>
			)}
			<Route
				path="/dashboard"
				element={<>{userData?.role_id === 1 ? <AdminDashboard /> : <Dashboard />}</>}
			/>

			{role === 'user' && (
				<>
					<Route
						path="/profile"
						element={<UserProfile />}
					/>
					<Route
						path="/product"
						element={<Product />}
					/>
				</>
			)}
			<Route
				path="*"
				element={
					<Navigate
						to="/dashboard"
						replace
					/>
				}
			/>
		</Routes>
	)
}

export default App

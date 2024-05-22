import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/guest/Home'
import Register from './pages/auth/user/Register'
import Login from './pages/auth/user/Login'
import Verifying from './pages/auth/user/Verify'
import Forgot from './pages/auth/Forgot'
import Reset from './pages/auth/user/Reset'
import Dashboard from './pages/user/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import About from './pages/guest/About'
import UserProfile from './pages/user/profile/UserProfile'
import Product from './pages/user/Product'
import UserRoute from './utils/user/UserRoute'
import AdminRoute from './utils/admin/AdminRoute'
import UserMiddleware from './utils/user/UserMiddleware'
import AdminMiddleware from './utils/admin/AdminMiddleware'
import LoginAdmin from './pages/auth/admin/LoginAdmin'
import GuestMiddleware from './utils/guest/GuestMiddleware'

function App() {
	return (
		<Routes>
			<Route element={<GuestMiddleware />}>
				<Route
					path="/register"
					element={<Register />}
				/>
				<Route
					path="/login"
					element={<Login />}
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
				<Route
					path="/forgot"
					element={<Forgot />}
				/>
			</Route>

			<Route element={<UserRoute />}>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/dashboard"
					element={<Dashboard />}
				/>
				<Route element={<UserMiddleware />}>
					<Route
						path="/profile"
						element={<UserProfile />}
					/>
					<Route
						path="/detail/roses"
						element={<Product />}
					/>
				</Route>
			</Route>

			<Route element={<AdminRoute />}>
				<Route
					path="/admin"
					element={<LoginAdmin />}
				/>
				<Route element={<AdminMiddleware />}>
					<Route
						path="/admin/dashboard"
						element={<AdminDashboard />}
					/>
				</Route>
			</Route>

			<Route
				path="*"
				element={
					<Navigate
						to="/"
						replace
					/>
				}
			/>
		</Routes>
	)
}

export default App

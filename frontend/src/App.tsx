import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/guest/Home'
import Register from './pages/auth/user/Register'
import Login from './pages/auth/user/Login'
import Verifying from './pages/auth/user/Verify'
import Forgot from './pages/auth/user/Forgot'
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
import PageTitle from './utils/PageTitle'
import Scan from './pages/user/transaction/Scan'
import Invoice from './pages/user/transaction/Invoice'
import Cart from './pages/user/transaction/Cart'

export default function App() {
	return (
		<Routes>
			<Route element={<GuestMiddleware />}>
				<Route
					path="/register"
					element={
						<>
							<Register />
							<PageTitle title="Registrasi | Vameratale" />
						</>
					}
				/>
				<Route
					path="/login"
					element={
						<>
							<Login />
							<PageTitle title="Login | Vameratale" />
						</>
					}
				/>
				<Route
					path="/verify"
					element={
						<>
							<Verifying />
							<PageTitle title="Verifikasi | Vameratale" />
						</>
					}
				/>
				<Route
					path="/reset"
					element={
						<>
							<Reset />
							<PageTitle title="Reset Password | Vameratale" />
						</>
					}
				/>
				<Route
					path="/forgot"
					element={
						<>
							<Forgot />
							<PageTitle title="Lupa Password | Vameratale" />
						</>
					}
				/>
			</Route>

			<Route element={<UserRoute />}>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path="/about"
					element={
						<>
							<About />
							<PageTitle title="Tentang Kami | Vameratale" />
						</>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<>
							<Dashboard />
							<PageTitle title="Katalog | Vameratale" />
						</>
					}
				/>
				<Route element={<UserMiddleware />}>
					<Route
						path="/profile"
						element={
							<>
								<UserProfile />
								<PageTitle title="Profil | Vameratale" />
							</>
						}
					/>
					<Route
						path="/detail/roses"
						element={
							<>
								<Product />
								<PageTitle title="Detail Produk | Vameratale" />
							</>
						}
					/>
					<Route
						path="/scan"
						element={
							<>
								<Scan />
								<PageTitle title="Scan Pembayaran | Vameratale" />
							</>
						}
					/>
					<Route
						path="/invoice"
						element={
							<>
								<Invoice />
								<PageTitle title="Invoice | Vameratale" />
							</>
						}
					/>
					<Route
						path="/cart"
						element={
							<>
								<Cart />
								<PageTitle title="Keranjang Bunga | Vameratale" />
							</>
						}
					/>
				</Route>
			</Route>

			<Route element={<AdminRoute />}>
				<Route
					path="/admin"
					element={
						<>
							<LoginAdmin />
							<PageTitle title="Login Admin | Vameratale" />
						</>
					}
				/>
				<Route element={<AdminMiddleware />}>
					<Route
						path="/admin/dashboard"
						element={
							<>
								<AdminDashboard />
								<PageTitle title="Dashboard Admin | Vameratale" />
							</>
						}
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

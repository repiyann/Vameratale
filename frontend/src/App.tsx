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
import CreateProduct from './pages/CreateProduct'
import ProductCatalog from './pages/admin/products/ProductCatalog'
import AddProduct from './pages/admin/products/AddProduct'
import GuestAdminMiddleware from './utils/guest/GuestAdminMiddleware'
import AdminManage from './pages/admin/manage/AdminManage'
import UserManage from './pages/admin/manage/UserManage'
import AddAdmin from './pages/admin/manage/AddAdmin'
import ProductCategory from './pages/admin/products/ProductCategory'
import AddCategory from './pages/admin/products/AddCategory'
import ProductVarian from './pages/admin/products/ProductVarian'
import AddVarian from './pages/admin/products/AddVarian'
import ProductSize from './pages/admin/products/ProductSize'
import AddSize from './pages/admin/products/AddSize'
import ProductStock from './pages/admin/reports/ProductStock'

export default function App() {
	return (
		<Routes>
			<Route element={<GuestMiddleware />}>
				<Route
					path="/tesUpload"
					element={
						<>
							<CreateProduct />
							<PageTitle title="Registrasi | Vameratale" />
						</>
					}
				/>
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
				<Route element={<GuestAdminMiddleware />}>
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
				</Route>
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
					<Route
						path="/admin/products/catalog"
						element={
							<>
								<ProductCatalog />
								<PageTitle title="Product Catalog | Vameratale" />
							</>
						}
					/>
					<Route
						path="/admin/products/catalog/add-product"
						element={
							<>
								<AddProduct />
								<PageTitle title="Add Catalog | Vameratale" />
							</>
						}
					/>
					<Route
						path="/admin/products/category"
						element={
							<>
								<ProductCategory />
								<PageTitle title="Product Category | Vameratale" />
							</>
						}
					/>
					<Route
						path="/admin/products/category/add-category"
						element={
							<>
								<AddCategory />
								<PageTitle title="Add Category | Vameratale" />
							</>
						}
					/>
					<Route
						path="/admin/products/varian"
						element={
							<>
								<ProductVarian />
								<PageTitle title="Product Varian | Vameratale" />
							</>
						}
					/>
					<Route
						path="/admin/products/varian/add-varian"
						element={
							<>
								<AddVarian />
								<PageTitle title="Add Varian | Vameratale" />
							</>
						}
					/>
					<Route
						path="/admin/products/size"
						element={
							<>
								<ProductSize />
								<PageTitle title="Product Size | Vameratale" />
							</>
						}
					/>
					<Route
						path="/admin/products/size/add-size"
						element={
							<>
								<AddSize />
								<PageTitle title="Add Size | Vameratale" />
							</>
						}
					/>
					<Route
						path="/admin/manage/admins"
						element={
							<>
								<AdminManage />
								<PageTitle title="Manage Admins | Vameratale" />
							</>
						}
					/>
					<Route
						path="/admin/manage/admins/add-admin"
						element={
							<>
								<AddAdmin />
								<PageTitle title="Add Admins | Vameratale" />
							</>
						}
					/>
					<Route
						path="/admin/manage/users"
						element={
							<>
								<UserManage />
								<PageTitle title="Manage Users | Vameratale" />
							</>
						}
					/>
					<Route
						path="/admin/reports/stock"
						element={
							<>
								<ProductStock />
								<PageTitle title="Product Stock | Vameratale" />
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

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
import ProductCatalog from './pages/admin/products/catalogs/ProductCatalog'
import AddProduct from './pages/admin/products/catalogs/AddProduct'
import GuestAdminMiddleware from './utils/guest/GuestAdminMiddleware'
import AdminManage from './pages/admin/manage/AdminManage'
import UserManage from './pages/admin/manage/UserManage'
import AddAdmin from './pages/admin/manage/AddAdmin'
import ProductCategory from './pages/admin/products/categories/ProductCategory'
import AddCategory from './pages/admin/products/categories/AddCategory'
import ProductVarian from './pages/admin/products/varians/ProductVarian'
import AddVarian from './pages/admin/products/varians/AddVarian'
import ProductSize from './pages/admin/products/sizes/ProductSize'
import AddSize from './pages/admin/products/sizes/AddSize'
import ProductStock from './pages/admin/reports/ProductStock'
import EditProduct from './pages/admin/products/catalogs/EditProduct'
import VerifyEmail from './pages/auth/user/VerifyEmail'
import ResetMiddleware from './utils/user/ResetMiddleware'
import UploadImage from './pages/admin/products/catalogs/UploadImage'
import EditStock from './pages/admin/reports/EditStock'
import FreshFlower from './pages/user/FreshFlower'
import ArtificialFlower from './pages/user/ArtificialFlower'
import Balloon from './pages/user/balloon'
import Money from './pages/user/money'
import Snack from './pages/user/snack'

export default function App() {
	return (
		<Routes>
			<Route element={<GuestMiddleware />}>
				<Route
					path="/tesUpload"
					element={
						<>
							<UploadImage />
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
					path="/forgot"
					element={
						<>
							<Forgot />
							<PageTitle title="Lupa Password | Vameratale" />
						</>
					}
				/>
			</Route>

			<Route element={<ResetMiddleware />}>
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
					<Route
						path="/freshflower"
						element={
							<>
								<FreshFlower />
								<PageTitle title="Katalog | Vameratale" />
							</>
						}
					/>
					<Route
						path="/artificialflower"
						element={
							<>
								<ArtificialFlower />
								<PageTitle title="Katalog | Vameratale" />
							</>
						}
					/>
					<Route
						path="/balloon"
						element={
							<>
								<Balloon />
								<PageTitle title="Katalog | Vameratale" />
							</>
						}
					/>
					<Route
						path="/money"
						element={
							<>
								<Money />
								<PageTitle title="Katalog | Vameratale" />
							</>
						}
					/>
					<Route
						path="/snack"
						element={
							<>
								<Snack />
								<PageTitle title="Katalog | Vameratale" />
							</>
						}
					/>
				</Route>
				<Route element={<UserMiddleware />}>
					<Route
						path="verify-email"
						element={
							<>
								<VerifyEmail />
								<PageTitle title="VerifyEmail | Vameratale" />
							</>
						}
					/>
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
						path="/admin/products/catalog/edit-product"
						element={
							<>
								<EditProduct />
								<PageTitle title="Edit Catalog | Vameratale" />
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
					<Route
						path="/admin/reports/stock/edit-stock/:id"
						element={
							<>
								<EditStock />
								<PageTitle title="Edit Stock | Vameratale" />
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

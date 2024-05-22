import { useState } from 'react'
import {
	BsSearch,
	BsJustify,
	BsGrid1X2Fill,
	BsFillArchiveFill,
	BsFillGrid3X3GapFill,
	BsPeopleFill,
	BsMenuButtonWideFill,
	BsFillGearFill,
	BsEyeFill
} from 'react-icons/bs'
import { IoMdMenu } from 'react-icons/io'
import { FaCartShopping } from 'react-icons/fa6'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LineChart,
	Line
} from 'recharts'
import { RiShoppingBagFill } from 'react-icons/ri'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import '@/assets/admin.css'
import { useAdminContext } from '@/utils/admin/authAdminProvider'

export default function AdminDashboard() {
	const [openSidebarToggle, setOpenSidebarToggle] = useState<boolean>(false)
	const { adminData, handleLogout } = useAdminContext()
	const email: string | undefined = adminData?.email

	let username: string = ''
	if (email) {
		username = email.split('@')[0]
	}

	const data = [
		{
			name: 'Page A',
			uv: 4000,
			pv: 2400,
			amt: 2400
		},
		{
			name: 'Page B',
			uv: 3000,
			pv: 1398,
			amt: 2210
		},
		{
			name: 'Page C',
			uv: 2000,
			pv: 9800,
			amt: 2290
		},
		{
			name: 'Page D',
			uv: 2780,
			pv: 3908,
			amt: 2000
		},
		{
			name: 'Page E',
			uv: 1890,
			pv: 4800,
			amt: 2181
		},
		{
			name: 'Page F',
			uv: 2390,
			pv: 3800,
			amt: 2500
		},
		{
			name: 'Page G',
			uv: 3490,
			pv: 4300,
			amt: 2100
		}
	]

	function OpenSidebar(): void {
		setOpenSidebarToggle(!openSidebarToggle)
	}

	return (
		<div className="grid-container">
			<header className="header">
				<div className="menu-icon">
					<BsJustify
						className="icon"
						onClick={OpenSidebar}
					/>
				</div>
				<div className="header-left">
					<BsSearch className="icon" />
				</div>
			</header>
			<aside
				id="sidebar"
				className={openSidebarToggle ? 'sidebar-responsive' : ''}
			>
				<div className="sidebar-title">
					<div className="sidebar-brand">
						<IoMdMenu className="icon_header" /> {username}
					</div>
					<span
						className="icon close_icon"
						onClick={OpenSidebar}
					>
						X
					</span>
				</div>

				<ul className="sidebar-list">
					<li className="sidebar-list-item">
						<a href="">
							<BsGrid1X2Fill className="icon" /> Dashboard
						</a>
					</li>
					<li className="sidebar-list-item">
						<a href="">
							<BsFillArchiveFill className="icon" /> Item Master
						</a>
					</li>
					<li className="sidebar-list-item">
						<a href="">
							<BsFillGrid3X3GapFill className="icon" /> Orders & Delivery
						</a>
					</li>
					<li className="sidebar-list-item">
						<a href="">
							<BsPeopleFill className="icon" /> Customers
						</a>
					</li>
					<li className="sidebar-list-item">
						<a href="">
							<BsMenuButtonWideFill className="icon" /> Reports
						</a>
					</li>
					<li className="sidebar-list-item">
						<a href="">
							<BsFillGearFill className="icon" /> Setting
						</a>
					</li>
					<li className="sidebar-list-item text-[#9e9ea4]">
						<button onClick={handleLogout}>
							<FontAwesomeIcon
								className="icon"
								icon={faRightFromBracket}
							/>
							Logout
						</button>
					</li>
				</ul>
			</aside>
			<main className="main-container">
				<div className="main-title">
					<h3>DASHBOARD</h3>
				</div>

				<div className="main-cards">
					<div className="card">
						<div className="card-inner">
							<h3>Total Pengunjung</h3>
							<BsEyeFill className="card_icon" />
						</div>
						<h1>5,450K</h1>
					</div>
					<div className="card">
						<div className="card-inner">
							<h3>Total Penghasilan</h3>
							<FaCartShopping className="card_icon" />
						</div>
						<h1>5,450,000</h1>
					</div>
					<div className="card">
						<div className="card-inner">
							<h3>Total User</h3>
							<BsPeopleFill className="card_icon" />
						</div>
						<h1>265</h1>
					</div>
					<div className="card">
						<div className="card-inner">
							<h3>Total Barang</h3>
							<RiShoppingBagFill className="card_icon" />
						</div>
						<h1>2,000</h1>
					</div>
				</div>

				<div className="charts">
					<ResponsiveContainer
						width="100%"
						height="100%"
					>
						<BarChart
							width={500}
							height={300}
							data={data}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar
								dataKey="pv"
								fill="#8884d8"
							/>
							<Bar
								dataKey="uv"
								fill="#82ca9d"
							/>
						</BarChart>
					</ResponsiveContainer>

					<ResponsiveContainer
						width="100%"
						height="100%"
					>
						<LineChart
							width={500}
							height={300}
							data={data}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line
								type="monotone"
								dataKey="pv"
								stroke="#8884d8"
								activeDot={{ r: 8 }}
							/>
							<Line
								type="monotone"
								dataKey="uv"
								stroke="#82ca9d"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</main>
		</div>
	)
}

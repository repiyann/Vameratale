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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBagShopping,
	faCartShopping,
	faEye,
	faUsers
} from '@fortawesome/free-solid-svg-icons'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'

export default function AdminDashboard() {
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

	return (
		<>
			<NavbarAdmin />
			<div className="flex">
				<section
					id="sidebar"
					className=""
				>
					<SidebarAdmin />
				</section>
				<section
					id="main-content"
					className="flex-grow lg:pl-60"
				>
					<div className="flex my-16 px-32 flex-col">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
							<div className="bg-white p-4 shadow-md rounded-md flex justify-between">
								<div>
									<div className="text-gray-500">Total Pengunjung</div>
									<div className="text-2xl font-bold">5,450K</div>
								</div>
								<FontAwesomeIcon
									icon={faEye}
									size="xl"
								/>
							</div>
							<div className="bg-white p-4 shadow-md rounded-md flex justify-between">
								<div>
									<div className="text-gray-500">Total Penghasilan</div>
									<div className="text-2xl font-bold">5,450,000</div>
								</div>
								<FontAwesomeIcon
									icon={faCartShopping}
									size="xl"
								/>
							</div>
							<div className="bg-white p-4 shadow-md rounded-md flex justify-between">
								<div>
									<div className="text-gray-500">Total User</div>
									<div className="text-2xl font-bold">265</div>
								</div>
								<FontAwesomeIcon
									icon={faUsers}
									size="xl"
								/>
							</div>
							<div className="bg-white p-4 shadow-md rounded-md flex justify-between">
								<div>
									<div className="text-gray-500">Total Barang</div>
									<div className="text-2xl font-bold">2,000</div>
								</div>
								<FontAwesomeIcon
									icon={faBagShopping}
									size="xl"
								/>
							</div>
						</div>
						<div className="bg-white p-4 shadow-md rounded-md h-screen">
							<div className="text-xl font-bold mb-4">Chart</div>
							<div className="h-1/2">
								<ResponsiveContainer>
									<BarChart
										width={500}
										height={300}
										data={data}
										margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
							</div>
							<div className="h-1/2 mt-10 pb-20">
								<ResponsiveContainer>
									<LineChart
										width={500}
										height={300}
										data={data}
										margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

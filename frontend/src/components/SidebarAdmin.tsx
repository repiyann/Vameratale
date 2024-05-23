import { useAdminContext } from '@/utils/admin/authAdminProvider'
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillGearFill } from 'react-icons/bs'

export default function SidebarAdmin() {
	const { adminData } = useAdminContext()
	
	return (
		<div className="flex flex-col">
			<h1 className="text-lg font-semibold">AdminDashboard</h1>
			<h1>{adminData?.email}</h1>
			<p className="text-sm mt-5">Menu</p>
			<div className="gap-10">
				<h1 className="text-lg font-semibold flex items-center">
					<BsGrid1X2Fill className="mr-3" />
					Dashboard
				</h1>
				<h1 className="text-lg font-semibold flex items-center">
					<BsFillArchiveFill className="mr-3" />
					Item Master
				</h1>
				<h1 className="text-lg font-semibold flex items-center">
					<BsFillGrid3X3GapFill className="mr-3" />
					Orders & Deliveries
				</h1>
				<h1 className="text-lg font-semibold flex items-center">
					<BsFillGearFill className="mr-3" />
					Reports
				</h1>
				<h1 className="text-lg font-semibold flex items-center">
					<BsPeopleFill className="mr-3" />
					User Administrator
				</h1>
			</div>
		</div>
	)
}

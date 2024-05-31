import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'

export default function UserManage() {
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
						<h1 className="text-2xl font-bold">Data Pelanggan</h1>
					</div>
				</section>
			</div>
		</>
	)
}

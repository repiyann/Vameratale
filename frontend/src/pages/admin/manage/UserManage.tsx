import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
						<div className='mt-3'>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Nama</TableHead>
										<TableHead className="w-[200px]">No Telpon</TableHead>
										<TableHead className="w-[200px]">Email</TableHead>
										<TableHead>Alamat</TableHead>
										<TableHead className="text-right">Aksi</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">INV001</TableCell>
										<TableCell>Paid</TableCell>
										<TableCell>Credit Card</TableCell>
										<TableCell>$250.00</TableCell>
										<TableCell className="text-right">
											<FontAwesomeIcon
												icon={faTrashCan}
												size="xl"
												color="red"
											/>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

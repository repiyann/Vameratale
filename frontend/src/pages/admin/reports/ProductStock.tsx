import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'

export default function ProductStock() {
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
						<h1 className="text-2xl font-bold">Stok Barang</h1>
						<div className="mt-4">
							<Link
								to={'/admin/reports/stock/add-stock'}
								className="px-4 pb-2 pt-1 bg-[#FAEAED] font-semibold rounded-xl border-[3px] border-[#D85A6D]"
							>
								<FontAwesomeIcon
									icon={faPlusSquare}
									size="xl"
									className="text-[#606F49] mr-2"
								/>
								Tambah Stok
							</Link>
						</div>
						<div className="mt-7">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[10px]">Email</TableHead>
										<TableHead>Nama</TableHead>
										<TableHead>Alamat</TableHead>
										<TableHead className="text-right">Aksi</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">INV001</TableCell>
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

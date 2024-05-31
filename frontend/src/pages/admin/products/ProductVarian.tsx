import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'

export default function ProductVarian() {
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
						<h1 className="text-2xl font-bold">Varian Barang</h1>
						<div className="mt-4">
							<Link
								to={'/admin/products/varian/add-varian'}
								className="px-4 pb-2 pt-1 bg-[#FAEAED] font-semibold rounded-xl border-[3px] border-[#D85A6D]"
							>
								<FontAwesomeIcon
									icon={faPlusSquare}
									size="xl"
									className="text-[#606F49] mr-2"
								/>
								Tambah Varian
							</Link>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'
import { Card } from '@/components/ui/card'

export default function AddAdmin() {
	function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault()
	}

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
						<div>
							<Link
								to={'/admin/manage/admins'}
								className="px-2 py-1 rounded-2xl border-2 border-[#DC9D9D] text-[#990000] font-semibold"
							>
								<FontAwesomeIcon icon={faChevronLeft} /> Kembali
							</Link>
						</div>
						<h1 className="text-2xl font-bold">Tambah Admin</h1>
						<Card className="p-5 mt-2 bg-[#FFF3F3]">
							<form onSubmit={handleSubmit}>
								<input
									type="text"
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									placeholder="Masukkan nama"
								/>
								<input
									type="text"
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									placeholder="Masukkan password"
								/>
								<input
									type="text"
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									placeholder="Masukkan email"
								/>
								<div className="flex justify-center mt-4">
									<button
										type="submit"
										className="bg-[#9FB480] px-4 py-2 rounded-md font-semibold"
									>
										Submit
									</button>
								</div>
							</form>
						</Card>
					</div>
				</section>
			</div>
		</>
	)
}

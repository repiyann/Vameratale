import { Link } from 'react-router-dom'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUserContext } from '@/utils/user/authProvider'

export default function UserProfile() {
	const { userData } = useUserContext()

	return (
		<>
			<section className="px-5 py-10 md:px-20 md:py-24 lg:px-60 lg:py-10">
				<div>
					<Link
						to={'/dashboard'}
						className="px-2 py-1 rounded-2xl border-2 border-[#DC9D9D] text-[#990000] font-semibold"
					>
						<FontAwesomeIcon icon={faChevronLeft} /> Kembali
					</Link>
				</div>
				<div className="px-10 mt-10 bg-[#FFF3F3] w-full border-2 rounded-2xl border-[#B6B5B5] py-10 md:gap-10 md:grid md:grid-cols-3">
					<div className="col-span-1 flex flex-col items-center">
						<div className="bg-black px-10 py-9 rounded-full mb-2">
							<img
								src={'https://via.placeholder.com/128'}
								alt="User"
								className="rounded-full w-32 h-32 object-cover"
							/>
						</div>
						<div className="mt-2">Edit Foto</div>
					</div>
					<div className="col-span-2 space-y-6">
						<div>
							<label className="block text-gray-700">Nama Lengkap</label>
							<input
								type="text"
								className="w-full border-2 border-[#B7B8B9] rounded-lg px-3 py-2"
								value={userData?.name}
							/>
						</div>
						<div>
							<label className="block text-gray-700">Email</label>
							<input
								type="email"
								className="w-full border-2 border-[#B7B8B9] rounded-lg px-3 py-2"
								value={userData?.email}
							/>
						</div>
						<div>
							<label className="block text-gray-700">No. Telp</label>
							<input
								type="tel"
								className="w-full border-2 border-[#B7B8B9] rounded-lg px-3 py-2"
								value={userData?.telepon}
							/>
						</div>
						<div>
							<label className="block text-gray-700">Alamat</label>
							<textarea
								className="w-full resize-none border-2 border-[#B7B8B9] rounded-lg px-3 py-2"
								value={userData?.address}
							/>
						</div>
						<div className="flex justify-center">
							<button className="bg-[#606F49] text-white px-4 py-2 rounded-xl">Simpan</button>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

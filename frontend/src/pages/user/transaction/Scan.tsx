import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function Scan() {
	return (
		<section className="px-5 py-10 md:px-20 md:py-24 lg:px-60 lg:py-10">
			<div>
				<Link
					to={'/dashboard'}
					className="px-2 py-1 rounded-2xl border-2 border-[#DC9D9D] text-[#990000] font-semibold"
				>
					<FontAwesomeIcon icon={faChevronLeft} /> Kembali
				</Link>
			</div>
			<div className="flex justify-center text-center py-10 mr-0.5">
				<div className="flex flex-col">
					<h1 className="text-2xl font-bold">Scan Pembayaran</h1>
					<h1 className="text-xl font-semibold mt-5 mb-3">Total Bayar Rp95.000</h1>
					<img
						src="/qris.png"
						className="p-5 border-4 border-black rounded-3xl"
						alt="qris"
					/>
					<h1 className="text-lg font-medium">Scan QRIS untuk semuanya</h1>
					<div className="mt-5">
						<Link to={'/invoice'} className="px-4 py-2 font-medium bg-[#E0BC85] rounded-lg">Konfirmasi</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

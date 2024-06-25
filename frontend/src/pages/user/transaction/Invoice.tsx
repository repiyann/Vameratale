import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/components/ui/card'

export default function Invoice() {
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
			<div className="flex justify-center py-10">
				<Card className='p-5 shadow-xl'>
					<div className="flex flex-col">
						<div className="flex justify-center">
							<img
								src="/name_logo.png"
								alt="logo Vameratale"
								width={200}
							/>
						</div>
						<div className="text-center my-5">
							<h1 className="text-lg font-medium">
								Jl. Harmony 2-3 11-3, Sukamantri, Kec. Tamansari, Kabupaten Bogor, Jawa Barat Kode Pos : 16610
							</h1>
							<h1 className="text-lg font-medium">Whatsapp : +62 859-1069-82865</h1>
						</div>
						<hr className="mb-4 border-gray-800 border-solid border-t-4" />
						<div className="grid grid-cols-4">
							<div>
								<p className="text-md font-medium">Nama</p>
								<p className="text-md font-medium">No Telp</p>
								<p className="text-md font-medium">Pesanan</p>
								<p className="text-md font-medium">Alamat</p>
								<p className="text-md font-medium">Metode Pengiriman</p>
								<p className="text-md font-medium">Jumlah Pesanan</p>
							</div>
							<div>
								<p className="text-md font-medium">: Audrey Aprilia</p>
								<p className="text-md font-medium">: 082282262157</p>
								<p className="text-md font-medium">: 3 Roses</p>
								<p className="text-md font-medium">: Jl. Kapten Muslihat No.22, RT.04/RW.01, Paledang, Kecamatan Bogor Tengah, Kota Bogor </p>
								<p className="text-md font-medium">: Diantar</p>
								<p className="text-md font-medium">: 1</p>
							</div>
						</div>
						<div className="mt-6 px-4 py-2 font-bold bg-[#E0BC85] rounded-lg flex justify-between">
							<div>Total Harga</div>
							<div>Rp75.000</div>
						</div>
					</div>
				</Card>
			</div>
		</section>
	)
}

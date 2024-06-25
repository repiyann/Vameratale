import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/components/ui/card'

export default function Cart() {
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
			<div className="flex flex-col justify-center py-10 mr-0.5">
				<h1 className="text-2xl font-bold text-center">Keranjang Bunga</h1>
				<div className="my-5">
					<Card className="grid grid-cols-4 bg-[#F5E9D6] border-2 border-black">
						<Card className="mx-10 my-3 flex justify-center items-center py-3 w-[150px]">
							<img
								src="/flowers.png"
								alt="product"
                width={100}
							/>
						</Card>
						<div className="col-span-2 my-3">
							<p className="text-lg font-medium">3 Roses</p>
							<p className="text-md">Rp95.000 | 1pcs</p>
							<p className="text-md">Ukuran S</p>
						</div>
						<p className="text-end text-lg font-medium mx-10 my-3">Rp95.000</p>
					</Card>
				</div>
				<div className="mt-6 pl-4 font-bold bg-[#647D70] text-white rounded-lg flex justify-between">
					<div className="py-2">Total Harga | Rp95.000</div>
					<Link to={'/scan'} className="px-6 rounded-r-lg py-2 text-black bg-[#E0BC85]">Checkout</Link>
				</div>
			</div>
		</section>
	)
}

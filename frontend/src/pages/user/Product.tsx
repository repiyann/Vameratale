import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import flower from '/flowers.png'

export default function Product() {
	const [selectedVariant, setSelectedVariant] = useState<string>('')
	const [stock] = useState<number>(23)
	const [quantity, setQuantity] = useState<number>(1)

	function handleVariantChange(variant: string): void {
		setSelectedVariant(variant)
	}

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	})

	function handleQuantityChange(change: number): void {
		setQuantity((prevQuantity) => {
			const newQuantity: number = prevQuantity + change
			if (newQuantity > 0 && newQuantity <= stock) {
				return newQuantity
			}
			return prevQuantity
		})
	}

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
				<div className="md:mt-10 md:grid md:grid-cols-2">
					<div className="col-start-1 col-end-1 w-[380px]">
						<Carousel
							opts={{
								align: 'center',
								loop: true
							}}
							className="w-full lg:max-w-screen-lg"
						>
							<CarouselContent>
								{Array.from({ length: 5 }).map((_, index) => (
									<CarouselItem
										key={index}
										className="lg:basis-1/1"
									>
										<div className="p-1">
											<Card>
												<CardContent className="flex items-center p-10 justify-center">
													<img
														src={flower}
														width={250}
														alt=""
													/>
												</CardContent>
											</Card>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious className="hidden md:block" />
							<CarouselNext className="hidden md:block" />
						</Carousel>
					</div>
					<div className="col-start-2 col-end-2">
						<h1 className="font-semibold text-4xl">
							3 Stems of Rose with Filler | <span className="text-2xl">Rp. 95.000</span>
						</h1>
						<p className="text-[#660000] italic font-semibold">Great for romantic</p>
						<div className="mt-5">
							<label className="block font-semibold">Variant</label>
							<div className="flex space-x-4 mt-2">
								{['S', 'M', 'R', 'L'].map((variant) => (
									<label
										key={variant}
										className="flex items-center space-x-2"
									>
										<input
											type="radio"
											name="variant"
											value={variant}
											checked={selectedVariant === variant}
											onChange={() => handleVariantChange(variant)}
											className="form-radio"
										/>
										<span>Variant {variant}</span>
									</label>
								))}
							</div>
						</div>
						<div className="mt-5">
							<label className="block font-semibold">Stock</label>
							<p>{stock}</p>
						</div>
						<div className="mt-5">
							<label className="block font-semibold">Quantity</label>
							<div className="flex items-center space-x-4 mt-2">
								<button
									onClick={() => handleQuantityChange(-1)}
									className="px-4 py-2 border rounded-full"
									disabled={quantity === 1}
								>
									-
								</button>
								<span>{quantity}</span>
								<button
									onClick={() => handleQuantityChange(1)}
									className="px-4 py-2 border rounded-full"
									disabled={quantity === stock}
								>
									+
								</button>
							</div>
						</div>
						<div className="mt-5">
							<label className="block font-semibold">Description</label>
							<p>S = 2 Tangkai Bunga Mawar</p>
							<p>M = 5 Tangkai Bunga Mawar</p>
							<p>L = 10 Tangkai Bunga Mawar</p>
						</div>
						<div className="mt-5">
							<label className="block font-semibold">Makna</label>
							<p>
								Mawar pink melambangkan cinta yang baru mekar, penuh kelembutan, dan kasih sayang. Perpaduannya dengan
								mawar putih, yang melambangkan cinta sejati dan ketulusan, menunjukkan cinta yang murni dan penuh
								perhatian. Buket ini cocok diberikan untuk pasangan, sahabat, atau keluarga untuk menunjukkan rasa cinta
								dan kasih sayang yang mendalam.
							</p>
						</div>
						<div className="mt-5">
							<Link to={'/cart'} className="px-4 py-2 bg-[#990000] text-white rounded-full">Tambahkan ke keranjang</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

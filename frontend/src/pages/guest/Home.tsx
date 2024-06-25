import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import roundLogo from '/round_logo.png'
import box from '/flowerbox.png'
import landingbox from '/landingbox.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import categoriesImage from '/categories.png'
import reviewImage from '/reviews.png'

export default function Home() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	})

	const categoryImages: string[] = Array(4).fill(categoriesImage)
	const reviewImages: string[] = Array(5).fill(reviewImage)
	const categoryData = [
		{ text: 'Fresh Flowers', url: '/freshflower' },
		{ text: 'Occational Bouquet', url: '/dashboard' },
		{ text: 'Artificial Flowers', url: '/artificialflower' },
		{ text: 'Other Bouquet', url: '/balloon' }
	]
	const bestSelling = [
		{ image: '/fresh-1.png', alt: 'Card 1', title: '2 Sunflower', url: '/product1' },
		{ image: '/flowers.png', alt: 'Card 2', title: '3 Roses', url: '/product' },
		{ image: '/fresh-3.png', alt: 'Card 3', title: 'Mixed Flowers', url: '/product1' },
		{ image: '/fresh-4.png', alt: 'Card 4', title: 'Orchid Bouquet', url: '/product1' },
		{ image: '/fresh-5.png', alt: 'Card 5', title: 'Tulips', url: '/product1' }
	]

	return (
		<>
			<section id="home">
				<div className="px-5 py-10 md:px-20 md:py-24 lg:px-72 lg:py-36 flex bg-[#FDEBE7] justify-center items-center md:grid md:grid-cols-2 md:gap-5">
					<div className="col-start-1 col-end-1 m-auto text-center md:text-left">
						<h1 className="text-3xl font-bold dark:text-white">Bunga yang menginspirasi, hadir dalam setiap petal</h1>
						<h2 className="text-xl mt-5 md:mt-2">
							Kami memberikan layanan kualitas premium dengan harga yang terjangkau
						</h2>
						<br />
						<Link
							to={'/dashboard'}
							className="px-5 py-2 bg-[#FD9A9A] rounded-md text-white"
						>
							Lihat Produk
						</Link>
					</div>
					<div className="col-start-2 col-end-2 m-auto hidden md:block">
						<img
							src={landingbox}
							alt="Logo Vameratale"
							width={300}
						/>
					</div>
				</div>
				<div className="hidden md:flex py-10 lg:pt-0 lg:px-72 bg-[#FDEBE7] lg:pb-10 items-center justify-center">
					<div className="px-3 flex flex-row">
						<img
							src={box}
							width={50}
							alt="flowerBox"
						/>
						<div className="mx-2">
							<h3>10±</h3>
							<h4>Kategori</h4>
						</div>
					</div>
					<div className="px-3 flex flex-row">
						<img
							src={box}
							width={50}
							alt="flowerBox"
						/>
						<div className="mx-2">
							<h3>30±</h3>
							<h4>Produk</h4>
						</div>
					</div>
					<div className="px-3 flex flex-row">
						<img
							src={box}
							width={50}
							alt="flowerBox"
						/>
						<div className="mx-2">
							<h3>500±</h3>
							<h4>Pelanggan</h4>
						</div>
					</div>
				</div>
			</section>

			<section id="category">
				<div className="px-5 py-10 md:px-20 lg:px-72 lg:py-20 items-center">
					<div className="flex justify-between md:w-full">
						<h1 className="text-xl font-medium">Penjualan Terbaik Saat Ini</h1>
						<Link
							to={'/dashboard'}
							className="text-end"
						>
							Lihat Semua
						</Link>
					</div>
					<div className="flex lg:px-[48px] pt-5">
						<Carousel
							opts={{
								align: 'start',
								loop: true
							}}
							className="w-full lg:max-w-screen-lg"
						>
							<CarouselContent>
								{bestSelling.map((item, index) => (
									<CarouselItem
										key={index}
										className="lg:basis-1/4"
									>
										<div className="p-1">
											<Link to={item.url}>
												<Card className="h-full bg-white rounded-2xl shadow-lg">
													<div className="bg-[#FFE3E3] px-2 py-5 flex items-center justify-center rounded-xl aspect-square">
														<img
															src={item.image}
															alt={item.alt}
															className="h-full w-auto"
														/>
													</div>
													<h2 className="text-lg my-5 font-bold flex justify-center md:mx-6">{item.title}</h2>
												</Card>
											</Link>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious className="hidden md:block" />
							<CarouselNext className="hidden md:block" />
						</Carousel>
					</div>
					<div className="flex mt-20 flex-col">
						<h1 className="text-3xl text-center font-medium">Kategori Layanan</h1>
						<div className="grid grid-cols-2 gap-5 md:gap-10 mt-5">
							{categoryImages.map((src, index) => (
								<div
									key={index}
									className={`col-start-${index % 2 === 0 ? 1 : 2} col-end-${index % 2 === 0 ? 1 : 2}`}
								>
									<Link
										to={categoryData[index].url}
										className="relative"
									>
										<img
											src={src}
											alt={`Image ${index}`}
											className="w-full h-full object-cover"
										/>
										<div className="absolute text-3xl font-semibold inset-0 flex justify-center items-center text-white">
											{categoryData[index].text}
										</div>
									</Link>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section id="about">
				<div className="px-5 py-2 md:px-20 md:py-24 lg:px-72 lg:py-20 flex flex-col bg-[#FDEBE7] justify-center items-center md:grid md:grid-cols-2 md:gap-5">
					<div className="col-start-1 col-end-1 mt-5 mb-10 md:m-auto text-center md:text-left">
						<h1 className="text-3xl font-bold dark:text-white mb-10">Tentang Kami</h1>
						<p className="mb-10">
							Vameratale merupakan handicraft gift shop yang lahir di Bogor pada pertengahan 2022. Tidak berjalan
							sendirian, Vameratale adalah bagian dari Petrikor Solid Produksi sebagai rumah utama.
						</p>
						<Link
							to={'/about'}
							className="px-5 py-2 bg-[#FD9A9A] rounded-md text-white"
						>
							Baca Selengkapnya
						</Link>
					</div>
					<div className="col-start-2 col-end-2 m-auto">
						<img
							src={roundLogo}
							alt="Logo Vameratale"
							width={300}
							className="mb-2 sm:mb-0"
						/>
					</div>
				</div>
			</section>

			<section id="review">
				<div className="px-5 py-10 md:px-20 lg:px-72 lg:pt-20 items-center">
					<div className="flex justify-center">
						<h1 className="text-3xl font-bold">Komentar Pembeli</h1>
					</div>
					<div className="flex lg:px-[48px] pt-5">
						<Carousel
							opts={{
								align: 'center',
								loop: true
							}}
							className="w-full lg:max-w-screen-lg"
						>
							<CarouselContent>
								{reviewImages.map((image, index) => (
									<CarouselItem
										key={index}
										className="lg:basis-1/2"
									>
										<div className="p-1">
											<Card>
												<CardContent className="flex aspect-square items-center justify-center p-5">
													<img
														src={image}
														alt={`Review Image ${index + 1}`}
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
				</div>
			</section>

			<section id="contact">
				<div className="px-5 py-2 md:px-20 md:py-24 lg:px-72 lg:py-20 flex flex-col justify-center items-center md:grid md:grid-cols-2 md:gap-5">
					<div className="col-start-1 col-end-1 mt-5 md:m-auto">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.026008224795!2d106.78163359999999!3d-6.6436921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69cfa01af0ba79%3A0x98c320627380a860!2sJl.%20Harmony%202-3%20No.5%2C%20Sukamantri%2C%20Kec.%20Tamansari%2C%20Kabupaten%20Bogor%2C%20Jawa%20Barat%2016610!5e0!3m2!1sid!2sid!4v1714976071289!5m2!1sid!2sid"
							style={{ border: 0 }}
							className="w-[300px] h-[300px] lg:w-[400px] lg:h-[300px] "
							loading="lazy"
							title="Gmaps Vameratale"
						/>
					</div>
					<div className="col-start-2 col-end-2 m-auto">
						<h1 className="text-3xl font-bold md:text-left dark:text-white mt-5 md:m-0 text-center">Hubungi Kami</h1>
						<p className="mt-5 mb-3 px-5 md:p-0 text-center md:text-left">
							Jl. Harmony 2-3 11-3, Sukamantri, Kec. Tamansari, Kabupaten Bogor, Jawa Barat 16610
						</p>
						<div className="flex justify-center md:justify-start">
							<a
								href="https://api.Whatsapp.com/send?phone=+6282282262157&text=Hello"
								target="_blank"
								className="px-2 py-1 rounded-3xl border-green-800 border-4"
							>
								<FontAwesomeIcon
									icon={faWhatsapp}
									size="2xl"
									className="mb-[2px]"
								/>
								<span className="ml-2 text-2xl">Chat Us</span>
							</a>
						</div>
						<div className="flex justify-center md:justify-start mb-5">
							<a
								href="https://www.instagram.com/vameratale"
								target="_blank"
								className="block mt-3 mr-7"
							>
								<FontAwesomeIcon
									icon={faEnvelope}
									className="text-2xl"
								/>
								<span className="ml-2 mt-3 lg:text-2xl">hi@gmail.com</span>
							</a>
							<a
								href="https://www.instagram.com/vameratale"
								target="_blank"
								className="block mt-3"
							>
								<FontAwesomeIcon
									icon={faInstagram}
									className="text-2xl"
								/>
								<span className="ml-2 mt-3 lg:text-2xl">@vameratale</span>
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

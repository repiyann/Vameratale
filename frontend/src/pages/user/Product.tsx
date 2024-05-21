import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
// import flower from '/flowers.png'
import NavbarUser from '@/components/NavbarUser'

function Product() {
	return (
		<>
			<NavbarUser />

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
												<CardContent className="flex aspect-square items-center justify-center p-32">
													<span className="text-4xl font-semibold">{index + 1}</span>
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
						<h1 className='font-semibold text-4xl'>3 Stems of Rose with Filler | <span className='text-2xl'>Rp. 95.000</span></h1>
					</div>
				</div>
			</section>
		</>
	)
}

export default Product

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useUserContext } from '@/utils/user/authProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NavbarUser from '@/components/NavbarUser'
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'

function Dashboard() {
	const { userData } = useUserContext()
	const imageCard = [
		{
			src: 'fresh-1.png',
			alt: 'Card 1',
			title: '2 Sunflower',
			description: 'Cheerful flower',
			price: 'Rp 195.000',
			link: '/detail/sunflower'
		},
		{
			src: 'flowers.png',
			alt: 'Card 2',
			title: '3 Roses',
			description: 'Beautiful bouquet',
			price: 'Rp 250.000',
			link: '/detail/roses'
		},
		{
			src: 'fresh-3.png',
			alt: 'Card 3',
			title: 'Mixed Flowers',
			description: 'Colorful and vibrant',
			price: 'Rp 300.000',
			link: '/detail/mixed'
		},
		{
			src: 'fresh-4.png',
			alt: 'Card 4',
			title: 'Orchid Bouquet',
			description: 'Elegant and stylish',
			price: 'Rp 450.000',
			link: '/detail/orchid'
		},
		{
			src: 'fresh-5.png',
			alt: 'Card 5',
			title: 'Tulips',
			description: 'Bright and cheerful',
			price: 'Rp 200.000',
			link: '/detail/tulips'
		},
		{
			src: 'fresh-6.png',
			alt: 'Card 6',
			title: 'Lilies',
			description: 'Fragrant and beautiful',
			price: 'Rp 220.000',
			link: '/detail/lilies'
		}
	]

	return (
		<>
			{userData ? <NavbarUser /> : <Navbar />}
			<div className="flex">
				<section
					id="sidebar"
					className="md:block md:bg-[#FFCAD4] md:w-64 md:h-1/2 md:my-20 md:sticky md:top-40 md:rounded-r-lg hidden"
				>
					<div className="py-10 px-10 gap-3 font-medium">
						<Accordion type="multiple">
							<AccordionItem value="item-1">
								<AccordionTrigger>Acara</AccordionTrigger>
								<AccordionContent className="flex flex-col ml-3">
									<div>Pernikahan</div>
									<div>Wisuda</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>Hiasan</AccordionTrigger>
								<AccordionContent className="flex flex-col ml-3">
									<div>Asli</div>
									<div>Palsu</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>Jenis Bunga</AccordionTrigger>
								<AccordionContent className="flex flex-col ml-3">
									<div>Mawar</div>
									<div>Melati</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</section>
				<section
					id="main-content"
					className="flex-grow"
				>
					<div className="flex my-16 px-32 flex-col">
						<div className="md:grid md:grid-cols-3 gap-5 md:gap-10 mt-5">
							{imageCard.map((card, index) => (
								<Card
									key={index}
									className="bg-white rounded-2xl shadow-lg"
								>
									<div className="bg-[#FFE3E3] px-2 py-1 flex items-center rounded-xl w-full h-[280px]">
										<img
											src={card.src}
											alt={card.alt}
											className="mx-auto"
											width={150}
										/>
									</div>
									<h2 className="text-xl mt-2 font-bold mx-4 md:mx-6">{card.title}</h2>
									<p className="text-[#A8A8A8] text-lg font-medium mx-4 md:mx-6">{card.description}</p>
									<p className="text-[#D13E55] text-lg font-semibold mx-4 md:mx-6">{card.price}</p>
									<Link to={card.link}>
										<button className="rounded-lg bg-[#606F49] text-white font-semibold mr-6 px-5 pt-0.5 pb-1 mt-3 mb-4 mx-auto sm:ml-auto block">
											Detail
										</button>
									</Link>
								</Card>
							))}
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</>
	)
}

export default Dashboard

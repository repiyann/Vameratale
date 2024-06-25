import { useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function ArtificialFlower() {
	const imageCard = [
		{
			src: 'al.png', // URL atau path gambar produk
			alt: 'Artificial Lily Bouquet',
			title: 'Lily Bouquet',
			description: '5 Big premium stems of lily',
			price: 'Rp 175,000',
			link: '' // URL halaman produk
		  },
		  {
			src: 'ar.png', 
			alt: 'Artificial Rose Bouquet',
			title: 'Rose Bouquet',
			description: '10 stems of rose',
			price: 'Rp 155,000',
			link: ''
		  },
		  {
			src: 'as.png',
			alt: 'Artificial Sunflower Bouquet',
			title: 'Sunflower Bouquet',
			description: '4 big stems of sunflower',
			price: 'Rp 145,000',
			link: ''
		  },
		  {
			src: 'am.png',
			alt: 'Artificial Mixed Flower Bouquet',
			title: 'Mixed Flower Bouquet',
			description: ' S, M, L',
			price: 'Rp 85,000 - 195,000',
			link: ''
		  },
		  {
			src: 'bloart.png',
			alt: 'Artificial Mixed Flower Bloom Box (R)',
			title: 'Mixed Flower Bloom Box',
			description: 'S, R',
			price: 'Rp 175,000 - 260,000',
			link: ''
		  },
		  {
			src: 'ab.png',
			alt: 'Artificial Butterfly Bouquet',
			title: 'Butterfly Bouquet',
			description: 'Butterflies with fairy light',
			price: 'Rp 150,000',
			link: ''
		  }
	]

	const [selectedValues, setSelectedValues] = useState<string[]>([''])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })

		const storedValues: string | null = sessionStorage.getItem('selectedValues')
		if (storedValues) {
			try {
				const parsedValues: string[] = JSON.parse(storedValues)
				setSelectedValues(parsedValues)
			} catch (error) {
				console.error('Error parsing stored selectedValues:', error)
			}
		}
	}, [])

	function handleValueChange(newValues: string[]): void {
		setSelectedValues(newValues)
		sessionStorage.setItem('selectedValues', JSON.stringify(newValues))
	}

	return (
		<>
			<div className="flex">
				<section
					id="sidebar"
					className="md:block md:bg-[#FFFAFA] md:shadow-[rgba(0,0,0,0.13)_20px_15px_25px_-5px] md:w-64 md:h-1/2 md:my-20 md:sticky md:top-40 md:rounded-r-lg hidden"
				>
					<div className="py-10 px-10 gap-3 font-medium">
						<h1>
							<Link to="/dashboard">Penjualan Terbaik</Link>
						</h1>
						<Accordion
							value={selectedValues}
							type="multiple"
							onValueChange={handleValueChange}
						>
							<AccordionItem value="item-1">
								<AccordionTrigger><Link to="/freshflower">Fresh Flower</Link></AccordionTrigger>
								<AccordionContent className="flex flex-col ml-3">
									<div>Fresh Variant</div>
									<div>Rose Variant</div>
									<div>Lily Variant</div>
									<div>Box Variant</div>
									<div>Satuan Variant</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger className='text-[#A5273A]'>
									<Link to="/artificialflower">Artificial Flower</Link>
								</AccordionTrigger>
								<AccordionContent className="flex flex-col ml-3">
									<div>Artificial Variant</div>
									<div>Box Bloom Variant</div>
									<div>Korean Style Variant</div>
									<div>Satuan Variant</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>
									<Link to="/occasion">Occasion Bouquet</Link>
								</AccordionTrigger>
								<AccordionContent className="flex flex-col ml-3">
									<div>Wedding</div>
									<div>Birthday</div>
									<div>Valentine</div>
									<div>Graduation</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-4">
								<AccordionTrigger>
									<Link to="/balloon">Other Bouquet</Link>
								</AccordionTrigger>
								<AccordionContent className="flex flex-col ml-3">
									<div>
										<Link to="/balloon">Balloon Variant</Link>
									</div>
									<div>
										<Link to="/money">Money Variant</Link>
									</div>
									<div>
										<Link to="/snack">Snack Variant</Link>
									</div>
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
						<h1 className="text-2xl font-bold mb-3">Artificial Flower</h1>
						<div className="relative">
							<input
								type="text"
								className="px-4 py-1 rounded-full w-full border-4 border-[#D1D1D1] pl-10"
								placeholder="Cari katalog bunga"
							/>
							<FontAwesomeIcon
								icon={faSearch}
								className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400"
							/>
						</div>
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
		</>
	)
}

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/components/ui/card'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'

export default function ProductCatalog() {
	const imageCard = [
		{
			src: '/fresh-1.png',
			alt: 'Card 1',
			title: '2 Sunflower',
			description: 'Cheerful flower',
			price: 'Rp 195.000',
			link: '/admin/products/catalog/edit-product'
		},
		{
			src: '/flowers.png',
			alt: 'Card 2',
			title: '3 Roses',
			description: 'Beautiful bouquet',
			price: 'Rp 250.000',
			link: '/detail/roses'
		},
		{
			src: '/fresh-3.png',
			alt: 'Card 3',
			title: 'Mixed Flowers',
			description: 'Colorful and vibrant',
			price: 'Rp 300.000',
			link: '/detail/mixed'
		},
		{
			src: '/fresh-4.png',
			alt: 'Card 4',
			title: 'Orchid Bouquet',
			description: 'Elegant and stylish',
			price: 'Rp 450.000',
			link: '/detail/orchid'
		},
		{
			src: '/fresh-5.png',
			alt: 'Card 5',
			title: 'Tulips',
			description: 'Bright and cheerful',
			price: 'Rp 200.000',
			link: '/detail/tulips'
		},
		{
			src: '/fresh-6.png',
			alt: 'Card 6',
			title: 'Lilies',
			description: 'Fragrant and beautiful',
			price: 'Rp 220.000',
			link: '/detail/lilies'
		}
	]

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
						<h1 className="text-4xl font-bold">Katalog Barang</h1>
						<div className="mb-4 mt-7">
							<Link
								to={'/admin/products/catalog/add-product'}
								className="px-4 pb-2 pt-1 bg-[#FAEAED] font-semibold rounded-xl border-[3px] border-[#D85A6D]"
							>
								<FontAwesomeIcon
									icon={faPlusSquare}
									size="xl"
									className="text-[#606F49] mr-2"
								/>
								Tambah Barang
							</Link>
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
									<div className="flex justify-end mr-7 gap-4 mb-4">
										<Link to={card.link}>
											<FontAwesomeIcon
												icon={faPenToSquare}
												size="xl"
											/>
										</Link>
										<FontAwesomeIcon
											icon={faTrashCan}
											className="text-red-600"
											size="xl"
										/>
									</div>
								</Card>
							))}
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

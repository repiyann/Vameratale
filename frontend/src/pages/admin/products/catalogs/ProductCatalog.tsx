import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/components/ui/card'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'

type Product = {
	product_uuid: number
	product_id: string
	product_name: string
	product_price: number
	product_description: string
	product_size: string
	product_category: string
	product_varian: string
	product_size_desc: string
	image_data: string
}

export default function ProductCatalog() {
	const [products, setProducts] = useState<Product[]>([])
	const [errorMessage, setErrorMessage] = useState<string>('')
	const BASE_API_URL: string | undefined = process.env.REACT_APP_API_URL
	const token: string | null = sessionStorage.getItem('token')

	function handleAxiosError(error: unknown): void {
		if (axios.isAxiosError(error)) {
			setErrorMessage(error.response?.data.message)
		} else if (error instanceof Error) {
			setErrorMessage(error.message)
		} else {
			setErrorMessage('Server bermasalah')
		}
	}

	useEffect(() => {
		async function fetchProducts(): Promise<void> {
			try {
				const response = await axios.get(`${BASE_API_URL}/product/getProducts`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})

				setProducts(response.data.rows)
			} catch (error: unknown) {
				handleAxiosError(error)
			}
		}

		fetchProducts()
	}, [BASE_API_URL, token])

	async function handleDelete(id: number): Promise<void> {
		try {
			await axios.delete(`${BASE_API_URL}/product/deleteProduct/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			setProducts(products.filter((product) => product.product_uuid !== id))
		} catch (error: unknown) {
			handleAxiosError(error)
		}
	}

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
							{errorMessage && <p className="text-red-500">{errorMessage}</p>}
							{products.map((product, index) => (
								<Card
									key={index}
									className="bg-white rounded-2xl shadow-lg"
								>
									<div className="bg-[#FFE3E3] px-2 py-1 flex items-center rounded-xl w-full h-[280px]">
										{product.image_data ? (
											<img
												src={`data:image/jpeg;base64,${product.image_data}`}
												alt={product.product_name}
												className="mx-auto"
												width={300}
											/>
										) : (
											<div className="w-full h-[280px] flex items-center justify-center">No Image Available</div>
										)}
									</div>
									<h2 className="text-xl mt-2 font-bold mx-4 md:mx-6">{product.product_name}</h2>
									<p className="text-[#A8A8A8] text-lg font-medium mx-4 md:mx-6">{product.product_description}</p>
									<p className="text-[#A8A8A8] text-lg font-medium mx-4 md:mx-6">{product.product_size}</p>
									<p className="text-[#A8A8A8] text-lg font-medium mx-4 md:mx-6">{product.product_varian}</p>
									<p className="text-[#A8A8A8] text-lg font-medium mx-4 md:mx-6">{product.product_category}</p>
									<p className="text-[#D13E55] text-lg font-semibold mx-4 md:mx-6">
										Rp{new Intl.NumberFormat('id-ID').format(product.product_price)}
									</p>
									<div className="flex justify-end mr-7 gap-4 mb-4">
										<Link to={`/admin/products/catalog/edit/${product.product_id}`}>
											<FontAwesomeIcon
												icon={faPenToSquare}
												size="xl"
											/>
										</Link>
										<FontAwesomeIcon
											icon={faTrashCan}
											className="text-red-600 cursor-pointer"
											size="xl"
											onClick={() => handleDelete(product.product_uuid)}
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

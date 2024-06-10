import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'

type Stock = {
	stock_id: number
	product_name: string
	stock: number
}

export default function ProductStock() {
	const [stocks, setStocks] = useState<Stock[]>([])
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
		async function fetchData(): Promise<void> {
			if (BASE_API_URL) {
				try {
					const response = await axios.get(`${BASE_API_URL}/stock/getStocks`, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					setStocks(response.data.data)
				} catch (error: unknown) {
					handleAxiosError(error)
				}
			}
		}

		fetchData()
	}, [BASE_API_URL, token])

	async function handleEdit(id: number): Promise<void> {
		try {
			await axios.delete(`${BASE_API_URL}/stock/editStock/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setStocks(stocks.filter((stock) => stock.stock_id !== id))
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
						<h1 className="text-2xl font-bold">Stok Barang</h1>
						<div className="mt-4">
							<Link
								to={'/admin/reports/stock/add-stock'}
								className="px-4 pb-2 pt-1 bg-[#FAEAED] font-semibold rounded-xl border-[3px] border-[#D85A6D]"
							>
								<FontAwesomeIcon
									icon={faPlusSquare}
									size="xl"
									className="text-[#606F49] mr-2"
								/>
								Tambah Stock
							</Link>
						</div>
						<div className="mt-7">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[10px]">No</TableHead>
										<TableHead>Produk</TableHead>
										<TableHead>Stok</TableHead>
										<TableHead className="text-right">Aksi</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{errorMessage && <p className="text-red-500">{errorMessage}</p>}
									{stocks.map((stock, index) => (
										<TableRow key={stock.stock_id}>
											<TableCell className="font-medium">{index + 1}</TableCell>
											<TableCell>{stock.product_name}</TableCell>
											<TableCell>{stock.stock}</TableCell>
											<TableCell className="text-right">
												<FontAwesomeIcon
													icon={faTrashCan}
													size="xl"
													color="red"
													onClick={() => handleEdit(stock.stock_id)}
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'

type Size = {
	size_id: number
	size_name: string
}

export default function ProductSize() {
	const [sizes, setSizes] = useState<Size[]>([])
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
			try {
				const response = await axios.get(`${BASE_API_URL}/size/getSizes`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})

				setSizes(response.data.data)
			} catch (error: unknown) {
				handleAxiosError(error)
			}
		}

		fetchData()
	}, [BASE_API_URL, token])

	async function handleDelete(id: number): Promise<void> {
		try {
			await axios.delete(`${BASE_API_URL}/size/deleteSize/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			
			setSizes(sizes.filter((size) => size.size_id !== id))
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
						<h1 className="text-2xl font-bold">Ukuran Barang</h1>
						<div className="mt-4">
							<Link
								to={'/admin/products/size/add-size'}
								className="px-4 pb-2 pt-1 bg-[#FAEAED] font-semibold rounded-xl border-[3px] border-[#D85A6D]"
							>
								<FontAwesomeIcon
									icon={faPlusSquare}
									size="xl"
									className="text-[#606F49] mr-2"
								/>
								Tambah Ukuran
							</Link>
						</div>
						<div className="mt-7">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[10px]">No</TableHead>
										<TableHead>Ukuran</TableHead>
										<TableHead className="text-right">Aksi</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{errorMessage && <p className="text-red-500">{errorMessage}</p>}
									{sizes.map((size, index) => (
										<TableRow key={size.size_id}>
											<TableCell className="font-medium">{index + 1}</TableCell>
											<TableCell>{size.size_name}</TableCell>
											<TableCell className="text-right">
												<FontAwesomeIcon
													icon={faTrashCan}
													size="xl"
													color="red"
													onClick={() => handleDelete(size.size_id)}
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

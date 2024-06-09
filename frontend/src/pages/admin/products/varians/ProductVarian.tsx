import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'
import { useEffect, useState } from 'react'

type Varian = {
	varian_id: number
	varian_name: string
	category_name: string
}

export default function ProductVarian() {
	const BASE_API_URL: string | undefined = process.env.REACT_APP_API_URL
	const [varians, setVarians] = useState<Varian[]>([])
	const [errorMessage, setErrorMessage] = useState<string>('')

	useEffect(() => {
		const fetchData = async () => {
			if (BASE_API_URL) {
				try {
					const response = await axios.get(`${BASE_API_URL}/varian/getVarians`)
					setVarians(response.data.data)
				} catch (error: unknown) {
					if (axios.isAxiosError(error)) {
						setErrorMessage(error.response?.data.message)
					} else if (error instanceof Error) {
						setErrorMessage(error.message)
					} else {
						setErrorMessage('Server bermasalah')
					}
				}
			}
		}

		fetchData()
	}, [BASE_API_URL])

	async function handleDelete(id: number) {
		try {
			await axios.delete(`${BASE_API_URL}/varian/deleteVarian/${id}`)
			setVarians(varians.filter((varian) => varian.varian_id !== id))
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				setErrorMessage(error.response?.data.message)
			} else if (error instanceof Error) {
				setErrorMessage(error.message)
			} else {
				setErrorMessage('Server bermasalah')
			}
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
						<h1 className="text-2xl font-bold">Varian Barang</h1>
						<div className="mt-4">
							<Link
								to={'/admin/products/varian/add-varian'}
								className="px-4 pb-2 pt-1 bg-[#FAEAED] font-semibold rounded-xl border-[3px] border-[#D85A6D]"
							>
								<FontAwesomeIcon
									icon={faPlusSquare}
									size="xl"
									className="text-[#606F49] mr-2"
								/>
								Tambah Varian
							</Link>
						</div>
						<div className="mt-7">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[10px]">No</TableHead>
										<TableHead>Kategori</TableHead>
										<TableHead>Varian</TableHead>
										<TableHead className="text-right">Aksi</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{errorMessage && <p className="text-red-500">{errorMessage}</p>}
									{varians.map((varian, index) => (
										<TableRow key={varian.varian_id}>
											<TableCell className="font-medium">{index + 1}</TableCell>
											<TableCell>{varian.category_name}</TableCell>
											<TableCell>{varian.varian_name}</TableCell>
											<TableCell className="text-right">
												<FontAwesomeIcon
													icon={faTrashCan}
													size="xl"
													color="red"
													onClick={() => handleDelete(varian.varian_id)}
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

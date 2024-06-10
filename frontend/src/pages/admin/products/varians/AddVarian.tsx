import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'
import { Card } from '@/components/ui/card'

interface Category {
	category_id: number
	category_name: string
}

export default function AddVarian() {
	const navigate = useNavigate()
	const [varian, setVarian] = useState<string>('')
	const [category, setCategory] = useState<string>('')
	const [categories, setCategories] = useState<Category[]>([])
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

	async function handleSubmit(): Promise<void> {
		try {
			await axios.post(`${BASE_API_URL}/varian/createVarian`, { varian_name: varian, category_id: category }, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			
			navigate('/admin/products/varian')
		} catch (error: unknown) {
			handleAxiosError(error)
		}
	}

	useEffect(() => {
		async function fetchData(): Promise<void> {
			try {
				const response = await axios.get(`${BASE_API_URL}/category/getCategories`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})

				setCategories(response.data.data)
			} catch (error: unknown) {
				handleAxiosError(error)
			}
		}

		fetchData()
	}, [BASE_API_URL, token])

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
						<div>
							<Link
								to={'/admin/products/varian'}
								className="px-2 py-1 rounded-2xl border-2 border-[#DC9D9D] text-[#990000] font-semibold"
							>
								<FontAwesomeIcon icon={faChevronLeft} /> Kembali
							</Link>
						</div>
						<h1 className="text-2xl font-bold">Tambah Varian</h1>
						<Card className="p-5 mt-2 bg-[#FFF3F3]">
							<form
								onSubmit={(e) => {
									e.preventDefault()
									handleSubmit()
								}}
							>
								{errorMessage && <p className="text-red-500">{errorMessage}</p>}
								<select
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									required
								>
									<option
										value={''}
										disabled
									>
										Pilih Kategori Barang
									</option>
									{categories.map((category) => (
										<option
											key={category.category_id}
											value={category.category_id}
										>
											{category.category_name}
										</option>
									))}
								</select>
								<input
									type="text"
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									placeholder="Masukkan varian"
									autoFocus
									required
									value={varian}
									onChange={(e) => setVarian(e.target.value)}
								/>
								<div className="flex justify-center mt-4">
									<button
										type="submit"
										className="bg-[#9FB480] px-4 py-2 rounded-md font-semibold"
									>
										Submit
									</button>
								</div>
							</form>
						</Card>
					</div>
				</section>
			</div>
		</>
	)
}

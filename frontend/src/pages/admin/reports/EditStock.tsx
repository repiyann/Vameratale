import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'
import { Card } from '@/components/ui/card'

export default function EditStock() {
	const [stock, setStock] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string>('')
	const navigate = useNavigate()
	const { id } = useParams()
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
		async function fetchStockData(): Promise<void> {
			try {
				const response = await axios.get(`${BASE_API_URL}/stock/getStock/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})

				setStock(response.data.data)
			} catch (error) {
				handleAxiosError(error)
			}
		}

		fetchStockData()
	}, [BASE_API_URL, id, token])

	async function handleSubmit(): Promise<void> {
		try {
			await axios.put(
				`${BASE_API_URL}/stock/updateStock/${id}`,
				{ stock },
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			
			navigate('/admin/reports/stock')
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
						<div>
							<Link
								to={'/admin/reports/stock'}
								className="px-2 py-1 rounded-2xl border-2 border-[#DC9D9D] text-[#990000] font-semibold"
							>
								<FontAwesomeIcon icon={faChevronLeft} /> Kembali
							</Link>
						</div>
						<h1 className="text-2xl font-bold">Tambah Stock</h1>
						<Card className="p-5 mt-2 bg-[#FFF3F3]">
							<form
								onSubmit={(e) => {
									e.preventDefault()
									handleSubmit()
								}}
							>
								{errorMessage && <p className="text-red-500">{errorMessage}</p>}
								<input
									type="number"
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									placeholder="Masukkan stock"
									autoFocus
									required
									value={stock}
									onChange={(e) => setStock(e.target.value)}
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

import { useState, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'
import { Card } from '@/components/ui/card'

export default function AddProduct() {
	const navigate = useNavigate()
	const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
	const [name, setName] = useState<string>('')
	const [price, setPrice] = useState<string>('')
	const [desc, setDesc] = useState<string>('')
	const [varian, setVarian] = useState<string>('')
	const [category, setCategory] = useState<string>('')
	const [size, setSize] = useState<string>('')
	const [stock, setStock] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string>('')
	const iconRef = useRef<HTMLInputElement>(null!)
	const BASE_API_URL: string | undefined = process.env.REACT_APP_API_URL

	function onBtnClick(): void {
		iconRef?.current.click()
	}

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setSelectedFiles(event.target.files)
	}

	async function handleSubmit(): Promise<void> {
		try {
			if (!selectedFiles || !name || !price || !desc || !category || !varian || !size || !stock) {
				setErrorMessage('Please fill in all required fields and select files to upload.')
				return
			}

			const formData = new FormData()
			formData.append('productName', name)
			formData.append('productPrice', price)
			formData.append('productDesc', desc)
			formData.append('category', category)
			formData.append('variant', varian)
			formData.append('size', size)
			formData.append('stock', stock)
			Array.from(selectedFiles).forEach((file) => {
				formData.append('files', file)
			})

			await axios.post(`${BASE_API_URL}/product/newProduct`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			navigate('/admin/products/catalog')
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
						<div>
							<Link
								to={'/admin/products/catalog'}
								className="px-2 py-1 rounded-2xl border-2 border-[#DC9D9D] text-[#990000] font-semibold"
							>
								<FontAwesomeIcon icon={faChevronLeft} /> Kembali
							</Link>
						</div>
						<h1 className="text-2xl font-bold">Input Katalog Barang</h1>
						<Card className="p-5 mt-2 bg-[#FFF3F3]">
							<form
								onSubmit={(e) => {
									e.preventDefault()
									handleSubmit()
								}}
							>
								{errorMessage && <p className="text-red-500">{errorMessage}</p>}
								<div className={`rounded-md flex flex-col text-center`}>
									<input
										ref={iconRef}
										type="file"
										onChange={handleFileChange}
										hidden
										multiple
										name="files"
									/>
									<div className="flex justify-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											viewBox="0 0 16 16"
											onClick={onBtnClick}
										>
											<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
											<path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
										</svg>
									</div>
									<p>Or</p>
									<p>Drag and Drop to Upload</p>
								</div>
								<input
									type="text"
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									placeholder="Masukkan nama barang"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
								<input
									type="number"
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									placeholder="Masukkan harga barang"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									required
								/>
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
									<option value="besar">Besar</option>
								</select>
								<select
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									value={varian}
									onChange={(e) => setVarian(e.target.value)}
									required
								>
									<option
										value={''}
										disabled
									>
										Pilih Varian Bunga
									</option>
									<option value="kecil">Kecil</option>
								</select>
								<select
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									value={size}
									onChange={(e) => setSize(e.target.value)}
									required
								>
									<option
										value={''}
										disabled
									>
										Pilih Ukuran
									</option>
									<option value="sedang">Sedang</option>
								</select>
								<textarea
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2 h-[150px]"
									placeholder="Masukkan deskripsi barang"
									value={desc}
									onChange={(e) => setDesc(e.target.value)}
									required
								></textarea>
								<input
									type="number"
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									placeholder="Masukkan stok barang"
									value={stock}
									onChange={(e) => setStock(e.target.value)}
									required
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

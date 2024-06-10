import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import CurrencyInput from 'react-currency-input-field';
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'
import { Card } from '@/components/ui/card'

interface Varian {
	varian_id: number
	varian_name: string
}

interface Size {
	size_id: number
	size_name: string
}

interface Category {
	category_id: string
	category_name: string
}

export default function AddProduct() {
	const navigate = useNavigate()
	const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
	const [productID, setProductID] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [price, setPrice] = useState<string>('')
	const [desc, setDesc] = useState<string>('')
	const [varian, setVarian] = useState<string>('')
	const [category, setCategory] = useState<string>('')
	const [size, setSize] = useState<string>('')
	const [stock, setStock] = useState<string>('')
	const [sizeDesc, setSizeDesc] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string>('')
	const iconRef = useRef<HTMLInputElement>(null!)
	const [dragging, setDragging] = useState<boolean>(false)
	const [preview, setPreview] = useState<string[]>([])
	const [varians, setVarians] = useState<Varian[]>([])
	const [sizes, setSizes] = useState<Size[]>([])
	const [categories, setCategories] = useState<Category[]>([])
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
				const [responseSizes, responseCategories] = await Promise.all([
					axios.get(`${BASE_API_URL}/size/getSizes`, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					}),
					axios.get(`${BASE_API_URL}/category/getCategories`, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
				])

				setSizes(responseSizes.data.data)
				setCategories(responseCategories.data.data)
			} catch (error: unknown) {
				handleAxiosError(error)
			}
		}

		fetchData()
	}, [BASE_API_URL, token])

	async function fetchVariantsByCategory(categoryId: string): Promise<void> {
		try {
			const response = await axios.get(`${BASE_API_URL}/varian/getVarian/${categoryId}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			
			setVarians(response.data.data)
		} catch (error: unknown) {
			handleAxiosError(error)
		}
	}

	function validateValue(value: string | undefined): void {
		const rawValue = value === undefined ? 'undefined' : value
		setPrice(rawValue || ' ')

		if (!value) {
			setErrorMessage('')
		} else if (Number.isNaN(Number(value))) {
			setErrorMessage('Please enter a valid number')
		}
	}

	function onBtnClick(): void {
		iconRef?.current.click()
	}

	function handleDragEnter(event: React.DragEvent<HTMLDivElement>): void {
		event.preventDefault()
		setDragging(true)
	}

	function handleDragLeave(event: React.DragEvent<HTMLDivElement>): void {
		event.preventDefault()
		setDragging(false)
	}

	function handleDragOver(event: React.DragEvent<HTMLDivElement>): void {
		event.preventDefault()
	}

	function handleDrop(event: React.DragEvent<HTMLDivElement>): void {
		event.preventDefault()
		setDragging(false)
		const files: FileList = event.dataTransfer.files
		handleFiles(files)
	}

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const files: FileList | null = event.target.files
		handleFiles(files)
	}

	function handleFiles(files: FileList | null): void {
		if (!files) return
		if (files.length > 5) {
			setErrorMessage('Maximum of 5 images allowed.')
			return
		}

		const validFiles: File[] = []
		for (let i = 0; i < files.length; i++) {
			const file: File = files[i]
			if (file && validateFile(file)) {
				validFiles.push(file)
			}
		}

		if (validFiles.length > 0) {
			setSelectedFiles(files)
			const newPreviewUrls: string[] = Array.from(validFiles).map((file) => URL.createObjectURL(file))
			setPreview(newPreviewUrls)
			setErrorMessage('')
		}
	}

	function validateFile(file: File | null): boolean {
		if (!file) return false
		if (!file.type.startsWith('image/')) {
			setErrorMessage('Please select an image file')
			return false
		}
		if (file.size > 1000000) {
			setErrorMessage('File size is too large')
			return false
		}
		return true
	}

	async function handleSubmit(): Promise<void> {
		try {
			if (!selectedFiles || !name || !price || !desc || !category || !varian || !size || !stock) {
				setErrorMessage('Please fill in all required fields and select files to upload.')
				return
			}

			const formData = new FormData()
			formData.append('productID', productID)
			formData.append('productName', name)
			formData.append('productPrice', price)
			formData.append('productDesc', desc)
			formData.append('category', category)
			formData.append('varian', varian)
			formData.append('size', size)
			formData.append('stock', stock)
			formData.append('productSizeDesc', sizeDesc)
			Array.from(selectedFiles).forEach((file) => {
				formData.append('files', file)
			})

			await axios.post(`${BASE_API_URL}/product/newProduct`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`
				}
			})

			navigate('/admin/products/catalog')
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
								<div
									className={`rounded-md flex flex-col ${
										dragging ? 'bg-[#DC9D9D]' : 'bg-white'
									} text-center border-dashed border-2 border-black p-10`}
									onDragEnter={handleDragEnter}
									onDragLeave={handleDragLeave}
									onDragOver={handleDragOver}
									onDrop={handleDrop}
								>
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
									{preview.length > 0 && (
										<div className="flex flex-wrap justify-center mt-4">
											{preview.map((previewUrl, index) => (
												<img
													key={index}
													src={previewUrl}
													className="h-32 object-cover m-2"
													alt={`Preview ${index + 1}`}
												/>
											))}
										</div>
									)}
								</div>
								<input
									type="text"
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									placeholder="Masukkan ID barang"
									value={productID}
									onChange={(e) => setProductID(e.target.value)}
									required
								/>
								<input
									type="text"
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									placeholder="Masukkan nama barang"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
								<CurrencyInput
									id="validation-example-2-field"
									placeholder="Masukkan harga barang"
									allowDecimals={false}
									groupSeparator='.'
									decimalSeparator=','
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									onValueChange={validateValue}
									prefix={'Rp'}
									step={10}
								/>
								<select
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									value={category}
									onChange={(e) => {
										setCategory(e.target.value)
										fetchVariantsByCategory(e.target.value)
									}}
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
									{varians.map((varian) => (
										<option
											key={varian.varian_id}
											value={varian.varian_id}
										>
											{varian.varian_name}
										</option>
									))}
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
									{sizes.map((size) => (
										<option
											key={size.size_id}
											value={size.size_id}
										>
											{size.size_name}
										</option>
									))}
								</select>
								<input
									type="text"
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									placeholder="Masukkan deskripsi ukuran barang"
									value={sizeDesc}
									onChange={(e) => setSizeDesc(e.target.value)}
									required
								/>
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

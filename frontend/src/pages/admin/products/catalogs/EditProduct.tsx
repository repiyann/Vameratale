import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'
import { Card } from '@/components/ui/card'

export default function EditProduct() {
	const [selectedFile, setSelectedFile] = useState<File[]>([])
	const [dragging, setDragging] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const iconRef = useRef<HTMLInputElement>(null!)
	const [preview, setPreview] = useState<string[]>([])

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
		const files = event.dataTransfer.files
		const validFiles: File[] = []

		if (files.length > 5) {
			setError('Maximum of 5 images allowed.')
			return
		}

		for (let i = 0; i < files.length; i++) {
			const file = files[i]

			if (file) {
				if (!validateFile(file)) {
					continue
				}
				validFiles.push(file)
				setError('')
			}
		}

		setSelectedFile(validFiles)
		const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file))
		setPreview(newPreviewUrls)
	}

	function handleFileInput(event: React.ChangeEvent<HTMLInputElement>): void {
		const files = event.target.files || []
		const validFiles: File[] = []

		if (files.length > 5) {
			setError('Maximum of 5 images allowed.')
			return
		}

		for (let i = 0; i < files.length; i++) {
			const file = files[i]
			if (file) {
				if (!validateFile(file)) {
					continue
				}
				validFiles.push(file)
				setError('')
			}
		}

		setSelectedFile(validFiles)
		const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file))
		setPreview(newPreviewUrls)
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault()
	}

	function validateFile(file: File | null): boolean {
		if (!file) return false

		if (!file.type.startsWith('image/')) {
			setError('Please select an image file')
			return false
		}

		if (file.size > 1000000) {
			setError('File size is too large')
			return false
		}

		return true
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
						<h1 className="text-2xl font-bold">Edit Katalog Barang</h1>
						<Card className="p-5 mt-2 bg-[#FFF3F3]">
							<form onSubmit={handleSubmit}>
								<div
									className={`rounded-md flex flex-col text-center ${
										dragging ? 'p-10 bg-blue-400' : selectedFile.length > 0 ? 'p-10 bg-red-400' : 'p-10 bg-green-400'
									}`}
									onDragEnter={handleDragEnter}
									onDragLeave={handleDragLeave}
									onDragOver={handleDragOver}
									onDrop={handleDrop}
								>
									<input
										ref={iconRef}
										type="file"
										onChange={handleFileInput}
										name="file"
										hidden
										multiple
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
								/>
								<input
									type="text"
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									placeholder="Masukkan harga barang"
								/>
								<select
									name=""
									id=""
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
								>
									<option disabled>Pilih Kategori Barang</option>
								</select>
								<select
									name=""
									id=""
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
								>
									<option disabled>Pilih Varian Bunga</option>
								</select>
								<select
									name=""
									id=""
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
								>
									<option disabled>Pilih Ukuran</option>
								</select>
								<textarea
									name=""
									id=""
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2 h-[150px]"
									placeholder="Masukkan deskripsi barang"
								></textarea>
								<input
									type="text"
									className="border-2 w-full border-black mt-4 rounded-md px-2 py-2"
									placeholder="Masukkan stok barang"
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
							{error}
							<section>
								<div className="col-md-4 ">
									{preview.map((previewUrl, index) => (
										<div
											key={index}
											className="col-md-4"
										>
											<img
												src={previewUrl}
												width={244}
												height={344}
												alt={`Preview ${index + 1}`}
											/>
										</div>
									))}
								</div>
							</section>
						</Card>
					</div>
				</section>
			</div>
		</>
	)
}

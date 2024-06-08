import { useState, useRef } from 'react'

export default function CreateProduct() {
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
		<div>
			<h1 className="text-center">React JS Image Upload and Preview </h1>
			<div className="container">
				<div className="row ">
					<div className="col-md-4 "></div>
					<div className="col-md-4">
						<div
							className={`upload_zone ${
								dragging ? 'p-10 bg-blue-400' : selectedFile.length > 0 ? 'p-10 bg-red-400' : 'p-10 bg-green-400'
							}`}
							onDragEnter={handleDragEnter}
							onDragLeave={handleDragLeave}
							onDragOver={handleDragOver}
							onDrop={handleDrop}
						>
							<header>File Uploader JavaScript</header>
							<form onSubmit={handleSubmit}>
								<input
									ref={iconRef}
									className="file-input"
									type="file"
									onChange={handleFileInput}
									name="file"
									hidden
									multiple
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-upload"
									viewBox="0 0 16 16"
									onClick={onBtnClick}
								>
									<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
									<path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
								</svg>
								<p>Or</p>
								<p>Drag and Drop to Upload</p>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

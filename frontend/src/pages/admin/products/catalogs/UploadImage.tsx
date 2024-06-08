import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UploadImage: React.FC = () => {
	const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
	const [images, setImages] = useState<{ name: string; data: string }[]>([])

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFiles(event.target.files)
	}

	const handleUpload = async () => {
		if (!selectedFiles) return

		const formData = new FormData()
		Array.from(selectedFiles).forEach((file) => {
			formData.append('files', file)
		})

		try {
			await axios.post('http://localhost:8000/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})

			// Fetch and display images
			fetchImages()
		} catch (error) {
			console.error('Error uploading files:', error)
		}
	}

	const fetchImages = async () => {
		try {
			const response = await axios.get('http://localhost:8000/images')
			setImages(response.data)
			console.log(response)
		} catch (error) {
			console.error('Error fetching images:', error)
		}
	}

	useEffect(() => {
		// Fetch images when the component mounts
		fetchImages()
	}, [])

	return (
		<div>
			<input
				type="file"
				multiple
				onChange={handleFileChange}
			/>
			<button onClick={handleUpload}>Upload</button>

			<div>
				{images.map((image, index) => (
					<img
						key={index}
						src={`data:image/jpeg;base64,${image.data}`}
						alt={image.name}
						style={{ width: '200px', margin: '10px' }}
					/>
				))}
			</div>
		</div>
	)
}

export default UploadImage

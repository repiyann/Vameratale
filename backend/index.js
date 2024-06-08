import express from 'express'
import compression from 'compression'
import cors from 'cors'
import 'dotenv/config'
import helmet from 'helmet'
import authRoutes from './src/routes/auth/auth.route.js'
import userRoutes from './src/routes/user/user.route.js'
import productRoutes from './src/routes/admin/product/product.route.js'
import varianRoutes from './src/routes/admin/varian/varian.route.js'
import sizeRoutes from './src/routes/admin/size/size.route.js'
import categoryRoutes from './src/routes/admin/category/category.route.js'
import getUserRoute from './src/routes/admin/user/user.route.js'
import verifyToken from './src/middleware/jwt.middleware.js'
import pool from './src/database/config.js'
import fileUpload from 'express-fileupload'

const app = express()
const PORT = process.env.PORT

const corsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(helmet())

app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Server bermasalah')
})

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/product', productRoutes)
// app.use('/varian', [verifyToken, varianRoutes])
app.use('/varian', varianRoutes)
app.use('/size', sizeRoutes)
app.use('/category', categoryRoutes)
app.use('/get', getUserRoute)

app.use(
	fileUpload({
		createParentPath: true
	})
)

// Upload Endpoint
app.post('/upload', async (req, res) => {
	let uploadedFiles = req.files.files

	if (!Array.isArray(uploadedFiles)) {
		uploadedFiles = [uploadedFiles]
	}

	const insertPromises = uploadedFiles.map(async (file) => {
		const fileName = file.name
		const fileData = file.data

		const query = 'INSERT INTO images (name, data) VALUES (?, ?)'
		await pool.query(query, [fileName, fileData])
		console.log('File inserted:', fileName)
	})

	try {
		await Promise.all(insertPromises)
		res.send('Files have been uploaded.')
	} catch (err) {
		console.error('Error inserting files:', err)
		res.status(500).send('An error occurred while uploading files.')
	}
})

// Retrieve endpoint
app.get('/images', async (req, res) => {
	const query = 'SELECT * FROM images'
	try {
		const [results] = await pool.query(query)
		results.forEach((result) => {
			result.data = result.data.toString('base64')
		})
		res.json(results)
	} catch (err) {
		console.error('Error fetching images:', err)
		res.status(500).send('An error occurred while fetching images.')
	}
})

app.listen(PORT, () => {
	console.log(`Backend listening on port ${PORT}`)
})

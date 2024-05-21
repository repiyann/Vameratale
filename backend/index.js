import express from 'express'
import compression from 'compression'
import cors from 'cors'
import 'dotenv/config'
import helmet from 'helmet'
import authRouter from './src/routes/auth/auth.route.js'
import userRouter from './src/routes/user/user.route.js'
import productRouter from './src/routes/product/product.route.js'

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
	res.status(500).send('Internal Server Error')
})

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)

app.listen(PORT, () => {
	console.log(`Backend listening on port ${PORT}`)
})

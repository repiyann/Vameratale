import express from 'express'
import verifyToken from '../../middleware/jwt.middleware.js'
import {
	createProduct,
	getProducts,
	getProductByID,
	updateProduct,
	deleteProduct
} from '../../controllers/product/product.controller.js'
import pool from '../../config/db.js'

const router = express.Router()

router.post('/newProduct', async (req, res) => await createProduct(req, res, pool))
router.get('/getProducts', async (req, res) => await getProducts(req, res, pool))
router.get('/getProduct/:id', async (req, res) => await getProductByID(req, res, pool))
router.put('/updateProduct/:id', async (req, res) => await updateProduct(req, res, pool))
router.post('/deleteProduct/:id', async (req, res) => await deleteProduct(req, res, pool))

export default router

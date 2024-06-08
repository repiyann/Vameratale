import express from 'express'
import {
	createProduct,
	getProducts,
	getProductByID,
	updateProduct,
	deleteProduct
} from '../../../controllers/admin/product/product.controller.js'
import pool from '../../../database/config.js'
import fileUpload from 'express-fileupload'

const router = express.Router()

router.use(
	fileUpload({
		createParentPath: true
	})
)

router.post('/newProduct', async (req, res, next) => await createProduct(req, res, pool, next))
router.get('/getProducts', async (req, res, next) => await getProducts(req, res, pool, next))
router.get('/getProduct/:id', async (req, res, next) => await getProductByID(req, res, pool, next))
router.put('/updateProduct/:id', async (req, res, next) => await updateProduct(req, res, pool, next))
router.delete('/deleteProduct/:id', async (req, res, next) => await deleteProduct(req, res, pool, next))

export default router

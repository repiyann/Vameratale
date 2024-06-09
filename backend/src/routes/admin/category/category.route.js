import express from 'express'
import { createCategory, getCategories, updateCategory, deleteCategory } from '../../../controllers/admin/category/category.controller.js'
import pool from '../../../database/config.js'

const router = express.Router()

router.post('/createCategory', async (req, res, next) => await createCategory(req, res, pool, next))
router.get('/getCategories', async (req, res, next) => await getCategories(req, res, pool, next))
router.put('/updateCategory/:id', async (req, res, next) => await updateCategory(req, res, pool, next))
router.delete('/deleteCategory/:id', async (req, res, next) => await deleteCategory(req, res, pool, next))

export default router

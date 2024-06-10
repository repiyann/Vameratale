import express from 'express'
import { getStocks, getStockByID, updateStock } from '../../../controllers/admin/stock/stock.controller.js'
import pool from '../../../database/config.js'

const router = express.Router()

router.get('/getStocks', async (req, res, next) => await getStocks(req, res, pool, next))
router.get('/getStock/:id', async (req, res, next) => await getStockByID(req, res, pool, next))
router.put('/updateStock/:id', async (req, res, next) => await updateStock(req, res, pool, next))

export default router

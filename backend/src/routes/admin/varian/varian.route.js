import express from 'express'
import { createVarians, getVarians, getVarian, updateVarian, deleteVarian } from '../../../controllers/admin/varian/varian.controller.js'
import pool from '../../../database/config.js'

const router = express.Router()

router.post('/createVarian', async (req, res, next) => await createVarians(req, res, pool, next))
router.get('/getVarians', async (req, res, next) => await getVarians(req, res, pool, next))
router.get('/getVarian/:id', async (req, res, next) => await getVarian(req, res, pool, next))
router.put('/updateVarian/:id', async (req, res, next) => await updateVarian(req, res, pool, next))
router.delete('/deleteVarian/:id', async (req, res, next) => await deleteVarian(req, res, pool, next))

export default router

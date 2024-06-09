import express from 'express'
import { createSize, getSizes, updateSize, deleteSize } from '../../../controllers/admin/size/size.controller.js'
import pool from '../../../database/config.js'

const router = express.Router()

router.post('/createSize', async (req, res, next) => await createSize(req, res, pool, next))
router.get('/getSizes', async (req, res, next) => await getSizes(req, res, pool, next))
router.put('/updateSize/:id', async (req, res, next) => await updateSize(req, res, pool, next))
router.delete('/deleteSize/:id', async (req, res, next) => await deleteSize(req, res, pool, next))

export default router

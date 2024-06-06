import express from 'express'
import { getUsersAdmin } from '../../../controllers/admin/user/user.controller.js'
import pool from '../../../database/config.js'

const router = express.Router()

router.get('/getUsersAdmin', async (req, res, next) => await getUsersAdmin(req, res, pool, next))

export default router

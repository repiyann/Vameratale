import express from 'express'
import { getUsersAdmin, getAdmins, deleteAdmin } from '../../../controllers/admin/user/user.controller.js'
import pool from '../../../database/config.js'

const router = express.Router()

router.get('/getUsersAdmin', async (req, res, next) => await getUsersAdmin(req, res, pool, next))
router.get('/getAdmins', async (req, res, next) => await getAdmins(req, res, pool, next))
router.delete('/deleteAdmin/:id', async (req, res, next) => await deleteAdmin(req, res, pool, next))

export default router

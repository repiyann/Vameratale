import express from 'express'
import verifyToken from '../../middleware/jwt.middleware.js'
import { editUser, deleteUser } from '../../controllers/user/user.controller.js'
import pool from '../../database/config.js'

const router = express.Router()

router.put('/updateUser', verifyToken, async (req, res, next) => await editUser(req, res, pool, next))
router.post('/deleteUser', verifyToken, async (req, res, next) => await deleteUser(req, res, pool, next))

export default router

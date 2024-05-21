import express from 'express'
import verifyToken from '../../middleware/jwt.middleware.js'
import { editUser, deleteUser } from '../../controllers/user/user.controller.js'
import pool from '../../config/db.js'

const router = express.Router()

router.put('/updateUser', verifyToken, async (req, res) => await editUser(req, res, pool))
router.post('/deleteUser', verifyToken, async (req, res) => await deleteUser(req, res, pool))

export default router

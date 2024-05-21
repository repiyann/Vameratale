import express from 'express'
import rateLimit from 'express-rate-limit'
import { register, login, getUser, registerAdmin } from '../../controllers/auth/auth.controller.js'
import verifyToken from '../../middleware/jwt.middleware.js'
import pool from '../../database/config.js'

const router = express.Router()

const attemptsLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	message: { message: 'Too many attempts. Please try again later.' },
	standardHeaders: true,
	legacyHeaders: false
})

router.post('/register', attemptsLimiter, async (req, res, next) => await register(req, res, pool, next))
router.post('/registerAdmin', attemptsLimiter, async (req, res, next) => await registerAdmin(req, res, pool, next))
router.post('/login', attemptsLimiter, async (req, res, next) => await login(req, res, pool, next))
router.get('/getUser', verifyToken, async (req, res) => await getUser(req, res, pool))
router.get('/protected', verifyToken, (req, res) => {
	res.json({ message: 'This is a protected route' })
})

export default router

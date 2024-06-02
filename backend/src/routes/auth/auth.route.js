import express from 'express'
import rateLimit from 'express-rate-limit'
import { register, login, getUser, resetPasswordOTP, generateOTP, verifyEmail } from '../../controllers/auth/authUser.controller.js'
import { registerAdmin, loginAdmin, getAdmin } from '../../controllers/auth/authAdmin.controller.js'
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
router.post('/loginAdmin', attemptsLimiter, async (req, res, next) => await loginAdmin(req, res, pool, next))
router.get('/getUser', verifyToken, async (req, res) => await getUser(req, res, pool))
router.get('/getAdmin', verifyToken, async (req, res) => await getAdmin(req, res, pool))
router.post('/generateOTP', attemptsLimiter, async (req, res, next) => await generateOTP(req, res, pool, next))
router.post('/resetPasswordOTP', attemptsLimiter, async (req, res, next) => await resetPasswordOTP(req, res, pool, next))
router.post('/verifyEmail', attemptsLimiter, async (req, res, next) => await verifyEmail(req, res, pool, next))

export default router

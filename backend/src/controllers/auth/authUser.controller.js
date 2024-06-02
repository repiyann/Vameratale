import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import moment from 'moment'
import crypto from 'crypto'
import { sendVerificationEmail, sendOTPEmail } from './sendMail.js'

const SALT_ROUNDS = process.env.SALT_ROUND
const JWT_SECRET_KEY = process.env.JWT_SECRET

async function register(req, res, pool, next) {
	try {
		const { email, password, telepon, confirmPassword } = req.body
		const checkEmailQuery = `SELECT * FROM users WHERE user_email = ?`
		const SQLQuery = `INSERT INTO users (user_email, user_password, user_phone, verificationToken) VALUES (?, ?, ?, ?)`

		if (!validator.isLength(password, { min: 8 })) {
			return res.status(400).json({ message: 'Password should be at least 8 characters long' })
		}

		if (!validator.equals(password, confirmPassword)) {
			return res.status(400).json({ message: 'Password and Confirm Password do not match' })
		}

		if (!validator.isEmail(email)) {
			return res.status(400).json({ message: 'Invalid email format' })
		}

		const [checkEmailResult] = await pool.execute(checkEmailQuery, [email])
		if (checkEmailResult.length > 0) {
			return res.status(400).json({ message: 'Email already exists' })
		}

		const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS))
		const verificationToken = crypto.randomBytes(20).toString('hex')

		await pool.execute(SQLQuery, [email, hashedPassword, telepon, verificationToken])
		await sendVerificationEmail(email, verificationToken)

		return res.status(201).json({ message: 'Registration successful' })
	} catch (err) {
		console.error(err.stack)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function login(req, res, pool, next) {
	try {
		const { email, password } = req.body
		const SQLQuery = `SELECT * FROM users WHERE user_email = ?`

		if (!validator.isEmail(email)) {
			return res.status(400).json({ message: 'Invalid email format' })
		}

		const [validateUserResult] = await pool.execute(SQLQuery, [email])
		if (validateUserResult.length === 0) {
			return res.status(404).json({ message: 'Email not exist' })
		}

		let user
		let role

		if (validateUserResult.length > 0) {
			user = validateUserResult[0]
			role = 'user'
		}

		const isPasswordValid = await bcrypt.compare(password, user.user_password)
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid username or password' })
		}

		const token = jwt.sign({ userId: user.user_id }, JWT_SECRET_KEY, { expiresIn: '1h' })

		return res.status(200).json({ message: 'Login successful', token, role: role })
	} catch (err) {
		console.error(err.stack)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function getUser(req, res, pool, next) {
	try {
		const SQLQuery = `SELECT * FROM users WHERE user_id = ?`

		const token = req.headers['authorization']
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' })
		}

		const tokenParts = token.split(' ')
		const jwtToken = tokenParts[1]

		const decoded = jwt.verify(jwtToken, JWT_SECRET_KEY)
		if (!decoded || !decoded.userId) {
			return res.status(401).json({ message: 'Invalid token' })
		}

		const [validateUserResult] = await pool.execute(SQLQuery, [decoded.userId])
		if (validateUserResult.length === 0) {
			return res.status(404).json({ message: 'User not exist' })
		}

		let user
		let role

		if (validateUserResult.length > 0) {
			user = validateUserResult[0]
			role = 'user'
		}

		return res.status(200).json({ user: user, role: role })
	} catch (err) {
		console.error(err.stack)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function verifyEmail(req, res, pool, next) {
	try {
		const { email, token } = req.body
		const SQLQuery = `SELECT * FROM users WHERE user_email = ? AND verificationToken = ?`

		if (!validator.isEmail(email)) {
			return res.status(400).json({ message: 'Invalid email format' })
		}

		const [users] = await pool.execute(SQLQuery, [email, token])
		if (users.length === 0) {
			return res.status(404).json({ message: 'Invalid or expired verification token' })
		}

		const updateSQLQuery = `UPDATE users SET isVerified = TRUE, verificationToken = NULL WHERE user_email = ?`
		await pool.execute(updateSQLQuery, [email])

		return res.status(200).json({ message: 'Email verification successful' })
	} catch (err) {
		console.error(err.stack)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function generateOTP(req, res, pool, next) {
	try {
		const { email } = req.body

		if (!validator.isEmail(email)) {
			return res.status(400).json({ message: 'Invalid email format' })
		}

		const otp = Math.floor(1000 + Math.random() * 9000).toString()
		const expiration = Date.now() + 10 * 60 * 1000
		const formattedExpiration = moment(expiration).format('YYYY-MM-DD HH:mm:ss')
		const checkEmailQuery = `SELECT * FROM users WHERE user_email = ?`
		const SQLQuery = `UPDATE users SET resetPasswordOTP = ?, resetPasswordExpires = ? WHERE user_email = ?`

		const [checkEmailResult] = await pool.execute(checkEmailQuery, [email])
		if (checkEmailResult.length === 0) {
			return res.status(400).json({ message: "Email didn't exists" })
		}

		await pool.execute(SQLQuery, [otp, formattedExpiration, email])
		await sendOTPEmail(email, otp)

		return res.status(200).json({ message: 'OTP sent successfully' })
	} catch (err) {
		console.error(err.stack)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function resetPasswordOTP(req, res, pool, next) {
	try {
		const { email, otp, password, confirmPassword } = req.body

		if (!validator.isLength(password, { min: 8 })) {
			return res.status(400).json({ message: 'Password should be at least 8 characters long' })
		}

		if (!validator.equals(password, confirmPassword)) {
			return res.status(400).json({ message: 'Password and Confirm Password do not match' })
		}

		if (!validator.isEmail(email)) {
			return res.status(400).json({ message: 'Invalid email format' })
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
		const SQLQuery = `
    	UPDATE users
    	SET user_password = ?, resetPasswordOTP = NULL, resetPasswordExpires = NULL
    	WHERE user_email = ? AND resetPasswordOTP = ? AND resetPasswordExpires > ?
  	`

		const [result] = await pool.execute(SQLQuery, [hashedPassword, email, otp, currentTime])
		if (result.affectedRows === 0) {
			throw new Error('OTP is invalid or has expired')
		}

		return res.status(200).json({ message: 'Password reseted successfully' })
	} catch (err) {
		console.error(err.stack)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}

export { register, login, getUser, generateOTP, resetPasswordOTP, verifyEmail }

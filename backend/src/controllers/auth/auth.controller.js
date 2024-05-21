import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = process.env.SALT_ROUND
const JWT_SECRET_KEY = process.env.JWT_SECRET

async function register(req, res, pool, next) {
	try {
		const { email, password, telepon, confirmPassword } = req.body

		if (password.length < 8) {
			return res.status(400).json({ message: 'Password should be at least 8 characters long' })
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: 'Password and Confirm Password do not match' })
		}

		const [checkEmailResult] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
		if (checkEmailResult.length > 0) {
			return res.status(400).json({ message: 'Email already exists' })
		}

		const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS))
		await pool.query('INSERT INTO users (email, password, telepon) VALUES (?, ?, ?)', [email, hashedPassword, telepon])

		return res.status(201).json({ message: 'Registration successful' })
	} catch (err) {
		console.error(err.stack)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function registerAdmin(req, res, pool, next) {
	try {
		const { email, password } = req.body

		if (password.length < 8) {
			return res.status(400).json({ message: 'Password should be at least 8 characters long' })
		}

		const [checkEmailResult] = await pool.query('SELECT * FROM admins WHERE email = ?', [email])
		if (checkEmailResult.length > 0) {
			return res.status(400).json({ message: 'Email already exists' })
		}

		const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS))
		await pool.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashedPassword])

		return res.status(201).json({ message: 'Registration successful' })
	} catch (err) {
		console.error(err.stack)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function login(req, res, pool, next) {
	try {
		const { email, password } = req.body

		const [validateUserResult] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
		const [validateAdminResult] = await pool.query('SELECT * FROM admins WHERE email = ?', [email])

		if (validateUserResult.length === 0 && validateAdminResult.length === 0) {
			return res.status(404).json({ message: 'Email not exist' })
		}

		let user
		let role

		if (validateUserResult.length > 0) {
			user = validateUserResult[0]
			role = 'user'
		} else {
			user = validateAdminResult[0]
			role = 'admin'
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid username or password' })
		}

		const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' })

		return res.status(200).json({ message: 'Login successful', token, role: role })
	} catch (err) {
		console.error(err.stack)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function getUser(req, res, pool) {
	try {
		const token = req.headers['authorization']
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' })
		}

		const tokenParts = token.split(' ')
		const jwtToken = tokenParts[1]

		const decoded = jwt.verify(jwtToken, JWT_SECRET_KEY)
		if (!decoded) {
			return res.status(401).json({ message: 'Invalid token' })
		}

		const [validateUserResult] = await pool.query('SELECT * FROM users WHERE id = ?', [decoded.userId])
		const [validateAdminResult] = await pool.query('SELECT * FROM admins WHERE id = ?', [decoded.userId])

		if (validateUserResult.length === 0 && validateAdminResult.length === 0) {
			return res.status(404).json({ message: 'User not exist' })
		}

		let user
		let role

		if (validateUserResult.length > 0) {
			user = validateUserResult[0]
			role = 'user'
		} else {
			user = validateAdminResult[0]
			role = 'admin'
		}

		return res.status(200).json({ user: user, role: role })
	} catch (err) {
		console.error(err.stack)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}

export { register, registerAdmin, login, getUser }

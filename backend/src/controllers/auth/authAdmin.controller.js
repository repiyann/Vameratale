import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'

const SALT_ROUNDS = process.env.SALT_ROUND
const JWT_SECRET_KEY = process.env.JWT_SECRET

async function registerAdmin(req, res, pool, next) {
	try {
		const { email, password } = req.body

		if (validator.isEmpty(email) || validator.isEmpty(password)) {
			return res.status(400).json({ message: 'Input tidak boleh kosong' })
		}

		if (!validator.isEmail(email)) {
			return res.status(400).json({ message: 'Format email salah' })
		}

		if (!validator.isLength(password, { min: 8 })) {
			return res.status(400).json({ message: 'Kata sandi minimal 8 karakter' })
		}

		const [checkEmailResult] = await pool.execute('SELECT * FROM admins WHERE admin_email = ?', [email])
		if (checkEmailResult.length > 0) {
			return res.status(400).json({ message: 'Email sudah digunakan' })
		}

		const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS))
		await pool.query('INSERT INTO admins (admin_email, admin_password) VALUES (?, ?)', [email, hashedPassword])

		return res.status(201).json({ message: 'Registrasi berhasil' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function loginAdmin(req, res, pool, next) {
	try {
		const { email, password } = req.body

		if (validator.isEmpty(email) || validator.isEmpty(password)) {
			return res.status(400).json({ message: 'Input tidak boleh kosong' })
		}

		if (!validator.isEmail(email)) {
			return res.status(400).json({ message: 'Format email salah' })
		}

		if (!validator.isLength(password, { min: 8 })) {
			return res.status(400).json({ message: 'Kata sandi minimal 8 karakter' })
		}

		const [validateAdminResult] = await pool.query('SELECT * FROM admins WHERE admin_email = ?', [email])

		if (validateAdminResult.length === 0) {
			return res.status(404).json({ message: 'Email dan kata sandi tidak sesuai' })
		}

		let user
		let role

		if (validateAdminResult.length > 0) {
			user = validateAdminResult[0]
			role = 'admin'
		}

		const isPasswordValid = await bcrypt.compare(password, user.admin_password)
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Email dan kata sandi tidak sesuai' })
		}

		const token = jwt.sign({ userId: user.admin_id, role: role }, JWT_SECRET_KEY, { expiresIn: '1h' })

		return res.status(200).json({ message: 'Login berhasil', token, role: role })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function getAdmin(req, res, pool, next) {
	try {
		const token = req.headers['authorization']
		if (!token) {
			return res.status(401).json({ message: 'Tidak berwenang' })
		}

		const tokenParts = token.split(' ')
		const jwtToken = tokenParts[1]

		const decoded = jwt.verify(jwtToken, JWT_SECRET_KEY)
		if (!decoded || !decoded.userId) {
			return res.status(401).json({ message: 'Token tidak valid' })
		}

		const [validateAdminResult] = await pool.execute('SELECT * FROM admins WHERE admin_id = ?', [decoded.userId])
		if (validateAdminResult.length === 0) {
			return res.status(404).json({ message: 'Akun tidak ditemukan' })
		}

		let user
		let role

		if (validateAdminResult.length > 0) {
			user = validateAdminResult[0]
			role = 'admin'
		}

		return res.status(200).json({ user: user, role: role })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

export { registerAdmin, loginAdmin, getAdmin }

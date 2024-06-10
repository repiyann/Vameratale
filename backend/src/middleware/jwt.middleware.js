import jwt from 'jsonwebtoken'

export default function verifyToken(role) {
	return function (req, res, next) {
		const token = req.headers['authorization']
		const JWT_SECRET_KEY = process.env.JWT_SECRET

		if (!token) {
			return res.status(401).json({ message: 'Token tidak tersedia' })
		}

		const tokenParts = token.split(' ')
		const jwtToken = tokenParts[1]

		jwt.verify(jwtToken, JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				return res.status(403).json({ message: 'Gagal verifikasi token' })
			}

			if (decoded.role !== role) {
				return res.status(403).json({ message: 'Tidak memiliki akses' })
			}

			req.userId = decoded.userId
			next()
		})
	}
}

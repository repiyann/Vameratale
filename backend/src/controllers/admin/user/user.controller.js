async function getUsersAdmin(req, res, pool, next) {
	try {
		const [results] = await pool.query('SELECT * FROM users')
		if (results.length === 0) {
			return res.status(404).json({ message: 'Pengguna tidak ada' })
		}

		return res.status(200).json({ message: 'Pengguna berhasil didapat', data: results })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

export { getUsersAdmin }

async function getUsersAdmin(req, res, pool, next) {
	try {
		const [userDetails] = await pool.query('SELECT user_id, user_email, user_address, user_name, user_phone FROM users')
		const [count] = await pool.query('SELECT COUNT(*) as userCount FROM users')

		if (userDetails.length === 0) {
			return res.status(404).json({ message: 'Pengguna tidak ada' })
		}

		return res
			.status(200)
			.json({ message: 'Pengguna berhasil didapat', data: userDetails, totalUsers: count[0].userCount })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

export { getUsersAdmin }

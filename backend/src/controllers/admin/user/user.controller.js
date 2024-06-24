import validator from "validator"

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

async function getAdmins(req, res, pool, next) {
	try {
		const [adminDetails] = await pool.query('SELECT admin_id, admin_email FROM admins')
		const [count] = await pool.query('SELECT COUNT(*) as adminCount FROM admins')

		if (adminDetails.length === 0) {
			return res.status(404).json({ message: 'Admin tidak ada' })
		}

		return res
			.status(200)
			.json({ message: 'Admin berhasil didapat', data: adminDetails, totalAdmins: count[0].adminCount })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function deleteAdmin(req, res, pool, next) {
	try {
		const { id } = req.params

		if (!validator.isInt(id, { min: 1 })) {
			return res.status(400).json({ message: 'ID harus angka' })
		}

		const [adminDetails] = await pool.query('SELECT admin_id FROM admins')
		if (adminDetails.length === 0) {
			return res.status(404).json({ message: 'Admin tidak ada' })
		}

		const [result] = await pool.query('DELETE FROM admins WHERE admin_id = ?', [id])
		if (result.affectedRows === 0) {
			return res.status(200).json({ message: 'Tidak ada perubahan' })
		}

		return res.status(200).json({ message: 'Admin berhasil dihapus' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

export { getUsersAdmin, getAdmins, deleteAdmin }

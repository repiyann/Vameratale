async function editUser(req, res) {
	try {
		const { userId } = req.params
		const { name, email, phone, address } = req.body

		const checkUser = await pool.query('SELECT * FROM users WHERE id = ?', [userId])

		if (checkUser.length === 0) {
			return res.status(404).json({ message: 'User not found' })
		}

		const updatedUser = await pool.query('UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?', [
			name,
			email,
			phone,
			address,
			userId
		])

		res.status(200).json({ message: 'User details updated successfully', user: updatedUser })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function deleteUser(req, res) {
	try {
		const { userId } = req.params

		const checkUser = await pool.query('SELECT * FROM users WHERE id = ?', [userId])

		if (checkUser.length === 0) {
			return res.status(404).json({ message: 'User not found' })
		}

		const deletedUser = await pool.query('DELETE FROM users WHERE id = ?', [userId])

		res.status(200).json({ message: 'User deleted successfully' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

export { editUser, deleteUser }

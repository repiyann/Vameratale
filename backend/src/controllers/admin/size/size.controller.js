import validator from 'validator'

async function createSize(req, res, pool, next) {
	try {
		const { size_name } = req.body

		if (validator.isEmpty(size_name)) {
			return res.status(400).json({ message: 'Input tidak boleh kosong' })
		}

		await pool.query('INSERT INTO sizes (size_name) VALUES (?)', [size_name])

		return res.status(201).json({ message: 'Ukuran berhasil dibuat' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function getSizes(req, res, pool, next) {
	try {
		const [results] = await pool.query('SELECT * FROM sizes')
		if (results.length === 0) {
			return res.status(404).json({ message: 'Ukuran kosong' })
		}

		return res.status(200).json({ message: 'Ukuran berhasil didapat', data: results })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function updateSize(req, res, pool, next) {
	try {
		const { id } = req.params
		const { size_name } = req.body

		if (!validator.isInt(id, { min: 1 })) {
			return res.status(400).json({ message: 'ID harus angka' })
		}

		if (validator.isEmpty(size_name)) {
			return res.status(400).json({ message: 'Input tidak boleh kosong' })
		}

		const [checkNotes] = await pool.query('SELECT * FROM sizes WHERE size_id = ?', [id])
		if (checkNotes.length === 0) {
			return res.status(404).json({ message: 'Ukuran tidak ditemukan' })
		}

		const [results] = await pool.query('UPDATE sizes SET size_name = ? WHERE size_id = ?', [size_name, id])
		if (results.affectedRows === 0) {
			return res.status(200).json({ message: 'Tidak ada perubahan' })
		}

		return res.status(200).json({ message: 'Ukuran berhasil diubah' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function deleteSize(req, res, pool, next) {
	try {
		const { id } = req.params

		if (!validator.isInt(id, { min: 1 })) {
			return res.status(400).json({ message: 'ID harus angka' })
		}

		const [checkNotes] = await pool.query('SELECT * FROM sizes WHERE size_id = ?', [id])
		if (checkNotes.length === 0) {
			return res.status(404).json({ message: 'Ukuran tidak ditemukan' })
		}

		const [result] = await pool.query('DELETE FROM sizes WHERE size_id = ?', [id])
		if (result.affectedRows === 0) {
			return res.status(200).json({ message: 'Tidak ada perubahan' })
		}

		return res.status(200).json({ message: 'Ukuran berhasil dihapus' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

export { createSize, getSizes, updateSize, deleteSize }

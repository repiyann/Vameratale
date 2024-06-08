import validator from 'validator'

async function createCategory(req, res, pool, next) {
	try {
		const { category_name } = req.body

		if (validator.isEmpty(category_name)) {
			return res.status(400).json({ message: 'Input nama tidak boleh kosong' })
		}

		await pool.query('INSERT INTO categories (category_name) VALUES (?)', [category_name])

		return res.status(201).json({ message: 'Ukuran berhasil dibuat' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function getCategories(req, res, pool, next) {
	try {
		const [results] = await pool.query('SELECT * FROM categories')
		if (results.length === 0) {
			return res.status(404).json({ message: 'Ukuran kosong' })
		}

		return res.status(200).json({ message: 'Varian berhasil didapat', data: results })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function getCategoryByID(req, res, pool, next) {
	try {
		const { id } = req.params

		if (validator.isEmpty(id)) {
			return res.status(400).json({ message: 'ID tidak boleh kosong' })
		}

		if (!validator.isNumeric(id)) {
			return res.status(400).json({ message: 'ID harus angka' })
		}

		const [result] = await pool.query('SELECT * FROM categories WHERE category_id = ?', [id])
		if (result.length === 0) {
			return res.status(404).json({ message: 'Ukuran tidak ditemukan' })
		}

		return res.status(200).json({ message: 'Ukuran berhasil didapat', data: result })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function updateCategory(req, res, pool, next) {
	try {
		const { id } = req.params
		const { category_name } = req.body

		if (validator.isEmpty(id) || validator.isEmpty(category_name)) {
			return res.status(400).json({ message: 'Input tidak boleh kosong' })
		}

		if (!validator.isNumeric(id)) {
			return res.status(400).json({ message: 'ID harus angka' })
		}

		const [checkNotes] = await pool.query('SELECT * FROM categories WHERE category_id = ?', [id])
		if (checkNotes.length === 0) {
			return res.status(404).json({ message: 'Ukuran tidak ditemukan' })
		}

		const [results] = await pool.query('UPDATE categories SET category_name = ? WHERE category_id = ?', [category_name, id])
		if (results.affectedRows === 0) {
			return res.status(200).json({ message: 'Tidak ada perubahan' })
		}

		return res.status(200).json({ message: 'Ukuran berhasil diubah' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function deleteCategory(req, res, pool, next) {
	try {
		const { id } = req.params

		if (validator.isEmpty(id)) {
			return res.status(400).json({ message: 'ID tidak boleh kosong' })
		}

		if (!validator.isNumeric(id)) {
			return res.status(400).json({ message: 'ID harus angka' })
		}

		const [checkNotes] = await pool.query('SELECT * FROM categories WHERE category_id = ?', [id])
		if (checkNotes.length === 0) {
			return res.status(404).json({ message: 'Ukuran tidak ditemukan' })
		}

		const [result] = await pool.query('DELETE FROM categories WHERE category_id = ?', [id])
		if (result.affectedRows === 0) {
			return res.status(200).json({ message: 'Tidak ada perubahan' })
		}

		return res.status(200).json({ message: 'Ukuran berhasil dihapus' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

export { createCategory, getCategories, getCategoryByID, updateCategory, deleteCategory }

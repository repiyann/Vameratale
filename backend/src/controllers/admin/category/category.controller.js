import validator from 'validator'

async function createCategory(req, res, pool, next) {
	try {
		const { category_name } = req.body
		if (validator.isEmpty(category_name)) {
			return res.status(400).json({ message: 'Input tidak boleh kosong' })
		}

		await pool.query('INSERT INTO categories (category_name) VALUES (?)', [category_name])

		return res.status(201).json({ message: 'Kategori berhasil dibuat' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function getCategories(req, res, pool, next) {
	try {
		const [results] = await pool.query('SELECT * FROM categories')
		if (results.length === 0) {
			return res.status(404).json({ message: 'Kategori kosong' })
		}

		return res.status(200).json({ message: 'Kategori berhasil didapat', data: results })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function updateCategory(req, res, pool, next) {
	try {
		const { id } = req.params
		const { category_name } = req.body

		if (!validator.isInt(id, { min: 1 })) {
			return res.status(400).json({ message: 'ID harus angka' })
		}

		if (validator.isEmpty(category_name)) {
			return res.status(400).json({ message: 'Input tidak boleh kosong' })
		}

		const [checkNotes] = await pool.query('SELECT * FROM categories WHERE category_id = ?', [id])
		if (checkNotes.length === 0) {
			return res.status(404).json({ message: 'Kategori tidak ditemukan' })
		}

		const [results] = await pool.query('UPDATE categories SET category_name = ? WHERE category_id = ?', [
			category_name,
			id
		])
		if (results.affectedRows === 0) {
			return res.status(200).json({ message: 'Tidak ada perubahan' })
		}

		return res.status(200).json({ message: 'Kategori berhasil diubah' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function deleteCategory(req, res, pool, next) {
	try {
		const { id } = req.params
		if (!validator.isInt(id, { min: 1 })) {
			return res.status(400).json({ message: 'ID harus angka' })
		}

		const [checkNotes] = await pool.query('SELECT * FROM categories WHERE category_id = ?', [id])
		if (checkNotes.length === 0) {
			return res.status(404).json({ message: 'Kategori tidak ditemukan' })
		}

		const [result] = await pool.query('DELETE FROM categories WHERE category_id = ?', [id])
		if (result.affectedRows === 0) {
			return res.status(200).json({ message: 'Tidak ada perubahan' })
		}

		return res.status(200).json({ message: 'Kategori berhasil dihapus' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

export { createCategory, getCategories, updateCategory, deleteCategory }

import validator from 'validator'

async function createVarians(req, res, pool, next) {
	try {
		const { varian_name, category_id } = req.body

		if (validator.isEmpty(varian_name)) {
			return res.status(400).json({ message: 'Input tidak boleh kosong' })
		}

		if (!validator.isInt(category_id, { min: 1 })) {
			return res.status(400).json({ message: 'Kategori tidak boleh kosong' })
		}

		const categoryNumber = Number(category_id)

		await pool.query('INSERT INTO varians (varian_name, varian_category_id) VALUES (?, ?)', [
			varian_name,
			categoryNumber
		])

		return res.status(201).json({ message: 'Varian berhasil dibuat' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function getVarians(req, res, pool, next) {
	try {
		const [results] = await pool.execute(`SELECT varians.varian_id, varians.varian_name, categories.category_name
			FROM varians
			INNER JOIN categories ON varians.varian_category_id = categories.category_id`)
		if (results.length === 0) {
			return res.status(404).json({ message: 'Varian kosong' })
		}

		return res.status(200).json({ message: 'Varian berhasil didapat', data: results })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function getVarian(req, res, pool, next) {
	try {
		const { id } = req.params
		const [results] = await pool.query(`SELECT varian_id, varian_name FROM varians WHERE varian_category_id = ?`, [
			id
		])
		if (results.length === 0) {
			return res.status(404).json({ message: 'Varian kosong' })
		}

		return res.status(200).json({ message: 'Varian berhasil didapat', data: results })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function updateVarian(req, res, pool, next) {
	try {
		const { id } = req.params
		const { varian_name, category_id } = req.body

		if (!validator.isInt(id, { min: 1 }) || !validator.isInt(category_id, { min: 1 })) {
			return res.status(400).json({ message: 'ID harus angka' })
		}

		if (validator.isEmpty(varian_name)) {
			return res.status(400).json({ message: 'Input tidak boleh kosong' })
		}

		const categoryNumber = Number(category_id)

		const [checkNotes] = await pool.query('SELECT * FROM varians WHERE varian_id = ?', [id])
		if (checkNotes.length === 0) {
			return res.status(404).json({ message: 'Varian tidak ditemukan' })
		}

		const [results] = await pool.query(
			'UPDATE varians SET varian_name = ?, varian_category_id = ? WHERE varian_id = ?',
			[varian_name, categoryNumber, id]
		)
		if (results.affectedRows === 0) {
			return res.status(200).json({ message: 'Tidak ada perubahan' })
		}

		return res.status(200).json({ message: 'Varian berhasil diubah' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function deleteVarian(req, res, pool, next) {
	try {
		const { id } = req.params

		if (!validator.isInt(id, { min: 1 })) {
			return res.status(400).json({ message: 'ID harus angka' })
		}

		const [checkNotes] = await pool.query('SELECT * FROM varians WHERE varian_id = ?', [id])
		if (checkNotes.length === 0) {
			return res.status(404).json({ message: 'Varian tidak ditemukan' })
		}

		const [result] = await pool.query('DELETE FROM varians WHERE varian_id = ?', [id])
		if (result.affectedRows === 0) {
			return res.status(200).json({ message: 'Tidak ada perubahan' })
		}

		return res.status(200).json({ message: 'Varian berhasil dihapus' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

export { createVarians, getVarians, getVarian, updateVarian, deleteVarian }

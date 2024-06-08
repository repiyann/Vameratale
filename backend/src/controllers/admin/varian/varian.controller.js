import validator from 'validator'

async function createVarians(req, res, pool, next) {
	try {
		const { varian_name } = req.body

		if (validator.isEmpty(varian_name)) {
			return res.status(400).json({ message: 'Input nama tidak boleh kosong' })
		}

		await pool.query('INSERT INTO varians (varian_name) VALUES (?)', [varian_name])

		return res.status(201).json({ message: 'Varian berhasil dibuat' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function getVarians(req, res, pool, next) {
	try {
		const [results] = await pool.query('SELECT * FROM varians')
		if (results.length === 0) {
			return res.status(404).json({ message: 'Varian kosong' })
		}

		return res.status(200).json({ message: 'Varian berhasil didapat', data: results })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function getVarianByID(req, res, pool, next) {
	try {
		const { id } = req.params

		if (validator.isEmpty(id)) {
			return res.status(400).json({ message: 'ID tidak boleh kosong' })
		}

		if (!validator.isNumeric(id)) {
			return res.status(400).json({ message: 'ID harus angka' })
		}

		const [result] = await pool.query('SELECT * FROM varians WHERE varian_id = ?', [id])
		if (result.length === 0) {
			return res.status(404).json({ message: 'Varian tidak ditemukan' })
		}

		return res.status(200).json({ message: 'Varian berhasil didapat', data: result })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function updateVarian(req, res, pool, next) {
	try {
		const { id } = req.params
		const { varian_name } = req.body

		if (validator.isEmpty(id) || validator.isEmpty(varian_name)) {
			return res.status(400).json({ message: 'Input tidak boleh kosong' })
		}

		if (!validator.isNumeric(id)) {
			return res.status(400).json({ message: 'ID harus angka' })
		}

		const [checkNotes] = await pool.query('SELECT * FROM varians WHERE varian_id = ?', [id])
		if (checkNotes.length === 0) {
			return res.status(404).json({ message: 'Varian tidak ditemukan' })
		}

		const [results] = await pool.query('UPDATE varians SET varian_name = ? WHERE varian_id = ?', [varian_name, id])
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

		if (validator.isEmpty(id)) {
			return res.status(400).json({ message: 'ID tidak boleh kosong' })
		}

		if (!validator.isNumeric(id)) {
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

export { createVarians, getVarians, getVarianByID, updateVarian, deleteVarian }

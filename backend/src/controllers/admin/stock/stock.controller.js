import validator from 'validator'

async function getStocks(req, res, pool, next) {
	try {
		const [results] = await pool.query('SELECT product_uuid, product_name, product_stock FROM products')
		if (results.length === 0) {
			return res.status(404).json({ message: 'Produk kosong' })
		}

		return res.status(200).json({ message: 'Stok produk berhasil didapat', data: results })
	} catch (error) {
		console.log(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function getStockByID(req, res, pool, next) {
	try {
		const { id } = req.params
		const [results] = await pool.query('SELECT product_uuid, product_name, product_stock FROM products WHERE product_uuid = ?', [id])
		if (results.length === 0) {
			return res.status(404).json({ message: 'Produk kosong' })
		}

		return res.status(200).json({ message: 'Stok produk berhasil didapat', data: results })
	} catch (error) {
		console.log(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

async function updateStock(req, res, pool, next) {
	try {
		const { id } = req.params
		const { stock } = req.body

		if (!validator.isInt(id, { min: 1 })) {
			return res.status(400).json({ message: 'ID harus angka' })
		}

		if (!validator.isInt(stock, { min: 1 })) {
			return res.status(400).json({ message: 'Input tidak boleh kosong' })
		}

		const [checkProduct] = await pool.query('SELECT * FROM products WHERE product_uuid = ?', [id])
		if (checkProduct.length === 0) {
			return res.status(404).json({ message: 'Produk tidak ditemukan' })
		}

		const [results] = await pool.query('UPDATE products SET product_stock = ? WHERE product_uuid = ?', [stock, id])
		if (results.affectedRows === 0) {
			return res.status(200).json({ message: 'Tidak ada perubahan' })
		}

		return res.status(200).json({ message: 'Stok produk berhasil diubah' })
	} catch (error) {
		console.log(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

export { getStocks, getStockByID, updateStock }

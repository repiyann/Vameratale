import validator from 'validator'

async function createProduct(req, res, pool, next) {
	const { productName, productPrice, productDesc, category, varian, size, stock } = req.body

	if (!req.files || !req.files.files || !Array.isArray(req.files.files)) {
		return res.status(400).json({ message: 'Format gambar salah' })
	}

	if (
		validator.isEmpty(productName) ||
		validator.isEmpty(productDesc) ||
		validator.isEmpty(category) ||
		validator.isEmpty(varian) ||
		validator.isEmpty(size)
	) {
		return res.status(400).json({ message: 'Input tidak boleh kosong' })
	}

	if (!validator.isNumeric(productPrice, { min: 0 })) {
		return res.status(400).json({ message: 'Input harga harus angka' })
	}

	if (!validator.isInt(stock, { min: 0 })) {
		return res.status(400).json({ message: 'Input stok harus angka' })
	}

	const uploadedFiles = Array.isArray(req.files.files) ? req.files.files : [req.files.files]
	const connection = await pool.getConnection()

	try {
		await connection.beginTransaction()

		const insertProduct = `
			INSERT INTO 
				products 
					(product_name, product_price, product_description, product_category, product_varian, product_size, product_stock)
			VALUES
				(?, ?, ?, ?, ?, ?, ?)`

		const [productResult] = await connection.execute(insertProduct, [
			productName,
			productPrice,
			productDesc,
			category,
			varian,
			size,
			stock
		])
		const productId = productResult.insertId

		const insertImage = uploadedFiles.map(async (file) => {
			const fileData = file.data
			const query = 'INSERT INTO product_images (image_product_id, image_data) VALUES (?, ?)'

			await connection.execute(query, [productId, fileData])
		})

		await Promise.all(insertImage)
		await connection.commit()

		return res.status(201).json({ message: 'Produk berhasil dibuat' })
	} catch (error) {
		await connection.rollback()
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	} finally {
		connection.release()
	}
}

async function getProducts(req, res, pool, next) {
	const connection = await pool.getConnection()

	try {
		const query = `
			SELECT 
				p.product_id, 
				p.product_name, 
				p.product_price, 
				p.product_description, 
				p.product_category, 
				p.product_varian, 
				p.product_size, 
				p.product_stock, 
				i.image_data AS image_data 
			FROM 
				products p
			LEFT JOIN (
 				SELECT 
					image_id, image_product_id, image_data
 				FROM 
					product_images
 				WHERE 
					(image_product_id, image_id) IN (
		 				SELECT
							image_product_id, MIN(image_id) AS max_id
		 				FROM
							product_images
		 				GROUP BY
							image_product_id
 				)
			) i ON p.product_id = i.image_product_id`

		const [rows] = await connection.execute(query)
		rows.forEach((row) => {
			row.image_data = row.image_data.toString('base64')
		})

		return res.status(200).json({ message: 'Produk berhasil didapat', rows })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	} finally {
		connection.release()
	}
}

async function getProductByID(req, res, pool, next) {
	const { id } = req.params

	if (!validator.isInt(id, { min: 1 })) {
		return res.status(400).json({ message: 'ID produk tidak valid' })
	}

	const connection = await pool.getConnection()

	try {
		const productQuery = `SELECT * FROM products WHERE product_id = ?`
		const [productRows] = await connection.execute(productQuery, [id])

		if (productRows.length === 0) {
			return res.status(404).json({ message: 'Produk tidak ditemukan' })
		}

		const imagesQuery = `SELECT * FROM product_images WHERE image_product_id = ?`
		const [imagesRows] = await connection.execute(imagesQuery, [id])

		const product = productRows[0]
		product.images = imagesRows

		return res.status(200).json({ message: 'Produk berhasil didapat', product })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	} finally {
		connection.release()
	}
}

async function updateProduct(req, res, pool, next) {
	const { id } = req.params
	const { productName, productPrice, productDesc, category, varian, size, stock } = req.body

	if (!validator.isInt(id, { min: 1 })) {
		return res.status(400).json({ message: 'ID harus angka' })
	}

	if (
		validator.isEmpty(productName) ||
		validator.isEmpty(productDesc) ||
		validator.isEmpty(category) ||
		validator.isEmpty(varian) ||
		validator.isEmpty(size)
	) {
		return res.status(400).json({ message: 'Input tidak boleh kosong' })
	}

	if (!validator.isNumeric(productPrice, { min: 0 })) {
		return res.status(400).json({ message: 'Input harga harus angka' })
	}

	if (!validator.isInt(stock, { min: 0 })) {
		return res.status(400).json({ message: 'Input stok harus angka' })
	}

	const connection = await pool.getConnection()

	try {
		await connection.beginTransaction()

		const productQuery = `
      UPDATE
        products 
      SET
        product_name = ?,
        product_price = ?,
        product_description = ?,
        product_category = ?,
        product_varian = ?,
        product_size = ?,
        product_stock = ?
      WHERE 
        product_id = ?`

		await connection.execute(productQuery, [productName, productPrice, productDesc, category, varian, size, stock, id])

		if (req.files && req.files.files) {
			const uploadedFiles = Array.isArray(req.files.files) ? req.files.files : [req.files.files]

			await connection.execute(`DELETE FROM product_images WHERE image_product_id = ?`, [id])

			const insertImage = uploadedFiles.map(async (file) => {
				const fileData = file.data
				const query = 'INSERT INTO product_images (image_product_id, image_data) VALUES (?, ?)'

				await connection.execute(query, [id, fileData])
			})

			await Promise.all(insertImage)
		}

		await connection.commit()

		return res.status(200).json({ message: 'Produk berhasil diubah' })
	} catch (error) {
		await connection.rollback()
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	} finally {
		connection.release()
	}
}

async function deleteProduct(req, res, pool, next) {
	try {
		const { id } = req.params

		if (!validator.isInt(id, { min: 1 })) {
			return res.status(400).json({ message: 'ID tidak boleh kosong' })
		}

		const connection = await pool.getConnection()
		await connection.beginTransaction()

		const [deleteImage] = await connection.execute(`DELETE FROM product_images WHERE image_product_id = ?`, [id])

		const [deleteProduct] = await connection.execute(`DELETE FROM products WHERE product_id = ?`, [id])

		if (deleteImage.affectedRows === 0 || deleteProduct.affectedRows === 0) {
			await connection.rollback()
			return res.status(404).json({ message: 'Produk atau gambar tidak ditemukan' })
		}

		await connection.commit()

		return res.status(200).json({ message: 'Produk berhasil dihapus' })
	} catch (error) {
		await connection.rollback()
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	} finally {
		connection.release()
	}
}

export { createProduct, getProducts, getProductByID, updateProduct, deleteProduct }

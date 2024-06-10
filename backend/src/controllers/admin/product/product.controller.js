import validator from 'validator'

async function createProduct(req, res, pool, next) {
	const { productID, productName, productPrice, productDesc, category, productSizeDesc, varian, size, stock } = req.body

	if (!req.files || !req.files.files || !Array.isArray(req.files.files)) {
		return res.status(400).json({ message: 'Format gambar salah' })
	}

	if (
		validator.isEmpty(productName) ||
		validator.isEmpty(productDesc) ||
		validator.isEmpty(productID) ||
		validator.isEmpty(productSizeDesc)
	) {
		return res.status(400).json({ message: 'Input teks tidak boleh kosong' })
	}

	if (
		!validator.isInt(category, { min: 1 }) ||
		!validator.isInt(varian, { min: 1 }) ||
		!validator.isInt(size, { min: 1 }) ||
		!validator.isInt(stock, { min: 1 })
	) {
		return res.status(400).json({ message: 'Input angka tidak boleh kosong' })
	}

	if (!validator.isNumeric(productPrice, { min: 0 })) {
		return res.status(400).json({ message: 'Input harga harus angka' })
	}

	const productPriceNumber = Number(productPrice)
	const categoryNumber = Number(category)
	const varianNumber = Number(varian)
	const sizeNumber = Number(size)
	const stockNumber = Number(stock)

	const uploadedFiles = Array.isArray(req.files.files) ? req.files.files : [req.files.files]
	const connection = await pool.getConnection()

	try {
		await connection.beginTransaction()

		const insertProduct = `
			INSERT INTO 
				products 
					(product_id, product_name, product_price, product_description, product_category, product_varian, product_size, product_stock, product_size_desc)
			VALUES
				(?, ?, ?, ?, ?, ?, ?, ?, ?)`

		const [productResult] = await connection.execute(insertProduct, [
			productID,
			productName,
			productPriceNumber,
			productDesc,
			categoryNumber,
			varianNumber,
			sizeNumber,
			stockNumber,
			productSizeDesc
		])
		const productUUID = productResult.insertId

		const insertImage = uploadedFiles.map(async (file) => {
			const fileData = file.data
			const query = 'INSERT INTO product_images (image_product_id, image_data) VALUES (?, ?)'

			await connection.execute(query, [productUUID, fileData])
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
				p.product_uuid,
				p.product_id, 
				p.product_name, 
				p.product_price, 
				p.product_description,
				p.product_size_desc, 
				c.category_name,
				v.varian_name,
				s.size_name, 
				p.product_stock, 
				i.image_data AS image_data 
			FROM 
				products p
			LEFT JOIN categories c ON p.product_category = c.category_id
			LEFT JOIN varians v ON p.product_varian = v.varian_id
			LEFT JOIN sizes s ON p.product_size = s.size_id
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
			) i ON p.product_uuid = i.image_product_id`

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
		const productQuery = `SELECT * FROM products WHERE product_uuid = ?`
		const [productRows] = await connection.execute(productQuery, [id])
		if (productRows.length === 0) {
			return res.status(404).json({ message: 'Produk tidak ditemukan' })
		}

		const imagesQuery = `SELECT * FROM product_images WHERE image_product_id = ?`
		const [imagesRows] = await connection.execute(imagesQuery, [id])
		if (imagesRows.length === 0) {
			return res.status(404).json({ message: 'Gambar tidak ditemukan' })
		}

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
	const { productID, productName, productPrice, productDesc, category, varian, size, stock, productSizeDesc } = req.body

	if (!validator.isInt(id, { min: 1 })) {
		return res.status(400).json({ message: 'ID harus angka' })
	}

	if (
		validator.isEmpty(productName) ||
		validator.isEmpty(productDesc) ||
		validator.isEmpty(productID) ||
		validator.isEmpty(productSizeDesc)
	) {
		return res.status(400).json({ message: 'Input teks tidak boleh kosong' })
	}

	if (!validator.isNumeric(productPrice, { min: 0 })) {
		return res.status(400).json({ message: 'Input harga harus angka' })
	}

	if (
		!validator.isInt(category, { min: 1 }) ||
		!validator.isInt(varian, { min: 1 }) ||
		!validator.isInt(size, { min: 1 }) ||
		!validator.isInt(stock, { min: 1 })
	) {
		return res.status(400).json({ message: 'Input angka tidak boleh kosong' })
	}

	const productPriceNumber = Number(productPrice)
	const categoryNumber = Number(category)
	const varianNumber = Number(varian)
	const sizeNumber = Number(size)
	const stockNumber = Number(stock)

	const connection = await pool.getConnection()

	try {
		await connection.beginTransaction()

		const productQuery = `
      UPDATE
        products 
      SET
				product_id = ?,
        product_name = ?,
        product_price = ?,
        product_description = ?,
        product_category = ?,
        product_varian = ?,
        product_size = ?,
        product_stock = ?,
				product_size_desc = ?
      WHERE 
        product_uuid = ?`

		await connection.execute(productQuery, [
			productID,
			productName,
			productPriceNumber,
			productDesc,
			categoryNumber,
			varianNumber,
			sizeNumber,
			stockNumber,
			productSizeDesc,
			id
		])

		if (req.files && req.files.files) {
			await connection.execute(`DELETE FROM product_images WHERE image_product_id = ?`, [id])
			
			const uploadedFiles = Array.isArray(req.files.files) ? req.files.files : [req.files.files]
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
	const connection = await pool.getConnection()

	try {
		await connection.beginTransaction()

		const { id } = req.params
		if (!validator.isInt(id, { min: 1 })) {
			return res.status(400).json({ message: 'ID tidak boleh kosong' })
		}

		const [deleteProduct] = await connection.execute(`DELETE FROM products WHERE product_uuid = ?`, [id])
		if (deleteProduct.affectedRows === 0) {
			await connection.rollback()
			return res.status(404).json({ message: 'Produk tidak ditemukan' })
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

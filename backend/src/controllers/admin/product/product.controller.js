import validator from 'validator'

async function createProduct(req, res, pool, next) {
	const { productName, productPrice, productDesc, category, variant, size, stock } = req.body

	if (!req.files || !req.files.files || !Array.isArray(req.files.files)) {
		return res.status(400).json({ message: 'No files uploaded or invalid format' })
	}

	const uploadedFiles = Array.isArray(req.files.files) ? req.files.files : [req.files.files]
	const connection = await pool.getConnection()

	try {
		await connection.beginTransaction()

		const insertProduct = `
			INSERT INTO 
				products 
					(product_name, product_price, product_description, product_category, product_variant, product_size, product_stock)
			VALUES
				(?, ?, ?, ?, ?, ?, ?)`

		const [productResult] = await connection.execute(insertProduct, [
			productName,
			productPrice,
			productDesc,
			category,
			variant,
			size,
			stock
		])
		const productId = productResult.insertId

		const insertImage = uploadedFiles.map(async (file) => {
			const fileData = file.data
			const query = 'INSERT INTO images_tes (product_id, data) VALUES (?, ?)'

			await connection.execute(query, [productId, fileData])
		})

		await Promise.all(insertImage)
		await connection.commit()

		return res.status(201).json({ message: 'Produk berhasil dibuat' })
	} catch (error) {
		await connection.rollback()
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah', error: error.message })
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
				p.product_variant, 
				p.product_size, 
				p.product_stock, 
				i.data AS image_data 
			FROM 
				products p
			LEFT JOIN (
 				SELECT 
					id, product_id, data
 				FROM 
					images_tes
 				WHERE 
					(product_id, id) IN (
		 				SELECT
							product_id, MAX(id) AS max_id
		 				FROM
							images_tes
		 				GROUP BY
							product_id
 				)
			) i ON p.product_id = i.product_id`

		const [rows] = await connection.execute(query)
		rows.forEach((row) => {
			row.image_data = row.image_data.toString('base64')
		})

		return res.status(200).json({ message: 'Berhasil mengambil semua produk', rows })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah', error: error.message })
	} finally {
		connection.release()
	}
}

async function getProductByID(req, res, pool, next) {
	const productId = req.params.id

	if (!validator.isInt(productId, { min: 1 })) {
		return res.status(400).json({ message: 'ID produk tidak valid' })
	}

	const connection = await pool.getConnection()

	try {
		const productQuery = `SELECT * FROM products WHERE product_id = ?`
		const [productRows] = await connection.execute(productQuery, [productId])

		if (productRows.length === 0) {
			return res.status(404).json({ message: 'Produk tidak ditemukan' })
		}

		const imagesQuery = `SELECT * FROM images_tes WHERE product_id = ?`
		const [imagesRows] = await connection.execute(imagesQuery, [productId])

		const product = productRows[0]
		product.images = imagesRows

		return res.status(200).json({ message: 'Berhasil fetch produk', product })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah', error: error.message })
	} finally {
		connection.release()
	}
}

async function updateProduct(req, res, pool, next) {
	const productId = req.params.id
	const { productName, productPrice, productDesc, category, variant, size, stock, images } = req.body

	if (!validator.isInt(productId, { min: 1 })) {
		return res.status(400).json({ message: 'Invalid product ID' })
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
        product_variant = ?,
        product_size = ?,
        product_stock = ?
      WHERE 
        product_id = ?`

		await connection.execute(productQuery, [
			productName,
			productPrice,
			productDesc,
			category,
			variant,
			size,
			stock,
			productId
		])

		await connection.execute(`DELETE FROM images_tes WHERE product_id = ?`, [productId])

		if (images && images.length > 0) {
			const updateImage = images.map((imageData) => {
				return connection.execute(`INSERT INTO images_tes (product_id, data) VALUES (?, ?)`, [productId, imageData])
			})
			await Promise.all(updateImage)
		}

		await connection.commit()
		return res.status(200).json({ message: 'Successfully updated the product' })
	} catch (error) {
		await connection.rollback()
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah', error: error.message })
	} finally {
		connection.release()
	}
}

async function deleteProduct(req, res, pool, next) {
	try {
		const productId = req.params.id

		await pool.execute(`DELETE FROM images_tes WHERE product_id = ?`, [productId])

		const deleteResult = await pool.execute(`DELETE FROM products WHERE product_id = ?`, [productId])

		if (deleteResult.affectedRows === 0) {
			return res.status(404).json({ message: 'Product not found' })
		}

		return res.status(200).json({ message: 'Successfully deleted the product' })
	} catch (error) {
		console.error(error.stack)
		return res.status(500).json({ message: 'Server bermasalah' })
	}
}

export { createProduct, getProducts, getProductByID, updateProduct, deleteProduct }

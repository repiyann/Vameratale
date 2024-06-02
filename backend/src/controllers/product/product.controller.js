async function createProduct(req, res) {
	try {
		await pool.beginTransaction()

		const { productName, productPrice, productDesc, category, variant, size, stock, image_path } = req.body

		if (!image_path) {
			return res.status(400).json({ message: 'Image path is required' })
		}

		const newProduct = await pool.query(
			`
			INSERT INTO
				products (product_name, product_price, product_description, product_category, product_variant, product_size, product_stock)
			VALUES
				(?, ?, ?, ?, ?, ?, ?)`,
			[productName, productPrice, productDesc, category, variant, size, stock]
		)

		await pool.query(
			`
			INSERT INTO
				product_images (product_id, image_path)
			VALUES
				(?, ?)`,
			[newProduct.insertId, image_path]
		)

		await pool.commit()

		return res.status(201).json({ message: 'Successfully created a new product', newProduct })
	} catch (err) {
		console.error(err.stack)
		await pool.rollback()
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function getProducts(req, res) {
	try {
		await pool.beginTransaction()

		const productQuery = 
		`
			SELECT
				p.product_id AS productId,
				p.product_name AS productName,
				p.product_price AS productPrice,
				p.product_description AS productDesc,
				p.product_category AS category,
				p.product_variant AS variant,
				p.product_size AS size,
				p.product_stock AS stock,
				pi.image_path AS imagePath 
			FROM
				products p
			LEFT JOIN
				product_images pi
			ON
				p.product_id = pi.image_product_id
		`

		const productsResult = await pool.query(productQuery)

		const productsMap = {}
		productsResult.forEach((product) => {
			if (!productsMap[product.productId]) {
				productsMap[product.productId] = {
					productId: product.productId,
					productName: product.productName,
					productPrice: product.productPrice,
					productDesc: product.productDesc,
					category: product.category,
					variant: product.variant,
					size: product.size,
					stock: product.stock,
					images: []
				}
			}
			if (product.imagePath) {
				productsMap[product.productId].images.push(product.imagePath)
			}
		})

		const result = Object.values(productsMap)
		
		await pool.commit()
		
		return res.status(200).json({ message: 'Products fetched successfully', products: result })
	} catch (err) {
		console.error(err.stack)
		await pool.rollback()
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function getProductByID(req, res) {
	try {
		await pool.beginTransaction()

		const productId = req.params.id
		const productQuery = 
		`
			SELECT 
				p.product_id AS productId,
				p.product_name AS productName,
				p.product_price AS productPrice,
				p.product_description AS productDesc,
				p.product_category AS category,
				p.product_variant AS variant,
				p.product_size AS size,
				p.product_stock AS stock,
				pi.image_path AS imagePath
			FROM 
				products p
			LEFT JOIN 
				product_images pi
			ON 
				p.product_id = pi.image_product_id
			WHERE 
				p.product_id = ?
		`

		const productResult = await pool.query(productQuery, [productId])

		if (productResult.length === 0) {
			return res.status(404).json({ message: 'Product not found' })
		}

		const product = {
			productId: productResult[0].productId,
			productName: productResult[0].productName,
			productPrice: productResult[0].productPrice,
			productDesc: productResult[0].productDesc,
			category: productResult[0].category,
			variant: productResult[0].variant,
			size: productResult[0].size,
			stock: productResult[0].stock,
			images: []
		}

		productResult.forEach((row) => {
			if (row.imagePath) {
				product.images.push(row.imagePath)
			}
		})

		await pool.commit()

		return res.status(200).json({ message: 'Successfully fetched product', product })
	} catch (err) {
		console.error(err.stack)
		await pool.rollback()
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function updateProduct(req, res) {
	try {
		await pool.beginTransaction()

		const productId = req.params.id
		const { productName, productPrice, productDesc, category, variant, size, stock, images } = req.body
		const productQuery = 
		`
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
				product_id = ?
		`

		await pool.query(productQuery, [productName, productPrice, productDesc, category, variant, size, stock, productId])

		await pool.query(
			`
			DELETE FROM 
				product_images 
			WHERE
				image_product_id = ?`,
			[productId]
		)

		if (images && images.length > 0) {
			const imageInsertPromises = images.map((imagePath) => {
				return pool.query(
					`
					INSERT INTO 
						product_images (image_product_id, image_path)
					VALUES
						(?, ?)`,
					[productId, imagePath]
				)
			})
			await Promise.all(imageInsertPromises)
		}

		await pool.commit()

		return res.status(200).json({ message: 'Successfully updated the product' })
	} catch (err) {
		console.error(err.stack)
		await pool.rollback()
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

async function deleteProduct(req, res) {
	try {
		await pool.beginTransaction()

		const productId = req.params.id

		await pool.query(
			`
			DELETE FROM
				product_images 
			WHERE
			image_product_id = ?`,
			[productId]
		)

		const deleteResult = await pool.query(
			`
			DELETE FROM
				products 
			WHERE
				product_id = ?`,
			[productId]
		)

		if (deleteResult.affectedRows === 0) {
			return res.status(404).json({ message: 'Product not found' })
		}

		await pool.commit()

		return res.status(200).json({ message: 'Successfully deleted the product' })
	} catch (err) {
		console.error(err.stack)
		await pool.rollback()
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

export { createProduct, getProducts, getProductByID, updateProduct, deleteProduct }

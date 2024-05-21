async function createProduct(req, res) {
	try {
		const { productName, productPrice, productDesc, category, varian, size, stock } = req.body

		const newProduct = await pool.query(
			'INSERT INTO products (productName, productPrice, productDesc, category, varian, size, stock) VALUES (?, ?, ?)',
			[productName, productPrice, productDesc, category, varian, size, stock]
		)

		return res.status(201).json({ message: 'Successfully created a new product', newProduct })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}

async function getProducts(req, res) {
	try {
		const products = await pool.query('SELECT * FROM products')

		if (products.length === 0) {
			return res.status(404).json({ message: 'Products not found' })
		}

		return res.status(200).json({ message: 'Products fetched successfully', products })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}

async function getProductByID(req, res) {
	try {
		const { id } = req.params
		const product = await pool.query('SELECT * FROM products WHERE id = ?', [id])

		if (product.length === 0) {
			return res.status(404).json({ message: 'Product not found' })
		}

		return res.status(200).json({ message: 'Product fetched succesfully', product })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}

async function updateProduct(req, res) {
	try {
		const { id } = req.params
		const { productName, productPrice, productDesc, category, varian, size, stock } = req.body

		const product = await pool.query('SELECT * FROM products WHERE id = ?', [id])

		if (product.length === 0) {
			return res.status(404).json({ message: 'Product not found' })
		}

		const updateProduct = await pool.query(
			'UPDATE products SET productName = ?, productPrice = ?, productDesc = ?, category = ?, varian = ?, size = ?, stock = ? WHERE id = ?',
			[productName, productPrice, productDesc, category, varian, size, stock, id]
		)

		return res.status(200).json({ message: 'Successfully update a product', updateProduct })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}

async function deleteProduct(req, res) {
	try {
		const { id } = req.params

		const product = await pool.query('SELECT * FROM products WHERE id = ?', [id])

		if (product.length === 0) {
			return res.status(404).json({ message: 'Product not found' })
		}

		const deletedProduct = await pool.query('DELETE FROM products WHERE id = ?', [id])

		res.status(200).json({ message: 'User deleted successfully' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error: error.message })
	}
}

export { createProduct, getProducts, getProductByID, updateProduct, deleteProduct }

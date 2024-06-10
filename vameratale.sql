CREATE TABLE IF NOT EXISTS roles (
  role_id INT NOT NULL AUTO_INCREMENT,
  role_name VARCHAR(10) NOT NULL,
  PRIMARY KEY (role_id)
) ENGINE = InnoDB;

INSERT INTO
  roles (role_name)
VALUES
  ('admin'),
  ('user');

CREATE TABLE IF NOT EXISTS admins (
  admin_id INT NOT NULL AUTO_INCREMENT,
  admin_email VARCHAR(25) NOT NULL UNIQUE,
  admin_password VARCHAR(60) NOT NULL,
  admin_role_id INT NOT NULL DEFAULT 1,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (admin_id),
  KEY admin_role_id (admin_role_id),
  CONSTRAINT admins_ibfk_1 FOREIGN KEY (admin_role_id) REFERENCES roles (role_id)
) ENGINE = InnoDB;

INSERT INTO
  admins (admin_email, admin_password)
VALUES
  (
    'admin@gmail.com',
    '$2b$10$3zQ42EOyj6mVRYFzNXntXOir6egI3.i.ecieUC5tYcyGh60BbLNte'
  );

CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL AUTO_INCREMENT,
  user_email VARCHAR(25) NOT NULL UNIQUE,
  user_name VARCHAR(25) NOT NULL DEFAULT '',
  user_phone VARCHAR(15) NOT NULL DEFAULT '',
  user_address VARCHAR(255) NOT NULL DEFAULT '',
  image_profile BLOB NOT NULL,
  user_password VARCHAR(60) NOT NULL,
  user_role_id INT NOT NULL DEFAULT 2,
  resetPasswordOTP VARCHAR(6) NOT NULL,
  resetPasswordExpires DATETIME NOT NULL,
  verificationToken VARCHAR(64) NOT NULL,
  isVerified BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  KEY user_role_id (user_role_id),
  CONSTRAINT users_ibfk_1 FOREIGN KEY (user_role_id) REFERENCES roles (role_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS categories (
  category_id INT NOT NULL AUTO_INCREMENT,
  category_name VARCHAR(25) NOT NULL,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (category_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS varians (
  varian_id INT NOT NULL AUTO_INCREMENT,
  varian_name VARCHAR(25) NOT NULL,
  varian_category_id INT NOT NULL,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (varian_id),
  KEY varian_category_id (varian_category_id),
  CONSTRAINT varians_ibfk_1 FOREIGN KEY (varian_category_id) REFERENCES categories (category_id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS sizes (
  size_id INT NOT NULL AUTO_INCREMENT,
  size_name VARCHAR(25) NOT NULL,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (size_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS products (
  product_uuid INT NOT NULL AUTO_INCREMENT,
  product_id VARCHAR(255) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_price DECIMAL(10, 0) NOT NULL,
  product_description TEXT NOT NULL,
  product_category INT NOT NULL,
  product_varian INT NOT NULL,
  product_size INT NOT NULL,
  product_stock INT NOT NULL,
  product_size_desc VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (product_uuid),
  KEY product_category (product_category),
  CONSTRAINT products_ibfk_1 FOREIGN KEY (product_category) REFERENCES categories (category_id) ON DELETE CASCADE,
  KEY product_varian (product_varian),
  CONSTRAINT products_ibfk_2 FOREIGN KEY (product_varian) REFERENCES varians (varian_id) ON DELETE CASCADE,
  KEY product_size (product_size),
  CONSTRAINT products_ibfk_3 FOREIGN KEY (product_size) REFERENCES sizes (size_id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS product_images (
  image_id INT AUTO_INCREMENT,
  image_product_id INT NOT NULL,
  image_data LONGBLOB NOT NULL,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (image_id),
  KEY image_product_id (image_product_id),
  CONSTRAINT images_ibfk_1 FOREIGN KEY (image_product_id) REFERENCES products(product_uuid) ON DELETE CASCADE
) ENGINE = InnoDB;
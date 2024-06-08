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
  user_password VARCHAR(60) NOT NULL,
  user_role_id INT NOT NULL DEFAULT 2,
  resetPasswordOTP VARCHAR(6),
  resetPasswordExpires DATETIME,
  verificationToken VARCHAR(64),
  isVerified BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  KEY user_role_id (user_role_id),
  CONSTRAINT users_ibfk_1 FOREIGN KEY (user_role_id) REFERENCES roles (role_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS varians (
  varian_id INT NOT NULL AUTO_INCREMENT,
  varian_name VARCHAR(25) NOT NULL,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (varian_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS sizes (
  size_id INT NOT NULL AUTO_INCREMENT,
  size_name VARCHAR(25) NOT NULL,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (size_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS categories (
  category_id INT NOT NULL AUTO_INCREMENT,
  category_name VARCHAR(25) NOT NULL,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (category_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS products (
  product_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  product_price DECIMAL(10, 0) NOT NULL,
  product_description TEXT NOT NULL,
  product_category VARCHAR(50) NOT NULL,
  product_varian VARCHAR(50) NOT NULL,
  product_size VARCHAR(20) NOT NULL,
  product_stock INT NOT NULL,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (product_id) USING BTREE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS product_images (
  image_id INT AUTO_INCREMENT,
  image_product_id INT,
  image_data LONGBLOB,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (image_id) USING BTREE,
  KEY image_product_id (image_product_id),
  CONSTRAINT images_ibfk_1 FOREIGN KEY (image_product_id) REFERENCES products(product_id)
) ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS roles (
  role_id int NOT NULL AUTO_INCREMENT,
  role_name varchar(10) NOT NULL,
  PRIMARY KEY (role_id)
) ENGINE=InnoDB;

INSERT INTO roles (role_name) VALUES
('admin'), ('user');

CREATE TABLE IF NOT EXISTS admins (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(25) NOT NULL,
  password varchar(60) NOT NULL,
  role_id int NOT NULL DEFAULT 1,
  createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id) USING BTREE,
  KEY role_id (role_id),
  CONSTRAINT admins_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (role_id)
) ENGINE=InnoDB;

INSERT INTO admins (email, password) VALUES
('admin@gmail.com', '$2b$10$3zQ42EOyj6mVRYFzNXntXOir6egI3.i.ecieUC5tYcyGh60BbLNte');

CREATE TABLE IF NOT EXISTS users (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(25) NOT NULL,
  name varchar(25) NOT NULL DEFAULT '',
  telepon varchar(15) NOT NULL DEFAULT '',
  address varchar(255) NOT NULL DEFAULT '',
  password varchar(60) NOT NULL,
  role_id int NOT NULL DEFAULT 2,
  createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id) USING BTREE,
  KEY role_id (role_id),
  CONSTRAINT users_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (role_id)
) ENGINE=InnoDB;
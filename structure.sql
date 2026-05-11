CREATE DATABASE IF NOT EXISTS neohorizon_db;
USE neohorizon_db;

-- 2. Categorías de Usuario 
CREATE TABLE user_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- 3. Usuarios
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(255) DEFAULT 'default-avatar.png',
    user_category_id INT,
    FOREIGN KEY (user_category_id) REFERENCES user_categories(id)
);

-- 4. Marcas
CREATE TABLE brands (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- 5. Categorías de Producto
CREATE TABLE product_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- 6. Productos
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    image VARCHAR(255),
    brand_id INT,
    product_category_id INT,
    FOREIGN KEY (brand_id) REFERENCES brands(id),
    FOREIGN KEY (product_category_id) REFERENCES product_categories(id)
);

-- 7. Variantes de Producto
CREATE TABLE product_variants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 8. Carrito
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total_amount DECIMAL(15, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'CARRITO', 
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 9. Items de la Orden 
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- DATOS INICIALES 
INSERT INTO user_categories (id, name) VALUES (1, 'Admin'), (2, 'Customer');
INSERT INTO product_categories (id, name) VALUES (1, 'GPUs'), (2, 'Processors'), (3, 'Peripherals');

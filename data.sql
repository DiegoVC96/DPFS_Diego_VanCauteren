USE neohorizon_db;

-- 1. Poblar Categorías y Marcas
INSERT INTO user_categories (name) VALUES

INSERT INTO product_categories (name) VALUES

INSERT INTO brands (name) VALUES

-- 2. Poblar Usuarios
INSERT INTO users (firstName, lastName, email, password, image, category_id) VALUES 

-- 3. Poblar Productos
INSERT INTO products (name, description, price, image, category_id, brand_id) VALUES 

-- 4. Variantes de Producto 
INSERT INTO product_variants (product_id, stock) VALUES 

-- 5. Carrito de Compras
INSERT INTO orders (user_id, total_price, item_count, status) VALUES 

-- 6. Items del Carrito 
INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES 

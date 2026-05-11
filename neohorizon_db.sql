-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-05-2026 a las 01:48:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `neohorizon_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(38, 'Alienware'),
(2, 'AMD'),
(39, 'AOC'),
(13, 'ASRock'),
(4, 'ASUS'),
(31, 'Audio-Technica'),
(47, 'be quiet!'),
(25, 'BenQ ZOWIE'),
(34, 'Blue Microphones'),
(48, 'Cooler Master'),
(16, 'Corsair'),
(15, 'Crucial'),
(37, 'Dell'),
(27, 'Ducky'),
(33, 'Elgato'),
(7, 'EVGA'),
(51, 'Fractal Design'),
(18, 'G.Skill'),
(12, 'Gainward'),
(6, 'Gigabyte'),
(26, 'Glorious'),
(23, 'HyperX'),
(3, 'Intel'),
(28, 'Keychron'),
(17, 'Kingston'),
(36, 'LG'),
(45, 'Lian Li'),
(21, 'Logitech'),
(5, 'MSI'),
(46, 'Noctua'),
(1, 'NVIDIA'),
(44, 'NZXT'),
(11, 'Palit'),
(50, 'Phanteks'),
(14, 'PNY'),
(10, 'PowerColor'),
(20, 'Razer'),
(24, 'Redragon'),
(43, 'Sabrent'),
(35, 'Samsung'),
(9, 'Sapphire'),
(42, 'Seagate'),
(30, 'Sennheiser'),
(32, 'Shure'),
(22, 'SteelSeries'),
(19, 'Teamgroup'),
(49, 'Thermaltake'),
(29, 'Varmilo'),
(40, 'ViewSonic'),
(41, 'Western Digital'),
(8, 'Zotac');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `hex_code` varchar(7) DEFAULT '#FFFFFF'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_price` decimal(15,2) NOT NULL DEFAULT 0.00,
  `item_count` int(11) DEFAULT 0,
  `status` varchar(50) DEFAULT 'pending',
  `order_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price_at_time` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `image` varchar(255) DEFAULT 'default-product.png',
  `category_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `category_id`, `brand_id`, `createdAt`) VALUES
(1, 'NVIDIA RTX 4090 Founders', 'La GPU más potente del mercado para gaming 4K.', 2850000.00, 'gpu-1.png', 1, 1, '2026-04-30 20:33:34'),
(2, 'Intel Core i9-14900K', '24 núcleos y 32 hilos para productividad extrema.', 890000.00, 'cpu-1.png', 2, 3, '2026-04-30 20:33:34'),
(3, 'Logitech G Pro X Superlight', 'Mouse inalámbrico ultra ligero para eSports.', 210000.00, 'periph-1.png', 3, 21, '2026-04-30 20:33:34'),
(4, 'ASUS ROG Strix RTX 4080', 'Excelente refrigeración y diseño RGB premium.', 1450000.00, 'gpu-2.png', 1, 4, '2026-04-30 20:33:34'),
(5, 'AMD Ryzen 7 7800X3D', 'El mejor procesador para gaming con tecnología 3D V-Cache.', 650000.00, 'cpu-2.png', 2, 2, '2026-04-30 20:33:34'),
(6, 'Razer Huntsman V3 Pro', 'Teclado analógico con switches ópticos rápidos.', 320000.00, 'periph-2.png', 3, 20, '2026-04-30 20:33:34'),
(7, 'MSI Suprim X RTX 4070 Ti', 'Rendimiento silencioso y diseño de aluminio pulido.', 1100000.00, 'gpu-3.png', 1, 5, '2026-04-30 20:33:34'),
(8, 'Corsair Dominator 32GB DDR5', 'Memoria RAM de alto rendimiento 6000MHz.', 280000.00, 'ram-1.png', 2, 16, '2026-04-30 20:33:34'),
(9, 'Samsung Odyssey G9', 'Monitor curvo de 49 pulgadas ultra-wide 240Hz.', 1950000.00, 'mon-1.png', 3, 34, '2026-04-30 20:33:34'),
(10, 'Gigabyte Aorus Gen5 SSD 2TB', 'Velocidades de lectura de hasta 10.000 MB/s.', 420000.00, 'ssd-1.png', 2, 6, '2026-04-30 20:33:34'),
(11, 'EVGA SuperNOVA 1000W Gold', 'Fuente de poder modular con certificación 80 Plus Gold.', 350000.00, 'psu-1.png', 2, 7, '2026-04-30 20:33:34'),
(12, 'SteelSeries Arctis Nova Pro', 'Auriculares premium con cancelación de ruido activa.', 480000.00, 'periph-3.png', 3, 22, '2026-04-30 20:33:34'),
(13, 'Zotac Trinity RTX 4070', 'Diseño compacto de triple ventilador.', 850000.00, 'gpu-4.png', 1, 8, '2026-04-30 20:33:34'),
(14, 'Intel Core i7-14700K', 'Gran equilibrio entre gaming y creación de contenido.', 620000.00, 'cpu-3.png', 2, 3, '2026-04-30 20:33:34'),
(15, 'NZXT Kraken Elite 360', 'Refrigeración líquida con pantalla LCD personalizable.', 450000.00, 'cool-1.png', 2, 44, '2026-04-30 20:33:34'),
(16, 'HyperX Cloud II Wireless', 'Comodidad legendaria ahora sin cables.', 180000.00, 'periph-4.png', 3, 23, '2026-04-30 20:33:34'),
(17, 'Sapphire Nitro+ RX 7900 XTX', 'La placa más potente de AMD con diseño premium.', 1550000.00, 'gpu-5.png', 1, 9, '2026-04-30 20:33:34'),
(18, 'WD Black SN850X 1TB', 'SSD optimizado para tiempos de carga mínimos.', 160000.00, 'ssd-2.png', 2, 40, '2026-04-30 20:33:34'),
(19, 'Lian Li O11 Dynamic', 'Gabinete icónico de doble cámara para lucir el hardware.', 290000.00, 'case-1.png', 2, 45, '2026-04-30 20:33:34'),
(20, 'Ducky One 3 Mechanical', 'Teclado mecánico con hot-swap y diseño robusto.', 1950000.00, 'periph-5.png', 3, 28, '2026-04-30 20:33:34'),
(21, 'ASUS TUF Gaming 750W', 'Durabilidad militar para tu setup.', 210000.00, 'psu-2.png', 2, 4, '2026-04-30 20:33:34'),
(22, 'Crucial T700 1TB Gen5', 'El SSD más rápido de Crucial.', 290000.00, 'ssd-3.png', 2, 15, '2026-04-30 20:33:34'),
(23, 'PowerColor Red Devil RX 7800 XT', 'Estética agresiva y gran overclock de fábrica.', 920000.00, 'gpu-6.png', 1, 10, '2026-04-30 20:33:34'),
(24, 'Noctua NH-D15', 'El rey de la refrigeración por aire.', 165000.00, 'cool-2.png', 2, 46, '2026-04-30 20:33:34'),
(25, 'BenQ ZOWIE XL2546K', 'Monitor de 240Hz preferido por profesionales de CS.', 890000.00, 'mon-2.png', 3, 26, '2026-04-30 20:33:34'),
(26, 'Keychron Q1 Custom', 'Teclado de aluminio totalmente personalizable.', 260000.00, 'periph-6.png', 3, 29, '2026-04-30 20:33:34'),
(27, 'AMD Ryzen 5 7600X', 'Entrada ideal a la plataforma AM5.', 310000.00, 'cpu-4.png', 2, 2, '2026-04-30 20:33:34'),
(28, 'G.Skill Trident Z5 RGB 32GB', 'Diseño elegante y gran velocidad DDR5.', 315000.00, 'ram-2.png', 2, 18, '2026-04-30 20:33:34'),
(29, 'ASRock Phantom RTX 4060', 'Gaming 1080p eficiente y fresco.', 490000.00, 'gpu-7.png', 1, 13, '2026-04-30 20:33:34'),
(30, 'Phanteks NV7 Case', 'Gabinete panorámico para builds de alta gama.', 380000.00, 'case-2.png', 2, 50, '2026-04-30 20:33:34'),
(31, 'Seagate FireCuda 2TB', 'Durabilidad extrema para gaming intenso.', 340000.00, 'ssd-4.png', 2, 41, '2026-04-30 20:33:34'),
(32, 'Blue Yeti Microphone', 'El micrófono de condensador más usado por streamers.', 185000.00, 'periph-7.png', 3, 33, '2026-04-30 20:33:34'),
(33, 'LG UltraGear OLED 27\"', 'Colores perfectos y respuesta de 0.03ms.', 1250000.00, 'mon-3.png', 3, 35, '2026-04-30 20:33:34'),
(34, 'Kingston FURY Renegade 1TB', 'Rendimiento sólido PCIe 4.0.', 135000.00, 'ssd-5.png', 2, 17, '2026-04-30 20:33:34'),
(35, 'Cooler Master MasterLiquid 240', 'Líquida eficiente con gran iluminación RGB.', 160000.00, 'cool-3.png', 2, 48, '2026-04-30 20:33:34'),
(36, 'ASUS ROG Swift 360Hz', 'Velocidad absoluta para competitivos.', 1150000.00, 'mon-4.png', 3, 4, '2026-04-30 20:33:34'),
(37, 'Glorious Model O- Wireless', 'Mouse ligero con diseño de panal.', 145000.00, 'periph-8.png', 3, 27, '2026-04-30 20:33:34'),
(38, 'Intel Core i5-14600K', 'La mejor opción precio-rendimiento actual.', 450000.00, 'cpu-5.png', 2, 3, '2026-04-30 20:33:34'),
(39, 'PNY RTX 4070 Verto', 'Diseño sobrio y gran rendimiento en 1440p.', 880000.00, 'gpu-8.png', 1, 14, '2026-04-30 20:33:34'),
(40, 'Corsair RM850x White', 'Fuente silenciosa y estética blanca.', 260000.00, 'psu-3.png', 2, 16, '2026-04-30 20:33:34'),
(41, 'Teamgroup T-Force 32GB', 'RAM con diseño gamer y gran iluminación.', 255000.00, 'ram-3.png', 2, 19, '2026-04-30 20:33:34'),
(42, 'Razer DeathAdder V3 Pro', 'Ergonomía perfecta para jugadores de FPS.', 230000.00, 'periph-9.png', 3, 20, '2026-04-30 20:33:34'),
(43, 'Be Quiet! Dark Rock Pro 4', 'Silencio absoluto y gran capacidad térmica.', 140000.00, 'cool-4.png', 2, 47, '2026-04-30 20:33:34'),
(44, 'Fractal Design North', 'Gabinete con acabados en madera real.', 320000.00, 'case-3.png', 2, 51, '2026-04-30 20:33:34'),
(45, 'Audio-Technica M50x', 'Auriculares de estudio para audio preciso.', 220000.00, 'periph-10.png', 3, 31, '2026-04-30 20:33:34'),
(46, 'Samsung 990 Pro 2TB', 'El SSD más buscado por los entusiastas.', 410000.00, 'ssd-6.png', 2, 34, '2026-04-30 20:33:34'),
(47, 'Gigabyte M27Q', 'Monitor 1440p con switch KVM integrado.', 580000.00, 'mon-5.png', 3, 6, '2026-04-30 20:33:34'),
(48, 'AMD Ryzen 9 7900X', 'Potencia multinúcleo para profesionales.', 720000.00, 'cpu-6.png', 2, 2, '2026-04-30 20:33:34'),
(49, 'Elgato Stream Deck MK.2', '15 teclas LCD personalizables para streams.', 245000.00, 'periph-11.png', 3, 32, '2026-04-30 20:33:34'),
(50, 'Thermaltake Toughpower 1200W', 'Potencia de sobra para las nuevas RTX 40.', 510000.00, 'psu-4.png', 2, 49, '2026-04-30 20:33:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_categories`
--

CREATE TABLE `product_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_categories`
--

INSERT INTO `product_categories` (`id`, `name`) VALUES
(2, 'CPUs'),
(1, 'GPUs'),
(3, 'Periféricos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_variants`
--

CREATE TABLE `product_variants` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  `color_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_variants`
--

INSERT INTO `product_variants` (`id`, `name`, `product_id`, `color_id`, `size_id`, `stock`) VALUES
(1, 'Black Edition', 1, NULL, NULL, 0),
(2, 'White Edition', 1, NULL, NULL, 0),
(3, '16GB RAM', 4, NULL, NULL, 0),
(4, '32GB RAM', 4, NULL, NULL, 0),
(5, 'Switch Red', 6, NULL, NULL, 0),
(6, 'Switch Blue', 6, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT 'default-avatar.png',
  `category_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `image`, `category_id`, `createdAt`) VALUES
(12, 'Elsa', 'Pato', 'Elsapatito@gmail.com', '$2b$10$eEuNdBwvu8oHfY0di/2frOhVX1WEyUbO7fPCgdAAwU97QUazEYh/S', 'default-avatar.png', 1, '2026-05-01 17:13:57'),
(15, 'Armando', 'Casas', 'armadorcasas@gmail.com', '$2b$10$YstG.JSd0rst3Mj9zqWmN.KLkWCaIiMggJ3kQsAGnpjKoJ5.TJWPO', 'default-avatar.png', 2, '2026-05-01 18:30:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_categories`
--

CREATE TABLE `user_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_categories`
--

INSERT INTO `user_categories` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'customer');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indices de la tabla `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `color_id` (`color_id`),
  ADD KEY `size_id` (`size_id`);

--
-- Indices de la tabla `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `user_categories`
--
ALTER TABLE `user_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `user_categories`
--
ALTER TABLE `user_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`);

--
-- Filtros para la tabla `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_variants_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`),
  ADD CONSTRAINT `product_variants_ibfk_3` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `user_categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

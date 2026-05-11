const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

// MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../public/images/products')),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// DEFINICIÓN DE RUTAS

// --- RUTAS DE CARRITO (Primero) ---
router.get('/cart', productController.cart);
router.post('/cart/add/:id', productController.addToCart);
router.post('/cart/remove/:index', productController.cartRemove);

// --- RUTAS DE PRODUCTO (Después) ---
router.get('/', productController.index);               
router.get('/create', productController.create); 
router.get('/search', productController.search);       
router.get('/:id', productController.detail);
router.get('/:id/edit', productController.edit);           
router.post('/', upload.single('image'), productController.store);       
router.put('/:id', upload.single('image'), productController.update); 
router.delete('/:id', productController.destroy);    


module.exports = router; 

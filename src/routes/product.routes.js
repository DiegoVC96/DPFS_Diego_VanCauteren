const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../public/img/products')),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// DEFINICIÓN DE RUTAS
router.get('/', productController.index);               // Listado
router.get('/create', productController.create);        // Formulario creación
router.get('/:id', productController.detail);           // Detalle
router.post('/', upload.single('image'), productController.store); // Acción creación

router.get('/:id/edit', productController.edit);        // Formulario edición
router.put('/:id', upload.single('image'), productController.update); // Acción edición
router.delete('/:id', productController.destroy);       // Acción borrado

module.exports = router;

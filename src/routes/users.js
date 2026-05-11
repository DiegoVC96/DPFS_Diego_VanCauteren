const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../public/images/users')),
    filename: (req, file, cb) => cb(null, 'avatar-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

/*** RUTAS DE REGISTRO ***/
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('avatar'), usersController.processRegister);

/*** RUTAS DE LOGIN ***/
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess);

/*** RUTAS DE PERFIL Y LOGOUT ***/
router.get('/profile', authMiddleware, usersController.profile);
router.get('/logout', authMiddleware, usersController.logout);

module.exports = router;

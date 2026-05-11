const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const usersController = require('../controllers/usersController');

// Middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const registerValidation = require('../middlewares/userValidator');
const loginValidator = require('../middlewares/loginValidator');

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: (req, file, cb) => {
        cb(null, 'avatar-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);

// Proceso de registro
router.post('/register', upload.single('avatar'), registerValidation, usersController.processRegister);

// Formulario de login 
router.get('/login', guestMiddleware, usersController.login);

// Proceso de login
router.post('/login', usersController.loginProcess);
router.post('/login', loginValidator, usersController.loginProcess);

// Perfil de usuario (Requiere estar logueado)
router.get('/profile', authMiddleware, usersController.profile);
router.put('/profile/update', upload.single('image'), usersController.updateProfile);

// Cerrar sesión
router.get('/logout', authMiddleware, usersController.logout);


module.exports = router;


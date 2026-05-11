const { body } = require('express-validator');

module.exports = [
    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debes ingresar un formato de email válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
];

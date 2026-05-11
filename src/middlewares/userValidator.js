const { body } = require('express-validator');
const path = require('path');
const db = require('../database/models');

const registerValidation = [
    // Nombre
    body('firstName')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

    // Apellido
    body('lastName')
        .notEmpty().withMessage('El apellido es obligatorio').bail()
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

    // Email
    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debes ingresar un formato de email válido').bail()
        .custom(async (value) => {
            const user = await db.User.findOne({ where: { email: value } });
            if (user) {
                throw new Error('Este email ya está registrado');
            }
            return true;
        }),

    // Contraseña
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({ min: 8 }).withMessage('Debe tener al menos 8 caracteres').bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('La contraseña debe incluir mayúscula, minúscula, número y un carácter especial'),

    // Imagen 
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        if (file) {
            let fileExtension = path.extname(file.originalname).toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = registerValidation;

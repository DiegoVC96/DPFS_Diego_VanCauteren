const { body } = require('express-validator');
const path = require('path');
const db = require('../database/models');

const productValidation = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),

    body('description')
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),

    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        if (file) {
            let fileExtension = path.extname(file.originalname).toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    }),

    body('product_category_id')
        .notEmpty().withMessage('Debes seleccionar una categoría').bail()
        .custom(async (value) => {
            const category = await db.ProductCategory.findByPk(value);
            if (!category) throw new Error('La categoría seleccionada no es válida');
            return true;
        }),

    body('brand_id')
        .notEmpty().withMessage('Debes seleccionar una marca').bail()
        .custom(async (value) => {
            const brand = await db.Brand.findByPk(value);
            if (!brand) throw new Error('La marca seleccionada no es válida');
            return true;
        })
];

module.exports = productValidation;

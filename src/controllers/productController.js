const db = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

const productController = {
    // LISTAR 
    index: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: ['category', 'brand']
            });
            res.render('products/productList', { products });
        } catch (error) { res.send(error); }
    },

    // CREAR
    create: async (req, res) => { 
        try {
        // SEGURIDAD
        if (!req.session.userLogged || req.session.userLogged.category_id != 1) {
            return res.redirect('/products');
        }

        const categories = await db.ProductCategory.findAll();
        const brands = await db.Brand.findAll();
        res.render('products/productForm', { product: {}, categories, brands });
        } catch (error) { res.send(error); }
    },

    // EDITAR
    edit: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            const categories = await db.ProductCategory.findAll();
            const brands = await db.Brand.findAll();
            
            res.render('products/productForm', { product, categories, brands });
        } catch (error) { res.send(error); }
    },

    // DETALLE
    detail: async (req, res) => {
    try {
        const product = await db.Product.findByPk(req.params.id, {
            include: ['category', 'brand', 'variants']
        });

        if (!product) {
            return res.redirect('/products'); 
        }

        return res.render('products/productDetail', { product }); 

    } catch (error) { 
        return res.send(error); 
    }
    },

    // GUARDAR
    store: async (req, res) => {
        const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const categories = await db.ProductCategory.findAll();
        const brands = await db.Brand.findAll();
        return res.render('products/productForm', {
            errors: errors.mapped(),
            oldData: req.body,
            categories,
            brands,
            product: {} 
        });
    }
    try {
        await db.Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category_id: req.body.category_id, 
            brand_id: req.body.brand_id,       
            image: req.file ? req.file.filename : 'default-product.png'
        });
        res.redirect('/products');
    } catch (error) { res.send(error); }
    },


    // EDITAR 
    update: async (req, res) => {
        try {
            await db.Product.update({
                ...req.body,
                image: req.file ? req.file.filename : req.body.oldImage
            }, {
                where: { id: req.params.id }
            });
            res.redirect('/products/' + req.params.id);
        } catch (error) { res.send(error); }
    },

    // ELIMINAR 
    destroy: async (req, res) => {
        try {
            await db.Product.destroy({ where: { id: req.params.id } });
            res.redirect('/products');
        } catch (error) { res.send(error); }
    },

    // BUSCAR 
    search: async (req, res) => {
        try {
        const cart = req.session.cart || [];
        let relatedProducts = [];

        if (cart.length > 0) {
            const categoryIds = cart.map(item => item.category_id);
            const productIdsInCart = cart.map(item => item.id);

            relatedProducts = await db.Product.findAll({
                where: {
                    category_id: { [db.Sequelize.Op.in]: categoryIds },
                    id: { [db.Sequelize.Op.notIn]: productIdsInCart }
                },
                limit: 3,
                include: ['brand']
            });
        } else {
            relatedProducts = await db.Product.findAll({ limit: 3, include: ['brand'] });
        }

        res.render('products/productCart', { cart, relatedProducts });
        } catch (error) {
            res.send(error);
        }
    },

    // VER CARRITO
    cart: async (req, res) => {
    try {
        const cart = req.session.cart || [];
        
        // Buscamos 3 productos para la sección "Podría interesarte"
        const relatedProducts = await db.Product.findAll({ 
            limit: 3,
            include: ['brand'] 
        });

        // ENVIAMOS AMBAS VARIABLES A LA VISTA
        res.render('products/productCart', { cart, relatedProducts });
        
        } catch (error) {
            res.send("Error al cargar el carrito: " + error);
        }
    },


    // ANIADIR CARRITO
    addToCart: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: ['brand'] 
            });

            if (!product) return res.redirect('/products');

            if (!req.session.cart) {
                req.session.cart = [];
            }

            const item = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                brand: product.brand ? product.brand.name : 'NeoHorizon',
                quantity: req.body.quantity || 1
            };

            req.session.cart.push(item);

            return res.redirect('/products/cart');

        } catch (error) {
            res.send(error);
        }
    },

    cartRemove: (req, res) => {
    let cart = req.session.cart;
    let index = req.params.index;

    if (cart && cart.length > 0) {
        cart.splice(index, 1);
    }

    req.session.cart = cart;
    res.redirect('/products/cart');
    },

    // BUSCADOR
    search: async (req, res) => {
    try {
        let { keywords } = req.query;
        
        const products = await db.Product.findAll({
            where: {
                name: { [db.Sequelize.Op.like]: `%${keywords}%` }
            },
            include: ['category', 'brand']
        });

        // Pasamos los productos y las keywords a la vista
        res.render('products/productList', { products, keywords });
    } catch (error) {
        res.send(error);
    }
}
};

module.exports = productController;

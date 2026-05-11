const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const productController = {
    // 1. Listado (GET)
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('productList', { products });
    },

    // 2. Detalle (GET)
    detail: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const product = products.find(p => p.id == req.params.id);
        res.render('productDetail', { product });
    },

    // 3. Formulario Creación (GET)
    create: (req, res) => {
        res.render('productForm'); // No enviamos 'product' para que el EJS sepa que es creación
    },

    // 4. Acción de Creación (POST)
    store: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            ...req.body,
            image: req.file ? req.file.filename : 'default.jpg'
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/products');
    },

    // 5. Formulario Edición (GET)
    edit: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const product = products.find(p => p.id == req.params.id);
        res.render('productForm', { product });
    },

    // 6. Acción de Edición (PUT)
    update: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const index = products.findIndex(p => p.id == req.params.id);
        
        products[index] = {
            ...products[index],
            ...req.body,
            image: req.file ? req.file.filename : products[index].image
        };
        
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/products/' + req.params.id);
    },

    // 7. Acción de Borrado (DELETE)
    destroy: (req, res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        products = products.filter(p => p.id != req.params.id);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/products');
    }
};

module.exports = productController;

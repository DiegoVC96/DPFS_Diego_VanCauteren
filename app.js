const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); 

// Configuración de EJS
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');


// TESTEO
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('users/login'); 
});

app.get('/register', (req, res) => {
    res.render('users/register'); 
});

app.get('/productsCart', (req, res) => {
    res.render('products/productCart'); 
});

app.get('/productsDetail', (req, res) => {
    res.render('products/productDetail'); 
});

app.get('/productsForm', (req, res) => {
    res.render('products/productForm', { product: {} }); 
});

app.get('/productsList', (req, res) => {
    const productsFilePath = path.join(__dirname, 'src/data/products.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    
    res.render('products/productList', { products: products });
});

const productRoutes = require('./src/routes/product.routes');
app.use('/products', productRoutes);

app.get('/products', (req, res) => {

    const productsFilePath = path.join(__dirname, 'src/data/products.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    res.render('products/productList', { products: products }); 
});


app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));

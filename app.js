const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

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
    res.render('products/productForm'); 
});

app.get('/productsList', (req, res) => {
    res.render('products/productList'); 
});


app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));

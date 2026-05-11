const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 

// 1. CONFIGURACIÓN DE VISTAS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

// 2. MIDDLEWARES GLOBALES 
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());

// 3. MIDDLEWARE DE SESIÓN
app.use(session({
    secret: "NeoHorizon Secret Key",
    resave: false,
    saveUninitialized: false,
}));

// 4. MIDDLEWARES PROPIOS 
const userRecordameMiddleware = require('./src/middlewares/userRecordameMiddleware');
app.use(userRecordameMiddleware); 

app.use((req, res, next) => {
    res.locals.user = req.session.userLogged || null;
    next();
});

// 5. RUTAS
const usersRouter = require('./src/routes/users');
const productRoutes = require('./src/routes/product.routes');
const usersApiRouter = require('./src/routes/api/usersApi.routes');
const productsApiRouter = require('./src/routes/api/productsApi.routes');

app.use('/users', usersRouter);
app.use('/products', productRoutes);
app.use('/api/users', usersApiRouter);
app.use('/api/products', productsApiRouter);

// HOME
app.get('/', (req, res) => {
    res.render('index');
});

// 6. MANEJO DE ERROR 404 
app.use((req, res, next) => {
    res.status(404).send("Pagina no encontrada"); 
});

// 7. SERVIDOR 
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

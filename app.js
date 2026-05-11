const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const userRecordameMiddleware = require('./src/middlewares/userRecordameMiddleware');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());

app.use(session({
    secret: "NeoHorizon Secret Key",
    resave: false,
    saveUninitialized: false,
}));

app.use(userRecordameMiddleware); 

app.use((req, res, next) => {
    res.locals.user = req.session.userLogged || null;
    next();
});

// Rutas 
const usersRouter = require('./src/routes/users');
const productRoutes = require('./src/routes/product.routes');

app.use('/users', usersRouter);
app.use('/products', productRoutes);

// Ruta Home
app.get('/', (req, res) => {
    res.render('index');
});

// Servidor 
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
